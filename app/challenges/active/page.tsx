'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Target, Clock, Award, TrendingUp, Flame, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import { useQuery } from '@tanstack/react-query';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';
import { fetchWeeklyChallenges, type WeeklyChallenge } from '@/data/mock';

interface ActiveChallenge extends WeeklyChallenge {
  startTime: string;
  category: '收益挑战' | '交易挑战' | '社交挑战' | '每日任务';
  difficulty: '简单' | '中等' | '困难' | '史诗';
  participants: number;
}

// 模拟进行中的挑战数据
const mockActiveChallenges: ActiveChallenge[] = [
  {
    id: 'active-1',
    title: '连续7天质押收益挑战',
    requirement: '连续7天保持质押状态',
    reward: '500 BNC + 成就徽章',
    progress: 4,
    target: 7,
    deadline: '3天后',
    startTime: '2024-01-15',
    category: '收益挑战',
    difficulty: '中等',
    participants: 1234
  },
  {
    id: 'active-2',
    title: '高收益策略大师',
    requirement: '使用策略获得15%以上收益',
    reward: '1000 BNC',
    progress: 8,
    target: 15,
    deadline: '5天后',
    startTime: '2024-01-10',
    category: '收益挑战',
    difficulty: '困难',
    participants: 567
  },
  {
    id: 'active-3',
    title: '每日签到达人',
    requirement: '连续签到30天',
    reward: '300 BNC + 签到王徽章',
    progress: 22,
    target: 30,
    deadline: '8天后',
    startTime: '2024-01-01',
    category: '每日任务',
    difficulty: '简单',
    participants: 3456
  },
  {
    id: 'active-4',
    title: '流动性提供者',
    requirement: '为流动性池提供 ≥ 1000 DOT',
    progress: 650,
    target: 1000,
    reward: '2000 BNC + LP徽章',
    deadline: '10天后',
    startTime: '2024-01-12',
    category: '交易挑战',
    difficulty: '史诗',
    participants: 234
  },
  {
    id: 'active-5',
    title: '推荐新手',
    requirement: '成功推荐5位新用户',
    progress: 2,
    target: 5,
    reward: '250 BNC/人',
    deadline: '15天后',
    startTime: '2024-01-08',
    category: '社交挑战',
    difficulty: '中等',
    participants: 890
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

export default function ActiveChallengesPage() {
  const { isConnected } = useWallet();
  const [selectedCategory, setSelectedCategory] = useState<string>('全部');
  const [pushingChallengeId, setPushingChallengeId] = useState<string | null>(null);

  const categories = ['全部', '收益挑战', '交易挑战', '社交挑战', '每日任务'];

  const filteredChallenges = selectedCategory === '全部'
    ? mockActiveChallenges
    : mockActiveChallenges.filter(c => c.category === selectedCategory);

  const handlePushChallenge = async (challenge: ActiveChallenge) => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能推进挑战');
      return;
    }

    setPushingChallengeId(challenge.id);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success('挑战推进成功!', `继续完成「${challenge.title}」获取奖励`);
    } catch (error) {
      toast.error('操作失败', '请稍后重试');
    } finally {
      setPushingChallengeId(null);
    }
  };

  const handleClaimProgress = async (challenge: ActiveChallenge) => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能领取奖励');
      return;
    }

    toast.info('领取阶段奖励', `完成阶段性目标可获得部分奖励`);
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-warning/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-warning/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-error/15 blur-3xl" />

        <div className="relative">
          <Link
            href="/challenges"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回挑战塔
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-warning/30 to-error/30">
              <Target className="h-10 w-10 text-warning" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">进行中的挑战</h1>
              <p className="text-lg text-text-secondary">
                Active Challenges · {filteredChallenges.length} 个挑战进行中
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">总进度</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">
                {Math.round((mockActiveChallenges.reduce((sum, c) => sum + c.progress, 0) / mockActiveChallenges.reduce((sum, c) => sum + c.target, 0)) * 100)}%
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">最近截止</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">3天后</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">可获奖励</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">4,050 BNC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all ${
              selectedCategory === category
                ? 'border-warning/50 bg-warning/20 text-white'
                : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Challenges List */}
      <div className="grid gap-6">
        {filteredChallenges.map((challenge, index) => (
          <motion.div
            key={challenge.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="glass-panel rounded-3xl border border-white/5 p-6"
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
                  </div>
                  <h3 className="mb-1 text-xl font-bold text-white">{challenge.title}</h3>
                  <p className="text-sm text-text-secondary">{challenge.requirement}</p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  <div className="rounded-xl border border-warning/30 bg-warning/10 px-4 py-2">
                    <div className="text-xs text-text-secondary">奖励</div>
                    <div className="text-sm font-bold text-warning">{challenge.reward}</div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-text-secondary">
                    <Clock className="h-3 w-3" />
                    <span>{challenge.deadline}</span>
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-text-secondary">
                    进度: {challenge.progress}/{challenge.target}
                  </span>
                  <span className="font-semibold text-white">
                    {Math.round((challenge.progress / challenge.target) * 100)}%
                  </span>
                </div>
                <ProgressBar current={challenge.progress} target={challenge.target} />
              </div>

              {/* Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-4 text-xs text-text-secondary">
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-3 w-3" />
                    <span>{challenge.participants.toLocaleString()} 人参与</span>
                  </div>
                  <div>开始于 {challenge.startTime}</div>
                </div>

                <div className="flex gap-3">
                  {challenge.progress >= challenge.target * 0.5 && (
                    <button
                      onClick={() => handleClaimProgress(challenge)}
                      className="rounded-full border border-success/30 bg-success/10 px-4 py-2 text-xs font-semibold text-success transition-all hover:bg-success/20"
                    >
                      领取阶段奖励
                    </button>
                  )}
                  <button
                    onClick={() => handlePushChallenge(challenge)}
                    disabled={pushingChallengeId === challenge.id}
                    className="inline-flex items-center gap-2 rounded-full bg-warning px-6 py-2 text-xs font-semibold text-white shadow-[0_8px_16px_rgba(251,191,36,0.3)] transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  >
                    {pushingChallengeId === challenge.id ? '推进中...' : '立即推进'}
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="glass-panel rounded-3xl border border-white/5 p-12 text-center">
          <div className="mb-4 text-6xl">🎯</div>
          <h3 className="mb-2 text-xl font-bold text-white">暂无{selectedCategory}挑战</h3>
          <p className="text-text-secondary">切换分类查看其他挑战</p>
        </div>
      )}

      {/* Tips */}
      <div className="glass-panel rounded-2xl border border-info/20 p-6">
        <div className="flex items-start gap-3">
          <div className="text-2xl">💡</div>
          <div className="space-y-2 text-sm text-text-secondary">
            <p className="font-semibold text-white">挑战提示</p>
            <ul className="list-inside list-disc space-y-1">
              <li>达到50%进度时可以领取部分阶段性奖励</li>
              <li>完成挑战后记得及时领取全部奖励</li>
              <li>某些挑战可以和团队成员一起完成以获得额外加成</li>
              <li>关注截止时间，避免错过奖励</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProgressBar({ current, target }: { current: number; target: number }) {
  const percent = Math.min(100, (current / target) * 100);

  return (
    <div className="relative h-3 w-full overflow-hidden rounded-full bg-white/10">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${percent}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className={clsx(
          'h-full rounded-full transition-all',
          percent >= 100 ? 'bg-success' : percent >= 50 ? 'bg-info' : 'bg-warning'
        )}
      />
      {percent >= 50 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-[10px] font-bold text-white drop-shadow-lg">
            {Math.round(percent)}%
          </span>
        </div>
      )}
    </div>
  );
}
