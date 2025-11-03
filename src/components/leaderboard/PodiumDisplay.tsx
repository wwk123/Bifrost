"use client";

import { motion } from 'framer-motion';
import { Trophy, TrendingUp, Award } from 'lucide-react';
import { formatCurrency, formatPercent } from '@/utils/format';

interface PodiumPlayer {
  rank: number;
  username: string;
  gainUsd: number;
  winRate: number;
  strategy: string;
  avatar?: string;
}

export function PodiumDisplay({ players }: { players: PodiumPlayer[] }) {
  // 按照 2, 1, 3 的顺序排列（中间最高）
  const podiumOrder = [
    players.find(p => p.rank === 2),
    players.find(p => p.rank === 1),
    players.find(p => p.rank === 3)
  ].filter(Boolean) as PodiumPlayer[];

  const podiumConfig = {
    1: {
      height: 'h-64',
      gradient: 'from-yellow-500/30 to-orange-500/20',
      borderColor: 'border-yellow-500/50',
      bgColor: 'bg-rank-gold',
      textColor: 'text-black',
      glow: 'shadow-yellow-500/50',
      emoji: '👑',
      title: '冠军'
    },
    2: {
      height: 'h-52',
      gradient: 'from-gray-400/30 to-gray-500/20',
      borderColor: 'border-gray-400/50',
      bgColor: 'bg-rank-silver',
      textColor: 'text-black',
      glow: 'shadow-gray-400/50',
      emoji: '🥈',
      title: '亚军'
    },
    3: {
      height: 'h-48',
      gradient: 'from-orange-600/30 to-orange-700/20',
      borderColor: 'border-orange-600/50',
      bgColor: 'bg-rank-bronze',
      textColor: 'text-black',
      glow: 'shadow-orange-600/50',
      emoji: '🥉',
      title: '季军'
    }
  };

  return (
    <div className="relative">
      {/* Background Effects */}
      <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 -translate-y-32 rounded-full bg-gradient-to-br from-yellow-500/20 via-orange-500/10 to-transparent blur-3xl" />

      {/* Podium */}
      <div className="relative flex items-end justify-center gap-4 lg:gap-8">
        {podiumOrder.map((player, index) => {
          if (!player) return null;
          const config = podiumConfig[player.rank as 1 | 2 | 3];

          return (
            <motion.div
              key={player.rank}
              className="flex flex-col items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
            >
              {/* Player Card */}
              <motion.div
                className={`glass-panel relative mb-4 w-40 overflow-hidden rounded-2xl border-2 ${config.borderColor} p-4 lg:w-48`}
                whileHover={{ y: -8, scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-50`} />

                {/* Rank Badge */}
                <div className="relative mb-3 flex justify-center">
                  <motion.div
                    className={`flex h-16 w-16 items-center justify-center rounded-full ${config.bgColor} ${config.glow} shadow-lg`}
                    animate={{ rotate: [0, 5, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <span className="text-3xl">{config.emoji}</span>
                  </motion.div>
                </div>

                {/* Player Info */}
                <div className="relative space-y-2 text-center">
                  <h3 className="text-lg font-bold text-white">{player.username}</h3>
                  <p className={`text-xs font-semibold ${config.textColor === 'text-black' ? 'text-yellow-400' : 'text-white'}`}>
                    {config.title}
                  </p>

                  {/* Stats */}
                  <div className="space-y-1 pt-2">
                    <div className="flex items-center justify-center gap-1 text-success">
                      <TrendingUp className="h-3 w-3" />
                      <span className="text-sm font-bold">{formatCurrency(player.gainUsd)}</span>
                    </div>
                    <div className="text-xs text-text-secondary">
                      胜率 {formatPercent(player.winRate)}
                    </div>
                    <div className="rounded-full bg-white/10 px-2 py-1 text-xs text-white">
                      {player.strategy}
                    </div>
                  </div>
                </div>

                {/* Crown for Champion */}
                {player.rank === 1 && (
                  <motion.div
                    className="absolute -top-6 left-1/2 -translate-x-1/2"
                    animate={{
                      y: [0, -5, 0],
                      rotate: [-5, 5, -5]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Trophy className="h-8 w-8 text-yellow-500" />
                  </motion.div>
                )}
              </motion.div>

              {/* Podium Stand */}
              <motion.div
                className={`${config.height} w-40 rounded-t-2xl border-2 ${config.borderColor} bg-gradient-to-br ${config.gradient} p-4 backdrop-blur-sm lg:w-48`}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              >
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="text-4xl font-bold text-white lg:text-5xl">
                    #{player.rank}
                  </div>
                  <div className="mt-2 flex items-center gap-1">
                    <Award className="h-4 w-4 text-white/70" />
                    <span className="text-xs text-white/70">排名</span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Base Platform */}
      <motion.div
        className="mt-0 h-4 rounded-b-2xl border-t-2 border-white/10 bg-gradient-to-b from-white/5 to-white/10"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      />
    </div>
  );
}
