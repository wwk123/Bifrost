// 战队模板数据
export interface TeamTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  colorTheme: string;
  maxMembers: number;
  minStakeToJoin: number;
  isPublic: boolean;
  requireApproval: boolean;
  category: 'beginner' | 'balanced' | 'elite' | 'competitive';
  recommendedFor: string;
  benefits: string[];
}

export const TEAM_TEMPLATES: TeamTemplate[] = [
  {
    id: 'beginner-friendly',
    name: '新手友好型',
    description: '欢迎所有新手加入,一起学习成长,共同探索DeFi世界',
    icon: '🌟',
    colorTheme: 'from-blue-500/30 to-cyan-500/30',
    maxMembers: 5,
    minStakeToJoin: 100,
    isPublic: true,
    requireApproval: false,
    category: 'beginner',
    recommendedFor: '刚开始接触DeFi的用户',
    benefits: [
      '无审批快速加入',
      '低门槛友好',
      '适合学习交流'
    ]
  },
  {
    id: 'balanced-growth',
    name: '均衡成长型',
    description: '稳健收益与团队协作并重,追求长期价值增长',
    icon: '🛡️',
    colorTheme: 'from-green-500/30 to-emerald-500/30',
    maxMembers: 7,
    minStakeToJoin: 500,
    isPublic: true,
    requireApproval: true,
    category: 'balanced',
    recommendedFor: '有一定经验的稳健型投资者',
    benefits: [
      '适中的入队门槛',
      '队长审核保证质量',
      '平衡收益与风险'
    ]
  },
  {
    id: 'high-performance',
    name: '高绩效团队',
    description: '追求最大化收益,需要较高质押量和活跃参与',
    icon: '🚀',
    colorTheme: 'from-purple-500/30 to-pink-500/30',
    maxMembers: 10,
    minStakeToJoin: 1000,
    isPublic: true,
    requireApproval: true,
    category: 'competitive',
    recommendedFor: '追求高收益的活跃用户',
    benefits: [
      '更高的团队加成',
      '活跃的交流氛围',
      '竞赛奖池分成'
    ]
  },
  {
    id: 'elite-squad',
    name: '精英小队',
    description: '严格筛选,高质押门槛,专注于顶级策略和收益最大化',
    icon: '👑',
    colorTheme: 'from-yellow-500/30 to-orange-500/30',
    maxMembers: 5,
    minStakeToJoin: 5000,
    isPublic: false,
    requireApproval: true,
    category: 'elite',
    recommendedFor: '资深DeFi玩家和大户',
    benefits: [
      '顶级成员质量',
      '最高收益潜力',
      '私密性强'
    ]
  },
  {
    id: 'social-casual',
    name: '社交休闲型',
    description: '轻松氛围,重在交友和社区互动,收益为辅',
    icon: '🎉',
    colorTheme: 'from-pink-500/30 to-rose-500/30',
    maxMembers: 8,
    minStakeToJoin: 200,
    isPublic: true,
    requireApproval: false,
    category: 'beginner',
    recommendedFor: '注重社交体验的用户',
    benefits: [
      '轻松友好氛围',
      '社区活动丰富',
      '无压力参与'
    ]
  },
  {
    id: 'strategy-focused',
    name: '策略研究型',
    description: '深度研究DeFi策略,分享经验,共同提升收益能力',
    icon: '🔮',
    colorTheme: 'from-indigo-500/30 to-violet-500/30',
    maxMembers: 6,
    minStakeToJoin: 800,
    isPublic: true,
    requireApproval: true,
    category: 'balanced',
    recommendedFor: '喜欢研究和分享的用户',
    benefits: [
      '策略深度交流',
      '经验共享机制',
      '持续学习提升'
    ]
  }
];

// 根据类别获取模板
export function getTemplatesByCategory(category: TeamTemplate['category']) {
  return TEAM_TEMPLATES.filter(template => template.category === category);
}

// 根据用户资产推荐模板
export function recommendTemplate(userStakedAmount: number): TeamTemplate {
  if (userStakedAmount < 500) {
    return TEAM_TEMPLATES[0]; // beginner-friendly
  } else if (userStakedAmount < 2000) {
    return TEAM_TEMPLATES[1]; // balanced-growth
  } else if (userStakedAmount < 5000) {
    return TEAM_TEMPLATES[2]; // high-performance
  } else {
    return TEAM_TEMPLATES[3]; // elite-squad
  }
}
