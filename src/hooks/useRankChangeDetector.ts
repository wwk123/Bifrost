'use client';

import { useEffect, useRef, useState } from 'react';
import { LeaderboardEntry } from '@/data/mock';
import { SocialFeedEvent } from '@/components/social/SocialFeed';

export interface RankChangeEvent {
  type: 'rank_up' | 'rank_down' | 'overtaken' | 'top_10' | 'top_100';
  previousRank: number;
  currentRank: number;
  rankChange: number;
  gainUsd: number;
  message: string;
}

export function useRankChangeDetector() {
  const previousData = useRef<LeaderboardEntry[]>([]);
  const [rankChangeEvents, setRankChangeEvents] = useState<SocialFeedEvent[]>([]);

  const detectRankChanges = (currentData: LeaderboardEntry[] | undefined) => {
    if (!currentData || currentData.length === 0) return;

    // 找到当前用户的数据
    const currentUserEntry = currentData.find(entry => entry.isYou);
    if (!currentUserEntry) return;

    // 找到之前的用户数据
    const previousUserEntry = previousData.current.find(entry => entry.isYou);

    if (previousUserEntry && previousUserEntry.rank !== currentUserEntry.rank) {
      const rankChange = previousUserEntry.rank - currentUserEntry.rank;
      const isRankUp = rankChange > 0;

      // 创建排名变化事件
      const event = createRankChangeEvent(
        previousUserEntry,
        currentUserEntry,
        rankChange,
        isRankUp
      );

      if (event) {
        setRankChangeEvents(prev => [event, ...prev.slice(0, 9)]); // 保留最近10条
      }
    }

    // 检测是否被好友超越
    const overtakenEvents = detectOvertaken(previousData.current, currentData);
    if (overtakenEvents.length > 0) {
      setRankChangeEvents(prev => [...overtakenEvents, ...prev.slice(0, 9)]);
    }

    // 更新之前的数据
    previousData.current = currentData;
  };

  const createRankChangeEvent = (
    previous: LeaderboardEntry,
    current: LeaderboardEntry,
    rankChange: number,
    isRankUp: boolean
  ): SocialFeedEvent | null => {
    const absChange = Math.abs(rankChange);

    // 排名上升事件
    if (isRankUp) {
      let message = `你的排名上升了${absChange}位！当前排名 #${current.rank}`;
      let urgency: 'low' | 'medium' | 'high' = 'low';
      let cta = '查看详情';

      // 特殊里程碑
      if (current.rank <= 3) {
        message = `🎉 恭喜！你冲进了前3名！当前排名 #${current.rank}`;
        urgency = 'high';
        cta = '分享成就';
      } else if (current.rank <= 10 && previous.rank > 10) {
        message = `🚀 恭喜！你冲进了前10名！当前排名 #${current.rank}`;
        urgency = 'high';
        cta = '分享成就';
      } else if (current.rank <= 100 && previous.rank > 100) {
        message = `⭐ 恭喜！你冲进了前100名！当前排名 #${current.rank}`;
        urgency = 'medium';
        cta = '继续努力';
      } else if (absChange >= 10) {
        urgency = 'medium';
      }

      return {
        id: `rank_up_${Date.now()}`,
        type: 'new_rank_achieved',
        message,
        cta,
        urgency,
        timestamp: new Date(),
        details: {
          rank: current.rank,
          amount: current.gainUsd
        }
      };
    }

    // 排名下降事件
    if (!isRankUp) {
      let message = `⚠️ 你的排名下降了${absChange}位，当前排名 #${current.rank}`;
      let urgency: 'low' | 'medium' | 'high' = 'low';

      if (previous.rank <= 10 && current.rank > 10) {
        message = `😱 你跌出了前10名！当前排名 #${current.rank}`;
        urgency = 'high';
      } else if (absChange >= 10) {
        urgency = 'medium';
      }

      return {
        id: `rank_down_${Date.now()}`,
        type: 'friend_overtook_you',
        message,
        cta: '立即反击',
        urgency,
        timestamp: new Date(),
        details: {
          rank: current.rank,
          amount: current.gainUsd
        }
      };
    }

    return null;
  };

  const detectOvertaken = (
    previousData: LeaderboardEntry[],
    currentData: LeaderboardEntry[]
  ): SocialFeedEvent[] => {
    const events: SocialFeedEvent[] = [];
    const currentUser = currentData.find(entry => entry.isYou);

    if (!currentUser || previousData.length === 0) return events;

    // 找出之前排名在当前用户之后，现在排名在前的用户
    previousData.forEach(prevEntry => {
      if (prevEntry.isYou) return;

      const currentEntry = currentData.find(e => e.username === prevEntry.username);
      if (!currentEntry) return;

      // 之前在后面，现在在前面 = 超越了你
      if (
        prevEntry.rank > currentUser.rank &&
        currentEntry.rank < currentUser.rank
      ) {
        events.push({
          id: `overtaken_${currentEntry.username}_${Date.now()}`,
          type: 'friend_overtook_you',
          message: `被 ${currentEntry.username} 超越了！TA 当前排名 #${currentEntry.rank}`,
          cta: '查看对手策略',
          urgency: 'high',
          timestamp: new Date(),
          userName: currentEntry.username,
          details: {
            rank: currentEntry.rank,
            amount: currentEntry.gainUsd
          }
        });
      }
    });

    return events;
  };

  const clearEvents = () => {
    setRankChangeEvents([]);
  };

  return {
    rankChangeEvents,
    detectRankChanges,
    clearEvents
  };
}

