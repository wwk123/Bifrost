import { Metadata } from 'next';

import {
  AchievementsSection,
  ChallengesSection,
  HeroSection,
  InsightMetrics,
  LeaderboardSection,
  PerformanceTrend,
  ReferralRewards,
  ShareHighlights,
  StrategyHub,
  TeamCompetitionSection,
  ApyPredictionSection,
  SmartHedgingSection
} from '@/components/dashboard';

export const metadata: Metadata = {
  title: '战绩大厅 - Bifrost Arena',
  description: '查看你的竞技数据、收益趋势和实时排名。追踪你的DeFi收益表现,解锁新成就!',
  openGraph: {
    title: '📊 我的战绩大厅 - Bifrost Arena',
    description: '正在竞技场中冲击更高排名!',
    images: ['/og-arena.png']
  }
};

export default function ArenaPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Zone Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-success/20 px-8 py-6">
        <div className="absolute right-0 top-0 h-48 w-48 translate-x-12 -translate-y-12 rounded-full bg-success/20 blur-3xl" />
        <div className="relative flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-success/20">
            <span className="text-4xl">📊</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">战绩大厅</h1>
            <p className="text-text-secondary">Personal Dashboard · 追踪你的竞技表现</p>
          </div>
        </div>
      </div>

      <HeroSection />
      <InsightMetrics />
      <PerformanceTrend />

      {/* Quick Links to other zones */}
      <div className="grid gap-6 md:grid-cols-2">
        <a
          href="/leaderboard"
          className="group glass-panel rounded-2xl border border-yellow-500/20 p-6 transition-all hover:border-yellow-500/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">🏆</span>
            <h3 className="text-xl font-bold text-white">查看荣耀榜</h3>
          </div>
          <p className="text-sm text-text-secondary">查看你在全球排行榜中的位置</p>
        </a>

        <a
          href="/challenges"
          className="group glass-panel rounded-2xl border border-warning/20 p-6 transition-all hover:border-warning/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">⚔️</span>
            <h3 className="text-xl font-bold text-white">参与挑战</h3>
          </div>
          <p className="text-sm text-text-secondary">完成挑战,赢取奖励</p>
        </a>
      </div>

      {/* Mini Leaderboard */}
      <div id="leaderboard">
        <LeaderboardSection />
      </div>

      {/* Teams */}
      <div id="teams">
        <TeamCompetitionSection />
      </div>

      {/* Strategy & Achievements */}
      <div className="grid gap-10 xl:grid-cols-[2fr_1fr]">
        <div id="strategies">
          <StrategyHub />
        </div>
        <div id="achievements">
          <AchievementsSection />
        </div>
      </div>

      {/* APY & Hedging */}
      <div className="grid gap-10 xl:grid-cols-2">
        <ApyPredictionSection />
        <SmartHedgingSection />
      </div>

      {/* Challenges & Referral */}
      <div className="grid gap-10 xl:grid-cols-2">
        <div id="challenges">
          <ChallengesSection />
        </div>
        <ReferralRewards />
      </div>

      <ShareHighlights />
    </div>
  );
}
