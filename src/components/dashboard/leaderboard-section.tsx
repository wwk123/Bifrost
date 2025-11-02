"use client";

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';

import {
  fetchLeaderboard,
  type LeaderboardEntry,
  type Timeframe
} from '@/data/mock';
import { useDashboardStore } from '@/state/use-dashboard-store';
import { formatCurrency, formatPercent } from '@/utils/format';

const timeframeOptions: { label: string; value: Timeframe }[] = [
  { label: '本周', value: 'week' },
  { label: '本月', value: 'month' },
  { label: '本季度', value: 'quarter' }
];

const rankGradient: Record<number, string> = {
  1: 'bg-rank-gold text-black',
  2: 'bg-rank-silver text-black',
  3: 'bg-rank-bronze text-black'
};

const fallbackGradient = 'bg-white/10 text-white';

export function LeaderboardSection() {
  const timeframe = useDashboardStore((state) => state.timeframe);
  const setTimeframe = useDashboardStore((state) => state.setTimeframe);

  const { data, isLoading } = useQuery({
    queryKey: ['leaderboard', timeframe],
    queryFn: () => fetchLeaderboard(timeframe),
    placeholderData: (previousData) => previousData
  });

  const entries = data ?? [];
  const topEntries = isLoading ? Array.from({ length: 5 }) : entries.filter((item) => item.rank <= 5);
  const youEntry = entries.find((item) => item.isYou);

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-4 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">收益排行榜</h2>
          <p className="text-sm text-text-secondary">
            根据实时收益表现更新，完成挑战可获得额外加成。
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {timeframeOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setTimeframe(option.value)}
              className={clsx(
                'rounded-full border px-4 py-2 text-xs font-semibold transition',
                timeframe === option.value
                  ? 'border-bifrost-pink bg-white/10 text-white'
                  : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="grid gap-4 lg:grid-cols-5">
          <AnimatePresence>
            {topEntries.map((entry, index) => {
              const hasEntry = entry && typeof entry === 'object' && 'rank' in entry;

              return (
                <motion.div
                  key={hasEntry ? (entry as LeaderboardEntry).rank : `skeleton-${index}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, delay: index * 0.04 }}
                  className="glass-panel flex flex-col justify-between rounded-2xl border border-white/5 px-4 py-5 text-sm shadow-card"
                >
                  {hasEntry ? (
                    <>
                      <div className="flex items-center gap-3">
                        <span
                          className={clsx(
                            'flex h-10 w-10 items-center justify-between rounded-full text-base font-bold',
                            rankGradient[(entry as LeaderboardEntry).rank] ?? fallbackGradient
                          )}
                        >
                          {(entry as LeaderboardEntry).rank}
                        </span>
                        <div>
                          <p className="text-white">{(entry as LeaderboardEntry).username}</p>
                          <p className="text-xs text-text-secondary">
                            {(entry as LeaderboardEntry).strategy}
                          </p>
                        </div>
                      </div>
                      <div className="mt-6 flex flex-col gap-2">
                        <p className="text-lg font-semibold text-white">
                          {formatCurrency((entry as LeaderboardEntry).gainUsd)}
                        </p>
                        <p className="text-xs text-text-secondary">
                          胜率 {formatPercent((entry as LeaderboardEntry).winRate)}
                        </p>
                        <div className="flex flex-wrap gap-2 text-[11px] text-text-secondary">
                          {(entry as LeaderboardEntry).chainMix.map((chain) => (
                            <span
                              key={chain}
                              className="rounded-full border border-white/10 px-2 py-0.5 text-[11px]"
                            >
                              {chain}
                            </span>
                          ))}
                        </div>
                      </div>
                      <button className="mt-6 rounded-full border border-white/10 px-3 py-2 text-xs text-text-secondary transition hover:border-white/20 hover:text-white">
                        学习策略
                      </button>
                    </>
                  ) : (
                  <div className="flex flex-col gap-4">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                    <div className="h-4 w-24 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-16 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-28 animate-pulse rounded-full bg-white/10" />
                    <div className="h-8 w-full animate-pulse rounded-full bg-white/10" />
                  </div>
                )}
              </motion.div>
            );
          })}
          </AnimatePresence>
        </div>

        <div className="rounded-2xl border border-white/5 bg-white/5">
          <div className="hidden grid-cols-[auto,1fr,1fr,1fr,auto] items-center gap-4 px-6 py-3 text-xs uppercase tracking-wide text-text-secondary md:grid">
            <span>排名</span>
            <span>用户</span>
            <span>收益</span>
            <span>胜率</span>
            <span>策略</span>
          </div>
          <div className="divide-y divide-white/5">
            {entries.map((entry, index) => {
              const hasEntry = entry && typeof entry === 'object' && 'rank' in entry;

              return (
                <div
                  key={hasEntry ? (entry as LeaderboardEntry).rank : `list-skeleton-${index}`}
                  className={clsx(
                    'grid items-center gap-4 px-4 py-4 text-sm transition hover:bg-white/5 md:grid-cols-[60px,1.5fr,1fr,1fr,auto]',
                    hasEntry && (entry as LeaderboardEntry).isYou && 'border-l-4 border-bifrost-pink bg-white/10/30 md:border-0'
                  )}
                >
                  {hasEntry ? (
                  <>
                    <div className="flex items-center gap-3">
                      <span
                        className={clsx(
                          'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                          rankGradient[(entry as LeaderboardEntry).rank] ?? 'bg-white/10 text-white'
                        )}
                      >
                        {(entry as LeaderboardEntry).rank}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-medium text-white">{(entry as LeaderboardEntry).username}</span>
                        <span className="text-xs text-text-secondary md:hidden">
                          {formatCurrency((entry as LeaderboardEntry).gainUsd)} · 胜率 {formatPercent((entry as LeaderboardEntry).winRate)}
                        </span>
                      </div>
                    </div>
                    <div className="hidden text-white md:block">{(entry as LeaderboardEntry).username}</div>
                    <div className="hidden text-success md:block">{formatCurrency((entry as LeaderboardEntry).gainUsd)}</div>
                    <div className="hidden text-text-secondary md:block">
                      {formatPercent((entry as LeaderboardEntry).winRate)}
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-text-secondary">
                      {(entry as LeaderboardEntry).strategy}
                    </div>
                    <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary hover:border-white/20 hover:text-white">
                      详情
                    </button>
                  </>
                ) : (
                  <div className="col-span-full flex items-center gap-4">
                    <div className="h-8 w-8 animate-pulse rounded-full bg-white/10" />
                    <div className="h-3 w-32 animate-pulse rounded-full bg-white/10" />
                  </div>
                )}
              </div>
              );
            })}
          </div>
        </div>

        {youEntry && (
          <div className="flex items-center justify-between rounded-2xl border border-bifrost-pink/40 bg-bifrost-pink/10 px-6 py-4 text-sm text-white shadow-card">
            <div>
              <p className="text-base font-semibold">你当前排名第 {youEntry.rank}</p>
              <p className="text-xs text-white/70">
                再获得 {formatCurrency(Math.max(0, 5000 - youEntry.gainUsd))} 即可冲进前 20%
              </p>
            </div>
            <button className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white hover:bg-white/25">
              查看提升建议
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

