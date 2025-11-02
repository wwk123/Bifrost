import { describe, it, expect } from 'vitest';
import {
  getTierByPoints,
  getNextTier,
  calculateTierProgress,
  calculateLevel,
  getXpForNextLevel,
  calculateLevelProgress,
  calculateStreakBonus,
  getTierBonus,
  calculateTotalMultiplier,
  getUserRank,
  getTierPromotionReward,
  canPromote,
  formatTierDisplay,
  TIER_CONFIGS
} from '../rank-tier-system';

describe('rank-tier-system', () => {
  describe('getTierByPoints', () => {
    it('应该返回正确的青铜段位', () => {
      expect(getTierByPoints(0)).toBe('bronze');
      expect(getTierByPoints(250)).toBe('bronze');
      expect(getTierByPoints(499)).toBe('bronze');
    });

    it('应该返回正确的白银段位', () => {
      expect(getTierByPoints(500)).toBe('silver');
      expect(getTierByPoints(750)).toBe('silver');
      expect(getTierByPoints(999)).toBe('silver');
    });

    it('应该返回正确的黄金段位', () => {
      expect(getTierByPoints(1000)).toBe('gold');
      expect(getTierByPoints(1500)).toBe('gold');
      expect(getTierByPoints(1999)).toBe('gold');
    });

    it('应该返回正确的宗师段位', () => {
      expect(getTierByPoints(10000)).toBe('grandmaster');
      expect(getTierByPoints(50000)).toBe('grandmaster');
    });
  });

  describe('getNextTier', () => {
    it('应该返回下一个段位', () => {
      expect(getNextTier('bronze')).toBe('silver');
      expect(getNextTier('silver')).toBe('gold');
      expect(getNextTier('gold')).toBe('platinum');
    });

    it('宗师段位应该返回null', () => {
      expect(getNextTier('grandmaster')).toBe(null);
    });
  });

  describe('calculateTierProgress', () => {
    it('应该计算青铜段位的进度', () => {
      expect(calculateTierProgress(0)).toBe(0);
      expect(calculateTierProgress(250)).toBeCloseTo(50, 0);
      expect(calculateTierProgress(499)).toBeCloseTo(99.8, 0);
    });

    it('应该计算黄金段位的进度', () => {
      expect(calculateTierProgress(1000)).toBe(0);
      expect(calculateTierProgress(1500)).toBe(50);
      expect(calculateTierProgress(1999)).toBeCloseTo(99.9, 0);
    });

    it('宗师段位应该始终显示100%', () => {
      expect(calculateTierProgress(10000)).toBe(100);
      expect(calculateTierProgress(50000)).toBe(100);
    });
  });

  describe('calculateLevel', () => {
    it('应该基于XP计算等级', () => {
      expect(calculateLevel(0)).toBe(0);
      expect(calculateLevel(100)).toBe(1);
      expect(calculateLevel(400)).toBe(2);
      expect(calculateLevel(900)).toBe(3);
      expect(calculateLevel(10000)).toBe(10);
    });
  });

  describe('getXpForNextLevel', () => {
    it('应该计算下一等级所需XP', () => {
      expect(getXpForNextLevel(0)).toBe(100);
      expect(getXpForNextLevel(1)).toBe(400);
      expect(getXpForNextLevel(2)).toBe(900);
      expect(getXpForNextLevel(10)).toBe(12100);
    });
  });

  describe('calculateLevelProgress', () => {
    it('应该计算等级进度', () => {
      expect(calculateLevelProgress(0)).toBe(0);
      expect(calculateLevelProgress(100)).toBe(0); // Level 1刚达到
      expect(calculateLevelProgress(250)).toBe(50); // Level 1的一半
      expect(calculateLevelProgress(400)).toBe(0); // Level 2刚达到
    });
  });

  describe('calculateStreakBonus', () => {
    it('应该根据连续天数计算加成', () => {
      expect(calculateStreakBonus(0)).toBe(0);
      expect(calculateStreakBonus(2)).toBe(0);
      expect(calculateStreakBonus(3)).toBe(0.05);
      expect(calculateStreakBonus(7)).toBe(0.1);
      expect(calculateStreakBonus(14)).toBe(0.15);
      expect(calculateStreakBonus(30)).toBe(0.25);
      expect(calculateStreakBonus(100)).toBe(0.25);
    });
  });

  describe('getTierBonus', () => {
    it('应该返回段位对应的加成', () => {
      expect(getTierBonus('bronze')).toBe(0);
      expect(getTierBonus('silver')).toBe(0.05);
      expect(getTierBonus('gold')).toBe(0.1);
      expect(getTierBonus('platinum')).toBe(0.15);
      expect(getTierBonus('diamond')).toBe(0.2);
      expect(getTierBonus('master')).toBe(0.25);
      expect(getTierBonus('grandmaster')).toBe(0.3);
    });
  });

  describe('calculateTotalMultiplier', () => {
    it('应该计算总加成倍数', () => {
      expect(calculateTotalMultiplier('bronze', 0)).toBe(1.0);
      expect(calculateTotalMultiplier('gold', 0)).toBe(1.1);
      expect(calculateTotalMultiplier('gold', 7)).toBeCloseTo(1.2, 5);
      expect(calculateTotalMultiplier('grandmaster', 30)).toBe(1.55);
    });
  });

  describe('getUserRank', () => {
    it('应该返回完整的用户排名信息', () => {
      const rank = getUserRank(1500, 900, 10);

      expect(rank.tier).toBe('gold');
      expect(rank.points).toBe(1500);
      expect(rank.level).toBe(3);
      expect(rank.progress).toBe(50);
      expect(rank.streakDays).toBe(10);
      expect(rank.bonusMultiplier).toBeCloseTo(1.2, 5); // 1 + 0.1 (gold) + 0.1 (10天连续)
    });
  });

  describe('getTierPromotionReward', () => {
    it('应该返回段位晋升奖励', () => {
      const goldReward = getTierPromotionReward('gold');
      expect(goldReward.xp).toBe(250);
      expect(goldReward.bnc).toBe(25);
      expect(goldReward.badge).toBe('golden-champion');
      expect(goldReward.multiplier).toBe(0.05);

      const grandmasterReward = getTierPromotionReward('grandmaster');
      expect(grandmasterReward.xp).toBe(5000);
      expect(grandmasterReward.bnc).toBe(500);
      expect(grandmasterReward.badge).toBe('grandmaster-immortal');
    });
  });

  describe('canPromote', () => {
    it('积分未达到下一段位时不能晋升', () => {
      const result = canPromote(400, 450);
      expect(result.canPromote).toBe(false);
      expect(result.newTier).toBeUndefined();
    });

    it('积分达到下一段位时可以晋升', () => {
      const result = canPromote(450, 550);
      expect(result.canPromote).toBe(true);
      expect(result.newTier).toBe('silver');
      expect(result.reward).toBeDefined();
      expect(result.reward?.bnc).toBe(10);
    });

    it('跨越多个段位时应该识别最终段位', () => {
      const result = canPromote(100, 2500);
      expect(result.canPromote).toBe(true);
      expect(result.newTier).toBe('platinum');
      expect(result.reward?.bnc).toBe(50);
    });
  });

  describe('formatTierDisplay', () => {
    it('应该格式化段位显示(带图标)', () => {
      expect(formatTierDisplay('bronze')).toBe('🥉 青铜');
      expect(formatTierDisplay('gold')).toBe('🥇 黄金');
      expect(formatTierDisplay('grandmaster')).toBe('⚡ 宗师');
    });

    it('应该格式化段位显示(不带图标)', () => {
      expect(formatTierDisplay('bronze', false)).toBe('青铜');
      expect(formatTierDisplay('gold', false)).toBe('黄金');
    });
  });

  describe('TIER_CONFIGS', () => {
    it('所有段位配置应该包含必需字段', () => {
      const tiers = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster'] as const;

      tiers.forEach((tier) => {
        const config = TIER_CONFIGS[tier];
        expect(config.name).toBeDefined();
        expect(config.nameZh).toBeDefined();
        expect(config.minPoints).toBeDefined();
        expect(config.maxPoints).toBeDefined();
        expect(config.color).toBeDefined();
        expect(config.gradient).toBeDefined();
        expect(config.benefits).toBeInstanceOf(Array);
        expect(config.benefits.length).toBeGreaterThan(0);
        expect(config.icon).toBeDefined();
      });
    });

    it('段位积分范围应该连续且不重叠', () => {
      const tiers = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master'] as const;

      for (let i = 0; i < tiers.length - 1; i++) {
        const current = TIER_CONFIGS[tiers[i]];
        const next = TIER_CONFIGS[tiers[i + 1]];
        expect(current.maxPoints + 1).toBe(next.minPoints);
      }
    });
  });
});
