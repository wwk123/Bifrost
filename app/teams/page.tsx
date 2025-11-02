import { Metadata } from 'next';
import Link from 'next/link';
import { Shield, Users, Trophy, TrendingUp } from 'lucide-react';

import { TeamCompetitionSection } from '@/components/dashboard';

export const metadata: Metadata = {
  title: '战队营地 - Bifrost Arena',
  description: '组建战队,协同作战,共享收益加成。团队的力量让DeFi收益倍增!',
  openGraph: {
    title: '🛡️ 战队营地 - Bifrost Arena',
    description: '加入或创建战队,获得团队收益加成!',
    images: ['/og-teams.png']
  }
};

export default function TeamsPage() {
  return (
    <div className="flex flex-col gap-10">
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-info/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-info/20 blur-3xl" />
        <div className="relative">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-info/30 to-arena-blue/30">
              <span className="text-5xl">🛡️</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">战队营地</h1>
              <p className="text-lg text-text-secondary">Team Competition · 组队竞技,共享荣耀</p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-info" />
                <span className="text-sm text-text-secondary">活跃战队</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-white">42</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-success" />
                <span className="text-sm text-text-secondary">总成员</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-success">520</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-warning" />
                <span className="text-sm text-text-secondary">顶级战队</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-warning">DeFi Kings</div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-bifrost-primary" />
                <span className="text-sm text-text-secondary">团队加成</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-bifrost-primary">+15%</div>
            </div>
          </div>
        </div>
      </div>

      <TeamCompetitionSection />

      <div className="glass-panel rounded-3xl border border-bifrost-primary/20 p-8 text-center">
        <div className="mb-4 text-5xl">✨</div>
        <h2 className="mb-3 text-2xl font-bold text-white">创建你的战队</h2>
        <p className="mx-auto mb-6 max-w-2xl text-text-secondary">
          邀请好友组建战队,共同挑战竞技场,获得团队收益加成和专属奖励!
        </p>
        <Link
          href="/teams/create"
          className="inline-flex items-center gap-2 rounded-full bg-bifrost-primary px-8 py-3 font-semibold text-white"
        >
          创建战队
        </Link>
      </div>
    </div>
  );
}
