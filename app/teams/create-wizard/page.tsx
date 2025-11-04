'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Wand2 } from 'lucide-react';
import Link from 'next/link';

import { useWallet } from '@/providers/wallet-provider';
import { canPerformTransaction } from '@/utils/wallet-checks';
import { createTeam } from '@/data/mock';
import { WizardSteps, WizardStep, WizardNavigation, WizardContainer } from '@/components/teams/WizardSteps';
import { TEAM_COLOR_THEMES } from '@/components/teams/TeamIconSelector';
import { TeamTemplate } from '@/data/team-templates';
import { Step1BasicInfo } from './Step1BasicInfo';
import { Step2Configuration } from './Step2Configuration';
import { Step3Requirements } from './Step3Requirements';
import { Step4Review } from './Step4Review';

interface FormData {
  // Step 0: Template
  templateId?: string;

  // Step 1: Basic Info
  name: string;
  description: string;
  icon: string;
  colorTheme: string;

  // Step 2: Configuration
  maxMembers: number;
  isPublic: boolean;
  requireApproval: boolean;

  // Step 3: Requirements
  minStakeToJoin: number;
  additionalRequirements?: string;
}

const WIZARD_STEPS: WizardStep[] = [
  { id: 1, title: '基本信息', description: '名称和描述', icon: '📝' },
  { id: 2, title: '团队配置', description: '成员和权限', icon: '⚙️' },
  { id: 3, title: '入队要求', description: '质押和条件', icon: '🎯' },
  { id: 4, title: '确认创建', description: '审查和提交', icon: '✅' }
];

export default function CreateTeamWizardPage() {
  const router = useRouter();
  const walletState = useWallet();
  const { account, isConnected } = walletState;

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    description: '',
    icon: '🛡️',
    colorTheme: TEAM_COLOR_THEMES[0].id,
    maxMembers: 5,
    isPublic: true,
    requireApproval: false,
    minStakeToJoin: 100
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stepErrors, setStepErrors] = useState<Record<number, boolean>>({});

  // 应用模板
  const applyTemplate = (template: TeamTemplate) => {
    setFormData((prev) => ({
      ...prev,
      templateId: template.id,
      icon: template.icon,
      colorTheme: template.colorTheme.includes('blue') ? 'blue' :
                   template.colorTheme.includes('purple') ? 'purple' :
                   template.colorTheme.includes('green') ? 'green' :
                   template.colorTheme.includes('yellow') ? 'yellow' : 'blue',
      maxMembers: template.maxMembers,
      minStakeToJoin: template.minStakeToJoin,
      isPublic: template.isPublic,
      requireApproval: template.requireApproval
    }));
  };

  // 验证当前步骤
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return formData.name.trim().length >= 2 && formData.description.trim().length >= 10;
      case 2:
        return formData.maxMembers >= 2 && formData.maxMembers <= 10;
      case 3:
        return formData.minStakeToJoin >= 0;
      case 4:
        return true;
      default:
        return false;
    }
  };

  // 更新步骤错误状态
  useEffect(() => {
    const hasError = !validateStep(currentStep);
    setStepErrors((prev) => ({ ...prev, [currentStep]: hasError }));
  }, [currentStep, formData]);

  const handleNext = () => {
    if (validateStep(currentStep) && currentStep < WIZARD_STEPS.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleStepClick = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = async () => {
    if (!isConnected || !account) {
      return;
    }

    if (!canPerformTransaction(walletState)) {
      return;
    }

    // 验证所有步骤
    for (let i = 1; i <= WIZARD_STEPS.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i);
        return;
      }
    }

    setIsSubmitting(true);

    try {
      const newTeam = await createTeam({
        name: formData.name.trim(),
        description: formData.description.trim(),
        captain: account.address,
        maxMembers: formData.maxMembers,
        minStakeToJoin: formData.minStakeToJoin,
        isPublic: formData.isPublic,
        requireApproval: formData.requireApproval
      });

      console.log('战队创建成功:', newTeam);

      if (typeof window !== 'undefined') {
        const toastModule = await import('@/state/use-toast-store');
        toastModule.toast.success(
          `战队 "${formData.name}" 创建成功! 正在跳转到战队列表...`
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
          `创建失败: ${error.message || '未知错误,请重试'}`
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen py-8">
      <div className="mx-auto max-w-5xl px-4">
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
          className="glass-panel relative overflow-hidden rounded-3xl border border-purple-500/30 p-8 mb-8"
        >
          <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500/30 to-pink-500/30">
                <Wand2 className="h-8 w-8 text-purple-300" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">创建战队 · 向导模式</h1>
                <p className="text-text-secondary">分步引导,轻松创建你的专属战队</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 步骤指示器 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <WizardSteps
            steps={WIZARD_STEPS}
            currentStep={currentStep}
            onStepClick={handleStepClick}
            allowNavigation={true}
          />
        </motion.div>

        {/* 步骤内容 */}
        <div className="mb-8">
          {currentStep === 1 && (
            <Step1BasicInfo
              formData={formData}
              setFormData={setFormData}
              onApplyTemplate={applyTemplate}
              isConnected={isConnected}
            />
          )}

          {currentStep === 2 && (
            <Step2Configuration
              formData={formData}
              setFormData={setFormData}
              isConnected={isConnected}
            />
          )}

          {currentStep === 3 && (
            <Step3Requirements
              formData={formData}
              setFormData={setFormData}
              isConnected={isConnected}
            />
          )}

          {currentStep === 4 && (
            <Step4Review
              formData={formData}
              onEdit={(step) => setCurrentStep(step)}
              isConnected={isConnected}
            />
          )}
        </div>

        {/* 导航按钮 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass-panel rounded-2xl border border-white/10 p-6"
        >
          <WizardNavigation
            currentStep={currentStep}
            totalSteps={WIZARD_STEPS.length}
            onPrevious={handlePrevious}
            onNext={handleNext}
            onSubmit={handleSubmit}
            isNextDisabled={!isConnected || stepErrors[currentStep]}
            isSubmitting={isSubmitting}
          />
        </motion.div>
      </div>
    </div>
  );
}
