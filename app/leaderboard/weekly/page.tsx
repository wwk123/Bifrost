'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Trophy, Crown, Medal, TrendingUp, Award, Zap, Calendar, Users } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { fetchLeaderboard, type LeaderboardEntry } from '@/data/mock';
import { formatCurrency, formatPercent } from '@/utils/format';

const rankGradients = {
  1: 'from-yellow-400 via-yellow-300 to-yellow-500',
  2: 'from-gray-300 via-gray-200 to-gray-400',
  3: 'from-amber-600 via-amber-500 to-amber-700'
};

const rankIcons = {
  1: <Crown className="h-8 w-8 text-yellow-400" />,
  2: <Medal className="h-7 w-7 text-gray-300" />,
  3: <Medal className="h-6 w-6 text-amber-600" />
};

export default function WeeklyLeaderboardPage() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'strategy' | 'trading' | 'social'>('all');

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', 'week'],
    queryFn: () => fetchLeaderboard('week'),
    staleTime: 1000 * 60 * 2
  });

  const entries = data ?? [];
  const topThree = entries.slice(0, 3);
  const restOfTop10 = entries.slice(3, 10);
  const youEntry = entries.find((e) => e.isYou);

  const categories = [
    { id: 'all', label: '综合榜', icon: Trophy },
    { id: 'strategy', label: '策略榜', icon: Zap },
    { id: 'trading', label: '交易榜', icon: TrendingUp },
    { id: 'social', label: '社交榜', icon: Users }
  ];

  const weekRewards = [
    { rank: '1st', reward: '5,000 BNC + 周冠徽章 + 专属头衔', color: 'text-yellow-400' },
    { rank: '2nd', reward: '3,000 BNC + 亚军徽章', color: 'text-gray-300' },
    { rank: '3rd', reward: '2,000 BNC + 季军徽章', color: 'text-amber-600' },
    { rank: '4-10', reward: '500 BNC', color: 'text-info' },
    { rank: '11-50', reward: '200 BNC', color: 'text-success' }
  ];

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-warning/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-warning/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-bifrost-pink/15 blur-3xl" />

        <div className="relative">
          <Link
            href="/leaderboard"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回排行榜
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-warning/30 to-bifrost-pink/30">
              <Trophy className="h-10 w-10 text-warning" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">周榜排行</h1>
              <p className="text-lg text-text-secondary">
                Weekly Leaderboard · 本周收益竞技场
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">参赛人数</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">{entries.length.toLocaleString()}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">奖池总额</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">25,000 BNC</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">平均收益</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">+12.4%</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-bifrost-pink" />
                <span className="text-sm text-text-secondary">结算时间</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-bifrost-pink">3天后</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`inline-flex items-center gap-2 rounded-full border px-6 py-2.5 text-sm font-semibold transition-all ${
                selectedCategory === cat.id
                  ? 'border-warning/50 bg-warning/20 text-white'
                  : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
              }`}
            >
              <Icon className="h-4 w-4" />
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Top 3 Podium */}
      <div className="glass-panel rounded-3xl border border-white/5 p-8">
        <h2 className="mb-6 text-2xl font-bold text-white">本周荣耀榜</h2>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 2nd Place */}
          {topThree[1] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex flex-col items-center">
                <div className={`mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br ${rankGradients[2]}`}>
                  <span className="text-2xl font-bold text-black">2</span>
                </div>
                {rankIcons[2]}
              </div>
              <div className="w-full rounded-2xl border border-gray-300/30 bg-gradient-to-br from-gray-300/10 to-gray-400/10 p-6 text-center">
                <h3 className="mb-1 text-xl font-bold text-white">{topThree[1].username}</h3>
                <p className="mb-4 text-sm text-text-secondary">{topThree[1].strategy}</p>
                <div className="mb-2 text-3xl font-bold text-success">{formatCurrency(topThree[1].gainUsd)}</div>
                <div className="text-sm text-text-secondary">胜率 {formatPercent(topThree[1].winRate)}</div>
                <div className="mt-4 rounded-full border border-gray-300/30 bg-gray-300/10 px-4 py-2 text-sm font-semibold text-gray-300">
                  3,000 BNC + 亚军徽章
                </div>
              </div>
            </motion.div>
          )}

          {/* 1st Place */}
          {topThree[0] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col items-center md:-mt-8"
            >
              <div className="mb-4 flex flex-col items-center">
                <div className={`mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${rankGradients[1]} shadow-[0_0_30px_rgba(251,191,36,0.5)]`}>
                  <span className="text-3xl font-bold text-black">1</span>
                </div>
                {rankIcons[1]}
              </div>
              <div className="w-full rounded-2xl border border-yellow-400/50 bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 p-6 text-center shadow-[0_0_20px_rgba(251,191,36,0.2)]">
                <h3 className="mb-1 text-2xl font-bold text-white">{topThree[0].username}</h3>
                <p className="mb-4 text-sm text-text-secondary">{topThree[0].strategy}</p>
                <div className="mb-2 text-4xl font-bold text-success">{formatCurrency(topThree[0].gainUsd)}</div>
                <div className="text-sm text-text-secondary">胜率 {formatPercent(topThree[0].winRate)}</div>
                <div className="mt-4 rounded-full border border-yellow-400/50 bg-yellow-400/20 px-4 py-2 text-sm font-semibold text-yellow-400">
                  👑 5,000 BNC + 周冠徽章
                </div>
              </div>
            </motion.div>
          )}

          {/* 3rd Place */}
          {topThree[2] && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center"
            >
              <div className="mb-4 flex flex-col items-center">
                <div className={`mb-2 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${rankGradients[3]}`}>
                  <span className="text-xl font-bold text-black">3</span>
                </div>
                {rankIcons[3]}
              </div>
              <div className="w-full rounded-2xl border border-amber-600/30 bg-gradient-to-br from-amber-600/10 to-amber-700/10 p-6 text-center">
                <h3 className="mb-1 text-xl font-bold text-white">{topThree[2].username}</h3>
                <p className="mb-4 text-sm text-text-secondary">{topThree[2].strategy}</p>
                <div className="mb-2 text-3xl font-bold text-success">{formatCurrency(topThree[2].gainUsd)}</div>
                <div className="text-sm text-text-secondary">胜率 {formatPercent(topThree[2].winRate)}</div>
                <div className="mt-4 rounded-full border border-amber-600/30 bg-amber-600/10 px-4 py-2 text-sm font-semibold text-amber-600">
                  2,000 BNC + 季军徽章
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Rest of Top 10 */}
      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">Top 4-10</h2>

        <div className="space-y-3">
          {restOfTop10.map((entry, index) => (
            <motion.div
              key={entry.rank}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={clsx(
                'rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20 hover:bg-white/10',
                entry.isYou && 'border-bifrost-pink/50 bg-bifrost-pink/10'
              )}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-lg font-bold text-white">
                    {entry.rank}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{entry.username}</h3>
                    <p className="text-sm text-text-secondary">{entry.strategy}</p>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="text-lg font-bold text-success">{formatCurrency(entry.gainUsd)}</div>
                    <div className="text-xs text-text-secondary">胜率 {formatPercent(entry.winRate)}</div>
                  </div>
                  <div className="rounded-full border border-info/30 bg-info/10 px-4 py-1.5 text-sm font-semibold text-info">
                    500 BNC
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Your Position */}
      {youEntry && (
        <div className="glass-panel rounded-3xl border border-bifrost-pink/30 bg-bifrost-pink/5 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="mb-1 text-xl font-bold text-white">你的排名</h3>
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-bifrost-pink">#{youEntry.rank}</span>
                <div>
                  <div className="text-lg font-semibold text-success">{formatCurrency(youEntry.gainUsd)}</div>
                  <div className="text-sm text-text-secondary">胜率 {formatPercent(youEntry.winRate)}</div>
                </div>
              </div>
            </div>
            <button className="rounded-full bg-bifrost-primary px-6 py-3 font-semibold text-white shadow-[0_8px_16px_rgba(230,0,122,0.3)] transition-all hover:scale-105">
              优化策略
            </button>
          </div>
        </div>
      )}

      {/* Rewards Table */}
      <div className="glass-panel rounded-3xl border border-white/5 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">本周奖励规则</h2>

        <div className="space-y-3">
          {weekRewards.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-6 py-4"
            >
              <span className={`text-lg font-bold ${item.color}`}>{item.rank}</span>
              <span className="text-white">{item.reward}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
