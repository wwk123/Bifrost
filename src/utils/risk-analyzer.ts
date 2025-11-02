// 风险分析和对冲建议工具

import type {
  Position,
  RiskAnalysis,
  HedgeRecommendation,
  PutOptionDetails,
  YieldInsuranceDetails
} from '@/types/hedging';

/**
 * 分析用户持仓风险
 * @param positions 用户持仓列表
 * @returns 风险分析结果
 */
export function analyzeRisk(positions: Position[]): RiskAnalysis {
  const totalValue = positions.reduce((sum, p) => sum + p.valueUsd, 0);

  // 计算集中度风险 (单一资产占比过高)
  const maxPosition = Math.max(...positions.map((p) => p.valueUsd));
  const concentrationRisk = maxPosition / totalValue;

  // 计算加权波动率
  const volatilityScore =
    positions.reduce((sum, p) => sum + p.volatility * (p.valueUsd / totalValue), 0) / 100;

  // 生成对冲建议
  const recommendations = generateHedgeRecommendations(
    positions,
    totalValue,
    concentrationRisk,
    volatilityScore
  );

  return {
    totalExposure: totalValue,
    concentrationRisk,
    volatilityScore,
    recommendations
  };
}

/**
 * 生成对冲建议
 */
function generateHedgeRecommendations(
  positions: Position[],
  totalValue: number,
  concentrationRisk: number,
  volatilityScore: number
): HedgeRecommendation[] {
  const recommendations: HedgeRecommendation[] = [];

  // 1. 高集中度风险 -> 建议多样化
  if (concentrationRisk > 0.7) {
    const dominantAsset = positions.reduce((max, p) =>
      p.valueUsd > max.valueUsd ? p : max
    );

    recommendations.push({
      id: 'diversification-1',
      type: 'diversification',
      severity: 'high',
      description: `${dominantAsset.asset} 占比过高 (${(concentrationRisk * 100).toFixed(1)}%),建议分散投资`,
      estimatedCost: 0,
      protectionAmount: 0,
      details: {
        type: 'diversification',
        suggestedAllocations: [
          { asset: dominantAsset.asset, currentRatio: concentrationRisk, targetRatio: 0.5 },
          { asset: 'vGLMR', currentRatio: 0, targetRatio: 0.3 },
          { asset: '稳定币', currentRatio: 0, targetRatio: 0.2 }
        ]
      }
    });
  }

  // 2. 高波动性资产 -> 建议 Put 期权对冲
  const highVolPositions = positions.filter((p) => p.volatility > 30);
  highVolPositions.forEach((position) => {
    const strikePrice = position.valueUsd / position.amount; // 假设当前价格
    const premium = position.valueUsd * 0.02; // 2% 保险费

    const putOption: PutOptionDetails = {
      type: 'put-option',
      asset: position.asset,
      strikePrice: strikePrice * 0.9, // 执行价为当前价格的90%
      premium,
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30天后
      coverage: position.valueUsd
    };

    recommendations.push({
      id: `put-${position.asset}`,
      type: 'put-option',
      severity: position.volatility > 50 ? 'critical' : 'medium',
      description: `${position.asset} 波动率高 (${position.volatility}%),建议使用 Put 期权对冲`,
      estimatedCost: premium,
      protectionAmount: position.valueUsd,
      details: putOption
    });
  });

  // 3. 大额持仓 -> 建议收益保险
  const largePositions = positions.filter((p) => p.valueUsd > totalValue * 0.4);
  largePositions.forEach((position) => {
    const insuranceDetails: YieldInsuranceDetails = {
      type: 'yield-insurance',
      guaranteedApy: 10, // 保证10% APY
      premiumRate: 0.5, // 年化0.5%费用
      coverageAmount: position.valueUsd,
      duration: 365
    };

    recommendations.push({
      id: `insurance-${position.asset}`,
      type: 'yield-insurance',
      severity: 'medium',
      description: `为 ${position.asset} 购买收益保险,保障年化收益不低于 10%`,
      estimatedCost: position.valueUsd * 0.005,
      protectionAmount: position.valueUsd * 0.1, // 保护10%的收益
      details: insuranceDetails
    });
  });

  return recommendations.sort((a, b) => {
    const severityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return severityOrder[a.severity] - severityOrder[b.severity];
  });
}

/**
 * 计算 Put 期权潜在收益
 * @param putOption Put 期权详情
 * @param currentPrice 当前价格
 * @returns 潜在收益
 */
export function calculatePutPayout(putOption: PutOptionDetails, currentPrice: number): number {
  if (currentPrice >= putOption.strikePrice) {
    return 0; // 期权未行使
  }

  const priceDiff = putOption.strikePrice - currentPrice;
  const payout = (priceDiff / putOption.strikePrice) * putOption.coverage;
  return payout - putOption.premium; // 扣除已支付的保险费
}
