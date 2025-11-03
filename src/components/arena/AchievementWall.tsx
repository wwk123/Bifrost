"use client";

import { motion } from 'framer-motion';
import { Award, Lock } from 'lucide-react';

interface Achievement {
  id: string;
  name: string;
  description: string;
  emoji: string;
  unlocked: boolean;
  progress?: number;
  total?: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const rarityConfig = {
  common: {
    name: '普通',
    gradient: 'from-gray-400/20 to-gray-500/10',
    glow: 'shadow-gray-500/20',
    text: 'text-gray-300'
  },
  rare: {
    name: '稀有',
    gradient: 'from-blue-400/20 to-blue-500/10',
    glow: 'shadow-blue-500/30',
    text: 'text-blue-400'
  },
  epic: {
    name: '史诗',
    gradient: 'from-purple-400/20 to-purple-500/10',
    glow: 'shadow-purple-500/40',
    text: 'text-purple-400'
  },
  legendary: {
    name: '传说',
    gradient: 'from-yellow-400/20 to-orange-500/10',
    glow: 'shadow-yellow-500/50',
    text: 'text-yellow-400'
  }
};

export function AchievementWall() {
  const achievements: Achievement[] = [
    {
      id: '1',
      name: '首笔收益',
      description: '获得第一笔DeFi收益',
      emoji: '🎯',
      unlocked: true,
      rarity: 'common'
    },
    {
      id: '2',
      name: '连胜之星',
      description: '连续10笔交易盈利',
      emoji: '⭐',
      unlocked: true,
      progress: 10,
      total: 10,
      rarity: 'rare'
    },
    {
      id: '3',
      name: '多链大师',
      description: '在5条链上完成交易',
      emoji: '🌐',
      unlocked: true,
      rarity: 'epic'
    },
    {
      id: '4',
      name: '对冲专家',
      description: '使用智能对冲策略获利',
      emoji: '⚖️',
      unlocked: false,
      progress: 12,
      total: 20,
      rarity: 'rare'
    },
    {
      id: '5',
      name: '百万富翁',
      description: '总收益达到$100万',
      emoji: '💰',
      unlocked: false,
      progress: 247,
      total: 1000,
      rarity: 'legendary'
    },
    {
      id: '6',
      name: '社交达人',
      description: '邀请10位好友加入',
      emoji: '👥',
      unlocked: false,
      progress: 3,
      total: 10,
      rarity: 'epic'
    },
    {
      id: '7',
      name: '竞技之王',
      description: '登上排行榜第一',
      emoji: '👑',
      unlocked: false,
      rarity: 'legendary'
    },
    {
      id: '8',
      name: '团队领袖',
      description: '创建并管理团队获胜',
      emoji: '🎖️',
      unlocked: false,
      rarity: 'epic'
    }
  ];

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;
  const completionPercent = (unlockedCount / totalCount) * 100;

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="h-5 w-5 text-bifrost-pink" />
          <h3 className="text-xl font-bold text-white">成就墙</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-white">
            {unlockedCount}/{totalCount}
          </p>
          <p className="text-xs text-text-secondary">已解锁</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-text-secondary">完成度</span>
          <span className="font-semibold text-bifrost-pink">{completionPercent.toFixed(0)}%</span>
        </div>
        <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full bg-gradient-to-r from-bifrost-pink to-purple-500"
            initial={{ width: 0 }}
            animate={{ width: `${completionPercent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Achievement Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {achievements.map((achievement, index) => {
          const config = rarityConfig[achievement.rarity];
          const hasProgress = achievement.progress !== undefined && achievement.total !== undefined;
          const progressPercent = hasProgress
            ? ((achievement.progress || 0) / (achievement.total || 1)) * 100
            : 0;

          return (
            <motion.div
              key={achievement.id}
              className="group relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
            >
              <motion.div
                className={`relative overflow-hidden rounded-2xl border ${
                  achievement.unlocked
                    ? `border-white/20 bg-gradient-to-br ${config.gradient} ${config.glow} shadow-lg`
                    : 'border-white/10 bg-white/5 grayscale'
                } p-4 transition-all`}
                whileHover={{ scale: achievement.unlocked ? 1.05 : 1 }}
              >
                {/* Glow Effect for Unlocked */}
                {achievement.unlocked && (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100`}
                    transition={{ duration: 0.3 }}
                  />
                )}

                {/* Lock Icon for Locked */}
                {!achievement.unlocked && (
                  <div className="absolute right-2 top-2">
                    <Lock className="h-4 w-4 text-text-secondary/50" />
                  </div>
                )}

                <div className="relative space-y-2">
                  {/* Emoji */}
                  <div className="text-center text-3xl opacity-100">{achievement.emoji}</div>

                  {/* Name */}
                  <p
                    className={`text-center text-sm font-bold ${achievement.unlocked ? 'text-white' : 'text-text-secondary/50'}`}
                  >
                    {achievement.name}
                  </p>

                  {/* Rarity */}
                  <p className={`text-center text-xs ${achievement.unlocked ? config.text : 'text-text-secondary/30'}`}>
                    {config.name}
                  </p>

                  {/* Progress (if applicable and not unlocked) */}
                  {!achievement.unlocked && hasProgress && (
                    <div className="space-y-1">
                      <div className="h-1 overflow-hidden rounded-full bg-white/10">
                        <motion.div
                          className="h-full bg-white/30"
                          initial={{ width: 0 }}
                          animate={{ width: `${progressPercent}%` }}
                          transition={{ duration: 0.8 }}
                        />
                      </div>
                      <p className="text-center text-[10px] text-text-secondary/50">
                        {achievement.progress}/{achievement.total}
                      </p>
                    </div>
                  )}
                </div>

                {/* Tooltip on Hover */}
                <div className="pointer-events-none absolute bottom-full left-1/2 mb-2 w-48 -translate-x-1/2 rounded-lg bg-black/90 px-3 py-2 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <p className="font-semibold">{achievement.name}</p>
                  <p className="mt-1 text-text-secondary">{achievement.description}</p>
                  <div className="absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-black/90" />
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.a
        href="/achievements"
        className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        whileHover={{ scale: 1.02 }}
      >
        <Award className="h-4 w-4" />
        查看所有成就
      </motion.a>
    </div>
  );
}
