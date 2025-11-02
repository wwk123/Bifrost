'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Shield, Users, Lock, Globe, AlertCircle, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { useWallet } from '@/providers/wallet-provider';
import { canPerformTransaction } from '@/utils/wallet-checks';
import { createTeam } from '@/data/mock';

interface FormData {
  name: string;
  description: string;
  maxMembers: number;
  minStakeToJoin: number;
  isPublic: boolean;
  requireApproval: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
  maxMembers?: string;
  minStakeToJoin?: string;
}

export default function CreateTeamPage() {
  const router = useRouter();
  const walletState = useWallet();
  const { account, isConnected } = walletState;

  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    maxMembers: 5,
    minStakeToJoin: 100,
    isPublic: true,
    requireApproval: false
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 实时验证
  const validateField = (name: keyof FormData, value: any): string | undefined => {
    switch (name) {
      case 'name':
        if (!value || value.trim().length < 2) {
          return '战队名称至少需要 2 个字符';
        }
        if (value.trim().length > 30) {
          return '战队名称不能超过 30 个字符';
        }
        return undefined;

      case 'description':
        if (!value || value.trim().length < 10) {
          return '战队描述至少需要 10 个字符';
        }
        if (value.trim().length > 200) {
          return '战队描述不能超过 200 个字符';
        }
        return undefined;

      case 'maxMembers':
        const maxNum = Number(value);
        if (isNaN(maxNum) || maxNum < 2) {
          return '最少需要 2 名成员';
        }
        if (maxNum > 10) {
          return '最多支持 10 名成员';
        }
        return undefined;

      case 'minStakeToJoin':
        const stakeNum = Number(value);
        if (isNaN(stakeNum) || stakeNum < 0) {
          return '最低质押数量不能为负数';
        }
        if (stakeNum > 1000000) {
          return '最低质押数量过高';
        }
        return undefined;

      default:
        return undefined;
    }
  };

  // 处理输入变化
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const fieldName = name as keyof FormData;

    let newValue: any = value;
    if (type === 'number') {
      newValue = value === '' ? 0 : Number(value);
    }

    setFormData((prev) => ({ ...prev, [fieldName]: newValue }));

    // 实时验证
    const error = validateField(fieldName, newValue);
    setErrors((prev) => ({
      ...prev,
      [fieldName]: error
    }));
  };

  // 处理复选框变化
  const handleCheckboxChange = (name: keyof FormData) => {
    setFormData((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  // 验证所有字段
  const validateAll = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.name = validateField('name', formData.name);
    newErrors.description = validateField('description', formData.description);
    newErrors.maxMembers = validateField('maxMembers', formData.maxMembers);
    newErrors.minStakeToJoin = validateField('minStakeToJoin', formData.minStakeToJoin);

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error !== undefined);
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected || !account) {
      alert('请先连接钱包');
      return;
    }

    if (!canPerformTransaction(walletState)) {
      alert('无法执行交易,请检查钱包连接和网络状态');
      return;
    }

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // 调用创建战队 API
      const newTeam = await createTeam({
        name: formData.name.trim(),
        description: formData.description.trim(),
        captain: account.address,
        maxMembers: formData.maxMembers,
        minStakeToJoin: formData.minStakeToJoin,
        isPublic: formData.isPublic,
        requireApproval: formData.requireApproval
      });

      // 成功提示
      console.log('战队创建成功:', newTeam);

      // 显示成功消息
      if (typeof window !== 'undefined') {
        const toastModule = await import('@/state/use-toast-store');
        toastModule.toast.success(
          `战队 "${formData.name}" 创建成功!`,
          { description: '正在跳转到战队列表...' }
        );
      }

      // 延迟跳转以显示提示
      setTimeout(() => {
        router.push('/teams');
      }, 1500);
    } catch (error: any) {
      console.error('创建战队失败:', error);

      // 显示错误消息
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
      <div className="mx-auto max-w-4xl">
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
                <Shield className="h-8 w-8 text-info" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">创建战队</h1>
                <p className="text-text-secondary">组建你的专属战队,开启团队竞技之旅</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 钱包未连接提示 */}
        {!isConnected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-panel rounded-2xl border border-warning/30 p-6 mb-8"
          >
            <div className="flex items-start gap-3">
              <AlertCircle className="h-6 w-6 text-warning flex-shrink-0 mt-0.5" />
              <div>
                <div className="text-lg font-semibold text-warning mb-1">需要连接钱包</div>
                <div className="text-text-secondary text-sm">
                  创建战队需要连接钱包。请先连接你的钱包后再继续。
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* 创建表单 */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onSubmit={handleSubmit}
          className="glass-panel rounded-3xl border border-white/10 p-8 space-y-6"
        >
          {/* 战队名称 */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-2">
              战队名称 <span className="text-error">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              placeholder="给你的战队起个响亮的名字"
              disabled={!isConnected}
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.name
                  ? 'border-error focus:ring-error/50'
                  : 'border-white/10 focus:ring-bifrost-primary/50'
              }`}
            />
            {errors.name && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.name}
              </p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {formData.name.length}/30 字符
            </p>
          </div>

          {/* 战队描述 */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-white mb-2">
              战队描述 <span className="text-error">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              placeholder="介绍你的战队文化、目标和招募要求..."
              disabled={!isConnected}
              className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 transition-all resize-none disabled:opacity-50 disabled:cursor-not-allowed ${
                errors.description
                  ? 'border-error focus:ring-error/50'
                  : 'border-white/10 focus:ring-bifrost-primary/50'
              }`}
            />
            {errors.description && (
              <p className="mt-2 text-sm text-error flex items-center gap-1">
                <AlertCircle className="h-4 w-4" />
                {errors.description}
              </p>
            )}
            <p className="mt-1 text-xs text-text-secondary">
              {formData.description.length}/200 字符
            </p>
          </div>

          {/* 战队配置 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 最大成员数 */}
            <div>
              <label htmlFor="maxMembers" className="block text-sm font-medium text-white mb-2">
                <Users className="inline h-4 w-4 mr-1" />
                最大成员数 <span className="text-error">*</span>
              </label>
              <input
                id="maxMembers"
                name="maxMembers"
                type="number"
                min="2"
                max="10"
                value={formData.maxMembers}
                onChange={handleChange}
                disabled={!isConnected}
                className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                  errors.maxMembers
                    ? 'border-error focus:ring-error/50'
                    : 'border-white/10 focus:ring-bifrost-primary/50'
                }`}
              />
              {errors.maxMembers && (
                <p className="mt-2 text-sm text-error flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.maxMembers}
                </p>
              )}
              <p className="mt-1 text-xs text-text-secondary">支持 2-10 名成员</p>
            </div>

            {/* 最低质押要求 */}
            <div>
              <label htmlFor="minStakeToJoin" className="block text-sm font-medium text-white mb-2">
                <Shield className="inline h-4 w-4 mr-1" />
                入队最低质押 <span className="text-error">*</span>
              </label>
              <div className="relative">
                <input
                  id="minStakeToJoin"
                  name="minStakeToJoin"
                  type="number"
                  min="0"
                  step="10"
                  value={formData.minStakeToJoin}
                  onChange={handleChange}
                  disabled={!isConnected}
                  className={`w-full px-4 py-3 pr-16 bg-white/5 border rounded-xl text-white focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                    errors.minStakeToJoin
                      ? 'border-error focus:ring-error/50'
                      : 'border-white/10 focus:ring-bifrost-primary/50'
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm">
                  DOT
                </span>
              </div>
              {errors.minStakeToJoin && (
                <p className="mt-2 text-sm text-error flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.minStakeToJoin}
                </p>
              )}
              <p className="mt-1 text-xs text-text-secondary">
                设为 0 表示无最低质押要求
              </p>
            </div>
          </div>

          {/* 战队设置 */}
          <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">战队设置</h3>

            {/* 公开战队 */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.isPublic}
                onChange={() => handleCheckboxChange('isPublic')}
                disabled={!isConnected}
                className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-bifrost-primary focus:ring-2 focus:ring-bifrost-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-white font-medium group-hover:text-bifrost-primary transition-colors">
                  <Globe className="h-4 w-4" />
                  公开战队
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  允许任何人查看战队信息并申请加入
                </p>
              </div>
            </label>

            {/* 需要审批 */}
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.requireApproval}
                onChange={() => handleCheckboxChange('requireApproval')}
                disabled={!isConnected}
                className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-bifrost-primary focus:ring-2 focus:ring-bifrost-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 text-white font-medium group-hover:text-bifrost-primary transition-colors">
                  <Lock className="h-4 w-4" />
                  需要队长审批
                </div>
                <p className="text-sm text-text-secondary mt-1">
                  新成员加入需要队长审核通过
                </p>
              </div>
            </label>
          </div>

          {/* 提交按钮 */}
          <div className="flex items-center justify-end gap-4 pt-6 border-t border-white/10">
            <Link
              href="/teams"
              className="px-6 py-3 rounded-xl border border-white/10 text-white hover:bg-white/5 transition-colors"
            >
              取消
            </Link>
            <button
              type="submit"
              disabled={!isConnected || isSubmitting}
              className="px-8 py-3 rounded-xl bg-bifrost-primary hover:bg-bifrost-primary/90 text-white font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  创建中...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5" />
                  创建战队
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* 温馨提示 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl border border-white/10 p-6 mt-8"
        >
          <h3 className="text-lg font-semibold text-white mb-4">温馨提示</h3>
          <ul className="space-y-2 text-sm text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>创建战队后,你将自动成为队长,负责管理战队事务</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>战队名称和描述创建后仍可修改</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>战队成员越多,团队加成越高,最高可达 +15%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>参与团队竞赛可获得额外的奖池分成</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
}
