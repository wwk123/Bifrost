"use client";

import { useState, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { fetchStrategies, type Strategy } from '@/data/mock';
import { useDashboardStore } from '@/state/use-dashboard-store';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';
import { formatCompactNumber, formatPercent } from '@/utils/format';

type StrategyCategory = 'all' | 'featured' | 'high-yield' | 'low-risk' | 'fast-growth';

const toneStyles: Record<Strategy['segments'][number]['tone'], string> = {
  low: 'bg-success/15 text-success border-success/30',
  mid: 'bg-info/15 text-info border-info/30',
  high: 'bg-warning/15 text-warning border-warning/30'
};

interface StrategyHubProps {
  category?: StrategyCategory;
}

export function StrategyHub({ category = 'all' }: StrategyHubProps) {
  const { isConnected } = useWallet();
  const selectedStrategyId = useDashboardStore((state) => state.selectedStrategyId);
  const setSelectedStrategyId = useDashboardStore((state) => state.setSelectedStrategyId);
  const [copyingStrategyId, setCopyingStrategyId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ['strategies'],
    queryFn: fetchStrategies,
    staleTime: 1000 * 60 * 5
  });

  // 根据分类过滤策略
  const filteredStrategies = useMemo(() => {
    if (!data) return [];

    switch (category) {
      case 'featured':
        // 精选推荐：根据点赞数和采用率排序，取前10个
        return [...data]
          .sort((a, b) => (b.likes + b.adoption) - (a.likes + a.adoption))
          .slice(0, 10);

      case 'high-yield':
        // 高收益：月收益 > 15%
        return data.filter(s => s.monthlyReturn > 0.15);

      case 'low-risk':
        // 低风险：风险等级为"低风险"
        return data.filter(s => s.riskLevel === '低风险');

      case 'fast-growth':
        // 快速增长：采用率高于平均值
        const avgAdoption = data.reduce((sum, s) => sum + s.adoption, 0) / data.length;
        return data.filter(s => s.adoption > avgAdoption);

      case 'all':
      default:
        return data;
    }
  }, [data, category]);

  const strategies = filteredStrategies.length > 0 ? filteredStrategies : Array.from({ length: 3 });

  const handleCopyStrategy = async (strategy: Strategy) => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能复制策略');
      return;
    }

    setCopyingStrategyId(strategy.id);

    try {
      // 模拟复制策略到用户账户
      await new Promise((resolve) => setTimeout(resolve, 1200));

      toast.success('策略复制成功!', `已将「${strategy.name}」添加到你的投资组合`);

      // 可以在这里更新本地状态或触发重新查询
    } catch (error) {
      toast.error('复制失败', '请稍后重试');
      console.error('Strategy copy error:', error);
    } finally {
      setCopyingStrategyId(null);
    }
  };

  const handlePublishStrategy = () => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能发布策略');
      return;
    }

    toast.info('功能开发中', '策略发布功能即将上线,敬请期待!');
    // 未来可以打开策略发布模态框
  };

  const handleViewDiscussion = (strategy: Strategy) => {
    toast.info('查看讨论', `打开「${strategy.name}」的讨论区`);
    // 未来可以打开评论/讨论模态框或跳转到讨论页面
  };

  // 分类标题映射
  const categoryTitles: Record<StrategyCategory, string> = {
    all: '全部策略',
    featured: '精选推荐策略',
    'high-yield': '高收益策略',
    'low-risk': '低风险策略',
    'fast-growth': '快速增长策略'
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">
            {categoryTitles[category]}
            {category !== 'all' && (
              <span className="ml-2 text-base font-normal text-text-secondary">
                ({filteredStrategies.length} 个策略)
              </span>
            )}
          </h2>
          <p className="text-sm text-text-secondary">
            浏览高收益策略，点赞、复制并分享你的独特配置。
          </p>
        </div>
        <button
          onClick={handlePublishStrategy}
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/15"
        >
          发布我的策略
        </button>
      </div>

      <div className="space-y-4">
        {strategies.map((strategy, index) => (
          <motion.div
            key={strategy && 'id' in strategy ? strategy.id : index}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.05 }}
            className={clsx(
              'rounded-3xl border border-white/5 bg-white/5 p-5 text-sm text-text-secondary transition hover:border-white/10 hover:bg-white/10',
              strategy && 'id' in strategy && strategy.id === selectedStrategyId && 'border-bifrost-pink bg-bifrost-pink/10'
            )}
            onClick={() =>
              strategy && 'id' in strategy
                ? setSelectedStrategyId(
                    selectedStrategyId === strategy.id ? null : (strategy.id as string)
                  )
                : undefined
            }
          >
            {strategy && 'id' in strategy ? (
              <div className="flex flex-col gap-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-white">{strategy.name}</span>
                      <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-text-secondary">
                        {strategy.riskLevel}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary">{strategy.description}</p>
                  </div>
                  <div className="text-right text-xs text-text-secondary">
                    <p>月收益</p>
                    <p className="text-sm font-semibold text-success">
                      {formatPercent(strategy.monthlyReturn)}
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs">
                  {strategy.segments.map((segment) => (
                    <span
                      key={segment.asset}
                      className={clsx(
                        'rounded-full border px-3 py-1 font-medium',
                        toneStyles[segment.tone]
                      )}
                    >
                      {segment.asset} · {Math.round(segment.ratio * 100)}%
                    </span>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs text-text-secondary">
                  <span>已被 {formatCompactNumber(strategy.adoption)} 人复制</span>
                  <span>👍 {formatCompactNumber(strategy.likes)}</span>
                  <span>💬 {formatCompactNumber(strategy.comments)}</span>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyStrategy(strategy);
                    }}
                    disabled={copyingStrategyId === strategy.id}
                    className="rounded-full bg-bifrost-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(230,0,122,0.35)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {copyingStrategyId === strategy.id ? '复制中...' : '一键复制策略'}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleViewDiscussion(strategy);
                    }}
                    className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary hover:border-white/20 hover:text-white"
                  >
                    查看讨论
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="h-5 w-32 animate-pulse rounded-full bg-white/10" />
                <div className="h-3 w-52 animate-pulse rounded-full bg-white/10" />
                <div className="flex gap-2">
                  <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                  <div className="h-6 w-16 animate-pulse rounded-full bg-white/10" />
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

