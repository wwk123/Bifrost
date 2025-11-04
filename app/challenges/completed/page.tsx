'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Award, Trophy, Star, Calendar, Gift, CheckCircle2, Download } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';

// Force dynamic rendering to avoid SSR window errors
export const dynamic = 'force-dynamic';

interface CompletedChallenge {
  id: string;
  title: string;
  completedDate: string;
  reward: string;
  category: '收益挑战' | '交易挑战' | '社交挑战' | '每日任务';
  difficulty: '简单' | '中等' | '困难' | '史诗';
  claimed: boolean;
  achievement?: string;
  rank?: number;
  totalParticipants?: number;
}

// 模拟已完成的挑战数据
const mockCompletedChallenges: CompletedChallenge[] = [
  {
    id: 'completed-1',
    title: '首次质押大师',
    completedDate: '2024-01-10',
    reward: '500 BNC',
    category: '收益挑战',
    difficulty: '简单',
    claimed: true,
    achievement: '🎖️ 质押新手',
    rank: 123,
    totalParticipants: 5678
  },
  {
    id: 'completed-2',
    title: '流动性巨鲸',
    completedDate: '2024-01-08',
    reward: '2000 BNC + LP徽章',
    category: '交易挑战',
    difficulty: '史诗',
    claimed: false,
    achievement: '🐋 流动性巨鲸',
    rank: 5,
    totalParticipants: 234
  },
  {
    id: 'completed-3',
    title: '社区布道者',
    completedDate: '2024-01-05',
    reward: '1500 BNC',
    category: '社交挑战',
    difficulty: '困难',
    claimed: true,
    achievement: '📣 推广大使',
    rank: 42,
    totalParticipants: 890
  },
  {
    id: 'completed-4',
    title: '7日签到',
    completedDate: '2024-01-03',
    reward: '100 BNC',
    category: '每日任务',
    difficulty: '简单',
    claimed: true,
    rank: 1234,
    totalParticipants: 3456
  },
  {
    id: 'completed-5',
    title: '策略创作者',
    completedDate: '2023-12-28',
    reward: '800 BNC + 创作者徽章',
    category: '收益挑战',
    difficulty: '中等',
    claimed: true,
    achievement: '✨ 策略大师',
    rank: 67,
    totalParticipants: 456
  },
  {
    id: 'completed-6',
    title: '月度交易王',
    completedDate: '2023-12-20',
    reward: '3000 BNC + 月冠徽章',
    category: '交易挑战',
    difficulty: '史诗',
    claimed: false,
    achievement: '👑 交易之王',
    rank: 1,
    totalParticipants: 1234
  },
];

const categoryColors = {
  '收益挑战': 'text-success border-success/30 bg-success/10',
  '交易挑战': 'text-info border-info/30 bg-info/10',
  '社交挑战': 'text-bifrost-pink border-bifrost-pink/30 bg-bifrost-pink/10',
  '每日任务': 'text-warning border-warning/30 bg-warning/10'
};

const difficultyColors = {
  '简单': 'text-success',
  '中等': 'text-info',
  '困难': 'text-warning',
  '史诗': 'text-bifrost-primary'
};

