'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export type CelebrationType =
  | 'stake_success'
  | 'first_rank'
  | 'achievement_unlock'
  | 'overtake_friend'
  | 'milestone_reached';

interface CelebrationAnimationProps {
  type: CelebrationType;
  message?: string;
  onComplete?: () => void;
  show: boolean;
}

export function CelebrationAnimation({
  type,
  message,
  onComplete,
  show
}: CelebrationAnimationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);

      // 触发五彩纸屑效果
      if (type === 'first_rank' || type === 'achievement_unlock') {
        triggerConfetti(type);
      }

      // 3秒后自动隐藏
      const timer = setTimeout(() => {
        setIsVisible(false);
        onComplete?.();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [show, type, onComplete]);

  const getAnimationConfig = () => {
    switch (type) {
      case 'stake_success':
        return {
          icon: '💸',
          title: '质押成功!',
          color: 'from-green-500 to-emerald-600',
          animation: 'bounce'
        };
      case 'first_rank':
        return {
          icon: '👑',
          title: '登顶排行榜!',
          color: 'from-yellow-400 to-yellow-600',
          animation: 'crown'
        };
      case 'achievement_unlock':
        return {
          icon: '🏆',
          title: '成就解锁!',
          color: 'from-purple-500 to-pink-600',
          animation: 'pulse'
        };
      case 'overtake_friend':
        return {
          icon: '⚡',
          title: '超越好友!',
          color: 'from-blue-500 to-cyan-600',
          animation: 'flash'
        };
      case 'milestone_reached':
        return {
          icon: '🎉',
          title: '里程碑达成!',
          color: 'from-orange-500 to-red-600',
          animation: 'celebration'
        };
    }
  };

  const config = getAnimationConfig();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: -50 }}
          transition={{
            type: "spring",
            duration: 0.6,
            bounce: 0.4
          }}
          className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
        >
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* 主内容 */}
          <div className="relative z-10 pointer-events-auto">
            <motion.div
              animate={getAnimationVariants(config.animation)}
              className={`
                bg-gradient-to-br ${config.color}
                rounded-2xl shadow-2xl p-8
                min-w-[300px] text-center
                border-4 border-white/30
              `}
            >
              {/* 图标 */}
              <motion.div
                animate={{
                  rotate: [0, -10, 10, -10, 0],
                  scale: [1, 1.2, 1, 1.2, 1]
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                  repeatDelay: 1
                }}
                className="text-8xl mb-4"
              >
                {config.icon}
              </motion.div>

              {/* 标题 */}
              <h2 className="text-3xl font-bold text-white mb-2">
                {config.title}
              </h2>

              {/* 自定义消息 */}
              {message && (
                <p className="text-xl text-white/90 mt-2">
                  {message}
                </p>
              )}

              {/* 装饰性光芒 */}
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 bg-white/10 rounded-2xl blur-xl"
              />
            </motion.div>
          </div>

          {/* 金币雨效果 (仅用于 stake_success) */}
          {type === 'stake_success' && (
            <CoinRain />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// 动画变体
function getAnimationVariants(animation: string) {
  switch (animation) {
    case 'bounce':
      return {
        y: [0, -20, 0],
        transition: { duration: 0.5, repeat: Infinity, repeatDelay: 0.5 }
      };
    case 'crown':
      return {
        rotate: [0, -5, 5, -5, 0],
        transition: { duration: 1, repeat: Infinity }
      };
    case 'pulse':
      return {
        scale: [1, 1.05, 1],
        transition: { duration: 0.8, repeat: Infinity }
      };
    case 'flash':
      return {
        boxShadow: [
          '0 0 20px rgba(59, 130, 246, 0.5)',
          '0 0 40px rgba(59, 130, 246, 1)',
          '0 0 20px rgba(59, 130, 246, 0.5)'
        ],
        transition: { duration: 0.5, repeat: Infinity }
      };
    default:
      return {};
  }
}

// 五彩纸屑效果
function triggerConfetti(type: CelebrationType) {
  const count = type === 'first_rank' ? 200 : 100;
  const spread = type === 'first_rank' ? 180 : 100;

  confetti({
    particleCount: count,
    spread: spread,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFA500', '#FF6347', '#9370DB', '#00CED1']
  });

  // 连续效果
  if (type === 'first_rank') {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
    }, 250);

    setTimeout(() => {
      confetti({
        particleCount: 100,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 400);
  }
}

// 金币雨组件
function CoinRain() {
  const coins = Array.from({ length: 20 }, (_, i) => i);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {coins.map((coin) => (
        <motion.div
          key={coin}
          initial={{
            x: `${Math.random() * 100}%`,
            y: -20,
            rotate: 0
          }}
          animate={{
            y: '110vh',
            rotate: 360 * (Math.random() > 0.5 ? 1 : -1)
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            delay: Math.random() * 0.5,
            ease: 'linear'
          }}
          className="absolute text-4xl"
        >
          💰
        </motion.div>
      ))}
    </div>
  );
}

// Hook 使用示例
export function useCelebration() {
  const [celebration, setCelebration] = useState<{
    show: boolean;
    type: CelebrationType;
    message?: string;
  }>({
    show: false,
    type: 'stake_success'
  });

  const celebrate = (type: CelebrationType, message?: string) => {
    setCelebration({ show: true, type, message });
  };

  const handleComplete = () => {
    setCelebration(prev => ({ ...prev, show: false }));
  };

  return {
    celebration,
    celebrate,
    handleComplete
  };
}
