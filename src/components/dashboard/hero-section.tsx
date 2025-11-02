"use client";

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { fetchRankProgress } from '@/data/mock';
import { toast } from '@/state/use-toast-store';

export function HeroSection() {
  const { data: rank, isLoading } = useQuery({
    queryKey: ['rank-progress'],
    queryFn: fetchRankProgress,
    staleTime: 1000 * 60 * 5
  });

  const handleJoinCompetition = () => {
    const challengesSection = document.getElementById('challenges');
    if (challengesSection) {
      challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      toast.success('欢迎参赛!', '查看下方挑战开始你的竞技之旅');
    } else {
      toast.info('即将开放', '竞赛功能正在准备中...');
    }
  };

  const handleBrowseLeaderboard = () => {
    const leaderboardSection = document.getElementById('leaderboard');
    if (leaderboardSection) {
      leaderboardSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      toast.info('排行榜', '向下滚动查看实时排行榜');
    }
  };

  return (
    <section className="glass-panel relative overflow-hidden rounded-3xl border border-glass px-8 py-10 shadow-glass md:px-12">
      <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-12 rounded-full bg-bifrost-primary opacity-40 blur-3xl" />
      <div className="absolute -bottom-24 left-12 h-48 w-48 rounded-full bg-arena-blue opacity-30 blur-3xl" />
      <div className="relative flex flex-col items-start gap-6">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm font-medium text-text-secondary"
        >
          Bifrost Liquid Staking Arena · Alpha 预览
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
        >
          社交化收益竞赛平台
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-2xl text-lg text-text-secondary"
        >
          将 Bifrost 液态质押收益转化为可比较、可分享的竞技体验，通过排行榜、成就与策略共创，激发用户持续参与。
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4"
        >
          <button
            onClick={handleJoinCompetition}
            className="rounded-full bg-bifrost-primary px-6 py-3 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(230,0,122,0.35)] transition hover:opacity-90"
          >
            立即参加竞赛
          </button>
          <button
            onClick={handleBrowseLeaderboard}
            className="rounded-full border border-white/10 px-6 py-3 text-sm font-semibold text-text-secondary transition hover:border-white/20 hover:text-white"
          >
            浏览实时榜单
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="glass-panel mt-4 w-full max-w-xl rounded-2xl border border-white/10 bg-white/5 px-6 py-4 text-sm text-white"
        >
          {isLoading || !rank ? (
            <div className="flex flex-col gap-3">
              <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
              <div className="h-2 w-full animate-pulse rounded-full bg-white/10" />
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-text-secondary">
                  当前段位 · {rank.currentTier}
                </span>
                <span className="rounded-full bg-success/20 px-3 py-1 text-xs text-success">
                  连胜 {rank.streakDays} 天
                </span>
                <span className="rounded-full bg-info/20 px-3 py-1 text-xs text-info">
                  收益加成 ×{rank.bonusMultiplier.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-text-secondary">
                <span>总积分 {rank.currentPoints}</span>
                <span>
                  距离 {rank.nextTier} 还差 {rank.nextTierPoints - rank.currentPoints} 分
                </span>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-bifrost-primary transition-all"
                  style={{
                    width: `${Math.min(100, (rank.currentPoints / rank.nextTierPoints) * 100)}%`
                  }}
                />
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}

