'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Gift,
  Flame,
  Check,
  X,
  Sparkles,
  TrendingUp,
  Trophy,
  Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export interface CheckInRecord {
  date: string; // YYYY-MM-DD
  day: number; // 1-7 (week cycle)
  reward: CheckInReward;
  isMakeup?: boolean; // 是否补签
}

export interface CheckInReward {
  bnc: number;
  exp: number;
  spinTickets?: number; // 转盘次数
  specialTitle?: string; // 特殊称号
  badge?: string; // 徽章
}

interface DailyCheckInProps {
  onCheckIn?: (record: CheckInRecord) => void;
}

export function DailyCheckIn({ onCheckIn }: DailyCheckInProps) {
  const [checkInData, setCheckInData] = useState<CheckInData>(loadCheckInData());
  const [showRewardModal, setShowRewardModal] = useState(false);
  const [todayReward, setTodayReward] = useState<CheckInReward | null>(null);
  const [isCheckedIn, setIsCheckedIn] = useState(false);

  useEffect(() => {
    // 检查今天是否已签到
    const today = getTodayString();
    const checked = checkInData.records.some(r => r.date === today);
    setIsCheckedIn(checked);
  }, [checkInData]);

  const handleCheckIn = () => {
    const today = getTodayString();
    const currentDay = (checkInData.consecutiveDays % 7) + 1;
    const reward = getRewardForDay(currentDay);

    const newRecord: CheckInRecord = {
      date: today,
      day: currentDay,
      reward
    };

    const updatedData: CheckInData = {
      records: [...checkInData.records, newRecord],
      consecutiveDays: checkInData.consecutiveDays + 1,
      totalDays: checkInData.totalDays + 1,
      makeupCards: checkInData.makeupCards,
      lastCheckIn: today
    };

    setCheckInData(updatedData);
    saveCheckInData(updatedData);
    setTodayReward(reward);
    setShowRewardModal(true);
    setIsCheckedIn(true);
    onCheckIn?.(newRecord);

    // 触发庆祝动画
    triggerConfetti();
  };

  const handleMakeup = (dateString: string) => {
    if (checkInData.makeupCards <= 0) {
      alert('没有补签卡了！连续签到7天可获得1张补签卡');
      return;
    }

    const targetDay = (checkInData.totalDays % 7) + 1;
    const reward = getRewardForDay(targetDay);

    const newRecord: CheckInRecord = {
      date: dateString,
      day: targetDay,
      reward,
      isMakeup: true
    };

    const updatedData: CheckInData = {
      ...checkInData,
      records: [...checkInData.records, newRecord],
      totalDays: checkInData.totalDays + 1,
      makeupCards: checkInData.makeupCards - 1
    };

    setCheckInData(updatedData);
    saveCheckInData(updatedData);
  };

  const weekCycle = getWeekCycleStatus(checkInData);

  return (
    <div className="glass-panel rounded-3xl border border-white/5 p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">每日签到</h2>
          <p className="text-sm text-text-secondary">
            连续签到获得丰厚奖励，完成周期还有额外惊喜
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="rounded-full border border-warning/30 bg-warning/10 px-4 py-2">
            <div className="flex items-center gap-2">
              <Flame className="h-5 w-5 text-warning" />
              <span className="text-lg font-bold text-warning">
                {checkInData.consecutiveDays}
              </span>
              <span className="text-sm text-text-secondary">天连签</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="mb-6 grid gap-4 md:grid-cols-4">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Calendar className="h-4 w-4" />
            累计签到
          </div>
          <div className="mt-1 text-2xl font-bold text-white">
            {checkInData.totalDays} 天
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Trophy className="h-4 w-4" />
            本周进度
          </div>
          <div className="mt-1 text-2xl font-bold text-white">
            {weekCycle.currentDay}/7
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Zap className="h-4 w-4" />
            补签卡
          </div>
          <div className="mt-1 text-2xl font-bold text-info">
            {checkInData.makeupCards}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-text-secondary">
            <Gift className="h-4 w-4" />
            累计奖励
          </div>
          <div className="mt-1 text-lg font-bold text-success">
            {calculateTotalRewards(checkInData).bnc} BNC
          </div>
        </div>
      </div>

      {/* Week Cycle Calendar */}
      <div className="mb-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          本周签到进度 ({weekCycle.currentDay}/7)
        </h3>
        <div className="grid grid-cols-7 gap-3">
          {Array.from({ length: 7 }, (_, i) => i + 1).map((day) => {
            const reward = getRewardForDay(day);
            const isCompleted = day <= weekCycle.currentDay;
            const isToday = day === weekCycle.currentDay + 1 && !isCheckedIn;

            return (
              <motion.div
                key={day}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: day * 0.05 }}
                className={`
                  relative overflow-hidden rounded-2xl border p-4 text-center transition-all
                  ${
                    isCompleted
                      ? 'border-success/50 bg-gradient-to-br from-success/20 to-success/5'
                      : isToday
                      ? 'border-warning/50 bg-gradient-to-br from-warning/20 to-warning/5 ring-2 ring-warning/30'
                      : 'border-white/10 bg-white/5'
                  }
                `}
              >
                {/* 完成标记 */}
                {isCompleted && (
                  <div className="absolute right-2 top-2">
                    <Check className="h-5 w-5 text-success" />
                  </div>
                )}

                {/* Today indicator */}
                {isToday && (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-warning"
                  />
                )}

                <div className="mb-2 text-xs font-semibold text-text-secondary">
                  第{day}天
                </div>

                {/* Reward Icon */}
                <div className="mb-2 text-3xl">
                  {day === 7 ? '🎁' : day % 3 === 0 ? '⭐' : '💰'}
                </div>

                {/* Rewards */}
                <div className="space-y-1 text-xs">
                  <div className="font-semibold text-warning">
                    {reward.bnc} BNC
                  </div>
                  <div className="text-text-secondary">
                    +{reward.exp} EXP
                  </div>
                  {reward.spinTickets && (
                    <div className="text-info">
                      +{reward.spinTickets} 转盘
                    </div>
                  )}
                  {day === 7 && reward.specialTitle && (
                    <div className="mt-2 rounded-full bg-bifrost-primary/20 px-2 py-1 text-[10px] font-bold text-bifrost-primary">
                      {reward.specialTitle}
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Check-in Button */}
      {!isCheckedIn && (
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleCheckIn}
          className="group relative w-full overflow-hidden rounded-2xl bg-gradient-to-r from-bifrost-primary to-bifrost-pink p-6 shadow-lg transition-all hover:shadow-xl"
        >
          <motion.div
            animate={{ x: ['0%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          />
          <div className="relative flex items-center justify-center gap-3">
            <Sparkles className="h-6 w-6 text-white" />
            <span className="text-xl font-bold text-white">
              立即签到
            </span>
            <Sparkles className="h-6 w-6 text-white" />
          </div>
        </motion.button>
      )}

      {isCheckedIn && (
        <div className="rounded-2xl border border-success/30 bg-success/10 p-6 text-center">
          <Check className="mx-auto mb-2 h-8 w-8 text-success" />
          <p className="text-lg font-semibold text-success">今日已签到！</p>
          <p className="mt-1 text-sm text-text-secondary">
            明天再来领取奖励吧
          </p>
        </div>
      )}

      {/* Reward Modal */}
      <CheckInRewardModal
        isOpen={showRewardModal}
        reward={todayReward}
        day={weekCycle.currentDay}
        onClose={() => setShowRewardModal(false)}
      />
    </div>
  );
}

// 签到奖励模态框
interface CheckInRewardModalProps {
  isOpen: boolean;
  reward: CheckInReward | null;
  day: number;
  onClose: () => void;
}

function CheckInRewardModal({ isOpen, reward, day, onClose }: CheckInRewardModalProps) {
  if (!reward) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: 50 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <button
                onClick={onClose}
                className="absolute -right-2 -top-2 z-10 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-success/20 to-warning/20 backdrop-blur-xl p-8">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5, repeat: 2 }}
                  className="mx-auto mb-4 text-7xl"
                >
                  {day === 7 ? '🎁' : '💰'}
                </motion.div>

                <h2 className="mb-2 text-center text-3xl font-bold text-white">
                  签到成功！
                </h2>
                <p className="mb-6 text-center text-sm text-text-secondary">
                  第 {day} 天签到奖励已发放
                </p>

                <div className="space-y-3">
                  <div className="flex items-center justify-between rounded-xl border border-warning/30 bg-warning/10 p-4">
                    <span className="text-text-secondary">BNC 代币</span>
                    <span className="text-xl font-bold text-warning">+{reward.bnc}</span>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-info/30 bg-info/10 p-4">
                    <span className="text-text-secondary">经验值</span>
                    <span className="text-xl font-bold text-info">+{reward.exp}</span>
                  </div>

                  {reward.spinTickets && (
                    <div className="flex items-center justify-between rounded-xl border border-bifrost-primary/30 bg-bifrost-primary/10 p-4">
                      <span className="text-text-secondary">转盘次数</span>
                      <span className="text-xl font-bold text-bifrost-primary">
                        +{reward.spinTickets}
                      </span>
                    </div>
                  )}

                  {reward.specialTitle && (
                    <div className="rounded-xl border border-success/30 bg-success/10 p-4 text-center">
                      <Trophy className="mx-auto mb-2 h-6 w-6 text-success" />
                      <p className="text-sm text-text-secondary">特殊称号</p>
                      <p className="mt-1 text-lg font-bold text-success">{reward.specialTitle}</p>
                    </div>
                  )}
                </div>

                <button
                  onClick={onClose}
                  className="mt-6 w-full rounded-full bg-white/10 px-6 py-4 font-bold text-white transition-all hover:bg-white/20"
                >
                  太棒了！
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============ Helper Functions ============

interface CheckInData {
  records: CheckInRecord[];
  consecutiveDays: number;
  totalDays: number;
  makeupCards: number;
  lastCheckIn: string;
}

function loadCheckInData(): CheckInData {
  if (typeof window === 'undefined') {
    return {
      records: [],
      consecutiveDays: 0,
      totalDays: 0,
      makeupCards: 2,
      lastCheckIn: ''
    };
  }

  const stored = localStorage.getItem('bifrost_checkin_data');
  if (!stored) {
    return {
      records: [],
      consecutiveDays: 0,
      totalDays: 0,
      makeupCards: 2,
      lastCheckIn: ''
    };
  }

  return JSON.parse(stored);
}

function saveCheckInData(data: CheckInData) {
  if (typeof window === 'undefined') return;
  localStorage.setItem('bifrost_checkin_data', JSON.stringify(data));
}

function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

function getRewardForDay(day: number): CheckInReward {
  const baseRewards: CheckInReward[] = [
    { bnc: 10, exp: 5 }, // Day 1
    { bnc: 15, exp: 8 }, // Day 2
    { bnc: 20, exp: 10, spinTickets: 1 }, // Day 3
    { bnc: 25, exp: 15 }, // Day 4
    { bnc: 30, exp: 18 }, // Day 5
    { bnc: 40, exp: 20, spinTickets: 2 }, // Day 6
    { bnc: 100, exp: 50, spinTickets: 3, specialTitle: '每周常客', badge: 'weekly_champion' } // Day 7
  ];

  return baseRewards[day - 1] || baseRewards[0];
}

function getWeekCycleStatus(data: CheckInData) {
  return {
    currentDay: data.consecutiveDays % 7,
    isComplete: data.consecutiveDays > 0 && data.consecutiveDays % 7 === 0
  };
}

function calculateTotalRewards(data: CheckInData) {
  return data.records.reduce(
    (acc, record) => ({
      bnc: acc.bnc + record.reward.bnc,
      exp: acc.exp + record.reward.exp,
      spinTickets: acc.spinTickets + (record.reward.spinTickets || 0)
    }),
    { bnc: 0, exp: 0, spinTickets: 0 }
  );
}

function triggerConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#FFD700', '#FFA500', '#FF6347']
  });
}
