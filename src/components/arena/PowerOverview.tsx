"use client";

import { motion } from 'framer-motion';
import { formatCurrency, formatPercent } from '@/utils/format';

interface PowerOverviewProps {
  level: number;
  levelName: string;
  powerScore: number;
  nextLevelScore: number;
  weeklyGain: number;
  weeklyWinRate: number;
  currentRank: number;
  totalRevenue: number;
}

const levelConfig: Record<number, { name: string; color: string; gradient: string; emoji: string }> = {
  1: { name: '青铜新手', color: 'text-orange-400', gradient: 'from-orange-600/20 to-orange-400/10', emoji: '🥉' },
  2: { name: '白银战士', color: 'text-gray-300', gradient: 'from-gray-400/20 to-gray-300/10', emoji: '🥈' },
  3: { name: '黄金勇者', color: 'text-yellow-400', gradient: 'from-yellow-500/20 to-yellow-400/10', emoji: '🥇' },
  4: { name: '铂金大师', color: 'text-cyan-400', gradient: 'from-cyan-500/20 to-cyan-400/10', emoji: '💎' },
  5: { name: '钻石传奇', color: 'text-blue-400', gradient: 'from-blue-500/20 to-blue-400/10', emoji: '👑' },
};

export function PowerOverview({
  level = 3,
  levelName = '黄金勇者',
  powerScore = 78,
  nextLevelScore = 100,
  weeklyGain = 8234,
  weeklyWinRate = 0.87,
  currentRank = 42,
  totalRevenue = 24680
}: PowerOverviewProps) {
  const config = levelConfig[level] || levelConfig[1];
  const progress = (powerScore / nextLevelScore) * 100;
  const scoreToNextLevel = nextLevelScore - powerScore;

  return (
    <div className="glass-panel relative overflow-hidden rounded-3xl border border-white/10 p-8">
      {/* Background Gradient */}
      <div className={`absolute right-0 top-0 h-64 w-64 translate-x-20 -translate-y-20 rounded-full bg-gradient-to-br ${config.gradient} blur-3xl`} />

      <div className="relative space-y-6">
        {/* Header: Level Badge + Stats */}
        <div className="flex items-start justify-between">
          {/* Level Badge */}
          <div className="flex items-center gap-4">
            <motion.div
              className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradient} backdrop-blur-sm`}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <span className="text-4xl">{config.emoji}</span>
            </motion.div>
            <div>
              <h2 className={`text-2xl font-bold ${config.color}`}>{levelName}</h2>
              <p className="text-sm text-text-secondary">Lv.{level} 玩家</p>
            </div>
          </div>

          {/* Power Score */}
          <div className="text-right">
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-bold text-white">{powerScore}</span>
              <span className="text-text-secondary">/ {nextLevelScore}</span>
            </div>
            <p className="text-sm text-text-secondary">战力评分</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-text-secondary">升级进度</span>
            <span className="font-semibold text-white">{scoreToNextLevel} 分升级</span>
          </div>
          <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className={`h-full bg-gradient-to-r ${config.gradient} ${config.color.replace('text-', 'from-')} to-transparent`}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
            />
            {/* Glow Effect */}
            <motion.div
              className="absolute right-0 top-0 h-full w-12 bg-gradient-to-l from-white/40 to-transparent blur-sm"
              style={{ left: `${Math.max(0, progress - 10)}%` }}
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </div>

        {/* Weekly Stats Grid */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            label="本周收益"
            value={formatCurrency(weeklyGain)}
            trend="+12%"
            color="text-success"
          />
          <StatCard
            label="胜率"
            value={formatPercent(weeklyWinRate)}
            trend="+5%"
            color="text-warning"
          />
          <StatCard
            label="当前排名"
            value={`#${currentRank}`}
            trend="↑8"
            color="text-bifrost-pink"
          />
          <StatCard
            label="总收益"
            value={formatCurrency(totalRevenue)}
            trend="+28%"
            color="text-cyan-400"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  trend,
  color
}: {
  label: string;
  value: string;
  trend: string;
  color: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 px-4 py-3 backdrop-blur-sm">
      <p className="text-xs text-text-secondary">{label}</p>
      <p className={`mt-1 text-lg font-bold ${color}`}>{value}</p>
      <p className="mt-0.5 text-xs text-success">{trend}</p>
    </div>
  );
}
