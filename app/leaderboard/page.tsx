import { Metadata } from 'next';
import Link from 'next/link';
import { Trophy, TrendingUp, Award, Users } from 'lucide-react';

import { LeaderboardSection } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '荣耀榜 - Bifrost Arena',
  description: '全球DeFi玩家实时收益排名。挑战顶尖高手,争夺荣耀榜首,赢取丰厚奖励!',
  openGraph: {
    title: '🏆 荣耀榜 - Bifrost Arena',
    description: '查看全球顶尖DeFi玩家的收益排名!',
    images: ['/og-leaderboard.png']
  },
  keywords: ['Leaderboard', 'Rankings', 'DeFi', 'Bifrost', '排行榜']
};

export default function LeaderboardPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Zone Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-yellow-500/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-yellow-500/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-orange-500/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500/30 to-orange-500/30">
              <span className="text-5xl">🏆</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">荣耀榜</h1>
              <p className="text-lg text-text-secondary">Global Leaderboard · 全球收益竞技排名</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">总参赛者</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">1,250</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-sm text-text-secondary">当前冠军</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-yellow-500">Whale_King</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">最高收益</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">+28.5%</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-bifrost-primary" />
                <span className="text-sm text-text-secondary">总奖金池</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-bifrost-primary">50,000 BNC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-3">
        <Link
          href="/leaderboard"
          className="rounded-full border border-yellow-500/50 bg-yellow-500/20 px-6 py-2.5 text-sm font-semibold text-white"
        >
          🔥 实时榜
        </Link>
        <Link
          href="/leaderboard/weekly"
          className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
        >
          📅 周榜
        </Link>
        <Link
          href="/leaderboard/monthly"
          className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
        >
          📊 月榜
        </Link>
        <Link
          href="/leaderboard/global"
          className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
        >
          🌍 全球总榜
        </Link>
      </div>

      {/* Main Leaderboard */}
      <LeaderboardSection />

      {/* Prize Pool */}
      <div className="glass-panel rounded-3xl border border-bifrost-primary/20 p-8">
        <div className="mb-6 flex items-center gap-3">
          <span className="text-3xl">🎁</span>
          <h2 className="text-2xl font-bold text-white">奖励说明</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-yellow-500/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 p-6">
            <div className="mb-2 text-4xl">🥇</div>
            <div className="mb-1 text-sm text-text-secondary">第1名</div>
            <div className="text-2xl font-bold text-yellow-500">10,000 BNC</div>
          </div>

          <div className="rounded-xl border border-gray-400/30 bg-gradient-to-br from-gray-400/10 to-gray-500/10 p-6">
            <div className="mb-2 text-4xl">🥈</div>
            <div className="mb-1 text-sm text-text-secondary">第2名</div>
            <div className="text-2xl font-bold text-gray-400">5,000 BNC</div>
          </div>

          <div className="rounded-xl border border-orange-600/30 bg-gradient-to-br from-orange-600/10 to-orange-700/10 p-6">
            <div className="mb-2 text-4xl">🥉</div>
            <div className="mb-1 text-sm text-text-secondary">第3名</div>
            <div className="text-2xl font-bold text-orange-600">2,500 BNC</div>
          </div>
        </div>

        <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-sm text-text-secondary">
            📌 第4-10名将获得 500-1,500 BNC 奖励 · 第11-50名将获得特殊成就NFT
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/arena"
          className="group glass-panel rounded-2xl border border-success/20 p-6 transition-all hover:border-success/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-white">查看我的战绩</h3>
          </div>
          <p className="text-sm text-text-secondary">返回战绩大厅查看详细数据</p>
        </Link>

        <Link
          href="/teams"
          className="group glass-panel rounded-2xl border border-info/20 p-6 transition-all hover:border-info/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">🛡️</span>
            <h3 className="text-xl font-bold text-white">加入战队</h3>
          </div>
          <p className="text-sm text-text-secondary">组队竞技,获得额外收益加成</p>
        </Link>
      </div>
    </div>
  );
}
