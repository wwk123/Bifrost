import { describe, it, expect } from 'vitest';
import { analyzeRisk, calculatePutPayout } from '../risk-analyzer';
import type { Position, PutOptionDetails } from '@/types/hedging';

describe('Risk Analyzer', () => {
  const mockPositions: Position[] = [
    {
      asset: 'vDOT',
      amount: 600,
      valueUsd: 6000,
      riskLevel: 'high',
      volatility: 45
    },
    {
      asset: 'vGLMR',
      amount: 2000,
      valueUsd: 2000,
      riskLevel: 'medium',
      volatility: 30
    },
    {
      asset: 'vASTR',
      amount: 1000,
      valueUsd: 1000,
      riskLevel: 'low',
      volatility: 20
    }
  ];

  describe('analyzeRisk', () => {
    it('should calculate total exposure correctly', () => {
      const analysis = analyzeRisk(mockPositions);
      expect(analysis.totalExposure).toBe(9000);
    });

    it('should calculate concentration risk correctly', () => {
      const analysis = analyzeRisk(mockPositions);
      // Max position is vDOT at $6000
      // Concentration: 6000 / 9000 = 0.667
      expect(analysis.concentrationRisk).toBeCloseTo(0.667, 2);
    });

    it('should calculate volatility score correctly', () => {
      const analysis = analyzeRisk(mockPositions);
      // Weighted volatility:
      // (45 * 6000/9000 + 30 * 2000/9000 + 20 * 1000/9000) / 100
      // = (30 + 6.67 + 2.22) / 100 = 0.389
      expect(analysis.volatilityScore).toBeGreaterThan(0.3);
      expect(analysis.volatilityScore).toBeLessThan(0.5);
    });

    it('should generate recommendations', () => {
      const analysis = analyzeRisk(mockPositions);
      expect(analysis.recommendations).toBeDefined();
      expect(analysis.recommendations.length).toBeGreaterThan(0);
    });

    it('should recommend diversification for high concentration', () => {
      const highConcentrationPositions: Position[] = [
        {
          asset: 'vDOT',
          amount: 1000,
          valueUsd: 9000,
          riskLevel: 'high',
          volatility: 45
        },
        {
          asset: 'vGLMR',
          amount: 100,
          valueUsd: 1000,
          riskLevel: 'medium',
          volatility: 30
        }
      ];

      const analysis = analyzeRisk(highConcentrationPositions);
      const hasDiversificationRec = analysis.recommendations.some(
        (r) => r.type === 'diversification'
      );
      expect(hasDiversificationRec).toBe(true);
    });

    it('should recommend put options for high volatility assets', () => {
      const analysis = analyzeRisk(mockPositions);
      const hasPutOptionRec = analysis.recommendations.some(
        (r) => r.type === 'put-option'
      );
      expect(hasPutOptionRec).toBe(true);
    });

    it('should sort recommendations by severity', () => {
      const analysis = analyzeRisk(mockPositions);
      const severityOrder = ['critical', 'high', 'medium', 'low'];

      for (let i = 1; i < analysis.recommendations.length; i++) {
        const prevSeverity = severityOrder.indexOf(
          analysis.recommendations[i - 1].severity
        );
        const currSeverity = severityOrder.indexOf(
          analysis.recommendations[i].severity
        );
        expect(prevSeverity).toBeLessThanOrEqual(currSeverity);
      }
    });
  });

  describe('calculatePutPayout', () => {
    const putOption: PutOptionDetails = {
      type: 'put-option',
      asset: 'vDOT',
      strikePrice: 10,
      premium: 100,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      coverage: 6000
    };

    it('should return 0 if current price >= strike price', () => {
      const payout = calculatePutPayout(putOption, 11);
      expect(payout).toBe(0);
    });

    it('should calculate payout correctly when price drops', () => {
      const currentPrice = 9; // Price dropped from $10 to $9
      const payout = calculatePutPayout(putOption, currentPrice);

      // Price diff: 10 - 9 = 1
      // Payout: (1 / 10) * 6000 - 100 = 600 - 100 = 500
      expect(payout).toBe(500);
    });

    it('should calculate negative return if payout < premium', () => {
      const currentPrice = 9.9; // Small price drop
      const payout = calculatePutPayout(putOption, currentPrice);

      // Price diff: 10 - 9.9 = 0.1
      // Payout: (0.1 / 10) * 6000 - 100 = 60 - 100 = -40
      expect(payout).toBeCloseTo(-40, 0);
    });

    it('should handle large price drops correctly', () => {
      const currentPrice = 5; // Price dropped 50%
      const payout = calculatePutPayout(putOption, currentPrice);

      // Price diff: 10 - 5 = 5
      // Payout: (5 / 10) * 6000 - 100 = 3000 - 100 = 2900
      expect(payout).toBe(2900);
    });
  });
});
