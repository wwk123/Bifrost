"use client";

import { motion } from 'framer-motion';
import { Target, Clock, Gift, ChevronRight } from 'lucide-react';
import { formatCurrency } from '@/utils/format';

interface Challenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  total: number;
  reward: number;
  timeLeft: string;
  difficulty: 'easy' | 'medium' | 'hard';
  emoji: string;
}

const difficultyConfig = {
  easy: { color: 'text-success', bg: 'bg-success/20', border: 'border-success/40' },
  medium: { color: 'text-warning', bg: 'bg-warning/20', border: 'border-warning/40' },
  hard: { color: 'text-error', bg: 'bg-error/20', border: 'border-error/40' }
};

export function ActiveChallenges() {
  const challenges: Challenge[] = [
    {
      id: '1',
      title: '连胜达人',
      description: '连续5笔交易盈利',
      progress: 3,
      total: 5,
      reward: 500,
      timeLeft: '2天',
      difficulty: 'medium',
      emoji: '🔥'
    },
    {
      id: '2',
      title: '多链探险家',
      description: '在3条链上完成交易',
      progress: 2,
      total: 3,
      reward: 300,
      timeLeft: '5天',
      difficulty: 'easy',
      emoji: '🌐'
    },
    {
      id: '3',
      title: '对冲大师',
      description: '完成10次智能对冲',
      progress: 7,
      total: 10,
      reward: 1000,
      timeLeft: '7天',
      difficulty: 'hard',
      emoji: '⚖️'
    }
  ];

  return (
    <div className="glass-panel rounded-3xl border border-white/10 p-6 lg:p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-bifrost-pink" />
          <h3 className="text-xl font-bold text-white">进行中的挑战</h3>
        </div>
        <a
          href="/challenges"
          className="text-sm text-bifrost-pink hover:underline"
        >
          查看全部
        </a>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge, index) => {
          const config = difficultyConfig[challenge.difficulty];
          const progressPercent = (challenge.progress / challenge.total) * 100;

          return (
            <motion.div
              key={challenge.id}
              className={`group relative overflow-hidden rounded-2xl border ${config.border} bg-white/5 p-4 transition hover:bg-white/10`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Difficulty Badge */}
              <div className={`absolute right-4 top-4 rounded-full ${config.bg} px-2 py-1 text-xs font-semibold ${config.color}`}>
                {challenge.difficulty === 'easy' ? '简单' : challenge.difficulty === 'medium' ? '中等' : '困难'}
              </div>

              <div className="flex items-start gap-4">
                {/* Emoji */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                  {challenge.emoji}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-3">
                  <div>
                    <h4 className="text-lg font-bold text-white">{challenge.title}</h4>
                    <p className="mt-1 text-sm text-text-secondary">{challenge.description}</p>
                  </div>

                  {/* Progress Bar */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-text-secondary">
                        进度 {challenge.progress} / {challenge.total}
                      </span>
                      <span className={`font-semibold ${config.color}`}>
                        {progressPercent.toFixed(0)}%
                      </span>
                    </div>
                    <div className="relative h-2 overflow-hidden rounded-full bg-white/10">
                      <motion.div
                        className={`h-full rounded-full ${config.bg} ${config.color.replace('text-', 'bg-')}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                      />
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-text-secondary">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{challenge.timeLeft}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Gift className="h-3 w-3" />
                        <span className="font-semibold text-success">+{formatCurrency(challenge.reward)}</span>
                      </div>
                    </div>

                    <motion.a
                      href="/challenges"
                      className="flex items-center gap-1 rounded-full bg-bifrost-pink/20 px-3 py-1 text-xs font-semibold text-bifrost-pink transition hover:bg-bifrost-pink/30"
                      whileHover={{ x: 4 }}
                    >
                      继续
                      <ChevronRight className="h-3 w-3" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View All Button */}
      <motion.a
        href="/challenges"
        className="mt-6 flex items-center justify-center gap-2 rounded-full border border-white/20 px-4 py-3 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
        whileHover={{ scale: 1.02 }}
      >
        <Target className="h-4 w-4" />
        浏览所有挑战
      </motion.a>
    </div>
  );
}
