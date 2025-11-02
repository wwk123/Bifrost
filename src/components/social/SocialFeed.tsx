'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  Trophy,
  Users,
  Zap,
  X,
  ExternalLink,
  MessageCircle
} from 'lucide-react';

export type FeedEventType =
  | 'friend_overtook_you'
  | 'friend_unlocked'
  | 'team_won'
  | 'new_rank_achieved'
  | 'milestone_reached'
  | 'challenge_completed';

export type UrgencyLevel = 'low' | 'medium' | 'high';

export interface SocialFeedEvent {
  id: string;
  type: FeedEventType;
  message: string;
  cta: string;
  urgency: UrgencyLevel;
  timestamp: Date;
  userName?: string;
  userAvatar?: string;
  details?: {
    rank?: number;
    amount?: number;
    achievement?: string;
  };
}

interface SocialFeedProps {
  events?: SocialFeedEvent[];
  maxVisible?: number;
  position?: 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left';
  onEventClick?: (event: SocialFeedEvent) => void;
}

export function SocialFeed({
  events = [],
  maxVisible = 3,
  position = 'bottom-right',
  onEventClick
}: SocialFeedProps) {
  const [visibleEvents, setVisibleEvents] = useState<SocialFeedEvent[]>([]);
  const [dismissedIds, setDismissedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    // 只显示未被关闭的事件
    const filtered = events
      .filter(e => !dismissedIds.has(e.id))
      .slice(0, maxVisible);

    setVisibleEvents(filtered);
  }, [events, dismissedIds, maxVisible]);

  const handleDismiss = (id: string) => {
    setDismissedIds(prev => new Set([...prev, id]));
  };

  const handleClick = (event: SocialFeedEvent) => {
    onEventClick?.(event);
    handleDismiss(event.id);
  };

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-right':
        return 'bottom-6 right-6';
      case 'top-right':
        return 'top-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'top-left':
        return 'top-6 left-6';
    }
  };

  return (
    <div className={`fixed ${getPositionClasses()} z-40 flex flex-col gap-3 max-w-md`}>
      <AnimatePresence mode="popLayout">
        {visibleEvents.map((event, index) => (
          <SocialFeedCard
            key={event.id}
            event={event}
            index={index}
            onDismiss={handleDismiss}
            onClick={handleClick}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

interface SocialFeedCardProps {
  event: SocialFeedEvent;
  index: number;
  onDismiss: (id: string) => void;
  onClick: (event: SocialFeedEvent) => void;
}

function SocialFeedCard({ event, index, onDismiss, onClick }: SocialFeedCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getEventConfig = (type: FeedEventType) => {
    switch (type) {
      case 'friend_overtook_you':
        return {
          icon: TrendingUp,
          color: 'from-red-500 to-orange-600',
          borderColor: 'border-red-500/50',
          bgColor: 'bg-red-500/10'
        };
      case 'friend_unlocked':
        return {
          icon: Trophy,
          color: 'from-yellow-500 to-yellow-600',
          borderColor: 'border-yellow-500/50',
          bgColor: 'bg-yellow-500/10'
        };
      case 'team_won':
        return {
          icon: Users,
          color: 'from-green-500 to-emerald-600',
          borderColor: 'border-green-500/50',
          bgColor: 'bg-green-500/10'
        };
      case 'new_rank_achieved':
        return {
          icon: TrendingUp,
          color: 'from-blue-500 to-cyan-600',
          borderColor: 'border-blue-500/50',
          bgColor: 'bg-blue-500/10'
        };
      case 'milestone_reached':
        return {
          icon: Zap,
          color: 'from-purple-500 to-pink-600',
          borderColor: 'border-purple-500/50',
          bgColor: 'bg-purple-500/10'
        };
      case 'challenge_completed':
        return {
          icon: Trophy,
          color: 'from-orange-500 to-red-600',
          borderColor: 'border-orange-500/50',
          bgColor: 'bg-orange-500/10'
        };
    }
  };

  const getUrgencyIndicator = (urgency: UrgencyLevel) => {
    switch (urgency) {
      case 'high':
        return (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
          />
        );
      case 'medium':
        return <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-500 rounded-full" />;
      default:
        return null;
    }
  };

  const config = getEventConfig(event.type);
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.8 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.8 }}
      transition={{
        type: "spring",
        damping: 20,
        stiffness: 300,
        delay: index * 0.1
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative"
    >
      {/* 紧急程度指示器 */}
      {getUrgencyIndicator(event.urgency)}

      <div
        className={`
          relative overflow-hidden
          bg-slate-800/95 backdrop-blur-lg
          rounded-xl border-2 ${config.borderColor}
          shadow-xl
          transition-all duration-300
          ${isHovered ? 'shadow-2xl scale-105' : ''}
        `}
      >
        {/* 背景渐变 */}
        <div className={`absolute inset-0 bg-gradient-to-r ${config.color} opacity-5`} />

        <div className="relative p-4">
          {/* 关闭按钮 */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDismiss(event.id);
            }}
            className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4 text-slate-400" />
          </button>

          {/* 头部 */}
          <div className="flex items-start gap-3 mb-3">
            {/* 图标 */}
            <div className={`
              flex-shrink-0 w-10 h-10 rounded-full
              flex items-center justify-center
              bg-gradient-to-br ${config.color}
            `}>
              <Icon className="w-5 h-5 text-white" />
            </div>

            {/* 内容 */}
            <div className="flex-1 min-w-0">
              {event.userName && (
                <div className="flex items-center gap-2 mb-1">
                  {event.userAvatar && (
                    <img
                      src={event.userAvatar}
                      alt={event.userName}
                      className="w-6 h-6 rounded-full border-2 border-white/20"
                    />
                  )}
                  <span className="font-semibold text-white text-sm">
                    {event.userName}
                  </span>
                </div>
              )}

              <p className="text-slate-200 text-sm leading-relaxed">
                {event.message}
              </p>

              {/* 详细信息 */}
              {event.details && (
                <div className="flex gap-3 mt-2 text-xs text-slate-400">
                  {event.details.rank && (
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" />
                      #{event.details.rank}
                    </span>
                  )}
                  {event.details.amount && (
                    <span className="flex items-center gap-1">
                      💰 ${event.details.amount.toFixed(2)}
                    </span>
                  )}
                  {event.details.achievement && (
                    <span className="flex items-center gap-1">
                      <Trophy className="w-3 h-3" />
                      {event.details.achievement}
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* CTA 按钮 */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onClick(event)}
            className={`
              w-full py-2 px-4 rounded-lg
              font-semibold text-sm
              flex items-center justify-center gap-2
              transition-all
              ${config.bgColor}
              text-white
              hover:${config.bgColor}/80
            `}
          >
            {event.cta}
            <ExternalLink className="w-4 h-4" />
          </motion.button>

          {/* 时间戳 */}
          <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
            <span>{formatTimestamp(event.timestamp)}</span>
            <button className="hover:text-slate-400 transition-colors flex items-center gap-1">
              <MessageCircle className="w-3 h-3" />
              回复
            </button>
          </div>
        </div>

        {/* 紧急高亮动画 */}
        {event.urgency === 'high' && (
          <motion.div
            animate={{
              opacity: [0, 0.3, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-red-500 pointer-events-none"
          />
        )}
      </div>
    </motion.div>
  );
}

// 时间戳格式化
function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);

  if (diffMins < 1) return '刚刚';
  if (diffMins < 60) return `${diffMins}分钟前`;

  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours}小时前`;

  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}天前`;
}

// Hook: 生成模拟社交事件
export function useSocialFeed() {
  const [events, setEvents] = useState<SocialFeedEvent[]>([]);

  const addEvent = (event: Omit<SocialFeedEvent, 'id' | 'timestamp'>) => {
    const newEvent: SocialFeedEvent = {
      ...event,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };

    setEvents(prev => [newEvent, ...prev]);
  };

  // 模拟随机事件生成
  const generateMockEvent = () => {
    const mockEvents: Omit<SocialFeedEvent, 'id' | 'timestamp'>[] = [
      {
        type: 'friend_overtook_you',
        message: '@CryptoWhale 刚刚超越了你的排名!',
        cta: '立即反击',
        urgency: 'high',
        userName: 'CryptoWhale',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=whale',
        details: { rank: 15, amount: 1234.56 }
      },
      {
        type: 'friend_unlocked',
        message: '@Alice 解锁了「钻石之手」成就',
        cta: '查看我的进度',
        urgency: 'medium',
        userName: 'Alice',
        userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice',
        details: { achievement: '钻石之手' }
      },
      {
        type: 'team_won',
        message: '你的团队赢得了本周竞赛!',
        cta: '查看奖励',
        urgency: 'high',
        details: { amount: 500 }
      },
      {
        type: 'new_rank_achieved',
        message: '恭喜!你晋升到白银段位',
        cta: '查看详情',
        urgency: 'medium',
        details: { rank: 42 }
      },
      {
        type: 'milestone_reached',
        message: '你的质押收益突破 $1000!',
        cta: '分享成就',
        urgency: 'high',
        details: { amount: 1000 }
      }
    ];

    const randomEvent = mockEvents[Math.floor(Math.random() * mockEvents.length)];
    addEvent(randomEvent);
  };

  return {
    events,
    addEvent,
    generateMockEvent,
    clearEvents: () => setEvents([])
  };
}
