'use client';

import { motion } from 'framer-motion';
import { Users, Shield, Globe, Lock, TrendingUp, Award } from 'lucide-react';
import { TEAM_COLOR_THEMES } from './TeamIconSelector';

interface TeamPreviewCardProps {
  name: string;
  description: string;
  icon: string;
  colorTheme: string;
  maxMembers: number;
  minStakeToJoin: number;
  isPublic: boolean;
  requireApproval: boolean;
}

export function TeamPreviewCard({
  name,
  description,
  icon,
  colorTheme,
  maxMembers,
  minStakeToJoin,
  isPublic,
  requireApproval
}: TeamPreviewCardProps) {
  const theme = TEAM_COLOR_THEMES.find(t => t.id === colorTheme) || TEAM_COLOR_THEMES[0];

  // 计算初始加成
  const captainBonus = 0.1;
  const totalMultiplier = 1 + captainBonus;

  return (
    <div className="space-y-4">
      {/* 主卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel rounded-2xl border border-white/10 p-6 relative overflow-hidden"
      >
        {/* 背景渐变 */}
        <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient} opacity-50`} />

        <div className="relative space-y-4">
          {/* 头部 */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              {/* 图标 */}
              <div className={`
                h-16 w-16 rounded-2xl border-2 ${theme.border}
                flex items-center justify-center text-4xl
                bg-gradient-to-br ${theme.gradient}
              `}>
                {icon || '🛡️'}
              </div>

              {/* 名称和状态 */}
              <div>
                <h3 className="text-xl font-bold text-white">
                  {name || '我的战队'}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  {isPublic ? (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-info/20 text-info text-xs">
                      <Globe className="h-3 w-3" />
                      公开
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-warning/20 text-warning text-xs">
                      <Lock className="h-3 w-3" />
                      私密
                    </span>
                  )}
                  {requireApproval && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs">
                      <Shield className="h-3 w-3" />
                      需审批
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 排名徽章 */}
            <div className="text-center">
              <div className="text-2xl font-bold text-bifrost-primary">NEW</div>
              <div className="text-xs text-text-secondary">新战队</div>
            </div>
          </div>

          {/* 描述 */}
          <p className="text-text-secondary text-sm line-clamp-2 min-h-[2.5rem]">
            {description || '暂无描述...'}
          </p>

          {/* 统计数据 */}
          <div className="grid grid-cols-3 gap-3">
            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                <Users className="h-3 w-3" />
                成员
              </div>
              <div className="text-lg font-bold text-white">1/{maxMembers}</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                <TrendingUp className="h-3 w-3" />
                总质押
              </div>
              <div className="text-lg font-bold text-white">0</div>
            </div>

            <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div className="flex items-center gap-1 text-xs text-text-secondary mb-1">
                <Award className="h-3 w-3" />
                加成
              </div>
              <div className="text-lg font-bold text-bifrost-primary">
                +{(totalMultiplier - 1) * 100}%
              </div>
            </div>
          </div>

          {/* 成员槽位预览 */}
          <div className="border-t border-white/10 pt-4">
            <div className="text-xs font-medium text-white mb-2">成员槽位</div>
            <div className="flex gap-2">
              {/* 队长槽位 */}
              <div className="relative">
                <div className="h-10 w-10 rounded-lg border-2 border-bifrost-primary bg-gradient-to-br from-bifrost-primary/20 to-bifrost-primary/10 flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-bifrost-primary flex items-center justify-center">
                  <span className="text-[10px]">👑</span>
                </div>
              </div>

              {/* 空槽位 */}
              {Array.from({ length: maxMembers - 1 }).map((_, index) => (
                <div
                  key={index}
                  className="h-10 w-10 rounded-lg border border-dashed border-white/20 bg-white/5 flex items-center justify-center"
                >
                  <span className="text-xs text-text-secondary">+</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 入队要求卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass-panel rounded-2xl border border-white/10 p-4"
      >
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <Shield className="h-4 w-4 text-info" />
          入队要求
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">最低质押</span>
            <span className="font-semibold text-white">
              {minStakeToJoin > 0 ? `${minStakeToJoin} DOT` : '无要求'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">是否公开</span>
            <span className={`font-semibold ${isPublic ? 'text-info' : 'text-warning'}`}>
              {isPublic ? '是' : '否'}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">需要审批</span>
            <span className={`font-semibold ${requireApproval ? 'text-warning' : 'text-success'}`}>
              {requireApproval ? '是' : '否'}
            </span>
          </div>
        </div>
      </motion.div>

      {/* 加成预览卡片 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-panel rounded-2xl border border-white/10 p-4"
      >
        <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-success" />
          收益加成预览
        </h4>

        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-text-secondary">队长加成</span>
            <span className="font-semibold text-bifrost-primary">+10%</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">成员加成</span>
            <span className="font-semibold text-text-secondary">待解锁</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-text-secondary">协同加成</span>
            <span className="font-semibold text-text-secondary">待解锁</span>
          </div>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between">
            <span className="text-white font-medium">总加成</span>
            <span className="font-bold text-lg text-bifrost-primary">
              {(totalMultiplier * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div className="mt-3 p-2 rounded-lg bg-info/10 border border-info/20">
          <p className="text-xs text-info">
            💡 招募更多成员可以解锁更高的团队加成!
          </p>
        </div>
      </motion.div>
    </div>
  );
}
