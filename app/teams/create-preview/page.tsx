'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Eye } from 'lucide-react';
import Link from 'next/link';

import { useWallet } from '@/providers/wallet-provider';
import { canPerformTransaction } from '@/utils/wallet-checks';
import { createTeam } from '@/data/mock';
import { TeamIconSelector, TeamColorSelector, TEAM_ICONS, TEAM_COLOR_THEMES } from '@/components/teams/TeamIconSelector';
import { TeamPreviewCard } from '@/components/teams/TeamPreviewCard';
import { CreateTeamForm } from './CreateTeamForm';

interface FormData {
  name: string;
  description: string;
  maxMembers: number;
  minStakeToJoin: number;
  isPublic: boolean;
  requireApproval: boolean;
  icon: string;
  colorTheme: string;
}

export default function CreateTeamPreviewPage() {
  const router = useRouter();
  const walletState = useWallet();
  const { account, isConnected } = walletState;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    maxMembers: 5,
    minStakeToJoin: 100,
    isPublic: true,
    requireApproval: false,
    icon: TEAM_ICONS[0],
    colorTheme: TEAM_COLOR_THEMES[0].id
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobilePreview, setShowMobilePreview] = useState(false);

  // 提交表单
  const handleSubmit = async (validatedData: FormData) => {
    if (!isConnected || !account) {
      return;
    }

    if (!canPerformTransaction(walletState)) {
      return;
    }

    setIsSubmitting(true);

    try {
      const newTeam = await createTeam({
        name: validatedData.name.trim(),
        description: validatedData.description.trim(),
        captain: account.address,
        maxMembers: validatedData.maxMembers,
        minStakeToJoin: validatedData.minStakeToJoin,
        isPublic: validatedData.isPublic,
        requireApproval: validatedData.requireApproval
      });

      console.log('战队创建成功:', newTeam);

      if (typeof window !== 'undefined') {
        const toastModule = await import('@/state/use-toast-store');
        toastModule.toast.success(
          `战队 "${validatedData.name}" 创建成功!`,
          { description: '正在跳转到战队列表...' }
        );
      }

      setTimeout(() => {
        router.push('/teams');
      }, 1500);
    } catch (error: any) {
      console.error('创建战队失败:', error);

      if (typeof window !== 'undefined') {
        const toastModule = await import('@/state/use-toast-store');
        toastModule.toast.error(
          '创建失败',
          { description: error.message || '未知错误,请重试' }
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4">
        {/* 返回按钮 */}
        <Link
          href="/teams"
          className="mb-6 inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
          返回战队列表
        </Link>

        {/* 页面头部 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-panel relative overflow-hidden rounded-3xl border border-info/30 p-8 mb-8"
        >
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-info/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-info/30 to-arena-blue/30">
                <Eye className="h-8 w-8 text-info" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">创建战队 · 实时预览</h1>
                <p className="text-text-secondary">边填写边预览,所见即所得</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 移动端预览切换按钮 */}
        <div className="lg:hidden mb-4">
          <button
            onClick={() => setShowMobilePreview(!showMobilePreview)}
            className="w-full px-4 py-3 rounded-xl bg-bifrost-primary/20 border border-bifrost-primary/30 text-bifrost-primary font-medium flex items-center justify-center gap-2"
          >
            <Eye className="h-5 w-5" />
            {showMobilePreview ? '返回表单' : '查看预览'}
          </button>
        </div>

        {/* 主内容区 - 分栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* 左侧表单 - 桌面60%，移动端全宽 */}
          <div className={`lg:col-span-3 ${showMobilePreview ? 'hidden lg:block' : 'block'}`}>
            <CreateTeamForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              isConnected={isConnected}
              walletState={walletState}
            />
          </div>

          {/* 右侧预览 - 桌面40%，移动端全宽 */}
          <div className={`lg:col-span-2 ${showMobilePreview ? 'block' : 'hidden lg:block'}`}>
            <div className="lg:sticky lg:top-8">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <div className="glass-panel rounded-2xl border border-bifrost-primary/30 p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Eye className="h-5 w-5 text-bifrost-primary" />
                    <h3 className="text-lg font-semibold text-white">实时预览</h3>
                  </div>
                  <p className="text-sm text-text-secondary mb-4">
                    这是你的战队创建后的样子,所有修改会实时显示
                  </p>
                </div>

                <TeamPreviewCard
                  name={formData.name}
                  description={formData.description}
                  icon={formData.icon}
                  colorTheme={formData.colorTheme}
                  maxMembers={formData.maxMembers}
                  minStakeToJoin={formData.minStakeToJoin}
                  isPublic={formData.isPublic}
                  requireApproval={formData.requireApproval}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
