"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, Check, Info } from 'lucide-react';

import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';
import { formatCurrency } from '@/utils/format';
import { analyzeRisk } from '@/utils/risk-analyzer';

import type { Position, HedgeRecommendation } from '@/types/hedging';

// Mock用户持仓数据
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
    valueUsd: 1500,
    riskLevel: 'medium',
    volatility: 35
  }
];

const severityColors = {
  critical: 'text-red-400 bg-red-400/10 border-red-400/30',
  high: 'text-orange-400 bg-orange-400/10 border-orange-400/30',
  medium: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30',
  low: 'text-blue-400 bg-blue-400/10 border-blue-400/30'
};

const severityIcons = {
  critical: AlertTriangle,
  high: AlertTriangle,
  medium: Info,
  low: Info
};

export function SmartHedgingSection() {
  const { isConnected } = useWallet();
  const [selectedRecommendation, setSelectedRecommendation] =
    useState<HedgeRecommendation | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const riskAnalysis = analyzeRisk(mockPositions);

  const handleEnableHedge = async (type: 'put-option' | 'yield-insurance' | 'rebalance') => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能执行对冲操作');
      return;
    }

    if (!selectedRecommendation) {
      toast.error('请先选择对冲方案', '从左侧列表中选择一个对冲建议');
      return;
    }

    setIsExecuting(true);

    try {
      // 模拟对冲交易执行
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const actionMessages = {
        'put-option': '看跌期权对冲已启用',
        'yield-insurance': '收益保险已投保',
        rebalance: '资产调仓已完成'
      };

      toast.success(
        '对冲操作成功!',
        actionMessages[type] || '对冲方案已执行'
      );

      // 重置选择
      setSelectedRecommendation(null);
    } catch (error) {
      toast.error('操作失败', '请检查钱包余额或稍后重试');
      console.error('Hedge execution error:', error);
    } finally {
      setIsExecuting(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">🛡️ 智能对冲系统</h2>
        <p className="text-sm text-text-secondary">
          AI 驱动的风险分析和对冲建议,保护你的收益
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        {/* 左侧:风险分析 */}
        <div className="space-y-4">
          {/* 风险总览 */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">风险总览</h3>

            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-xs text-text-secondary">总暴露</div>
                <div className="text-xl font-bold text-white">
                  {formatCurrency(riskAnalysis.totalExposure)}
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-xs text-text-secondary">集中度风险</div>
                <div
                  className={`text-xl font-bold ${
                    riskAnalysis.concentrationRisk > 0.7
                      ? 'text-red-400'
                      : riskAnalysis.concentrationRisk > 0.5
                        ? 'text-yellow-400'
                        : 'text-green-400'
                  }`}
                >
                  {(riskAnalysis.concentrationRisk * 100).toFixed(0)}%
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-xs text-text-secondary">波动率评分</div>
                <div
                  className={`text-xl font-bold ${
                    riskAnalysis.volatilityScore > 0.5
                      ? 'text-red-400'
                      : riskAnalysis.volatilityScore > 0.3
                        ? 'text-yellow-400'
                        : 'text-green-400'
                  }`}
                >
                  {(riskAnalysis.volatilityScore * 100).toFixed(0)}
                </div>
              </div>
            </div>
          </div>

          {/* 持仓明细 */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">当前持仓</h3>

            <div className="space-y-3">
              {mockPositions.map((position) => (
                <div
                  key={position.asset}
                  className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <div className="font-semibold text-white">{position.asset}</div>
                    <div className="text-xs text-text-secondary">
                      {position.amount.toFixed(2)} 代币
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-semibold text-white">
                      {formatCurrency(position.valueUsd)}
                    </div>
                    <div
                      className={`text-xs ${
                        position.riskLevel === 'high'
                          ? 'text-red-400'
                          : position.riskLevel === 'medium'
                            ? 'text-yellow-400'
                            : 'text-green-400'
                      }`}
                    >
                      波动率: {position.volatility}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 对冲建议 */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">对冲建议</h3>

            <div className="space-y-3">
              {riskAnalysis.recommendations.map((recommendation) => {
                const SeverityIcon = severityIcons[recommendation.severity];

                return (
                  <motion.button
                    key={recommendation.id}
                    onClick={() => setSelectedRecommendation(recommendation)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      selectedRecommendation?.id === recommendation.id
                        ? 'border-bifrost-pink bg-bifrost-pink/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-lg border p-2 ${severityColors[recommendation.severity]}`}
                      >
                        <SeverityIcon className="h-5 w-5" />
                      </div>

                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-semibold text-white">
                            {recommendation.type === 'put-option'
                              ? 'Put 期权对冲'
                              : recommendation.type === 'yield-insurance'
                                ? '收益保险'
                                : '资产多样化'}
                          </span>
                          <span
                            className={`rounded-full px-2 py-0.5 text-xs ${severityColors[recommendation.severity]}`}
                          >
                            {recommendation.severity === 'critical'
                              ? '紧急'
                              : recommendation.severity === 'high'
                                ? '高'
                                : recommendation.severity === 'medium'
                                  ? '中'
                                  : '低'}
                          </span>
                        </div>

                        <p className="text-sm text-text-secondary">
                          {recommendation.description}
                        </p>

                        <div className="mt-2 flex items-center gap-4 text-xs text-text-secondary">
                          <span>成本: {formatCurrency(recommendation.estimatedCost)}</span>
                          <span>
                            保护: {formatCurrency(recommendation.protectionAmount)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>

        {/* 右侧:建议详情 */}
        <div className="space-y-4">
          {selectedRecommendation ? (
            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
              <h3 className="mb-4 text-lg font-semibold text-white">对冲方案详情</h3>

              {selectedRecommendation.details.type === 'put-option' && (
                <div className="space-y-4">
                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-text-secondary">资产</div>
                    <div className="text-xl font-bold text-white">
                      {selectedRecommendation.details.asset}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-xs text-text-secondary">执行价</div>
                      <div className="text-lg font-bold text-white">
                        ${selectedRecommendation.details.strikePrice.toFixed(2)}
                      </div>
                    </div>

                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-xs text-text-secondary">保险费</div>
                      <div className="text-lg font-bold text-white">
                        {formatCurrency(selectedRecommendation.details.premium)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-text-secondary">保护说明</div>
                    <p className="mt-2 text-sm text-white">
                      如果 {selectedRecommendation.details.asset} 价格跌破 $
                      {selectedRecommendation.details.strikePrice.toFixed(2)},
                      你将获得差价赔付,最高保护
                      {formatCurrency(selectedRecommendation.details.coverage)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEnableHedge('put-option')}
                    disabled={isExecuting}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Shield className="mr-2 inline h-4 w-4" />
                    {isExecuting ? '执行中...' : '立即启用对冲'}
                  </button>
                </div>
              )}

              {selectedRecommendation.details.type === 'yield-insurance' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-xs text-text-secondary">保证 APY</div>
                      <div className="text-lg font-bold text-green-400">
                        {selectedRecommendation.details.guaranteedApy}%
                      </div>
                    </div>

                    <div className="rounded-lg bg-white/5 p-4">
                      <div className="text-xs text-text-secondary">保险费率</div>
                      <div className="text-lg font-bold text-white">
                        {selectedRecommendation.details.premiumRate}%
                      </div>
                    </div>
                  </div>

                  <div className="rounded-lg bg-white/5 p-4">
                    <div className="text-sm text-text-secondary">保障内容</div>
                    <p className="mt-2 text-sm text-white">
                      如果实际 APY 低于 {selectedRecommendation.details.guaranteedApy}%,
                      将补偿差额,最高保额
                      {formatCurrency(selectedRecommendation.details.coverageAmount)}
                    </p>
                  </div>

                  <button
                    onClick={() => handleEnableHedge('yield-insurance')}
                    disabled={isExecuting}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Check className="mr-2 inline h-4 w-4" />
                    {isExecuting ? '投保中...' : '立即投保'}
                  </button>
                </div>
              )}

              {selectedRecommendation.details.type === 'diversification' && (
                <div className="space-y-4">
                  <div className="text-sm text-text-secondary">建议配置</div>

                  <div className="space-y-3">
                    {selectedRecommendation.details.suggestedAllocations.map((allocation) => (
                      <div key={allocation.asset} className="rounded-lg bg-white/5 p-4">
                        <div className="mb-2 flex items-center justify-between">
                          <span className="font-semibold text-white">{allocation.asset}</span>
                          <span className="text-sm text-text-secondary">
                            {(allocation.currentRatio * 100).toFixed(0)}% →{' '}
                            {(allocation.targetRatio * 100).toFixed(0)}%
                          </span>
                        </div>

                        <div className="h-2 rounded-full bg-white/10">
                          <div
                            className="h-2 rounded-full bg-bifrost-pink"
                            style={{ width: `${allocation.targetRatio * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleEnableHedge('rebalance')}
                    disabled={isExecuting}
                    className="w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isExecuting ? '调仓中...' : '一键调仓'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center rounded-xl border border-white/10 bg-white/5 p-12 text-center">
              <div>
                <Shield className="mx-auto mb-4 h-16 w-16 text-gray-400" />
                <p className="text-sm text-text-secondary">选择左侧建议查看详情</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
