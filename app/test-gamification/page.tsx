'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, CheckCircle, Trophy, TrendingUp, Calendar } from 'lucide-react';
import { DailyCheckIn } from '@/components/gamification/DailyCheckIn';
import { AchievementUnlockModal, useAchievementUnlock } from '@/components/gamification/AchievementUnlockModal';
import { SocialFeed, useSocialFeed } from '@/components/social/SocialFeed';
import { Achievement } from '@/data/mock';

export default function GameficationTestPage() {
  const { unlockedAchievement, isModalOpen, checkAndUnlock, closeModal } = useAchievementUnlock();
  const { events, generateMockEvent } = useSocialFeed();
  const [testResults, setTestResults] = useState<{ name: string; status: 'success' | 'pending' }[]>([
    { name: '成就解锁动画系统', status: 'pending' },
    { name: '排行榜实时通知', status: 'pending' },
    { name: '每日签到系统', status: 'pending' }
  ]);

  const triggerAchievementTest = () => {
    const testAchievement: Achievement = {
      id: 'test_achievement',
      title: '测试成就',
      description: '这是一个测试成就，用于展示解锁动画',
      progress: 100,
      target: 100,
      reward: '100 BNC + 50 EXP',
      status: 'unlocked'
    };

    checkAndUnlock(testAchievement);
    updateTestStatus('成就解锁动画系统', 'success');
  };

  const triggerRankNotificationTest = () => {
    generateMockEvent();
    updateTestStatus('排行榜实时通知', 'success');
  };

  const updateTestStatus = (name: string, status: 'success' | 'pending') => {
    setTestResults(prev =>
      prev.map(test => test.name === name ? { ...test, status } : test)
    );
  };

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/arena"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回战绩大厅
          </Link>

          <h1 className="text-4xl font-bold text-white">🎮 游戏化功能测试中心</h1>
          <p className="mt-2 text-lg text-text-secondary">
            测试新增的游戏化功能并查看效果
          </p>
        </div>

        {/* Test Results Summary */}
        <div className="glass-panel mb-8 rounded-3xl border border-white/5 p-6">
          <h2 className="mb-4 text-xl font-bold text-white">功能测试状态</h2>
          <div className="space-y-3">
            {testResults.map((test) => (
              <div
                key={test.name}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="text-white">{test.name}</span>
                <div className="flex items-center gap-2">
                  {test.status === 'success' ? (
                    <CheckCircle className="h-5 w-5 text-success" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-text-secondary" />
                  )}
                  <span className={test.status === 'success' ? 'text-success' : 'text-text-secondary'}>
                    {test.status === 'success' ? '已测试' : '待测试'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Test Sections */}
        <div className="space-y-8">
          {/* 1. Achievement Unlock Test */}
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Trophy className="h-6 w-6 text-warning" />
              <h2 className="text-2xl font-bold text-white">1. 成就解锁动画测试</h2>
            </div>

            <p className="mb-4 text-text-secondary">
              点击下方按钮触发成就解锁动画，查看五彩纸屑效果、成就详情展示和分享功能。
            </p>

            <button
              onClick={triggerAchievementTest}
              className="rounded-full bg-gradient-to-r from-purple-500 to-pink-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              触发成就解锁
            </button>

            <div className="mt-4 rounded-xl border border-success/30 bg-success/10 p-4">
              <p className="text-sm text-success">
                ✓ 功能包括：全屏模态框、五彩纸屑动画、奖励详情展示、社交分享按钮
              </p>
            </div>
          </div>

          {/* 2. Rank Notification Test */}
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <TrendingUp className="h-6 w-6 text-info" />
              <h2 className="text-2xl font-bold text-white">2. 排行榜实时通知测试</h2>
            </div>

            <p className="mb-4 text-text-secondary">
              点击下方按钮模拟排名变化通知，通知将显示在屏幕右下角。
            </p>

            <button
              onClick={triggerRankNotificationTest}
              className="rounded-full bg-gradient-to-r from-blue-500 to-cyan-600 px-6 py-3 font-bold text-white shadow-lg transition-all hover:scale-105"
            >
              触发排名通知
            </button>

            <div className="mt-4 rounded-xl border border-info/30 bg-info/10 p-4">
              <p className="text-sm text-info">
                ✓ 功能包括：排名上升/下降通知、被超越提醒、冲榜庆祝、排名趋势分析
              </p>
            </div>
          </div>

          {/* 3. Daily Check-in Test */}
          <div className="glass-panel rounded-3xl border border-white/5 p-6">
            <div className="mb-6 flex items-center gap-3">
              <Calendar className="h-6 w-6 text-success" />
              <h2 className="text-2xl font-bold text-white">3. 每日签到系统测试</h2>
            </div>

            <p className="mb-4 text-text-secondary">
              完整的每日签到系统，包含周期奖励、补签卡、连续签到统计等功能。
            </p>

            <DailyCheckIn
              onCheckIn={(record) => {
                console.log('签到记录:', record);
                updateTestStatus('每日签到系统', 'success');
              }}
            />

            <div className="mt-6 rounded-xl border border-success/30 bg-success/10 p-4">
              <p className="text-sm text-success">
                ✓ 功能包括：7天周期、递增奖励、补签卡、签到日历、奖励模态框、累计统计
              </p>
            </div>
          </div>
        </div>

        {/* Feature Summary */}
        <div className="glass-panel mt-8 rounded-3xl border border-bifrost-primary/20 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">🎯 功能亮点总结</h2>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
              <div className="mb-2 text-3xl">🏆</div>
              <h3 className="mb-1 font-bold text-white">成就解锁增强</h3>
              <p className="text-xs text-text-secondary">
                全屏庆祝动画、五彩纸屑效果、社交分享、音效系统
              </p>
            </div>

            <div className="rounded-xl border border-info/30 bg-info/10 p-4">
              <div className="mb-2 text-3xl">📈</div>
              <h3 className="mb-1 font-bold text-white">排名实时通知</h3>
              <p className="text-xs text-text-secondary">
                排名变化检测、被超越提醒、目标追踪、趋势分析
              </p>
            </div>

            <div className="rounded-xl border border-success/30 bg-success/10 p-4">
              <div className="mb-2 text-3xl">📅</div>
              <h3 className="mb-1 font-bold text-white">每日签到系统</h3>
              <p className="text-xs text-text-secondary">
                7天周期、递增奖励、补签卡、特殊称号、累计统计
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps */}
        <div className="glass-panel mt-8 rounded-3xl border border-white/5 p-6">
          <h2 className="mb-4 text-2xl font-bold text-white">🚀 接下来的计划</h2>

          <div className="space-y-3 text-text-secondary">
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-bifrost-primary" />
              <p>进度里程碑庆祝系统 - 收益、质押天数、排名突破自动庆祝</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-bifrost-primary" />
              <p>战队对战系统 - 团队间发起挑战，实时战况播报</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-bifrost-primary" />
              <p>段位赛季系统 - 月度/季度赛季，软重置机制</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-bifrost-primary" />
              <p>好友系统与PvP - 一对一收益竞技，复仇机制</p>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 flex-shrink-0 rounded-full bg-bifrost-primary" />
              <p>个性化装扮系统 - 头像框、称号、皮肤收集</p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals and Overlays */}
      <AchievementUnlockModal
        achievement={unlockedAchievement}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      <SocialFeed events={events} position="bottom-right" maxVisible={3} />
    </div>
  );
}
