"use client";

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { fetchAchievements, type Achievement } from '@/data/mock';

const statusTone: Record<Achievement['status'], string> = {
  'in-progress': 'text-warning',
  unlocked: 'text-success',
  locked: 'text-text-disabled'
};

export function AchievementsSection() {
  const { data, isLoading } = useQuery({
    queryKey: ['achievements'],
    queryFn: fetchAchievements,
    staleTime: 1000 * 60 * 5
  });

  const achievements = data ?? Array.from({ length: 4 });

  return (
    <section className="glass-panel flex h-full flex-col rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">成就勋章</h2>
          <p className="text-sm text-text-secondary">
            完成任务即可解锁徽章，提升段位，收获社交炫耀资本。
          </p>
        </div>
        <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary hover:border-white/20 hover:text-white">
          查阅全部成就
        </button>
      </div>
      <div className="flex-1 space-y-4 overflow-auto pr-1">
        {achievements.map((item, index) => (
          <motion.div
            key={item && 'id' in item ? item.id : index}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className="rounded-2xl border border-white/5 bg-white/5 px-4 py-4 text-sm text-text-secondary"
          >
            {item && 'id' in item ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-white">{item.title}</h3>
                    <p className="text-xs text-text-secondary">{item.description}</p>
                  </div>
                  <span className={clsx('text-xs font-semibold', statusTone[item.status])}>
                    {statusLabel(item.status)}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/5">
                  <div
                    className={clsx(
                      'h-2 rounded-full transition-all',
                      item.status === 'unlocked' ? 'bg-success' : 'bg-warning'
                    )}
                    style={{ width: `${Math.min(100, (item.progress / item.target) * 100)}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>
                    进度 {item.progress}/{item.target}
                  </span>
                  <span className="text-text-secondary">奖励: {item.reward}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="h-4 w-28 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-48 animate-pulse rounded-full bg-white/10" />
                <div className="h-2 w-full animate-pulse rounded-full bg-white/10" />
              </div>
            )}
          </motion.div>
        ))}
        {isLoading && achievements.length === 0 && (
          <p className="text-center text-xs text-text-secondary">加载成就数据中...</p>
        )}
      </div>
    </section>
  );
}

function statusLabel(status: Achievement['status']) {
  switch (status) {
    case 'unlocked':
      return '已解锁';
    case 'in-progress':
      return '进行中';
    default:
      return '待解锁';
  }
}
