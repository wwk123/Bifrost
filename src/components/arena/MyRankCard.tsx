"use client";

import { motion } from 'framer-motion';
import { ArrowUp, ArrowDown, Trophy, Target } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface MyRankCardProps {
  currentRank: number;
  previousRank: number;
  totalPlayers: number;
  gapToNext: number;
  topThreePlayers: Array<{
    username: string;
    avatar?: string;
    gainUsd: number;
  }>;
}

export function MyRankCard({
  currentRank = 42,
  previousRank = 50,
  totalPlayers = 1523,
  gapToNext = 1234,
  topThreePlayers = [
    { username: 'Whale', gainUsd: 15234 },
    { username: 'Trader', gainUsd: 12890 },
    { username: 'Alice', gainUsd: 9456 }
  ]
}: MyRankCardProps) {
  const rankChange = previousRank - currentRank;
  const isRankUp = rankChange > 0;
  const percentile = ((totalPlayers - currentRank) / totalPlayers * 100).toFixed(1);

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">我的排名</h3>
        <Trophy className="h-5 w-5 text-yellow-500" />
      </div>

      <div className="space-y-6">
        {/* Main Rank Display */}
        <div className="relative">
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-bold text-white">#{currentRank}</span>
            <div className="flex flex-col">
              <span className="text-sm text-text-secondary">/ {totalPlayers} 人</span>
              <div className={`flex items-center gap-1 text-sm font-semibold ${isRankUp ? 'text-success' : 'text-error'}`}>
                {isRankUp ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
                <span>{Math.abs(rankChange)}</span>
              </div>
            </div>
          </div>

          {/* Percentile Badge */}
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-bifrost-pink/20 px-3 py-1 text-xs font-semibold text-bifrost-pink">
            <Target className="h-3 w-3" />
            前 {percentile}%
          </div>
        </div>

        {/* Gap to Next */}
        <div className="rounded-xl bg-white/5 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-text-secondary">距离前一名</p>
              <p className="mt-1 text-lg font-bold text-warning">{formatCurrency(gapToNext)}</p>
            </div>
            <motion.a
              href="/strategies"
              className="rounded-full bg-bifrost-pink px-4 py-2 text-sm font-semibold text-white hover:bg-bifrost-pink/90"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              冲榜策略
            </motion.a>
          </div>
        </div>

        {/* Top 3 Preview */}
        <div>
          <p className="mb-3 text-sm text-text-secondary">领先者</p>
          <div className="space-y-2">
            {topThreePlayers.map((player, index) => (
              <motion.div
                key={player.username}
                className="flex items-center gap-3 rounded-lg bg-white/5 p-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold ${
                    index === 0
                      ? 'bg-rank-gold text-black'
                      : index === 1
                        ? 'bg-rank-silver text-black'
                        : 'bg-rank-bronze text-black'
                  }`}
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{player.username}</p>
                  <p className="text-xs text-success">{formatCurrency(player.gainUsd)}</p>
                </div>
                <motion.a
                  href="/strategies"
                  className="text-xs text-bifrost-pink hover:underline"
                  whileHover={{ scale: 1.05 }}
                >
                  学习
                </motion.a>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.a
          href="/leaderboard"
          className="flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
          whileHover={{ scale: 1.02 }}
        >
          <Trophy className="h-4 w-4" />
          查看完整榜单
        </motion.a>
      </div>
    </div>
  );
}