export default function CompletedChallengesPage() {
  const { isConnected } = useWallet();
  const [selectedFilter, setSelectedFilter] = useState<string>('全部');
  const [claimingId, setClaimingId] = useState<string | null>(null);

  const filters = ['全部', '已领取', '待领取', '史诗', '困难'];

  const filteredChallenges = mockCompletedChallenges.filter(challenge => {
    if (selectedFilter === '全部') return true;
    if (selectedFilter === '已领取') return challenge.claimed;
    if (selectedFilter === '待领取') return !challenge.claimed;
    if (selectedFilter === '史诗' || selectedFilter === '困难') {
      return challenge.difficulty === selectedFilter;
    }
    return true;
  });

  const stats = {
    total: mockCompletedChallenges.length,
    claimed: mockCompletedChallenges.filter(c => c.claimed).length,
    unclaimed: mockCompletedChallenges.filter(c => !c.claimed).length,
    totalRewards: mockCompletedChallenges
      .filter(c => c.claimed)
      .reduce((sum, c) => {
        const match = c.reward.match(/(\d+)\s*BNC/);
        return sum + (match ? parseInt(match[1]) : 0);
      }, 0)
  };

  const handleClaimReward = async (challenge: CompletedChallenge) => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能领取奖励');
      return;
    }

    setClaimingId(challenge.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      toast.success('奖励领取成功!', `${challenge.reward} 已发放到你的钱包`);

      // 更新状态
      challenge.claimed = true;
    } catch (error) {
      toast.error('领取失败', '请稍后重试');
    } finally {
      setClaimingId(null);
    }
  };

  const handleExportHistory = () => {
    toast.info('导出历史', '正在生成挑战完成记录...');
    // 实现导出功能
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-success/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-success/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-info/15 blur-3xl" />

        <div className="relative">
          <Link
            href="/challenges"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回挑战塔
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-success/30 to-info/30">
              <Trophy className="h-10 w-10 text-success" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">已完成的挑战</h1>
              <p className="text-lg text-text-secondary">
                Completed Challenges · 查看你的荣誉记录
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">总完成</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">{stats.total}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">已领取</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">{stats.claimed}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Gift className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">待领取</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">{stats.unclaimed}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-bifrost-primary" />
                <span className="text-sm text-text-secondary">累计奖励</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-bifrost-primary">
                {stats.totalRewards.toLocaleString()} BNC
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all ${
                selectedFilter === filter
                  ? 'border-success/50 bg-success/20 text-white'
                  : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        <button
          onClick={handleExportHistory}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2 text-sm font-semibold text-text-secondary transition-colors hover:border-white/20 hover:text-white"
        >
          <Download className="h-4 w-4" />
          导出记录
        </button>
      </div>

      {/* Challenges List */}
      <div className="grid gap-6">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={clsx(
              'glass-panel rounded-3xl border p-6',
              challenge.claimed ? 'border-white/5' : 'border-warning/20 shadow-[0_0_20px_rgba(251,191,36,0.1)]'
            )}
          >
            <div className="flex flex-col gap-4">
              {/* Header */}
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div className="flex-1">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className={`rounded-full border px-3 py-1 text-xs font-medium ${categoryColors[challenge.category]}`}>
                      {challenge.category}
                    </span>
                    <span className={`text-xs font-semibold ${difficultyColors[challenge.difficulty]}`}>
                      ★ {challenge.difficulty}
                    </span>
                    {challenge.claimed ? (
                      <span className="rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-medium text-success">
                        ✓ 已领取
                      </span>
                    ) : (
                      <span className="animate-pulse rounded-full border border-warning/30 bg-warning/10 px-3 py-1 text-xs font-medium text-warning">
                        🎁 待领取
                      </span>
                    )}
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-white">{challenge.title}</h3>
                  {challenge.achievement && (
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Award className="h-4 w-4" />
                      <span>解锁成就: {challenge.achievement}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className={clsx(
                    'rounded-xl border px-4 py-2',
                    challenge.claimed
                      ? 'border-success/30 bg-success/10'
                      : 'border-warning/30 bg-warning/10'
                  )}>
                    <div className="text-xs text-text-secondary">奖励</div>
                    <div className={clsx(
                      'text-sm font-bold',
                      challenge.claimed ? 'text-success' : 'text-warning'
                    )}>
                      {challenge.reward}
                    </div>
                  </div>
                </div>
              </div>

              {/* Rank Info */}
              {challenge.rank && challenge.totalParticipants && (
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-warning/30 to-error/30">
                        {challenge.rank <= 3 ? (
                          <Trophy className="h-6 w-6 text-warning" />
                        ) : (
                          <Star className="h-6 w-6 text-info" />
                        )}
                      </div>
                      <div>
                        <div className="text-sm text-text-secondary">完成排名</div>
                        <div className="text-xl font-bold text-white">
                          #{challenge.rank}
                          <span className="ml-2 text-sm font-normal text-text-secondary">
                            / {challenge.totalParticipants.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-text-secondary">击败</div>
                      <div className="text-lg font-bold text-success">
                        {Math.round((1 - challenge.rank / challenge.totalParticipants) * 100)}%
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-2 text-sm text-text-secondary">
                  <Calendar className="h-4 w-4" />
                  <span>完成于 {challenge.completedDate}</span>
                </div>

                {!challenge.claimed && (
                  <button
                    onClick={() => handleClaimReward(challenge)}
                    disabled={claimingId === challenge.id}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-warning to-error px-6 py-2.5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(251,191,36,0.3)] transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {claimingId === challenge.id ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        领取中...
                      </>
                    ) : (
                      <>
                        <Gift className="h-4 w-4" />
                        领取奖励
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="glass-panel rounded-3xl border border-white/5 p-12 text-center">
          <div className="mb-4 text-6xl">🏆</div>
          <h3 className="mb-2 text-xl font-bold text-white">暂无符合条件的挑战</h3>
          <p className="text-text-secondary">切换筛选条件查看其他已完成的挑战</p>
        </div>
      )}

      {/* Achievement Showcase */}
      <div className="glass-panel rounded-3xl border border-bifrost-primary/20 p-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">成就展示墙</h2>
            <p className="text-sm text-text-secondary">展示你获得的所有成就徽章</p>
          </div>
          <Link
            href="/arena"
            className="text-sm font-semibold text-bifrost-primary transition-colors hover:text-bifrost-pink"
          >
            查看全部成就 →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {mockCompletedChallenges
            .filter(c => c.achievement)
            .map((challenge) => (
              <motion.div
                key={challenge.id}
                whileHover={{ scale: 1.05 }}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 transition-all hover:border-white/20"
              >
                <div className="text-4xl">{challenge.achievement?.split(' ')[0]}</div>
                <div className="text-center text-xs text-text-secondary">
                  {challenge.achievement?.substring(challenge.achievement.indexOf(' ') + 1)}
                </div>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
