// APY预测市场类型定义

export type PredictionOutcome = 'up' | 'stable' | 'down';

export interface ApyPrediction {
  id: string;
  asset: string; // 'vDOT', 'vGLMR', etc.
  currentApy: number;
  periodStart: Date;
  periodEnd: Date;
  outcomes: {
    up: {
      odds: number;
      marketPrediction: number; // percentage
      totalStaked: number;
    };
    stable: {
      odds: number;
      marketPrediction: number;
      totalStaked: number;
    };
    down: {
      odds: number;
      marketPrediction: number;
      totalStaked: number;
    };
  };
  status: 'open' | 'closed' | 'settled';
  actualOutcome?: PredictionOutcome;
}

export interface UserPrediction {
  id: string;
  predictionId: string;
  userAddress: string;
  outcome: PredictionOutcome;
  amount: number; // in BNC
  timestamp: Date;
  potentialPayout: number;
  status: 'pending' | 'won' | 'lost';
  actualPayout?: number;
}

export interface PredictionStats {
  totalPredictions: number;
  winRate: number;
  totalProfit: number;
  currentStreak: number;
  bestStreak: number;
}
