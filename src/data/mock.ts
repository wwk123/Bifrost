import type { ApyPrediction, UserPrediction, PredictionStats } from '@/types/prediction';
import type { Position, RiskAnalysis, HedgeRecommendation } from '@/types/hedging';
import type { Team, TeamCompetition, TeamLeaderboardEntry } from '@/types/team';

export type Timeframe = 'week' | 'month' | 'quarter';

export interface LeaderboardEntry {
  rank: number;
  username: string;
  avatar: string;
  gainUsd: number;
  strategy: string;
  winRate: number;
  chainMix: string[];
  isYou?: boolean;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  status: 'unlocked' | 'in-progress' | 'locked';
  reward: string;
}

export interface StrategySegment {
  asset: string;
  ratio: number;
  tone: 'low' | 'mid' | 'high';
}

export interface Strategy {
  id: string;
  name: string;
  author: string;
  avatar: string;
  description: string;
  segments: StrategySegment[];
  adoption: number;
  likes: number;
  comments: number;
  monthlyReturn: number;
  riskLevel: '稳健' | '均衡' | '激进';
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  requirement: string;
  reward: string;
  progress: number;
  target: number;
  deadline: string;
}

export interface ReferralProgress {
  teamBoost: number;
  invited: number;
  completed: number;
  rewardsUsd: number;
  milestones: {
    label: string;
    current: number;
    target: number;
  }[];
}

export interface ShareTemplate {
  id: string;
  title: string;
  subtitle: string;
  background: 'pink' | 'blue' | 'gold';
  ctas: string[];
}

export interface Metric {
  label: string;
  value: string;
  delta: string;
  tone: 'success' | 'info' | 'warning';
}

export interface RankProgress {
  currentTier: string;
  nextTier: string;
  currentPoints: number;
  nextTierPoints: number;
  streakDays: number;
  bonusMultiplier: number;
}

