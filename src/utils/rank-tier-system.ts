// 段位/等级系统

export type RankTier =
  | 'bronze'
  | 'silver'
  | 'gold'
  | 'platinum'
  | 'diamond'
  | 'master'
  | 'grandmaster';

export interface TierConfig {
  name: string;
  nameZh: string;
  minPoints: number;
  maxPoints: number;
  color: string;
  gradient: string;
  benefits: string[];
  icon: string;
}

export interface UserRank {
  tier: RankTier;
  points: number;
  level: number;
  progress: number; // 0-100
  streakDays: number;
  bonusMultiplier: number;
}

export interface RankReward {
  xp: number;
  bnc?: number;
  badge?: string;
  multiplier?: number;
}

/**
 * 段位配置表
 */
export const TIER_CONFIGS: Record<RankTier, TierConfig> = {
  bronze: {
    name: 'Bronze',
    nameZh: '青铜',
    minPoints: 0,
    maxPoints: 499,
    color: '#CD7F32',
    gradient: 'linear-gradient(135deg, #CD7F32 0%, #9C6B2E 100%)',
    benefits: ['基础质押收益', '社区访问权限'],
    icon: '🥉'
  },
  silver: {
    name: 'Silver',
    nameZh: '白银',
    minPoints: 500,
    maxPoints: 999,
    color: '#C0C0C0',
    gradient: 'linear-gradient(135deg, #C0C0C0 0%, #A8A8A8 100%)',
    benefits: ['收益 +5%', '优先客服支持', '每周挑战奖励 +10%'],
    icon: '🥈'
  },
  gold: {
    name: 'Gold',
    nameZh: '黄金',
    minPoints: 1000,
    maxPoints: 1999,
    color: '#FFD700',
    gradient: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
    benefits: ['收益 +10%', '专属策略访问', '团队加成 +5%', '稀有徽章'],
    icon: '🥇'
  },
  platinum: {
    name: 'Platinum',
    nameZh: '铂金',
    minPoints: 2000,
    maxPoints: 3499,
    color: '#E5E4E2',
    gradient: 'linear-gradient(135deg, #E5E4E2 0%, #B9B9B9 100%)',
    benefits: ['收益 +15%', 'VIP客服', '优先空投', '团队加成 +10%', '专属NFT'],
    icon: '💎'
  },
  diamond: {
    name: 'Diamond',
    nameZh: '钻石',
    minPoints: 3500,
    maxPoints: 5999,
    color: '#B9F2FF',
    gradient: 'linear-gradient(135deg, #B9F2FF 0%, #00D4FF 100%)',
    benefits: [
      '收益 +20%',
      '无限制复制策略',
      '治理投票权',
      '团队加成 +15%',
      '传奇徽章',
      '月度奖励池分红'
    ],
    icon: '💠'
  },
  master: {
    name: 'Master',
    nameZh: '大师',
    minPoints: 6000,
    maxPoints: 9999,
    color: '#E6007A',
    gradient: 'linear-gradient(135deg, #E6007A 0%, #5B21E6 100%)',
    benefits: [
      '收益 +25%',
      '策略发布者',
      '独家活动邀请',
      '团队加成 +20%',
      '大师徽章',
      '季度奖励池分红',
      '产品共创权'
    ],
    icon: '👑'
  },
  grandmaster: {
    name: 'Grandmaster',
    nameZh: '宗师',
    minPoints: 10000,
    maxPoints: Infinity,
    color: '#8B00FF',
    gradient: 'linear-gradient(135deg, #8B00FF 0%, #FF1493 100%)',
    benefits: [
      '收益 +30%',
      '所有功能无限制',
      '专属顾问服务',
      '团队加成 +25%',
      '宗师头衔',
      '年度奖励池分红',
      '战略顾问委员会席位',
      '专属NFT系列'
    ],
    icon: '⚡'
  }
};

/**
 * 根据积分获取段位
 */
export function getTierByPoints(points: number): RankTier {
  if (points >= TIER_CONFIGS.grandmaster.minPoints) return 'grandmaster';
  if (points >= TIER_CONFIGS.master.minPoints) return 'master';
  if (points >= TIER_CONFIGS.diamond.minPoints) return 'diamond';
  if (points >= TIER_CONFIGS.platinum.minPoints) return 'platinum';
  if (points >= TIER_CONFIGS.gold.minPoints) return 'gold';
  if (points >= TIER_CONFIGS.silver.minPoints) return 'silver';
  return 'bronze';
}

/**
 * 获取下一个段位
 */
export function getNextTier(currentTier: RankTier): RankTier | null {
  const tiers: RankTier[] = ['bronze', 'silver', 'gold', 'platinum', 'diamond', 'master', 'grandmaster'];
  const currentIndex = tiers.indexOf(currentTier);
  return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null;
}

/**
 * 计算段位进度
 */
