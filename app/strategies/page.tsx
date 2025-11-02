import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, TrendingUp, Users, Star } from 'lucide-react';

import { StrategyHub } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '策略图书馆 - Bifrost Arena',
  description: '学习、分享和复制顶级DeFi投资策略。浏览社区精选策略,找到最适合你的收益方案!',
  openGraph: {
    title: '📚 策略图书馆 - Bifrost Arena',
    description: '探索顶级DeFi策略,提升你的收益!',
    images: ['/og-strategies.png']
  },
  keywords: ['DeFi Strategies', 'Investment', 'Yield Optimization', '策略', 'Bifrost']
};

export default function StrategiesPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Zone Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-bifrost-pink/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-bifrost-pink/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-arena-purple/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bifrost-pink/30 to-arena-purple/30">
              <span className="text-5xl">📚</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">策略图书馆</h1>
              <p className="text-lg text-text-secondary">
                Strategy Hub · 学习和分享顶级投资策略
              </p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-bifrost-pink" />
                <span className="text-sm text-text-secondary">策略总数</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">128</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">平均收益</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">+18.2%</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">活跃用户</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">856</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">热门策略</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">42</div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full border border-bifrost-pink/50 bg-bifrost-pink/20 px-6 py-2.5 text-sm font-semibold text-white">
          🔥 全部策略
        </button>
        <button className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white">
          ⭐ 精选推荐
        </button>
        <button className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white">
          🎯 高收益
        </button>
        <button className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white">
          🛡️ 低风险
        </button>
        <button className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white">
          ⚡ 快速增长
        </button>
      </div>

      {/* Main Strategy Hub */}
      <StrategyHub />

      {/* Create Strategy CTA */}
      <div className="glass-panel rounded-3xl border border-bifrost-primary/20 p-8 text-center">
        <div className="mb-4 text-5xl">✨</div>
        <h2 className="mb-3 text-2xl font-bold text-white">创建你的专属策略</h2>
        <p className="mx-auto mb-6 max-w-2xl text-text-secondary">
          将你的投资经验分享给社区,帮助其他人获得更好的收益。创建策略还可以赚取策略分成!
        </p>
        <Link
          href="/strategies/create"
          className="inline-flex items-center gap-2 rounded-full bg-bifrost-primary px-8 py-3 font-semibold text-white transition-all hover:scale-105"
        >
          创建策略
        </Link>
      </div>

      {/* Quick Links */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/arena"
          className="group glass-panel rounded-2xl border border-success/20 p-6 transition-all hover:border-success/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-white">查看我的策略表现</h3>
          </div>
          <p className="text-sm text-text-secondary">返回战绩大厅查看策略收益</p>
        </Link>

        <Link
          href="/challenges"
          className="group glass-panel rounded-2xl border border-warning/20 p-6 transition-all hover:border-warning/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">⚔️</span>
            <h3 className="text-xl font-bold text-white">参与策略挑战</h3>
          </div>
          <p className="text-sm text-text-secondary">用你的策略参加比赛赢奖励</p>
        </Link>
      </div>
    </div>
  );
}
