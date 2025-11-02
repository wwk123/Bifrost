import { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, TrendingUp, Users, Coins } from 'lucide-react';

import { ApyPredictionSection } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '预言殿 - Bifrost Arena',
  description: '预测APY走势,赢取预测奖励。用你的洞察力获得额外收益!',
  openGraph: {
    title: '🔮 预言殿 - Bifrost Arena',
    description: '预测市场走势,赢取丰厚奖励!',
    images: ['/og-prediction.png']
  }
};

export default function PredictionPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-purple-500/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-purple-500/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-pink-500/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30">
              <span className="text-5xl">🔮</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">预言殿</h1>
              <p className="text-lg text-text-secondary">APY Prediction Market · 预测赢奖励</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-500" />
                <span className="text-sm text-text-secondary">活跃预测</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">15</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">准确率</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">68%</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">参与人数</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">1,856</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Coins className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">奖金池</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">25,000 BNC</div>
            </div>
          </div>
        </div>
      </div>

      <ApyPredictionSection />

      <div className="glass-panel rounded-2xl border border-info/20 p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">📖</span>
          <h3 className="text-xl font-bold text-white">如何参与</h3>
        </div>
        <ol className="space-y-3 text-text-secondary">
          <li className="flex gap-3">
            <span className="font-bold text-purple-500">1.</span>
            <span>选择你认为APY会上涨还是下跌</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-500">2.</span>
            <span>投注 BNC (最低 10 BNC)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-500">3.</span>
            <span>等待预测周期结束 (通常为 24-72小时)</span>
          </li>
          <li className="flex gap-3">
            <span className="font-bold text-purple-500">4.</span>
            <span>预测正确者按比例瓜分奖金池</span>
          </li>
        </ol>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/arena"
          className="group glass-panel rounded-2xl border border-success/20 p-6 transition-all hover:border-success/40"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-white">查看预测历史</h3>
          </div>
          <p className="text-sm text-text-secondary">返回战绩大厅查看预测记录</p>
        </Link>

        <Link
          href="/strategies"
          className="group glass-panel rounded-2xl border border-bifrost-pink/20 p-6 transition-all hover:border-bifrost-pink/40"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <h3 className="text-xl font-bold text-white">学习预测策略</h3>
          </div>
          <p className="text-sm text-text-secondary">查看高手的预测思路</p>
        </Link>
      </div>
    </div>
  );
}
