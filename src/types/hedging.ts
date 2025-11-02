// 智能对冲系统类型定义

export interface Position {
  asset: string;
  amount: number;
  valueUsd: number;
  riskLevel: 'low' | 'medium' | 'high';
  volatility: number;
}

export interface RiskAnalysis {
  totalExposure: number;
  concentrationRisk: number;
  volatilityScore: number;
  recommendations: HedgeRecommendation[];
}

export interface HedgeRecommendation {
  id: string;
  type: 'put-option' | 'yield-insurance' | 'diversification';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  estimatedCost: number;
  protectionAmount: number;
  details: HedgeDetails;
}

export type HedgeDetails = PutOptionDetails | YieldInsuranceDetails | DiversificationDetails;

export interface PutOptionDetails {
  type: 'put-option';
  asset: string;
  strikePrice: number;
  premium: number;
  expiryDate: Date;
  coverage: number;
}

export interface YieldInsuranceDetails {
  type: 'yield-insurance';
  guaranteedApy: number;
  premiumRate: number;
  coverageAmount: number;
  duration: number; // in days
}

export interface DiversificationDetails {
  type: 'diversification';
  suggestedAllocations: {
    asset: string;
    currentRatio: number;
    targetRatio: number;
  }[];
}

export interface ActiveHedge {
  id: string;
  userId: string;
  type: 'put-option' | 'yield-insurance';
  status: 'active' | 'expired' | 'executed';
  details: PutOptionDetails | YieldInsuranceDetails;
  createdAt: Date;
  expiresAt: Date;
  totalCost: number;
  totalPayout?: number;
}
