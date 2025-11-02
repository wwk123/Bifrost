// 战队名称建议数据
export interface NameSuggestion {
  category: 'aggressive' | 'stable' | 'creative' | 'cultural' | 'mythical' | 'tech';
  categoryLabel: string;
  names: string[];
  description: string;
}

export const NAME_SUGGESTIONS: NameSuggestion[] = [
  {
    category: 'aggressive',
    categoryLabel: '激进型',
    description: '适合追求高收益、激进策略的战队',
    names: [
      '龙腾战队',
      '凤凰联盟',
      '霸王之师',
      '战神军团',
      '猎鹰突击',
      '雷霆战队',
      '烈焰军团',
      '狂狼部落'
    ]
  },
  {
    category: 'stable',
    categoryLabel: '稳健型',
    description: '适合注重风险控制、稳健投资的战队',
    names: [
      '稳健先锋',
      '长青联盟',
      '价值守护',
      '磐石联盟',
      '常青树',
      '稳固基石',
      '守护者',
      '平衡之道'
    ]
  },
  {
    category: 'creative',
    categoryLabel: '创意型',
    description: '适合富有创意、追求创新的战队',
    names: [
      '链上游侠',
      'DeFi探险家',
      '收益猎人',
      '区块先锋',
      '智能金矿',
      '数字淘金者',
      '链上掘金',
      '去中心化梦想'
    ]
  },
  {
    category: 'cultural',
    categoryLabel: '文化型',
    description: '适合注重文化氛围、团队精神的战队',
    names: [
      '华夏联盟',
      '东方之星',
      '中华战队',
      '炎黄子孙',
      '丝路商队',
      '江湖侠客',
      '武林盟主',
      '书院学社'
    ]
  },
  {
    category: 'mythical',
    categoryLabel: '神话型',
    description: '适合喜欢神话元素、英雄主题的战队',
    names: [
      '奥林匹斯',
      '瓦尔哈拉',
      '泰坦军团',
      '神话时代',
      '英灵殿',
      '众神之巅',
      '北欧神话',
      '天神降临'
    ]
  },
  {
    category: 'tech',
    categoryLabel: '科技型',
    description: '适合注重技术、数据驱动的战队',
    names: [
      '量化先锋',
      '算法部落',
      '智能合约',
      '代码战士',
      '数据驱动',
      '技术极客',
      '黑客联盟',
      '赛博朋克'
    ]
  }
];

// 获取所有名称（扁平化）
export function getAllSuggestions(): string[] {
  return NAME_SUGGESTIONS.flatMap(category => category.names);
}

// 根据类别获取建议
export function getSuggestionsByCategory(category: NameSuggestion['category']): string[] {
  const found = NAME_SUGGESTIONS.find(s => s.category === category);
  return found ? found.names : [];
}

// 随机获取N个建议
export function getRandomSuggestions(count: number = 5): string[] {
  const all = getAllSuggestions();
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

// 根据关键词搜索建议
export function searchSuggestions(keyword: string): string[] {
  if (!keyword || keyword.trim().length === 0) {
    return getRandomSuggestions();
  }

  const all = getAllSuggestions();
  return all.filter(name =>
    name.toLowerCase().includes(keyword.toLowerCase())
  );
}
