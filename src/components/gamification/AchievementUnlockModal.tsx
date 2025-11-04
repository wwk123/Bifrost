'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import { X, Share2, Twitter, Copy, Check } from 'lucide-react';
import { Achievement } from '@/data/mock';

interface AchievementUnlockModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export function AchievementUnlockModal({
  achievement,
  isOpen,
  onClose
}: AchievementUnlockModalProps) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (isOpen && achievement) {
      // 触发五彩纸屑效果
      triggerConfetti();

      // 播放音效（如果有的话）
      playUnlockSound();
    }
  }, [isOpen, achievement]);

  if (!achievement) return null;

  const handleShare = (platform: 'twitter' | 'copy') => {
    const text = `🏆 我在 Bifrost Arena 解锁了新成就：${achievement.title}！\n${achievement.description}\n奖励：${achievement.reward}`;

    if (platform === 'twitter') {
      const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent('https://bifrost-arena.app')}`;
      window.open(url, '_blank');
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* 背景遮罩 */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* 模态框内容 */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              transition={{
                type: "spring",
                duration: 0.6,
                bounce: 0.4
              }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              {/* 关闭按钮 */}
              <button
                onClick={onClose}
                className="absolute -right-2 -top-2 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>

              {/* 主卡片 */}
              <div className="relative overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-purple-500/20 to-pink-500/20 backdrop-blur-xl shadow-2xl">
                {/* 光芒效果 */}
                <motion.div
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 0.6, 0.3]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  className="absolute inset-0 bg-gradient-to-br from-yellow-400/30 to-pink-500/30 blur-3xl"
                />

                <div className="relative p-8">
                  {/* 标题 */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", bounce: 0.5 }}
                    className="mb-6 text-center"
                  >
                    <div className="mb-3 text-6xl">🏆</div>
                    <h2 className="text-3xl font-bold text-white">成就解锁！</h2>
                    <div className="mt-2 inline-block rounded-full bg-success/20 px-4 py-1 text-sm font-semibold text-success">
                      +10 经验值
                    </div>
                  </motion.div>

                  {/* 成就详情 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mb-6 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
                  >
                    <div className="mb-3 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white">{achievement.title}</h3>
                        <p className="mt-1 text-sm text-text-secondary">{achievement.description}</p>
                      </div>
                      <motion.div
                        animate={{
                          rotate: [0, -10, 10, -10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          repeatDelay: 1
                        }}
                        className="text-4xl"
                      >
                        🎖️
                      </motion.div>
                    </div>

                    {/* 进度条（满格） */}
                    <div className="mb-3 h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
                        className="h-full bg-gradient-to-r from-success to-success/80"
                      />
                    </div>

                    {/* 奖励 */}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">奖励</span>
                      <div className="flex items-center gap-2">
                        <span className="text-warning">⭐</span>
                        <span className="font-semibold text-white">{achievement.reward}</span>
                      </div>
                    </div>
                  </motion.div>

                  {/* 分享按钮 */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-sm text-text-secondary">
                      <Share2 className="h-4 w-4" />
                      <span>分享你的成就</span>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => handleShare('twitter')}
                        className="flex items-center justify-center gap-2 rounded-full border border-info/30 bg-info/10 px-4 py-3 text-sm font-semibold text-info transition-all hover:border-info/50 hover:bg-info/20"
                      >
                        <Twitter className="h-4 w-4" />
                        Twitter
                      </button>

                      <button
                        onClick={() => handleShare('copy')}
                        className="flex items-center justify-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-3 text-sm font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
                      >
                        {copied ? (
                          <>
                            <Check className="h-4 w-4 text-success" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            复制
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* 继续按钮 */}
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    onClick={onClose}
                    className="mt-6 w-full rounded-full bg-gradient-to-r from-bifrost-primary to-bifrost-pink px-6 py-4 font-bold text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl"
                  >
                    继续冒险
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// 五彩纸屑效果
function triggerConfetti() {
  // 第一波
  confetti({
    particleCount: 100,
    spread: 100,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFA500', '#FF6347', '#9370DB', '#00CED1', '#FF1493']
  });

  // 第二波 - 从左边
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0.7 },
      colors: ['#FFD700', '#FFA500', '#9370DB']
    });
  }, 250);

  // 第三波 - 从右边
  setTimeout(() => {
    confetti({
      particleCount: 80,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0.7 },
      colors: ['#FF6347', '#00CED1', '#FF1493']
    });
  }, 400);

  // 星星效果
  setTimeout(() => {
    confetti({
      particleCount: 30,
      spread: 360,
      ticks: 100,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      shapes: ['star'],
      colors: ['#FFD700', '#FFA500', '#FFFFFF']
    });
  }, 600);
}

// 音效播放（需要音频文件）
function playUnlockSound() {
  try {
    const audio = new Audio('/sounds/achievement-unlock.mp3');
    audio.volume = 0.5;
    audio.play().catch(() => {
      // 忽略音频播放失败
    });
  } catch (error) {
    // 忽略错误
  }
}

// Hook for achievement unlock detection
export function useAchievementUnlock() {
  const [unlockedAchievement, setUnlockedAchievement] = useState<Achievement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const checkAndUnlock = (achievement: Achievement) => {
    // 检查是否刚刚解锁（从 in-progress 变为 unlocked）
    if (achievement.status === 'unlocked' && achievement.progress === achievement.target) {
      const lastUnlocked = localStorage.getItem(`achievement_${achievement.id}_unlocked`);
      if (!lastUnlocked) {
        // 第一次解锁
        localStorage.setItem(`achievement_${achievement.id}_unlocked`, 'true');
        setUnlockedAchievement(achievement);
        setIsModalOpen(true);
      }
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setUnlockedAchievement(null), 300);
  };

  return {
    unlockedAchievement,
    isModalOpen,
    checkAndUnlock,
    closeModal
  };
}