// Hook: 排名目标追踪
export function useRankingGoals(currentRank: number | undefined) {
  const [goals, setGoals] = useState<{
    target: number;
    message: string;
    amountNeeded?: number;
  }[]>([]);

  useEffect(() => {
    if (!currentRank) return;

    const newGoals: typeof goals = [];

    // 冲击前10
    if (currentRank > 10 && currentRank <= 20) {
      newGoals.push({
        target: 10,
        message: `再超越 ${currentRank - 10} 名即可进入前10！`
      });
    }

    // 冲击前100
    if (currentRank > 100 && currentRank <= 150) {
      newGoals.push({
        target: 100,
        message: `再超越 ${currentRank - 100} 名即可进入前100！`
      });
    }

    // 冲击前3
    if (currentRank > 3 && currentRank <= 10) {
      newGoals.push({
        target: 3,
        message: `距离领奖台只差 ${currentRank - 3} 名！冲啊！`
      });
    }

    // 冲击第一
    if (currentRank === 2 || currentRank === 3) {
      newGoals.push({
        target: 1,
        message: `距离冠军宝座只差一步之遥！`
      });
    }

    setGoals(newGoals);
  }, [currentRank]);

  return goals;
}

// Hook: 排名趋势分析
export interface RankTrend {
  direction: 'up' | 'down' | 'stable';
  momentum: 'strong' | 'moderate' | 'weak';
  message: string;
  color: string;
}

export function useRankTrend() {
  const rankHistory = useRef<{ rank: number; timestamp: number }[]>([]);

  const analyzeTrend = (currentRank: number): RankTrend => {
    const now = Date.now();

    // 添加当前排名到历史
    rankHistory.current.push({ rank: currentRank, timestamp: now });

    // 只保留最近10分钟的数据
    rankHistory.current = rankHistory.current.filter(
      h => now - h.timestamp < 10 * 60 * 1000
    );

    if (rankHistory.current.length < 2) {
      return {
        direction: 'stable',
        momentum: 'weak',
        message: '排名数据收集中...',
        color: 'text-text-secondary'
      };
    }

    const oldest = rankHistory.current[0];
    const latest = rankHistory.current[rankHistory.current.length - 1];
    const change = oldest.rank - latest.rank;

    if (change > 0) {
      // 排名上升（数字变小）
      const momentum = change >= 5 ? 'strong' : change >= 2 ? 'moderate' : 'weak';
      return {
        direction: 'up',
        momentum,
        message: `排名持续上升中！ ${momentum === 'strong' ? '🔥' : '📈'}`,
        color: 'text-success'
      };
    } else if (change < 0) {
      // 排名下降（数字变大）
      const absChange = Math.abs(change);
      const momentum = absChange >= 5 ? 'strong' : absChange >= 2 ? 'moderate' : 'weak';
      return {
        direction: 'down',
        momentum,
        message: `注意！排名正在下降 ${momentum === 'strong' ? '⚠️' : '📉'}`,
        color: 'text-error'
      };
    } else {
      return {
        direction: 'stable',
        momentum: 'weak',
        message: '排名保持稳定',
        color: 'text-info'
      };
    }
  };

  return { analyzeTrend };
}
