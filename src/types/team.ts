// 组队竞赛系统类型定义

export interface TeamMember {
  address: string;
  displayName: string;
  avatar: string;
  role: 'captain' | 'member';
  contribution: {
    staked: number;
    weeklyEarnings: number;
    referrals: number;
  };
  individualRank?: number;
  achievements?: string[];
  joinedAt: Date;
}

export interface TeamBonuses {
  memberCount: number;
  synergy: number;
  achievements: number;
  captain: number;
  totalMultiplier: number;
}

export interface Team {
  id: string;
  name: string;
  description: string;
  captain: string;
  members: TeamMember[];
  maxMembers: number;
  stats: {
    totalStaked: number;
    weeklyEarnings: number;
    averageRoi: number;
    teamRank: number;
  };
  bonuses: TeamBonuses;
  settings: {
    isPublic: boolean;
    requireApproval: boolean;
    minStakeToJoin: number;
  };
  createdAt: Date;
}

export interface TeamCompetition {
  id: string;
  name: string;
  startDate: Date;
  endDate: Date;
  rules: {
    metric: 'total-earnings' | 'average-roi' | 'growth-rate';
    minTeamSize: number;
    maxTeamSize: number;
  };
  prizePool: {
    first: string;
    second: string;
    third: string;
    participation: string;
  };
  participants: string[];
  leaderboard: TeamLeaderboardEntry[];
}

export interface TeamLeaderboardEntry {
  rank: number;
  teamId: string;
  teamName: string;
  score: number;
  members: number;
  trend: 'up' | 'down' | 'stable';
}

export interface TeamEarnings {
  baseEarnings: number;
  bonusEarnings: number;
  totalEarnings: number;
  multiplier: number;
}
