// APY 预测市场工具

import type {
  ApyPrediction,
  UserPrediction,
  PredictionOutcome,
  PredictionStats
} from '@/types/prediction';

/**
 * 计算赔率
 * @param totalStaked 总投注额
 * @param outcomeStaked 该结果的投注额
 * @returns 赔率
 */
export function calculateOdds(totalStaked: number, outcomeStaked: number): number {
  if (outcomeStaked === 0) return 1.0;

  // 使用 Parimutuel 系统计算赔率
  // 赔率 = 总投注 / 该结果投注 * (1 - 手续费)
  const feeRate = 0.05; // 5% 手续费
  const odds = (totalStaked / outcomeStaked) * (1 - feeRate);

  return Math.max(1.1, Math.min(odds, 10)); // 限制在 1.1x - 10x 之间
}

/**
 * 计算市场预测百分比
 * @param totalStaked 总投注额
 * @param outcomeStaked 该结果的投注额
 * @returns 市场预测百分比 (0-100)
 */
export function calculateMarketPrediction(
  totalStaked: number,
  outcomeStaked: number
): number {
  if (totalStaked === 0) return 0;
  return (outcomeStaked / totalStaked) * 100;
}

/**
 * 更新预测市场数据
 * @param prediction 当前预测市场
 * @param outcome 投注结果
 * @param amount 投注金额
 * @returns 更新后的预测市场
 */
export function updatePredictionMarket(
  prediction: ApyPrediction,
  outcome: PredictionOutcome,
  amount: number
): ApyPrediction {
  const updatedPrediction = { ...prediction };

  // 更新该结果的投注额
  updatedPrediction.outcomes[outcome].totalStaked += amount;

  // 重新计算所有结果的赔率和市场预测
  const totalStaked =
    updatedPrediction.outcomes.up.totalStaked +
    updatedPrediction.outcomes.stable.totalStaked +
    updatedPrediction.outcomes.down.totalStaked;

  (['up', 'stable', 'down'] as PredictionOutcome[]).forEach((o) => {
    updatedPrediction.outcomes[o].odds = calculateOdds(
      totalStaked,
      updatedPrediction.outcomes[o].totalStaked
    );
    updatedPrediction.outcomes[o].marketPrediction = calculateMarketPrediction(
      totalStaked,
      updatedPrediction.outcomes[o].totalStaked
    );
  });

  return updatedPrediction;
}

/**
 * 结算预测
 * @param prediction 预测市场
 * @param actualApy 实际 APY
 * @returns 实际结果
 */
export function settlePrediction(
  prediction: ApyPrediction,
  actualApy: number
): PredictionOutcome {
  const apyChange = ((actualApy - prediction.currentApy) / prediction.currentApy) * 100;

  if (apyChange > 2) return 'up';
  if (apyChange < -2) return 'down';
  return 'stable';
}

/**
 * 计算用户预测收益
 * @param userPrediction 用户预测
 * @param prediction 预测市场
 * @returns 实际收益
 */
export function calculatePredictionPayout(
  userPrediction: UserPrediction,
  prediction: ApyPrediction
): number {
  if (
    !prediction.actualOutcome ||
    userPrediction.outcome !== prediction.actualOutcome
  ) {
    return 0; // 预测失败,无收益
  }

  const odds = prediction.outcomes[userPrediction.outcome].odds;
  return userPrediction.amount * odds;
}

/**
 * 计算用户预测统计
 * @param userPredictions 用户所有预测
 * @returns 统计数据
 */
export function calculatePredictionStats(
  userPredictions: UserPrediction[]
): PredictionStats {
  const completedPredictions = userPredictions.filter(
    (p) => p.status === 'won' || p.status === 'lost'
  );

  const wonPredictions = completedPredictions.filter((p) => p.status === 'won');
  const totalProfit = completedPredictions.reduce(
    (sum, p) => sum + ((p.actualPayout || 0) - p.amount),
    0
  );

  // 计算当前连胜/连败
  let currentStreak = 0;
  let bestStreak = 0;
  let tempStreak = 0;

  for (let i = completedPredictions.length - 1; i >= 0; i--) {
    const p = completedPredictions[i];
    if (p.status === 'won') {
      tempStreak++;
      bestStreak = Math.max(bestStreak, tempStreak);
      if (i === completedPredictions.length - 1) {
        currentStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  return {
    totalPredictions: completedPredictions.length,
    winRate: completedPredictions.length > 0 ? wonPredictions.length / completedPredictions.length : 0,
    totalProfit,
    currentStreak,
    bestStreak
  };
}
