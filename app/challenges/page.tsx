import { Metadata } from 'next';
import Link from 'next/link';
import { Swords, Target, Award, Clock } from 'lucide-react';

import { ChallengesSection } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '挑战塔 - Bifrost Arena',
  description: '完成每周挑战,解锁成就和特殊奖励。挑战自我,攀登收益高峰!',
  openGraph: {
    title: '⚔️ 挑战塔 - Bifrost Arena',
    description: '参与挑战,赢取丰厚奖励!',
    images: ['/og-challenges.png']
  }
};

export default function ChallengesPage() {
  return (
    <div className="flex flex-col gap-10">
      {/* Zone Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-warning/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-warning/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-error/15 blur-3xl" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-warning/30 to-error/30">
              <span className="text-5xl">⚔️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">挑战塔</h1>
              <p className="text-lg text-text-secondary">Challenges · 完成任务,赢取奖励</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">进行中</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">8</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Award className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">已完成</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">24</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">剩余时间</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-info">3天</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Swords className="h-5 w-5 text-bifrost-primary" />
                <span className="text-sm text-text-secondary">总奖励</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-bifrost-primary">5,200 BNC</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-3">
        <button className="rounded-full border border-warning/50 bg-warning/20 px-6 py-2.5 text-sm font-semibold text-white">
          🔥 本周挑战
        </button>
        <Link
          href="/challenges/active"
          className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
        >
          ⚡ 进行中
        </Link>
        <Link
          href="/challenges/completed"
          className="rounded-full border border-white/10 px-6 py-2.5 text-sm font-semibold text-text-secondary transition-all hover:border-white/20 hover:text-white"
        >
          ✅ 已完成
        </Link>
      </div>

      <ChallengesSection />

      {/* Tips */}
      <div className="glass-panel rounded-2xl border border-info/20 p-6">
        <div className="mb-4 flex items-center gap-3">
          <span className="text-2xl">💡</span>
          <h3 className="text-xl font-bold text-white">挑战攻略</h3>
        </div>
        <ul className="space-y-2 text-text-secondary">
          <li>✨ 完成更多挑战可以解锁特殊成就和头衔</li>
          <li>🎯 连续完成挑战可获得额外连胜奖励</li>
          <li>🤝 组队完成挑战可以获得团队加成</li>
          <li>⏰ 挑战每周一重置,记得及时完成</li>
        </ul>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Link
          href="/arena"
          className="group glass-panel rounded-2xl border border-success/20 p-6 transition-all hover:border-success/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">📊</span>
            <h3 className="text-xl font-bold text-white">查看挑战进度</h3>
          </div>
          <p className="text-sm text-text-secondary">返回战绩大厅查看挑战完成情况</p>
        </Link>

        <Link
          href="/teams"
          className="group glass-panel rounded-2xl border border-info/20 p-6 transition-all hover:border-info/40 hover:shadow-xl"
        >
          <div className="mb-3 flex items-center gap-3">
            <span className="text-3xl">🛡️</span>
            <h3 className="text-xl font-bold text-white">组队挑战</h3>
          </div>
          <p className="text-sm text-text-secondary">和战队一起完成团队挑战</p>
        </Link>
      </div>
    </div>
  );
}
