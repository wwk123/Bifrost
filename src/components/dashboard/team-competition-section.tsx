"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Crown, TrendingUp, Award, Plus, Search } from 'lucide-react';
import { formatCurrency } from '@/utils/format';
import type { Team } from '@/types/team';

// Mock数据
const mockTeam: Team = {
  id: 'team-1',
  name: 'Bifrost Warriors',
  description: '专注于多链质押策略,追求稳健收益',
  captain: '0x123...',
  maxMembers: 10,
  members: [
    {
      address: '0x123...',
      displayName: '🐋 Whale',
      avatar: '/avatars/whale.png',
      role: 'captain',
      contribution: {
        staked: 5000,
        weeklyEarnings: 450,
        referrals: 3
      },
      individualRank: 1,
      achievements: ['first-stake', 'whale-status', 'diamond-hands'],
      joinedAt: new Date('2025-01-01')
    },
    {
      address: '0x456...',
      displayName: '📈 Trader',
      avatar: '/avatars/trader.png',
      role: 'member',
      contribution: {
        staked: 3500,
        weeklyEarnings: 320,
        referrals: 2
      },
      individualRank: 5,
      achievements: ['first-stake', 'thousand-profit'],
      joinedAt: new Date('2025-01-15')
    },
    {
      address: '0x789...',
      displayName: '🎯 Alice',
      avatar: '/avatars/alice.png',
      role: 'member',
      contribution: {
        staked: 2500,
        weeklyEarnings: 210,
        referrals: 5
      },
      individualRank: 8,
      achievements: ['first-stake', 'referral-hero'],
      joinedAt: new Date('2025-02-01')
    }
  ],
  stats: {
    totalStaked: 11000,
    weeklyEarnings: 980,
    averageRoi: 8.9,
    teamRank: 3
  },
  bonuses: {
    memberCount: 0.04,
    synergy: 0.15,
    achievements: 0.04,
    captain: 0.1,
    totalMultiplier: 1.33
  },
  settings: {
    isPublic: true,
    requireApproval: false,
    minStakeToJoin: 100
  },
  createdAt: new Date('2025-01-01')
};

interface BonusCardProps {
  title: string;
  value: string;
  description: string;
  highlight?: boolean;
}

function BonusCard({ title, value, description, highlight }: BonusCardProps) {
  return (
    <div
      className={`rounded-2xl border px-4 py-3 ${
        highlight
          ? 'border-bifrost-pink bg-bifrost-pink/10'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="text-xs text-text-secondary">{title}</div>
      <div
        className={`text-2xl font-bold ${highlight ? 'text-bifrost-pink' : 'text-white'}`}
      >
        {value}
      </div>
      <div className="text-xs text-text-secondary">{description}</div>
    </div>
  );
}

export function TeamCompetitionSection() {
  const [team, setTeam] = useState<Team | null>(mockTeam);
  const [showCreateModal, setShowCreateModal] = useState(false);

  if (!team) {
    return (
      <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Users className="mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-2xl font-bold text-white">加入团队,共同竞技</h2>
          <p className="mb-6 text-gray-400">组建团队可获得最高 70% 收益加成</p>

          <div className="flex gap-4">
            <button
              onClick={() => setShowCreateModal(true)}
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              <Plus className="mr-2 inline h-4 w-4" />
              创建团队
            </button>
            <button className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white hover:bg-gray-600">
              <Search className="mr-2 inline h-4 w-4" />
              浏览团队
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="space-y-6">
        {/* 团队头部卡片 */}
        <div className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-900/50 to-purple-900/50 p-6">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="mb-2 text-3xl font-bold text-white">{team.name}</h1>
              <p className="mb-4 text-gray-300">{team.description}</p>

              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-white">
                    {team.members.length}/{team.maxMembers} 成员
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-400" />
                  <span className="text-white">排名 #{team.stats.teamRank}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="h-4 w-4 text-yellow-400" />
                  <span className="text-white">
                    {team.bonuses.totalMultiplier.toFixed(2)}x 加成
                  </span>
                </div>
              </div>
            </div>

            {/* 团队统计 */}
            <div className="text-right">
              <div className="mb-1 text-sm text-gray-400">团队周收益</div>
              <div className="text-3xl font-bold text-green-400">
                {formatCurrency(team.stats.weeklyEarnings)}
              </div>
              <div className="mt-2 text-sm text-gray-400">
                总质押: {team.stats.totalStaked.toFixed(0)} DOT
              </div>
            </div>
          </div>
        </div>

        {/* 加成明细 */}
        <div className="rounded-xl bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">🚀 团队加成明细</h3>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <BonusCard
              title="成员加成"
              value={`+${(team.bonuses.memberCount * 100).toFixed(0)}%`}
              description={`${team.members.length} 名成员`}
            />
            <BonusCard
              title="协同加成"
              value={`+${(team.bonuses.synergy * 100).toFixed(0)}%`}
              description="团队活跃度"
            />
            <BonusCard
              title="成就加成"
              value={`+${(team.bonuses.achievements * 100).toFixed(0)}%`}
              description="团队总成就"
            />
            <BonusCard
              title="总乘数"
              value={`${team.bonuses.totalMultiplier.toFixed(2)}x`}
              description="综合加成"
              highlight
            />
          </div>
        </div>

        {/* 成员列表 */}
        <div className="rounded-xl bg-gray-800 p-6">
          <h3 className="mb-4 text-lg font-semibold text-white">👥 团队成员</h3>
          <div className="space-y-3">
            {team.members.map((member) => (
              <motion.div
                key={member.address}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600" />
                    {member.role === 'captain' && (
                      <Crown className="absolute -right-1 -top-1 h-5 w-5 text-yellow-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-white">
                      {member.displayName}
                      {member.role === 'captain' && (
                        <span className="ml-2 text-xs text-yellow-400">(队长)</span>
                      )}
                    </div>
                    <div className="text-xs text-text-secondary">
                      质押: {member.contribution.staked.toFixed(0)} DOT
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm font-semibold text-green-400">
                    {formatCurrency(member.contribution.weeklyEarnings)}
                  </div>
                  <div className="text-xs text-text-secondary">本周收益</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
