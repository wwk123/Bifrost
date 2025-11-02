'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export interface WizardStep {
  id: number;
  title: string;
  description: string;
  icon: string;
}

interface WizardStepsProps {
  steps: WizardStep[];
  currentStep: number;
  onStepClick?: (step: number) => void;
  allowNavigation?: boolean;
}

export function WizardSteps({ steps, currentStep, onStepClick, allowNavigation = false }: WizardStepsProps) {
  return (
    <div className="relative">
      {/* 进度条背景 */}
      <div className="absolute top-6 left-0 right-0 h-1 bg-white/10 -z-10" />

      {/* 进度条前景 */}
      <motion.div
        className="absolute top-6 left-0 h-1 bg-bifrost-primary -z-10"
        initial={{ width: '0%' }}
        animate={{
          width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`
        }}
        transition={{ duration: 0.3 }}
      />

      {/* 步骤指示器 */}
      <div className="flex justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          const isFuture = stepNumber > currentStep;

          return (
            <div
              key={step.id}
              className="flex flex-col items-center"
              style={{ width: `${100 / steps.length}%` }}
            >
              {/* 步骤圆圈 */}
              <motion.button
                type="button"
                onClick={() => allowNavigation && onStepClick?.(stepNumber)}
                disabled={!allowNavigation || isFuture}
                whileHover={allowNavigation && !isFuture ? { scale: 1.1 } : {}}
                whileTap={allowNavigation && !isFuture ? { scale: 0.95 } : {}}
                className={`
                  relative w-12 h-12 rounded-full border-2 flex items-center justify-center
                  transition-all duration-300 mb-3
                  ${
                    isCompleted
                      ? 'bg-bifrost-primary border-bifrost-primary text-white'
                      : isCurrent
                      ? 'bg-bifrost-primary/20 border-bifrost-primary text-bifrost-primary shadow-lg shadow-bifrost-primary/30'
                      : 'bg-white/5 border-white/20 text-text-secondary'
                  }
                  ${allowNavigation && !isFuture ? 'cursor-pointer hover:border-bifrost-primary' : 'cursor-default'}
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isCompleted ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <Check className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <span className="text-2xl">{step.icon}</span>
                )}

                {/* 脉冲动画 (当前步骤) */}
                {isCurrent && (
                  <motion.div
                    className="absolute inset-0 rounded-full border-2 border-bifrost-primary"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{ scale: 1.5, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.button>

              {/* 步骤信息 */}
              <div className="text-center max-w-[120px]">
                <div
                  className={`
                    text-sm font-semibold mb-1 transition-colors
                    ${isCurrent ? 'text-bifrost-primary' : isCompleted ? 'text-white' : 'text-text-secondary'}
                  `}
                >
                  {step.title}
                </div>
                <div className="text-xs text-text-secondary line-clamp-2">
                  {step.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// 向导容器组件
interface WizardContainerProps {
  children: React.ReactNode;
  title: string;
  subtitle?: string;
}

export function WizardContainer({ children, title, subtitle }: WizardContainerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="glass-panel rounded-3xl border border-white/10 p-8"
    >
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
        {subtitle && (
          <p className="text-text-secondary">{subtitle}</p>
        )}
      </div>

      {children}
    </motion.div>
  );
}

// 向导导航按钮
interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onPrevious: () => void;
  onNext: () => void;
  onSubmit?: () => void;
  isNextDisabled?: boolean;
  isSubmitting?: boolean;
  nextLabel?: string;
  previousLabel?: string;
}

export function WizardNavigation({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSubmit,
  isNextDisabled = false,
  isSubmitting = false,
  nextLabel = '下一步',
  previousLabel = '上一步'
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex items-center justify-between pt-6 border-t border-white/10">
      {/* 上一步按钮 */}
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`
          px-6 py-3 rounded-xl border border-white/10 text-white
          transition-all
          ${
            isFirstStep
              ? 'opacity-0 cursor-default'
              : 'hover:bg-white/5 hover:border-white/30'
          }
        `}
      >
        ← {previousLabel}
      </button>

      {/* 步骤指示器 */}
      <div className="text-sm text-text-secondary">
        第 {currentStep} / {totalSteps} 步
      </div>

      {/* 下一步/提交按钮 */}
      <button
        type="button"
        onClick={isLastStep ? onSubmit : onNext}
        disabled={isNextDisabled || isSubmitting}
        className={`
          px-8 py-3 rounded-xl font-semibold transition-all
          flex items-center gap-2
          ${
            isNextDisabled || isSubmitting
              ? 'bg-white/10 text-text-secondary cursor-not-allowed'
              : 'bg-bifrost-primary hover:bg-bifrost-primary/90 text-white shadow-lg shadow-bifrost-primary/30'
          }
        `}
      >
        {isSubmitting ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full"
            />
            提交中...
          </>
        ) : (
          <>
            {isLastStep ? '创建战队' : nextLabel}
            {!isLastStep && ' →'}
          </>
        )}
      </button>
    </div>
  );
}
