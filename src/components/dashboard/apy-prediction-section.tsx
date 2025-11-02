"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Target } from 'lucide-react';

import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';

import type { ApyPrediction, PredictionOutcome, PredictionStats } from '@/types/prediction';

// Mock数据
const mockPrediction: ApyPrediction = {
  id: 'pred-vdot-1',
  asset: 'vDOT',
  currentApy: 12.5,
  periodStart: new Date(),
  periodEnd: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  outcomes: {
    up: {
      odds: 2.1,
      marketPrediction: 35,
      totalStaked: 3500
    },
    stable: {
      odds: 1.5,
      marketPrediction: 50,
      totalStaked: 5000
    },
    down: {
      odds: 3.2,
      marketPrediction: 15,
      totalStaked: 1500
    }
  },
  status: 'open'
};

const mockStats: PredictionStats = {
  totalPredictions: 24,
  winRate: 0.68,
  totalProfit: 1234,
  currentStreak: 3,
  bestStreak: 7
};

export function ApyPredictionSection() {
  const { isConnected, account } = useWallet();
  const [selectedOutcome, setSelectedOutcome] = useState<PredictionOutcome>('stable');
  const [betAmount, setBetAmount] = useState(100);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const potentialPayout = betAmount * mockPrediction.outcomes[selectedOutcome].odds;

  const handleSubmitPrediction = async () => {
    // 检查钱包连接
    if (!isConnected || !account) {
      toast.warning('请先连接钱包', '需要连接钱包才能提交预测');
      return;
    }

    // 验证投注金额
    if (betAmount < 10) {
      toast.error('投注金额过低', '最低投注金额为 10 BNC');
      return;
    }

    if (betAmount > 10000) {
      toast.error('投注金额过高', '最高投注金额为 10,000 BNC');
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟提交预测到链上
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const outcomeLabel =
        selectedOutcome === 'up' ? '上涨' : selectedOutcome === 'stable' ? '不变' : '下跌';

      toast.success(
        '预测提交成功!',
        `已投注 ${betAmount} BNC 预测 ${mockPrediction.asset} APY ${outcomeLabel}`
      );

      // 重置表单
      setBetAmount(100);
    } catch (error) {
      toast.error('提交失败', '请稍后重试或联系支持团队');
      console.error('Prediction submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-white">📊 APY 预测市场</h2>
        <p className="text-sm text-text-secondary">
          预测下周 {mockPrediction.asset} APY 走向,赢取奖励
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* 左侧:预测卡片 */}
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <div className="text-sm text-text-secondary">当前 APY</div>
                <div className="text-3xl font-bold text-white">
                  {mockPrediction.currentApy.toFixed(1)}%
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-text-secondary">预测周期</div>
                <div className="text-sm text-white">7 天</div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="text-sm font-semibold text-white">
                你认为下周 {mockPrediction.asset} APY 会?
              </div>

              {/* 预测选项 */}
              {(
                [
                  { outcome: 'up', label: '上涨', icon: TrendingUp, color: 'green' },
                  { outcome: 'stable', label: '不变', icon: Minus, color: 'blue' },
                  { outcome: 'down', label: '下跌', icon: TrendingDown, color: 'red' }
                ] as const
              ).map(({ outcome, label, icon: Icon, color }) => {
                const data = mockPrediction.outcomes[outcome];
                const isSelected = selectedOutcome === outcome;

                return (
                  <button
                    key={outcome}
                    onClick={() => setSelectedOutcome(outcome)}
                    className={`w-full rounded-lg border p-4 text-left transition ${
                      isSelected
                        ? 'border-bifrost-pink bg-bifrost-pink/10'
                        : 'border-white/10 bg-white/5 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`h-5 w-5 ${
                            color === 'green'
                              ? 'text-green-400'
                              : color === 'red'
                                ? 'text-red-400'
                                : 'text-blue-400'
                          }`}
                        />
                        <div>
                          <div className="font-semibold text-white">{label}</div>
                          <div className="text-xs text-text-secondary">
                            市场预测: {data.marketPrediction.toFixed(0)}%
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-white">{data.odds.toFixed(1)}x</div>
                        <div className="text-xs text-text-secondary">赔率</div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* 投注金额 */}
            <div className="mt-4">
              <label className="text-sm text-text-secondary">投注金额 (BNC)</label>
              <input
                type="number"
                value={betAmount}
                onChange={(e) => setBetAmount(Number(e.target.value))}
                className="mt-2 w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none focus:border-bifrost-pink"
                min={10}
                max={10000}
              />
            </div>

            {/* 潜在收益 */}
            <div className="mt-4 rounded-lg bg-bifrost-pink/10 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">潜在收益</span>
                <span className="text-xl font-bold text-bifrost-pink">
                  {potentialPayout.toFixed(0)} BNC
                </span>
              </div>
            </div>

            <button
              onClick={handleSubmitPrediction}
              disabled={isSubmitting}
              className="mt-4 w-full rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 py-3 font-semibold text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? '提交中...' : '提交预测'}
            </button>
          </div>
        </div>

        {/* 右侧:统计数据 */}
        <div className="space-y-4">
          {/* 个人战绩 */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
              <Target className="h-5 w-5 text-bifrost-pink" />
              你的预测战绩
            </h3>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-sm text-text-secondary">总预测次数</div>
                <div className="text-2xl font-bold text-white">
                  {mockStats.totalPredictions}
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-sm text-text-secondary">胜率</div>
                <div className="text-2xl font-bold text-green-400">
                  {(mockStats.winRate * 100).toFixed(0)}%
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-sm text-text-secondary">累计盈利</div>
                <div className="text-2xl font-bold text-bifrost-pink">
                  +{mockStats.totalProfit} BNC
                </div>
              </div>

              <div className="rounded-lg bg-white/5 p-4">
                <div className="text-sm text-text-secondary">当前连胜</div>
                <div className="text-2xl font-bold text-white">{mockStats.currentStreak}</div>
              </div>
            </div>
          </div>

          {/* 市场分布 */}
          <div className="rounded-xl border border-white/10 bg-white/5 p-6">
            <h3 className="mb-4 text-lg font-semibold text-white">市场投注分布</h3>

            <div className="space-y-3">
              {(['up', 'stable', 'down'] as PredictionOutcome[]).map((outcome) => {
                const data = mockPrediction.outcomes[outcome];
                const label =
                  outcome === 'up' ? '上涨' : outcome === 'stable' ? '不变' : '下跌';
                const color =
                  outcome === 'up'
                    ? 'bg-green-400'
                    : outcome === 'stable'
                      ? 'bg-blue-400'
                      : 'bg-red-400';

                return (
                  <div key={outcome}>
                    <div className="mb-1 flex items-center justify-between text-sm">
                      <span className="text-text-secondary">{label}</span>
                      <span className="text-white">
                        {data.marketPrediction.toFixed(0)}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${data.marketPrediction}%` }}
                        transition={{ duration: 0.5 }}
                        className={`h-2 rounded-full ${color}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
