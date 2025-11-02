import { Metadata } from 'next';
import Link from 'next/link';
import { Brain, Shield, TrendingDown, AlertTriangle } from 'lucide-react';

import { SmartHedgingSection } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '智慧神殿 - Bifrost Arena',
  description: '智能对冲策略,锁定收益,规避风险。用智慧保护你的DeFi资产!',
  openGraph: {
    title: '🧠 智慧神殿 - Bifrost Arena',
    description: '智能对冲,稳健收益!',
    images: ['/og-hedging.png']
  }
};

export default function HedgingPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-green-500/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-green-500/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-teal-500/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500/30 to-teal-500/30">
              <span className="text-5xl">🧠</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">智慧神殿</h1>
              <p className="text-lg text-text-secondary">Smart Hedging · 智能对冲,稳健收益</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-green-500" />
                <span className="text-sm text-text-secondary">对冲策略</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">6</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">风险降低</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">-45%</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingDown className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">波动率</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">12.3%</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">风险等级</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">中</div>
            </div>
          </div>
        </div>
      </div>

      <SmartHedgingSection />

      <div className="glass-panel rounded-2xl border border-green-500/20 p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <h3 className="text-xl font-bold text-white">对冲策略说明</h3>
        </div>
        <div className="space-y-4 text-text-secondary">
          <div>
            <h4 className="mb-2 font-semibold text-white">🛡️ 看跌期权对冲</h4>
            <p>当市场下跌时自动触发保护,锁定最低收益,防止大额损失</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-white">📊 收益保险</h4>
            <p>为你的质押资产购买保险,确保即使在极端情况下也能保本</p>
          </div>
          <div>
            <h4 className="mb-2 font-semibold text-white">⚖️ 动态调仓</h4>
            <p>根据市场波动自动调整资产配置,保持风险收益比平衡</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/arena"
          className="group glass-panel rounded-2xl border border-success/20 p-6 transition-all hover:border-success/40"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-white">查看对冲效果</h3>
          </div>
          <p className="text-sm text-text-secondary">返回战绩大厅查看对冲收益</p>
        </Link>

        <Link
          href="/strategies"
          className="group glass-panel rounded-2xl border border-bifrost-pink/20 p-6 transition-all hover:border-bifrost-pink/40"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📚</span>
            <h3 className="text-xl font-bold text-white">学习对冲策略</h3>
          </div>
          <p className="text-sm text-text-secondary">查看专家的对冲技巧</p>
        </Link>
      </div>
    </div>
  );
}
