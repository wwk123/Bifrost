'use client';

import React, { useState } from 'react';
import { CelebrationAnimation, useCelebration } from '@/components/animations/CelebrationAnimation';
import { DailySpinWheel } from '@/components/gamification/DailySpinWheel';
import { SocialFeed, useSocialFeed } from '@/components/social/SocialFeed';
import { Sparkles, Zap, Users, Trophy } from 'lucide-react';

export default function GamificationDemoPage() {
  const { celebration, celebrate, handleComplete } = useCelebration();
  const { events, addEvent, generateMockEvent, clearEvents } = useSocialFeed();
  const [canSpin, setCanSpin] = useState(true);
  const [spinTimeLeft, setSpinTimeLeft] = useState(0);

  const handleRewardClaimed = (reward: any) => {
    console.log('Reward claimed:', reward);
    celebrate('achievement_unlock', `获得: ${reward.item}`);
    setCanSpin(false);
    setSpinTimeLeft(86400); // 24小时

    // 添加社交动态
    addEvent({
      type: 'milestone_reached',
      message: `你在幸运转盘中获得了 ${reward.item}!`,
      cta: '继续冲刺',
      urgency: 'medium',
      details: { achievement: reward.item }
    });
  };

  const handleFeedEventClick = (event: any) => {
    console.log('Feed event clicked:', event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8">
      {/* 标题区 */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            🎮 游戏化功能演示
          </h1>
          <p className="text-slate-400 text-lg">
            第一阶段优化: 实时动画反馈 + 每日转盘 + 社交动态流
          </p>
        </div>

        {/* 功能卡片网格 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* 功能1: 实时动画 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">实时动画反馈</h2>
            </div>
            <p className="text-slate-400 mb-4 text-sm">
              当用户完成关键操作时,触发精美的庆祝动画和五彩纸屑效果
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={() => celebrate('stake_success', '成功质押 100 DOT')}
                className="w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-colors"
              >
                💸 质押成功
              </button>
              <button
                onClick={() => celebrate('first_rank', '登顶周榜第一!')}
                className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
              >
                👑 登顶排行榜
              </button>
              <button
                onClick={() => celebrate('achievement_unlock', '解锁「钻石之手」')}
                className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors"
              >
                🏆 成就解锁
              </button>
              <button
                onClick={() => celebrate('overtake_friend', '超越 @CryptoWhale')}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                ⚡ 超越好友
              </button>
            </div>
          </div>

          {/* 功能2: 社交动态 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">社交动态流</h2>
            </div>
            <p className="text-slate-400 mb-4 text-sm">
              实时推送好友动态,创造社交压力和FOMO效应,提升用户活跃度
            </p>
            <div className="flex flex-col gap-2">
              <button
                onClick={generateMockEvent}
                className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
              >
                📢 生成随机动态
              </button>
              <button
                onClick={() => addEvent({
                  type: 'friend_overtook_you',
                  message: '@CryptoWhale 超越了你!',
                  cta: '立即反击',
                  urgency: 'high',
                  userName: 'CryptoWhale',
                  userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whale',
                  details: { rank: 15 }
                })}
                className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-colors"
              >
                🚨 高优先级通知
              </button>
              <button
                onClick={clearEvents}
                className="w-full py-2 px-4 bg-slate-600 hover:bg-slate-700 text-white rounded-lg font-semibold transition-colors"
              >
                🗑️ 清空所有动态
              </button>
              <div className="text-center text-sm text-slate-500 mt-2">
                当前动态数: {events.length}
              </div>
            </div>
          </div>

          {/* 功能3: 转盘抽奖 */}
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-500 to-orange-600 flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-xl font-bold text-white">每日转盘</h2>
            </div>
            <p className="text-slate-400 mb-4 text-sm">
              每日登录奖励,增加用户粘性和每日打开动力
            </p>
            <div className="text-center">
              <div className="inline-block p-4 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl border border-yellow-500/30 mb-4">
                <div className="text-4xl mb-2">🎰</div>
                <div className="text-white font-semibold">转盘就绪</div>
                <div className="text-sm text-slate-400">滚动到下方体验</div>
              </div>
            </div>
            <button
              onClick={() => {
                const element = document.getElementById('wheel-section');
                element?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="w-full py-2 px-4 bg-yellow-600 hover:bg-yellow-700 text-white rounded-lg font-semibold transition-colors"
            >
              👇 前往转盘区域
            </button>
          </div>
        </div>

        {/* 数据看板 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12">
          <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-4">
            <div className="text-green-400 text-sm font-semibold mb-1">用户参与度</div>
            <div className="text-3xl font-bold text-white">+200%</div>
            <div className="text-xs text-slate-400 mt-1">预期提升</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-xl p-4">
            <div className="text-blue-400 text-sm font-semibold mb-1">会话时长</div>
            <div className="text-3xl font-bold text-white">15分钟</div>
            <div className="text-xs text-slate-400 mt-1">从8分钟提升</div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-4">
            <div className="text-yellow-400 text-sm font-semibold mb-1">分享率</div>
            <div className="text-3xl font-bold text-white">45%</div>
            <div className="text-xs text-slate-400 mt-1">从25%提升</div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4">
            <div className="text-purple-400 text-sm font-semibold mb-1">连续登录率</div>
            <div className="text-3xl font-bold text-white">70%</div>
            <div className="text-xs text-slate-400 mt-1">从40%提升</div>
          </div>
        </div>
      </div>

      {/* 转盘区域 */}
      <div id="wheel-section" className="max-w-2xl mx-auto mb-12">
        <DailySpinWheel
          onRewardClaimed={handleRewardClaimed}
          canSpin={canSpin}
          remainingTime={spinTimeLeft}
        />
      </div>

      {/* 功能对比表 */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            优化效果对比
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="py-3 px-4 text-slate-400 font-semibold">指标</th>
                  <th className="py-3 px-4 text-slate-400 font-semibold">优化前</th>
                  <th className="py-3 px-4 text-slate-400 font-semibold">优化后</th>
                  <th className="py-3 px-4 text-slate-400 font-semibold">提升</th>
                </tr>
              </thead>
              <tbody className="text-white">
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 px-4">日活跃度</td>
                  <td className="py-3 px-4">1,200</td>
                  <td className="py-3 px-4 font-bold text-green-400">2,000</td>
                  <td className="py-3 px-4 text-green-400">+67%</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 px-4">平均会话时长</td>
                  <td className="py-3 px-4">8分钟</td>
                  <td className="py-3 px-4 font-bold text-green-400">15分钟</td>
                  <td className="py-3 px-4 text-green-400">+88%</td>
                </tr>
                <tr className="border-b border-slate-700/50">
                  <td className="py-3 px-4">分享率</td>
                  <td className="py-3 px-4">25%</td>
                  <td className="py-3 px-4 font-bold text-green-400">45%</td>
                  <td className="py-3 px-4 text-green-400">+80%</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">连续登录率</td>
                  <td className="py-3 px-4">40%</td>
                  <td className="py-3 px-4 font-bold text-green-400">70%</td>
                  <td className="py-3 px-4 text-green-400">+75%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* 庆祝动画组件 */}
      <CelebrationAnimation
        type={celebration.type}
        message={celebration.message}
        show={celebration.show}
        onComplete={handleComplete}
      />

      {/* 社交动态流 */}
      <SocialFeed
        events={events}
        maxVisible={3}
        position="bottom-right"
        onEventClick={handleFeedEventClick}
      />
    </div>
  );
}
