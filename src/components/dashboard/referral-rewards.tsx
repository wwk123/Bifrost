"use client";

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { fetchReferralProgress } from '@/data/mock';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';
import { formatPercent } from '@/utils/format';

export function ReferralRewards() {
  const { isConnected, account } = useWallet();
  const [isCopying, setIsCopying] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ['referral'],
    queryFn: fetchReferralProgress,
    staleTime: 1000 * 60 * 10
  });

  const handleCopyReferralLink = async () => {
    if (!isConnected || !account) {
      toast.warning('请先连接钱包', '需要连接钱包才能生成邀请链接');
      return;
    }

    setIsCopying(true);

    try {
      // 生成带用户地址的邀请链接
      const referralLink = `${window.location.origin}?ref=${account.address.slice(0, 8)}`;

      await navigator.clipboard.writeText(referralLink);

      toast.success('复制成功!', '邀请链接已复制到剪贴板');
    } catch (error) {
      // Fallback如果clipboard API不可用
      toast.info('邀请链接', `${window.location.origin}?ref=${account.address.slice(0, 8)}`);
      console.error('Copy error:', error);
    } finally {
      setIsCopying(false);
    }
  };

  const handleGenerateInviteCard = async () => {
    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能生成邀请卡');
      return;
    }

    setIsGenerating(true);

    try {
      // 模拟生成邀请卡
      await new Promise((resolve) => setTimeout(resolve, 1500));

      toast.success('邀请卡生成成功!', '已保存到本地,可直接分享到社交媒体');
      // 未来可以调用分享卡片生成器
    } catch (error) {
      toast.error('生成失败', '请稍后重试');
      console.error('Invite card error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-3 pb-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">推荐奖励</h2>
          <p className="text-sm text-text-secondary">
            分享邀请链接，和好友组队共赢额外收益加成。
          </p>
        </div>
        <button
          onClick={handleCopyReferralLink}
          disabled={isCopying}
          className="rounded-full bg-bifrost-primary px-4 py-2 text-xs font-semibold text-white shadow-[0_12px_24px_rgba(230,0,122,0.35)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isCopying ? '复制中...' : '复制邀请链接'}
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="rounded-2xl border border-white/5 bg-white/5 px-5 py-5 text-sm text-text-secondary"
      >
        {isLoading || !data ? (
          <div className="space-y-3">
            <div className="h-6 w-32 animate-pulse rounded-full bg-white/10" />
            <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
            <div className="h-2 w-full animate-pulse rounded-full bg-white/10" />
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-text-secondary">团队额外收益加成</p>
                <p className="text-xl font-semibold text-success">
                  {formatPercent(data.teamBoost)}
                </p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">累计奖励</p>
                <p className="text-xl font-semibold text-white">${data.rewardsUsd}</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">成功邀请</p>
                <p className="text-xl font-semibold text-white">{data.invited} 位好友</p>
              </div>
              <div>
                <p className="text-xs text-text-secondary">完成质押</p>
                <p className="text-xl font-semibold text-white">{data.completed} 位好友</p>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              {data.milestones.map((item) => (
                <div key={item.label} className="flex flex-col gap-1">
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span>
                      {item.current}/{item.target}
                    </span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div
                      className="h-2 rounded-full bg-bifrost-primary transition-all"
                      style={{
                        width: `${Math.min(100, (item.current / item.target) * 100)}%`
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={handleGenerateInviteCard}
              disabled={isGenerating}
              className="rounded-2xl border border-white/10 px-4 py-3 text-xs font-semibold text-white transition hover:border-white/20 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isGenerating ? '生成中...' : '生成专属邀请卡'}
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}

