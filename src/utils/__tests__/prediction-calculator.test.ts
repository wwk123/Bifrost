import { describe, it, expect } from 'vitest';
import {
  calculateOdds,
  calculateMarketPrediction,
  updatePredictionMarket,
  settlePrediction,
  calculatePredictionPayout,
  calculatePredictionStats
} from '../prediction-calculator';
import type { ApyPrediction, UserPrediction } from '@/types/prediction';

describe('Prediction Calculator', () => {
  const mockPrediction: ApyPrediction = {
    id: 'pred-1',
    asset: 'vDOT',
    currentApy: 12.5,
    periodStart: new Date(),
    periodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    outcomes: {
      up: { odds: 2.714, marketPrediction: 35, totalStaked: 3500 },
      stable: { odds: 1.9, marketPrediction: 50, totalStaked: 5000 },
      down: { odds: 6.333, marketPrediction: 15, totalStaked: 1500 }
    },
    status: 'open'
  };

  describe('calculateOdds', () => {
    it('should calculate odds correctly using Parimutuel system', () => {
      const totalStaked = 10000;
      const outcomeStaked = 3500;

      const odds = calculateOdds(totalStaked, outcomeStaked);
      // (10000 / 3500) * 0.95 = 2.714...
      expect(odds).toBeGreaterThan(1.1);
      expect(odds).toBeLessThan(10);
    });

    it('should return 1.0 if outcome has no stakes', () => {
      const odds = calculateOdds(10000, 0);
      expect(odds).toBe(1.0);
    });

    it('should cap odds at 10x', () => {
      const odds = calculateOdds(10000, 50);
      expect(odds).toBe(10);
    });
  });

  describe('calculateMarketPrediction', () => {
    it('should calculate market prediction percentage', () => {
      const prediction = calculateMarketPrediction(10000, 3500);
      expect(prediction).toBe(35);
    });

    it('should return 0 if total staked is 0', () => {
      const prediction = calculateMarketPrediction(0, 0);
      expect(prediction).toBe(0);
    });
  });

  describe('updatePredictionMarket', () => {
    it('should update market data when new bet is placed', () => {
      const updated = updatePredictionMarket(mockPrediction, 'up', 1000);

      expect(updated.outcomes.up.totalStaked).toBe(4500); // 3500 + 1000
      expect(updated.outcomes.up.odds).toBeDefined();
      expect(updated.outcomes.up.marketPrediction).toBeDefined();
    });

    it('should recalculate all odds after update', () => {
      const updated = updatePredictionMarket(mockPrediction, 'down', 5000);

      expect(updated.outcomes.up.odds).toBeDefined();
      expect(updated.outcomes.stable.odds).toBeDefined();
      expect(updated.outcomes.down.odds).toBeDefined();
    });
  });

  describe('settlePrediction', () => {
    it('should return "up" when APY increases > 2%', () => {
      const result = settlePrediction(mockPrediction, 13.0);
      expect(result).toBe('up');
    });

    it('should return "down" when APY decreases > 2%', () => {
      const result = settlePrediction(mockPrediction, 12.0);
      expect(result).toBe('down');
    });

    it('should return "stable" when APY change is within ±2%', () => {
      const result = settlePrediction(mockPrediction, 12.6);
      expect(result).toBe('stable');
    });
  });

  describe('calculatePredictionPayout', () => {
    const userPrediction: UserPrediction = {
      id: 'up-1',
      predictionId: 'pred-1',
      userAddress: '0x123',
      outcome: 'up',
      amount: 100,
      timestamp: new Date(),
      potentialPayout: 271.4,
      status: 'pending'
    };

    it('should calculate payout for winning prediction', () => {
      const settledPrediction = {
        ...mockPrediction,
        actualOutcome: 'up' as const
      };

      const payout = calculatePredictionPayout(userPrediction, settledPrediction);
      // The actual payout depends on the odds in mockPrediction.outcomes.up.odds
      expect(payout).toBe(100 * mockPrediction.outcomes.up.odds);
    });

    it('should return 0 for losing prediction', () => {
      const settledPrediction = {
        ...mockPrediction,
        actualOutcome: 'down' as const
      };

      const payout = calculatePredictionPayout(userPrediction, settledPrediction);
      expect(payout).toBe(0);
    });

    it('should return 0 if prediction not yet settled', () => {
      const payout = calculatePredictionPayout(userPrediction, mockPrediction);
      expect(payout).toBe(0);
    });
  });

  describe('calculatePredictionStats', () => {
    const userPredictions: UserPrediction[] = [
      {
        id: 'p1',
        predictionId: 'pred-1',
        userAddress: '0x123',
        outcome: 'up',
        amount: 100,
        timestamp: new Date(),
        potentialPayout: 210,
        status: 'won',
        actualPayout: 210
      },
      {
        id: 'p2',
        predictionId: 'pred-2',
        userAddress: '0x123',
        outcome: 'down',
        amount: 100,
        timestamp: new Date(),
        potentialPayout: 320,
        status: 'lost'
      },
      {
        id: 'p3',
        predictionId: 'pred-3',
        userAddress: '0x123',
        outcome: 'stable',
        amount: 100,
        timestamp: new Date(),
        potentialPayout: 150,
        status: 'won',
        actualPayout: 150
      },
      {
        id: 'p4',
        predictionId: 'pred-4',
        userAddress: '0x123',
        outcome: 'up',
        amount: 100,
        timestamp: new Date(),
        potentialPayout: 210,
        status: 'pending'
      }
    ];

    it('should calculate correct total predictions count', () => {
      const stats = calculatePredictionStats(userPredictions);
      expect(stats.totalPredictions).toBe(3); // Excludes pending
    });

    it('should calculate correct win rate', () => {
      const stats = calculatePredictionStats(userPredictions);
      expect(stats.winRate).toBeCloseTo(2 / 3, 2); // 2 won out of 3
    });

    it('should calculate correct total profit', () => {
      const stats = calculatePredictionStats(userPredictions);
      // (210 - 100) + (0 - 100) + (150 - 100) = 60
      expect(stats.totalProfit).toBe(60);
    });

    it('should calculate current streak correctly', () => {
      const stats = calculatePredictionStats(userPredictions);
      expect(stats.currentStreak).toBe(1); // Last completed is won
    });

    it('should calculate best streak correctly', () => {
      const stats = calculatePredictionStats(userPredictions);
      expect(stats.bestStreak).toBeGreaterThanOrEqual(1);
    });
  });
});
