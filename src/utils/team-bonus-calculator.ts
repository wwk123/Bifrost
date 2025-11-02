// 团队加成计算工具

import type { Team, TeamBonuses, TeamEarnings } from '@/types/team';

/**
 * 计算团队加成
 * @param team 团队信息
 * @returns 团队加成详情
 */
export function calculateTeamBonus(team: Team): TeamBonuses {
  let totalMultiplier = 1.0;

  // 1. 成员数加成(每多1人 +2%,上限 +20%)
  const memberBonus = Math.min((team.members.length - 1) * 0.02, 0.2);
  totalMultiplier += memberBonus;

  // 2. 协同加成(基于成员活跃度)
  const activeMembersCount = team.members.filter(
    (m) => m.contribution.weeklyEarnings > 0
  ).length;
  const activityRate = activeMembersCount / team.members.length;
  const synergyBonus = activityRate * 0.15; // 最高 +15%
  totalMultiplier += synergyBonus;

  // 3. 成就加成(团队总成就数)
  const totalAchievements = team.members.reduce(
    (sum, m) => sum + (m.achievements?.length || 0),
    0
  );
  const achievementBonus = Math.min(totalAchievements * 0.005, 0.25); // 每个成就 +0.5%,上限 +25%
  totalMultiplier += achievementBonus;

  // 4. 队长加成(如果队长是前10名)
  const captain = team.members.find((m) => m.role === 'captain');
  const captainBonus =
    captain && captain.individualRank !== undefined && captain.individualRank <= 10 ? 0.1 : 0;
  totalMultiplier += captainBonus;

  return {
    memberCount: memberBonus,
    synergy: synergyBonus,
    achievements: achievementBonus,
    captain: captainBonus,
    totalMultiplier
  };
}

/**
 * 应用团队加成到个人收益
 * @param individualEarnings 个人收益
 * @param team 团队信息
 * @returns 加成后的收益
 */
export function applyTeamBonus(individualEarnings: number, team: Team): number {
  const bonus = calculateTeamBonus(team);
  return individualEarnings * bonus.totalMultiplier;
}

/**
 * 计算团队总收益
 * @param team 团队信息
 * @returns 团队收益详情
 */
export function calculateTeamEarnings(team: Team): TeamEarnings {
  const baseEarnings = team.members.reduce(
    (sum, m) => sum + m.contribution.weeklyEarnings,
    0
  );

  const bonus = calculateTeamBonus(team);
  const bonusEarnings = baseEarnings * (bonus.totalMultiplier - 1);

  return {
    baseEarnings,
    bonusEarnings,
    totalEarnings: baseEarnings + bonusEarnings,
    multiplier: bonus.totalMultiplier
  };
}

/**
 * 验证用户是否符合加入团队的条件
 * @param userStaked 用户质押量
 * @param team 团队信息
 * @returns 是否符合条件
 */
export function canJoinTeam(userStaked: number, team: Team): boolean {
  if (team.members.length >= team.maxMembers) {
    return false;
  }

  if (userStaked < team.settings.minStakeToJoin) {
    return false;
  }

  return true;
}
