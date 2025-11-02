"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { fetchWeeklyChallenges, type WeeklyChallenge } from '@/data/mock';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';

export function ChallengesSection() {
  const { isConnected } = useWallet();
  const [pushingChallengeId, setPushingChallengeId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['weekly-challenges'],
    queryFn: fetchWeeklyChallenges,
    staleTime: 1000 * 60 * 10
  });

  const challenges = data ?? Array.from({ length: 3 });

  const handlePushChallenge = async (challenge: WeeklyChallenge) => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能参与挑战');
      return;
    }

    setPushingChallengeId(challenge.id);

    try {
      // 模拟推进挑战
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('挑战推进成功!', `继续完成「${challenge.title}」获取奖励`);

      // 可以触发重新查询更新进度
    } catch (error) {
      toast.error('操作失败', '请稍后重试');
      console.error('Challenge push error:', error);
    } finally {
      setPushingChallengeId(null);
    }
  };

  const handleViewHistory = () => {
    toast.info('挑战历史', '查看你过去完成的所有挑战');
    // 未来可以打开历史模态框或跳转到历史页面
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">本周挑战</h2>
          <p className="text-sm text-text-secondary">
            完成链上挑战，获取 BNC 奖励与限量徽章。
          </p>
        </div>
        <button
          onClick={handleViewHistory}
          className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary hover:border-white/20 hover:text-white"
        >
          查看挑战历史
        </button>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <motion.div
            key={challenge && 'id' in challenge ? challenge.id : index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.04 }}
            className="rounded-2xl border border-white/5 bg-white/5 px-5 py-4 text-sm text-text-secondary"
          >
            {challenge && 'id' in challenge ? (
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-base font-semibold text-white">{challenge.title}</h3>
                    <p className="text-xs text-text-secondary">{challenge.requirement}</p>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-text-secondary">
                    <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-warning">
                      奖励: {challenge.reward}
                    </span>
                    <span>{challenge.deadline}</span>
                  </div>
                </div>
                <ProgressBar current={challenge.progress} target={challenge.target} />
                <div className="flex items-center justify-between text-xs">
                  <span>
                    已完成 {challenge.progress}/{challenge.target}
                  </span>
                  <button
                    onClick={() => handlePushChallenge(challenge)}
                    disabled={pushingChallengeId === challenge.id}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary transition hover:border-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {pushingChallengeId === challenge.id ? '推进中...' : '立即推进'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="h-4 w-36 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-52 animate-pulse rounded-full bg-white/10" />
                <div className="h-2 w-full animate-pulse rounded-full bg-white/10" />
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProgressBar({ current, target }: { current: number; target: number }) {
  const percent = Math.min(100, (current / target) * 100);

  return (
    <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
      <div
        className={clsx(
          'h-full rounded-full transition-all',
          percent >= 100 ? 'bg-success' : 'bg-warning'
        )}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
