"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ChevronDown } from 'lucide-react';
import clsx from 'clsx';
import { formatCurrency, formatPercent } from '@/utils/format';

interface LeaderboardEntry {
  rank: number;
  username: string;
  gainUsd: number;
  winRate: number;
  strategy: string;
  chainMix: string[];
  isYou?: boolean;
}

const rankGradient: Record<number, string> = {
  1: 'bg-rank-gold text-black',
  2: 'bg-rank-silver text-black',
  3: 'bg-rank-bronze text-black'
};

const strategyOptions = ['全部', '激进多链', 'vDOT 狂杀', '稳健配置', '自动复投', '长期持有'];

export function FullLeaderboardTable({ entries }: { entries: LeaderboardEntry[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStrategy, setSelectedStrategy] = useState('全部');
  const [showFilters, setShowFilters] = useState(false);

  // Filter logic
  const filteredEntries = entries.filter(entry => {
    const matchesSearch = entry.username.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStrategy = selectedStrategy === '全部' || entry.strategy === selectedStrategy;
    return matchesSearch && matchesStrategy;
  });

  return (
    <div className="space-y-6">
      {/* Search and Filter Bar */}
      <div className="glass-panel rounded-2xl border border-white/10 p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          {/* Search */}
          <div className="relative flex-1 lg:max-w-md">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-text-secondary" />
            <input
              type="text"
              placeholder="搜索用户名..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-full border border-white/10 bg-white/5 py-2 pl-10 pr-4 text-sm text-white placeholder-text-secondary focus:border-bifrost-pink focus:outline-none focus:ring-2 focus:ring-bifrost-pink/20"
            />
          </div>

          {/* Filter Toggle */}
          <motion.button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <Filter className="h-4 w-4" />
            筛选
            <motion.div
              animate={{ rotate: showFilters ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown className="h-4 w-4" />
            </motion.div>
          </motion.button>
        </div>

        {/* Filter Options */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="mt-4 space-y-3 border-t border-white/10 pt-4">
                <p className="text-sm font-semibold text-white">策略类型</p>
                <div className="flex flex-wrap gap-2">
                  {strategyOptions.map((strategy) => (
                    <motion.button
                      key={strategy}
                      onClick={() => setSelectedStrategy(strategy)}
                      className={clsx(
                        'rounded-full border px-4 py-2 text-xs font-semibold transition',
                        selectedStrategy === strategy
                          ? 'border-bifrost-pink bg-white/10 text-white'
                          : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {strategy}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results Count */}
      <div className="flex items-center justify-between px-2">
        <p className="text-sm text-text-secondary">
          显示 {filteredEntries.length} / {entries.length} 位玩家
        </p>
        {(searchTerm || selectedStrategy !== '全部') && (
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedStrategy('全部');
            }}
            className="text-xs text-bifrost-pink hover:underline"
          >
            清除筛选
          </button>
        )}
      </div>

      {/* Table */}
      <div className="glass-panel overflow-hidden rounded-2xl border border-white/10">
        {/* Header */}
        <div className="hidden grid-cols-[60px,1.5fr,1fr,1fr,1fr,80px] items-center gap-4 border-b border-white/10 bg-white/5 px-6 py-3 text-xs font-semibold uppercase tracking-wide text-text-secondary md:grid">
          <span>排名</span>
          <span>用户</span>
          <span>收益</span>
          <span>胜率</span>
          <span>策略</span>
          <span>操作</span>
        </div>

        {/* Body */}
        <div className="divide-y divide-white/5">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry, index) => (
              <motion.div
                key={entry.rank}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.03 }}
                className={clsx(
                  'grid items-center gap-4 px-4 py-4 text-sm transition hover:bg-white/5 md:grid-cols-[60px,1.5fr,1fr,1fr,1fr,80px]',
                  entry.isYou && 'border-l-4 border-bifrost-pink bg-white/10 md:border-l-0'
                )}
              >
                {/* Rank */}
                <div className="flex items-center gap-3 md:justify-center">
                  <span
                    className={clsx(
                      'flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold',
                      rankGradient[entry.rank] ?? 'bg-white/10 text-white'
                    )}
                  >
                    {entry.rank}
                  </span>
                  <div className="flex flex-col md:hidden">
                    <span className="font-medium text-white">{entry.username}</span>
                    <span className="text-xs text-text-secondary">
                      {formatCurrency(entry.gainUsd)} · {formatPercent(entry.winRate)}
                    </span>
                  </div>
                </div>

                {/* User */}
                <div className="hidden md:block">
                  <p className="font-medium text-white">{entry.username}</p>
                  {entry.isYou && (
                    <p className="text-xs text-bifrost-pink">（你）</p>
                  )}
                </div>

                {/* Gain */}
                <div className="hidden text-success md:block">
                  {formatCurrency(entry.gainUsd)}
                </div>

                {/* Win Rate */}
                <div className="hidden text-text-secondary md:block">
                  {formatPercent(entry.winRate)}
                </div>

                {/* Strategy */}
                <div className="flex flex-wrap gap-2 text-xs">
                  <span className="text-text-secondary">{entry.strategy}</span>
                </div>

                {/* Action */}
                <motion.a
                  href={`/profile/${entry.username}`}
                  className="rounded-full border border-white/10 px-3 py-1 text-center text-xs text-text-secondary hover:border-white/20 hover:text-white"
                  whileHover={{ scale: 1.05 }}
                >
                  查看
                </motion.a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* No Results */}
        {filteredEntries.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-text-secondary">没有找到匹配的玩家</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedStrategy('全部');
              }}
              className="mt-4 text-sm text-bifrost-pink hover:underline"
            >
              清除筛选条件
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