export interface PerformancePoint {
  label: string;
  gain: number;
  benchmark: number;
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const leaderboardData: Record<Timeframe, LeaderboardEntry[]> = {
  week: [
    {
      rank: 1,
      username: '🐋 Whale',
      avatar: '/avatars/whale.png',
      gainUsd: 15234,
      strategy: '激进多链',
      winRate: 87,
      chainMix: ['vDOT', 'vGLMR', 'vASTR']
    },
    {
      rank: 2,
      username: '📈 Trader',
      avatar: '/avatars/trader.png',
      gainUsd: 12890,
      strategy: 'vDOT 杠杆',
      winRate: 82,
      chainMix: ['vDOT', 'vGLMR']
    },
    {
      rank: 3,
      username: '🎯 Alice',
      avatar: '/avatars/alice.png',
      gainUsd: 9456,
      strategy: '稳健配置',
      winRate: 91,
      chainMix: ['vDOT', 'vGLMR', '现金']
    },
    {
      rank: 4,
      username: '💎 Bob',
      avatar: '/avatars/bob.png',
      gainUsd: 8123,
      strategy: '自动复投',
      winRate: 85,
      chainMix: ['vDOT']
    },
    {
      rank: 5,
      username: '🌟 Carol',
      avatar: '/avatars/carol.png',
      gainUsd: 7890,
      strategy: '长期持有',
      winRate: 88,
      chainMix: ['vDOT', 'vFIL']
    },
    {
      rank: 6,
      username: '🚀 Nova',
      avatar: '/avatars/nova.png',
      gainUsd: 7421,
      strategy: '跨链套利',
      winRate: 79,
      chainMix: ['vDOT', 'vPHA']
    },
    {
      rank: 7,
      username: '🔮 Sensei',
      avatar: '/avatars/sensei.png',
      gainUsd: 6980,
      strategy: 'AI 风控',
      winRate: 83,
      chainMix: ['vDOT', 'vGLMR', 'vMOVR']
    },
    {
      rank: 42,
      username: '你',
      avatar: '/avatars/you.png',
      gainUsd: 345,
      strategy: '策略优化中',
      winRate: 62,
      chainMix: ['vDOT', 'vGLMR'],
      isYou: true
    }
  ],
  month: [
    {
      rank: 1,
      username: '🐋 Whale',
      avatar: '/avatars/whale.png',
      gainUsd: 50210,
      strategy: '流动性挖矿+复投',
      winRate: 89,
      chainMix: ['vDOT', 'vGLMR', 'vASTR']
    },
    {
      rank: 2,
      username: '🌪️ Storm',
      avatar: '/avatars/storm.png',
      gainUsd: 46890,
      strategy: '波段交易',
      winRate: 78,
      chainMix: ['vDOT', 'vPHA']
    },
    {
      rank: 3,
      username: '🎯 Alice',
      avatar: '/avatars/alice.png',
      gainUsd: 41234,
      strategy: '稳健配置',
      winRate: 92,
      chainMix: ['vDOT', 'vGLMR', '现金']
    },
    {
      rank: 24,
      username: '你',
      avatar: '/avatars/you.png',
      gainUsd: 5320,
      strategy: '复利实验',
      winRate: 68,
      chainMix: ['vDOT', 'vGLMR'],
      isYou: true
    }
  ],
  quarter: [
    {
      rank: 1,
      username: '🚀 Nova',
      avatar: '/avatars/nova.png',
      gainUsd: 120540,
      strategy: '跨链套利',
      winRate: 81,
      chainMix: ['vDOT', 'vGLMR', 'vASTR', 'vPHA']
    },
    {
      rank: 2,
      username: '🐋 Whale',
      avatar: '/avatars/whale.png',
      gainUsd: 118230,
      strategy: '激进多链',
      winRate: 86,
      chainMix: ['vDOT', 'vGLMR', 'vFIL']
    },
    {
      rank: 3,
      username: '🔮 Sensei',
      avatar: '/avatars/sensei.png',
      gainUsd: 108450,
      strategy: 'AI 风控',
      winRate: 90,
      chainMix: ['vDOT', 'vGLMR', 'vMOVR']
    },
    {
      rank: 15,
      username: '你',
      avatar: '/avatars/you.png',
      gainUsd: 12890,
      strategy: '链上被动收入',
      winRate: 71,
      chainMix: ['vDOT', 'vGLMR', '现金'],
      isYou: true
    }
  ]
};

const achievementList: Achievement[] = [
  {
    id: 'first-stake',
    title: '首次质押',
    description: '完成第一笔 vToken 质押并保持 24 小时',
    progress: 1,
    target: 1,
    status: 'unlocked',
    reward: '+50 经验值'
  },
  {
    id: 'thirty-days',
    title: '连续 30 天',
    description: '连续 30 天保持质押仓位',
    progress: 30,
    target: 30,
    status: 'unlocked',
    reward: '铂金徽章'
  },
  {
    id: 'thousand-profit',
    title: '收益破千',
    description: '累计实现 $1000 收益',
    progress: 1000,
    target: 1000,
    status: 'unlocked',
    reward: '+5% 周收益加成'
  },
  {
    id: 'ten-thousand-profit',
    title: '收益破万',
    description: '累计实现 $10000 收益',
    progress: 7500,
    target: 10000,
    status: 'in-progress',
    reward: '钻石段位直升券'
  },
  {
    id: 'multichain-master',
    title: '多链大师',
    description: '在 5 条链上完成质押操作',
    progress: 3,
    target: 5,
    status: 'in-progress',
    reward: '限量动态头像'
  },
  {
    id: 'referral-hero',
    title: '推荐达人',
    description: '成功邀请 10 位好友完成质押',
    progress: 2,
    target: 10,
    status: 'in-progress',
    reward: '社区共创会议入场券'
  }
];

const strategies: Strategy[] = [
  {
    id: 'steady-3',
    name: '稳健三分法',
    author: '🎯 Alice',
    avatar: '/avatars/alice.png',
    description: '以 vDOT 为核心，加配 vGLMR 与现金储备，实现收益与风险的稳态平衡。',
    segments: [
      { asset: 'vDOT', ratio: 0.5, tone: 'low' },
      { asset: 'vGLMR', ratio: 0.3, tone: 'mid' },
      { asset: '现金', ratio: 0.2, tone: 'low' }
    ],
    adoption: 1234,
    likes: 456,
    comments: 23,
    monthlyReturn: 2.1,
    riskLevel: '稳健'
  },
  {
    id: 'leveraged-dot',
    name: 'vDOT 杠杆飞轮',
    author: '📈 Trader',
    avatar: '/avatars/trader.png',
    description: '利用 vDOT + 借贷杠杆滚动复投，最大化 DOT 年化收益。',
    segments: [
      { asset: 'vDOT', ratio: 0.7, tone: 'mid' },
      { asset: '稳定币', ratio: 0.2, tone: 'low' },
      { asset: '杠杆仓', ratio: 0.1, tone: 'high' }
    ],
    adoption: 842,
    likes: 389,
    comments: 54,
    monthlyReturn: 3.8,
    riskLevel: '激进'
  },
  {
    id: 'cross-chain',
    name: '跨链被动收入',
    author: '🔮 Sensei',
    avatar: '/avatars/sensei.png',
    description: '在 Bifrost 与 Moonbeam 上配置跨链收益，搭配自动复投脚本。',
    segments: [
      { asset: 'vDOT', ratio: 0.4, tone: 'low' },
      { asset: 'vGLMR', ratio: 0.35, tone: 'mid' },
      { asset: 'vMOVR', ratio: 0.15, tone: 'mid' },
      { asset: '现金', ratio: 0.1, tone: 'low' }
    ],
    adoption: 564,
    likes: 276,
    comments: 38,
    monthlyReturn: 2.9,
    riskLevel: '均衡'
  }
];

const weeklyChallenges: WeeklyChallenge[] = [
  {
    id: 'multi-chain-explorer',
    title: '多链探险家',
    requirement: '在 3 条不同链上完成质押',
    reward: '100 BNC + 独家 NFT 徽章',
    progress: 2,
    target: 3,
    deadline: '距结束 2 天'
  },
  {
    id: 'auto-compound',
    title: '自动复投达人',
    requirement: '启用自动复投并保持 7 天',
    reward: '周收益加成 +3%',
    progress: 5,
    target: 7,
    deadline: '距结束 4 天'
  },
  {
    id: 'liquidity-partner',
    title: '流动性伙伴',
    requirement: '向 Bifrost 流动性池提供 500 vDOT',
    reward: '专属 Discord 角色',
    progress: 120,
    target: 500,
    deadline: '距结束 6 天'
  }
];

const referralProgress: ReferralProgress = {
  teamBoost: 8,
  invited: 10,
  completed: 4,
  rewardsUsd: 186,
  milestones: [
    { label: '邀请好友', current: 10, target: 20 },
    { label: '完成质押', current: 4, target: 10 },
    { label: '团队额外收益', current: 8, target: 15 }
  ]
};

const shareTemplates: ShareTemplate[] = [
  {
    id: 'pink',
    title: '我在 Bifrost 收益榜冲进前 10%',
    subtitle: '连续 30 天保持收益正增长',
    background: 'pink',
    ctas: ['立即参与', '挑战我的收益']
  },
  {
    id: 'blue',
    title: '完成多链探险家挑战',
    subtitle: '解锁 100 BNC + 独家徽章',
    background: 'blue',
    ctas: ['领取奖励', '查看挑战']
  },
  {
    id: 'gold',
    title: '黄金段位正式解锁',
    subtitle: '收益破万，离大师只差一步',
    background: 'gold',
    ctas: ['加入战队', '复制策略']
  }
];

const metrics: Metric[] = [
  { label: '当前参赛人数', value: '5,432', delta: '+18%', tone: 'success' },
  { label: '质押资产规模', value: '$134.7M', delta: '+9%', tone: 'info' },
  { label: '分享卡片生成', value: '12,587', delta: '+42%', tone: 'success' },
  { label: '挑战完成率', value: '63%', delta: '+7%', tone: 'warning' }
];

const performanceTrend: Record<Timeframe, PerformancePoint[]> = {
  week: [
    { label: '周一', gain: 3200, benchmark: 2100 },
    { label: '周二', gain: 4500, benchmark: 2600 },
    { label: '周三', gain: 5200, benchmark: 3000 },
    { label: '周四', gain: 6100, benchmark: 3400 },
    { label: '周五', gain: 6700, benchmark: 3800 },
    { label: '周六', gain: 7200, benchmark: 4200 },
    { label: '周日', gain: 7800, benchmark: 4500 }
  ],
  month: [
    { label: '第1周', gain: 8200, benchmark: 5100 },
    { label: '第2周', gain: 11200, benchmark: 6200 },
    { label: '第3周', gain: 13400, benchmark: 7100 },
    { label: '第4周', gain: 16300, benchmark: 8400 }
  ],
  quarter: [
    { label: '1月', gain: 18400, benchmark: 11000 },
    { label: '2月', gain: 21400, benchmark: 13200 },
    { label: '3月', gain: 23800, benchmark: 14800 },
    { label: '4月', gain: 26100, benchmark: 16300 },
    { label: '5月', gain: 28900, benchmark: 17900 },
    { label: '6月', gain: 31800, benchmark: 19800 }
  ]
};

const rankProgress: RankProgress = {
  currentTier: '黄金',
  nextTier: '铂金',
  currentPoints: 1840,
  nextTierPoints: 2200,
  streakDays: 12,
  bonusMultiplier: 1.25
};

export async function fetchLeaderboard(timeframe: Timeframe) {
  await delay(160);
  return leaderboardData[timeframe];
}

export async function fetchAchievements() {
  await delay(120);
  return achievementList;
}

export async function fetchStrategies() {
  await delay(140);
  return strategies;
}

export async function fetchWeeklyChallenges() {
  await delay(100);
  return weeklyChallenges;
}

export async function fetchReferralProgress() {
  await delay(110);
  return referralProgress;
}

export async function fetchShareTemplates() {
  await delay(130);
  return shareTemplates;
}

export async function fetchMetrics() {
  await delay(90);
  return metrics;
}

export async function fetchRankProgress() {
  await delay(80);
  return rankProgress;
}

export async function fetchPerformanceTrend(timeframe: Timeframe) {
  await delay(100);
  return performanceTrend[timeframe];
}

// ============================================
// 组队竞赛系统 Mock Data
// ============================================

const mockTeams: Team[] = [
  {
    id: 'team-phoenix',
    name: '凤凰战队',
    description: '专注于稳健收益,追求长期价值增长',
    captain: '0x1234...5678',
    members: [
      {
        address: '0x1234...5678',
        displayName: '🎯 Alice',
        avatar: '/avatars/alice.png',
        role: 'captain',
        contribution: {
          staked: 50000,
          weeklyEarnings: 2340,
          referrals: 5
        },
        individualRank: 3,
        achievements: ['first-stake', 'thirty-days', 'thousand-profit'],
        joinedAt: new Date('2025-09-01')
      },
      {
        address: '0xabcd...ef01',
        displayName: '💎 Bob',
        avatar: '/avatars/bob.png',
        role: 'member',
        contribution: {
          staked: 35000,
          weeklyEarnings: 1890,
          referrals: 3
        },
        individualRank: 4,
        achievements: ['first-stake', 'thirty-days'],
        joinedAt: new Date('2025-09-05')
      },
      {
        address: '0x9876...5432',
        displayName: '🌟 Carol',
        avatar: '/avatars/carol.png',
        role: 'member',
        contribution: {
          staked: 28000,
          weeklyEarnings: 1456,
          referrals: 2
        },
        individualRank: 5,
        achievements: ['first-stake'],
        joinedAt: new Date('2025-09-10')
      }
    ],
    maxMembers: 10,
    stats: {
      totalStaked: 113000,
      weeklyEarnings: 5686,
      averageRoi: 5.03,
      teamRank: 2
    },
    bonuses: {
      memberCount: 0.04,
      synergy: 0.15,
      achievements: 0.03,
      captain: 0.1,
      totalMultiplier: 1.32
    },
    settings: {
      isPublic: true,
      requireApproval: true,
      minStakeToJoin: 5000
    },
    createdAt: new Date('2025-09-01')
  },
  {
    id: 'team-dragon',
    name: '龙腾战队',
    description: '激进策略,追求最大收益率',
    captain: '0xdragon...1234',
    members: [
      {
        address: '0xdragon...1234',
        displayName: '🐋 Whale',
        avatar: '/avatars/whale.png',
        role: 'captain',
        contribution: {
          staked: 150000,
          weeklyEarnings: 8900,
          referrals: 8
        },
        individualRank: 1,
        achievements: ['first-stake', 'thirty-days', 'thousand-profit', 'ten-thousand-profit'],
        joinedAt: new Date('2025-08-15')
      },
      {
        address: '0xtrader...5678',
        displayName: '📈 Trader',
        avatar: '/avatars/trader.png',
        role: 'member',
        contribution: {
          staked: 80000,
          weeklyEarnings: 5200,
          referrals: 4
        },
        individualRank: 2,
        achievements: ['first-stake', 'thirty-days', 'thousand-profit'],
        joinedAt: new Date('2025-08-20')
      }
    ],
    maxMembers: 10,
    stats: {
      totalStaked: 230000,
      weeklyEarnings: 14100,
      averageRoi: 6.13,
      teamRank: 1
    },
    bonuses: {
      memberCount: 0.02,
      synergy: 0.15,
      achievements: 0.035,
      captain: 0.1,
      totalMultiplier: 1.305
    },
    settings: {
      isPublic: true,
      requireApproval: true,
      minStakeToJoin: 10000
    },
    createdAt: new Date('2025-08-15')
  }
];

const mockTeamCompetition: TeamCompetition = {
  id: 'october-competition',
  name: '十月团队收益挑战赛',
  startDate: new Date('2025-10-01'),
  endDate: new Date('2025-10-31'),
  rules: {
    metric: 'total-earnings',
    minTeamSize: 2,
    maxTeamSize: 10
  },
  prizePool: {
    first: '5000 BNC + 独家NFT',
    second: '3000 BNC + 稀有徽章',
    third: '1500 BNC + 纪念徽章',
    participation: '每队100 BNC'
  },
  participants: ['team-dragon', 'team-phoenix', 'team-nova', 'team-storm'],
  leaderboard: [
    {
      rank: 1,
      teamId: 'team-dragon',
      teamName: '龙腾战队',
      score: 14100,
      members: 2,
      trend: 'up'
    },
    {
      rank: 2,
      teamId: 'team-phoenix',
      teamName: '凤凰战队',
      score: 5686,
      members: 3,
      trend: 'up'
    },
    {
      rank: 3,
      teamId: 'team-nova',
      teamName: '新星联盟',
      score: 4200,
      members: 5,
      trend: 'stable'
    },
    {
      rank: 4,
      teamId: 'team-storm',
      teamName: '风暴小队',
      score: 3100,
      members: 4,
      trend: 'down'
    }
  ]
};

// ============================================
// APY预测市场 Mock Data
// ============================================

const mockApyPredictions: ApyPrediction[] = [
  {
    id: 'vdot-week-43',
    asset: 'vDOT',
    currentApy: 12.5,
    periodStart: new Date('2025-10-21'),
    periodEnd: new Date('2025-10-28'),
    outcomes: {
      up: {
        odds: 2.8,
        marketPrediction: 35,
        totalStaked: 15000
      },
      stable: {
        odds: 1.9,
        marketPrediction: 52,
        totalStaked: 28000
      },
      down: {
        odds: 4.2,
        marketPrediction: 13,
        totalStaked: 7000
      }
    },
    status: 'open'
  },
  {
    id: 'vglmr-week-43',
    asset: 'vGLMR',
    currentApy: 8.3,
    periodStart: new Date('2025-10-21'),
    periodEnd: new Date('2025-10-28'),
    outcomes: {
      up: {
        odds: 1.8,
        marketPrediction: 55,
        totalStaked: 22000
      },
      stable: {
        odds: 3.1,
        marketPrediction: 32,
        totalStaked: 12800
      },
      down: {
        odds: 7.5,
        marketPrediction: 13,
        totalStaked: 5200
      }
    },
    status: 'open'
  }
];

const mockUserPredictions: UserPrediction[] = [
  {
    id: 'pred-001',
    predictionId: 'vdot-week-43',
    userAddress: '0x1234...5678',
    outcome: 'up',
    amount: 500,
    timestamp: new Date('2025-10-21T10:30:00'),
    potentialPayout: 1400,
    status: 'pending'
  },
  {
    id: 'pred-002',
    predictionId: 'vglmr-week-43',
    userAddress: '0x1234...5678',
    outcome: 'stable',
    amount: 300,
    timestamp: new Date('2025-10-22T14:20:00'),
    potentialPayout: 930,
    status: 'pending'
  }
];

const mockPredictionStats: PredictionStats = {
  totalPredictions: 24,
  winRate: 62.5,
  totalProfit: 2340,
  currentStreak: 3,
  bestStreak: 7
};

// ============================================
// 智能对冲系统 Mock Data
// ============================================

const mockPositions: Position[] = [
  {
    asset: 'vDOT',
    amount: 5000,
    valueUsd: 35000,
    riskLevel: 'medium',
    volatility: 35
  },
  {
    asset: 'vGLMR',
    amount: 8000,
    valueUsd: 24000,
    riskLevel: 'medium',
    volatility: 42
  },
  {
    asset: 'vASTR',
    amount: 10000,
    valueUsd: 8000,
    riskLevel: 'high',
    volatility: 55
  }
];

const mockRiskAnalysis: RiskAnalysis = {
  totalExposure: 67000,
  concentrationRisk: 0.52,
  volatilityScore: 42.7,
  recommendations: [
    {
      id: 'hedge-001',
      type: 'put-option',
      severity: 'medium',
      description: '为 vDOT 购买看跌期权以保护下行风险',
      estimatedCost: 350,
      protectionAmount: 35000,
      details: {
        type: 'put-option',
        asset: 'vDOT',
        strikePrice: 6.5,
        premium: 350,
        expiryDate: new Date('2025-11-30'),
        coverage: 35000
      }
    },
    {
      id: 'hedge-002',
      type: 'diversification',
      severity: 'low',
      description: '建议降低 vDOT 集中度,增加稳定币配置',
      estimatedCost: 0,
      protectionAmount: 0,
      details: {
        type: 'diversification',
        suggestedAllocations: [
          { asset: 'vDOT', currentRatio: 0.52, targetRatio: 0.35 },
          { asset: 'vGLMR', currentRatio: 0.36, targetRatio: 0.30 },
          { asset: 'vASTR', currentRatio: 0.12, targetRatio: 0.15 },
          { asset: '稳定币', currentRatio: 0, targetRatio: 0.20 }
        ]
      }
    },
    {
      id: 'hedge-003',
      type: 'yield-insurance',
      severity: 'low',
      description: '为 vGLMR 购买收益保险,锁定最低 APY',
      estimatedCost: 240,
      protectionAmount: 24000,
      details: {
        type: 'yield-insurance',
        guaranteedApy: 6.5,
        premiumRate: 0.01,
        coverageAmount: 24000,
        duration: 30
      }
    }
  ]
};

// ============================================
// Fetch Functions for New Data
// ============================================

export async function fetchTeams() {
  await delay(120);
  return mockTeams;
}

export async function fetchTeamCompetition() {
  await delay(140);
  return mockTeamCompetition;
}

export async function fetchUserTeam(userId: string) {
  await delay(100);
  // Return the team the user belongs to (for demo, returning first team)
  return mockTeams[0];
}

export async function fetchApyPredictions() {
  await delay(130);
  return mockApyPredictions;
}

export async function fetchUserPredictions(userAddress: string) {
  await delay(110);
  return mockUserPredictions;
}

export async function fetchPredictionStats() {
  await delay(90);
  return mockPredictionStats;
}

export async function fetchPositions(userId: string) {
  await delay(120);
  return mockPositions;
}

export async function fetchRiskAnalysis(userId: string) {
  await delay(150);
  return mockRiskAnalysis;
}

export async function createTeam(teamData: {
  name: string;
  description: string;
  captain: string;
  maxMembers: number;
  minStakeToJoin: number;
  isPublic: boolean;
  requireApproval: boolean;
}): Promise<Team> {
  await delay(200);

  // 生成新的战队 ID
  const teamId = `team-${Date.now()}`;

  // 创建队长成员信息
  const captainMember: import('@/types/team').TeamMember = {
    address: teamData.captain,
    displayName: '队长',
    avatar: '/avatars/default.png',
    role: 'captain',
    contribution: {
      staked: 0,
      weeklyEarnings: 0,
      referrals: 0
    },
    joinedAt: new Date()
  };

  // 构造新战队对象
  const newTeam: Team = {
    id: teamId,
    name: teamData.name,
    description: teamData.description,
    captain: teamData.captain,
    members: [captainMember],
    maxMembers: teamData.maxMembers,
    stats: {
      totalStaked: 0,
      weeklyEarnings: 0,
      averageRoi: 0,
      teamRank: mockTeams.length + 1
    },
    bonuses: {
      memberCount: 0,
      synergy: 0,
      achievements: 0,
      captain: 0.1,
      totalMultiplier: 1.1
    },
    settings: {
      isPublic: teamData.isPublic,
      requireApproval: teamData.requireApproval,
      minStakeToJoin: teamData.minStakeToJoin
    },
    createdAt: new Date()
  };

  // 添加到 mockTeams 数组
  mockTeams.push(newTeam);

  return newTeam;
}

// 检查战队名称是否可用
export async function checkTeamNameAvailable(name: string): Promise<{ available: boolean; suggestion?: string }> {
  await delay(300);

  const normalizedName = name.trim().toLowerCase();

  // 检查是否与现有战队名称完全相同
  const exactMatch = mockTeams.find(team => team.name.toLowerCase() === normalizedName);
  if (exactMatch) {
    return {
      available: false,
      suggestion: `${name} II` // 建议添加罗马数字
    };
  }

  // 检查是否有相似名称（模糊匹配）
  const similarTeam = mockTeams.find(team => {
    const teamName = team.name.toLowerCase();
    return teamName.includes(normalizedName) || normalizedName.includes(teamName);
  });

  if (similarTeam) {
    return {
      available: true, // 相似但不完全相同，仍可用
      suggestion: undefined
    };
  }

  return { available: true };
}

// 获取相似战队（根据设置）
export async function fetchSimilarTeams(settings: {
  maxMembers?: number;
  minStakeToJoin?: number;
  isPublic?: boolean;
}): Promise<Team[]> {
  await delay(150);

  return mockTeams.filter(team => {
    let matches = 0;
    let checks = 0;

    if (settings.maxMembers !== undefined) {
      checks++;
      if (Math.abs(team.maxMembers - settings.maxMembers) <= 2) {
        matches++;
      }
    }

    if (settings.minStakeToJoin !== undefined) {
      checks++;
      const diff = Math.abs(team.settings.minStakeToJoin - settings.minStakeToJoin);
      if (diff <= settings.minStakeToJoin * 0.5) {
        matches++;
      }
    }

    if (settings.isPublic !== undefined) {
      checks++;
      if (team.settings.isPublic === settings.isPublic) {
        matches++;
      }
    }

    // 至少匹配 2/3 的条件
    return matches >= Math.ceil(checks * 0.66);
  }).slice(0, 3);
}
