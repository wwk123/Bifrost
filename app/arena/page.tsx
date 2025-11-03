import { Metadata } from 'next';
import { Users, Lightbulb, Trophy } from 'lucide-react';

import { TeamCompetitionSection, StrategyHub } from '@/components/dashboard';
import {
  PowerOverview,
  MyRankCard,
  ActiveChallenges,
  AchievementWall,
  AnalyticsQuickCards
} from '@/components/arena';

export const metadata: Metadata = {
  title: '战绩大厅 - Bifrost Arena',
  description: '查看你的竞技数据、等级进度和成就墙。追踪你的DeFi收益表现,解锁新成就!',
  openGraph: {
    title: '📊 我的战绩大厅 - Bifrost Arena',
    description: '正在竞技场中冲击更高排名!',
    images: ['/og-arena.png']
  }
};

export default function ArenaPage() {
  return (
    <div className="flex flex-col gap-8">
      {/* 1. Power Overview - 战力总览 */}
      <PowerOverview
        level={3}
        levelName="黄金勇者"
        powerScore={78}
        nextLevelScore={100}
        weeklyGain={8234}
        weeklyWinRate={0.87}
        currentRank={42}
        totalRevenue={24680}
      />

      {/* 2. Rank & Challenges - 排名与挑战 */}
      <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
        <MyRankCard
          currentRank={42}
          previousRank={50}
          totalPlayers={1523}
          gapToNext={1234}
          topThreePlayers={[
            { username: 'Whale', gainUsd: 15234 },
            { username: 'Trader', gainUsd: 12890 },
            { username: 'Alice', gainUsd: 9456 }
          ]}
        />
        <ActiveChallenges />
      </div>

      {/* 3. Achievement Wall - 成就墙 */}
      <AchievementWall />

      {/* 4. Quick Entry Cards - 快速入口 */}
      <div className="grid gap-6 md:grid-cols-3">
        <QuickEntryCard
          href="/teams"
          icon={<Users className="h-6 w-6" />}
          title="团队竞赛"
          description="组建团队，团结就是力量"
          gradient="from-cyan-500/20 to-blue-500/10"
          emoji="👥"
        />
        <QuickEntryCard
          href="/strategies"
          icon={<Lightbulb className="h-6 w-6" />}
          title="策略中心"
          description="学习高手策略和技巧"
          gradient="from-purple-500/20 to-pink-500/10"
          emoji="💡"
        />
        <QuickEntryCard
          href="/leaderboard"
          icon={<Trophy className="h-6 w-6" />}
          title="荣耀榜"
          description="查看全服排行榜"
          gradient="from-yellow-500/20 to-orange-500/10"
          emoji="🏆"
        />
      </div>

      {/* 5. Teams & Strategy - 团队与策略 */}
      <div className="grid gap-8 xl:grid-cols-2">
        <div id="teams">
          <TeamCompetitionSection />
        </div>
        <div id="strategies">
          <StrategyHub />
        </div>
      </div>

      {/* 6. Advanced Analytics - 高级分析 */}
      <div>
        <h2 className="mb-6 text-2xl font-bold text-white">高级分析</h2>
        <AnalyticsQuickCards />
      </div>
    </div>
  );
}

function QuickEntryCard({
  href,
  icon,
  title,
  description,
  gradient,
  emoji
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  gradient: string;
  emoji: string;
}) {
  return (
    <a
      href={href}
      className={`group glass-panel relative overflow-hidden rounded-2xl border border-white/10 p-6 transition-all hover:border-white/20 hover:shadow-xl`}
    >
      {/* Background Gradient */}
      <div className={`absolute right-0 top-0 h-32 w-32 translate-x-8 -translate-y-8 rounded-full bg-gradient-to-br ${gradient} blur-2xl opacity-50 group-hover:opacity-100 transition`} />

      <div className="relative space-y-3">
        <div className="flex items-center justify-between">
          <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${gradient}`}>
            {icon}
          </div>
          <span className="text-3xl">{emoji}</span>
        </div>
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-bifrost-pink transition">
            {title}
          </h3>
          <p className="mt-1 text-sm text-text-secondary">{description}</p>
        </div>
      </div>
    </a>
  );
}