export function calculateTierProgress(points: number): number {
  const tier = getTierByPoints(points);
  const config = TIER_CONFIGS[tier];

  if (tier === 'grandmaster') {
    return 100; // 最高段位永远显示100%
  }

  const tierPoints = points - config.minPoints;
  const tierRange = config.maxPoints - config.minPoints + 1;
  return Math.min(100, (tierPoints / tierRange) * 100);
}

/**
 * 计算等级 (基于XP的平方根增长)
 */
export function calculateLevel(xp: number): number {
  // Level = floor(sqrt(XP / 100))
  return Math.floor(Math.sqrt(xp / 100));
}

/**
 * 计算下一等级所需XP
 */
export function getXpForNextLevel(currentLevel: number): number {
  const nextLevel = currentLevel + 1;
  return nextLevel * nextLevel * 100;
}

/**
 * 计算当前等级进度
 */
export function calculateLevelProgress(xp: number): number {
  const currentLevel = calculateLevel(xp);
  const currentLevelXp = currentLevel * currentLevel * 100;
  const nextLevelXp = getXpForNextLevel(currentLevel);
  const xpInCurrentLevel = xp - currentLevelXp;
  const xpNeededForNextLevel = nextLevelXp - currentLevelXp;

  return (xpInCurrentLevel / xpNeededForNextLevel) * 100;
}

/**
 * 计算连续登录加成
 */
export function calculateStreakBonus(streakDays: number): number {
  if (streakDays < 3) return 0;
  if (streakDays < 7) return 0.05; // +5%
  if (streakDays < 14) return 0.1; // +10%
  if (streakDays < 30) return 0.15; // +15%
  return 0.25; // +25%
}

/**
 * 获取段位加成
 */
export function getTierBonus(tier: RankTier): number {
  const bonuses: Record<RankTier, number> = {
    bronze: 0,
    silver: 0.05,
    gold: 0.1,
    platinum: 0.15,
    diamond: 0.2,
    master: 0.25,
    grandmaster: 0.3
  };
  return bonuses[tier];
}

/**
 * 计算总加成倍数
 */
export function calculateTotalMultiplier(tier: RankTier, streakDays: number): number {
  const tierBonus = getTierBonus(tier);
  const streakBonus = calculateStreakBonus(streakDays);
  return 1 + tierBonus + streakBonus;
}

/**
 * 获取用户完整排名信息
 */
export function getUserRank(points: number, xp: number, streakDays: number): UserRank {
  const tier = getTierByPoints(points);
  const level = calculateLevel(xp);
  const progress = calculateTierProgress(points);
  const bonusMultiplier = calculateTotalMultiplier(tier, streakDays);

  return {
    tier,
    points,
    level,
    progress,
    streakDays,
    bonusMultiplier
  };
}

/**
 * 段位晋升奖励
 */
export function getTierPromotionReward(tier: RankTier): RankReward {
  const rewards: Record<RankTier, RankReward> = {
    bronze: { xp: 0 },
    silver: { xp: 100, bnc: 10, badge: 'silver-warrior' },
    gold: { xp: 250, bnc: 25, badge: 'golden-champion', multiplier: 0.05 },
    platinum: { xp: 500, bnc: 50, badge: 'platinum-master', multiplier: 0.1 },
    diamond: { xp: 1000, bnc: 100, badge: 'diamond-legend', multiplier: 0.15 },
    master: { xp: 2000, bnc: 250, badge: 'master-elite', multiplier: 0.2 },
    grandmaster: { xp: 5000, bnc: 500, badge: 'grandmaster-immortal', multiplier: 0.25 }
  };
  return rewards[tier];
}

/**
 * 检查是否可以晋升
 */
export function canPromote(currentPoints: number, newPoints: number): {
  canPromote: boolean;
  newTier?: RankTier;
  reward?: RankReward;
} {
  const currentTier = getTierByPoints(currentPoints);
  const newTier = getTierByPoints(newPoints);

  if (currentTier === newTier) {
    return { canPromote: false };
  }

  return {
    canPromote: true,
    newTier,
    reward: getTierPromotionReward(newTier)
  };
}

/**
 * 获取段位排行
 */
export function getTierRanking(): RankTier[] {
  return ['grandmaster', 'master', 'diamond', 'platinum', 'gold', 'silver', 'bronze'];
}

/**
 * 格式化段位显示
 */
export function formatTierDisplay(tier: RankTier, includeIcon: boolean = true): string {
  const config = TIER_CONFIGS[tier];
  return includeIcon ? `${config.icon} ${config.nameZh}` : config.nameZh;
}

/**
 * 获取段位颜色
 */
export function getTierColor(tier: RankTier): string {
  return TIER_CONFIGS[tier].color;
}

/**
 * 获取段位渐变
 */
export function getTierGradient(tier: RankTier): string {
  return TIER_CONFIGS[tier].gradient;
}
