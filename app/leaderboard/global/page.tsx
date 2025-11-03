import { Metadata } from 'next';
import { Trophy, Zap, Calendar, Globe } from 'lucide-react';

import { PodiumDisplay, FullLeaderboardTable } from '@/components/leaderboard';

export const metadata: Metadata = {
  title: '全球总榜 - Bifrost Arena',
  description: '查看全球收益排行榜，见证顶尖玩家的辉煌战绩！',
  openGraph: {
    title: '🏆 全球总榜 - Bifrost Arena',
    description: '顶尖玩家的竞技舞台！',
    images: ['/og-leaderboard.png']
  }
};

// Mock data - 实际应该从 API 获取
const mockLeaderboardData = [
  {
    rank: 1,
    username: 'Whale',
    gainUsd: 15234,
    winRate: 0.87,
    strategy: '激进多链',
    chainMix: ['vDOT', 'vGLMR', 'vASTR']
  },
  {
    rank: 2,
    username: 'Trader',
    gainUsd: 12890,
    winRate: 0.82,
    strategy: 'vDOT 狂杀',
    chainMix: ['vDOT']
  },
  {
    rank: 3,
    username: 'Alice',
    gainUsd: 9456,
    winRate: 0.91,
    strategy: '稳健配置',
    chainMix: ['vDOT', 'vGLMR', '黄金']
  },
  {
    rank: 4,
    username: 'Bob',
    gainUsd: 8123,
    winRate: 0.85,
    strategy: '自动复投',
    chainMix: ['vDOT']
  },
  {
    rank: 5,
    username: 'Carol',
    gainUsd: 7890,
    winRate: 0.88,
    strategy: '长期持有',
    chainMix: ['vFIL']
  },
  // ... 更多玩家
  ...Array.from({ length: 45 }, (_, i) => ({
    rank: i + 6,
    username: `Player${i + 6}`,
    gainUsd: 7890 - i * 150,
    winRate: 0.88 - i * 0.01,
    strategy: ['激进多链', 'vDOT 狂杀', '稳健配置', '自动复投', '长期持有'][i % 5],
    chainMix: [['vDOT', 'vGLMR'], ['vDOT'], ['vGLMR', '黄金'], ['vFIL']][i % 4]
  }))
];

export default function GlobalLeaderboardPage() {
  const topThree = mockLeaderboardData.slice(0, 3);

  return (
    <div className="flex flex-col gap-10">
      {/* Page Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-yellow-500/30 px-8 py-8">
        {/* Background Gradient */}
        <div className="absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br from-yellow-500/30 to-orange-500/20 blur-3xl" />

        <div className="relative">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-500/20">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">全球总榜</h1>
              <p className="mt-1 text-text-secondary">见证顶尖玩家的辉煌战绩</p>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
            <StatBadge
              icon={<Zap className="h-4 w-4" />}
              label="活跃玩家"
              value="1,523"
              color="text-yellow-500"
            />
            <StatBadge
              icon={<Globe className="h-4 w-4" />}
              label="总收益"
              value="$2.4M"
              color="text-success"
            />
            <StatBadge
              icon={<Trophy className="h-4 w-4" />}
              label="冠军奖池"
              value="$5,000"
              color="text-bifrost-pink"
            />
            <StatBadge
              icon={<Calendar className="h-4 w-4" />}
              label="赛季剩余"
              value="12天"
              color="text-cyan-400"
            />
          </div>
        </div>
      </div>

      {/* Timeframe Tabs */}
      <div className="flex items-center justify-center gap-2">
        <a href="/leaderboard">
          <TimeframeTab label="实时榜" emoji="🔥" />
        </a>
        <a href="/leaderboard/weekly">
          <TimeframeTab label="本周榜" emoji="📅" />
        </a>
        <a href="/leaderboard/monthly">
          <TimeframeTab label="本月榜" emoji="📊" />
        </a>
        <a href="/leaderboard/global">
          <TimeframeTab label="全球总榜" active emoji="👑" />
        </a>
      </div>

      {/* Podium - Top 3 */}
      <section>
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-white">殿堂级玩家</h2>
          <p className="mt-2 text-sm text-text-secondary">
            收益前三名的荣耀时刻
          </p>
        </div>
        <PodiumDisplay players={topThree} />
      </section>

      {/* Full Leaderboard */}
      <section>
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">完整排行榜</h2>
          <div className="text-sm text-text-secondary">
            实时更新 · 每小时刷新
          </div>
        </div>
        <FullLeaderboardTable entries={mockLeaderboardData} />
      </section>

      {/* Info Cards */}
      <div className="grid gap-6 md:grid-cols-2">
        <InfoCard
          title="排行榜规则"
          icon={<Trophy className="h-5 w-5" />}
          items={[
            '根据实际收益USD排名',
            '每小时自动更新',
            '周榜/月榜在周期结束时重置',
            '总榜累计所有收益'
          ]}
        />
        <InfoCard
          title="奖励机制"
          icon={<Zap className="h-5 w-5" />}
          items={[
            '周榜前10名获得奖励',
            '月榜前20名获得额外奖金',
            '总榜前100名永久荣誉徽章',
            '冠军可获得专属NFT'
          ]}
        />
      </div>
    </div>
  );
}

function TimeframeTab({
  label,
  active = false,
  emoji
}: {
  label: string;
  active?: boolean;
  emoji: string;
}) {
  return (
    <button
      className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-semibold transition ${
        active
          ? 'border-bifrost-pink bg-white/10 text-white'
          : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
      }`}
    >
      <span className="text-lg">{emoji}</span>
      {label}
    </button>
  );
}

function StatBadge({
  icon,
  label,
  value,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3">
      <div className={color}>{icon}</div>
      <div>
        <p className="text-xs text-text-secondary">{label}</p>
        <p className={`text-lg font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  icon,
  items
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="glass-panel rounded-2xl border border-white/10 p-6">
      <div className="mb-4 flex items-center gap-2 text-bifrost-pink">
        {icon}
        <h3 className="font-bold text-white">{title}</h3>
      </div>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-2 text-sm text-text-secondary">
            <span className="mt-1 text-bifrost-pink">•</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
