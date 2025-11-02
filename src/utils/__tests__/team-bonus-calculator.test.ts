import { describe, it, expect } from 'vitest';
import {
  calculateTeamBonus,
  applyTeamBonus,
  calculateTeamEarnings,
  canJoinTeam
} from '../team-bonus-calculator';
import type { Team } from '@/types/team';

describe('Team Bonus Calculator', () => {
  const mockTeam: Team = {
    id: 'team-1',
    name: 'Test Team',
    description: 'Test Description',
    captain: '0x123',
    maxMembers: 10,
    members: [
      {
        address: '0x123',
        displayName: 'Captain',
        avatar: '',
        role: 'captain',
        contribution: {
          staked: 5000,
          weeklyEarnings: 450,
          referrals: 3
        },
        individualRank: 5,
        achievements: ['ach1', 'ach2', 'ach3'],
        joinedAt: new Date()
      },
      {
        address: '0x456',
        displayName: 'Member 1',
        avatar: '',
        role: 'member',
        contribution: {
          staked: 3500,
          weeklyEarnings: 320,
          referrals: 2
        },
        individualRank: 15,
        achievements: ['ach1', 'ach2'],
        joinedAt: new Date()
      },
      {
        address: '0x789',
        displayName: 'Member 2',
        avatar: '',
        role: 'member',
        contribution: {
          staked: 2500,
          weeklyEarnings: 210,
          referrals: 1
        },
        achievements: ['ach1'],
        joinedAt: new Date()
      }
    ],
    stats: {
      totalStaked: 11000,
      weeklyEarnings: 980,
      averageRoi: 8.9,
      teamRank: 3
    },
    bonuses: {
      memberCount: 0,
      synergy: 0,
      achievements: 0,
      captain: 0,
      totalMultiplier: 1
    },
    settings: {
      isPublic: true,
      requireApproval: false,
      minStakeToJoin: 100
    },
    createdAt: new Date()
  };

  describe('calculateTeamBonus', () => {
    it('should calculate member count bonus correctly', () => {
      const bonus = calculateTeamBonus(mockTeam);
      expect(bonus.memberCount).toBe(0.04); // (3 - 1) * 0.02 = 0.04
    });

    it('should calculate synergy bonus correctly', () => {
      const bonus = calculateTeamBonus(mockTeam);
      // All 3 members have weeklyEarnings > 0, so activityRate = 1.0
      expect(bonus.synergy).toBe(0.15); // 1.0 * 0.15 = 0.15
    });

    it('should calculate achievement bonus correctly', () => {
      const bonus = calculateTeamBonus(mockTeam);
      // Total achievements: 3 + 2 + 1 = 6
      expect(bonus.achievements).toBe(0.03); // 6 * 0.005 = 0.03
    });

    it('should calculate captain bonus correctly', () => {
      const bonus = calculateTeamBonus(mockTeam);
      expect(bonus.captain).toBe(0.1); // Captain rank is 5 (top 10)
    });

    it('should calculate total multiplier correctly', () => {
      const bonus = calculateTeamBonus(mockTeam);
      // 1.0 + 0.04 + 0.15 + 0.03 + 0.1 = 1.32
      expect(bonus.totalMultiplier).toBeCloseTo(1.32, 2);
    });

    it('should not give captain bonus if captain rank > 10', () => {
      const teamWithLowRankCaptain = {
        ...mockTeam,
        members: mockTeam.members.map((m) =>
          m.role === 'captain' ? { ...m, individualRank: 15 } : m
        )
      };

      const bonus = calculateTeamBonus(teamWithLowRankCaptain);
      expect(bonus.captain).toBe(0);
    });
  });

  describe('applyTeamBonus', () => {
    it('should apply team bonus to individual earnings', () => {
      const individualEarnings = 100;
      const result = applyTeamBonus(individualEarnings, mockTeam);

      const bonus = calculateTeamBonus(mockTeam);
      expect(result).toBe(individualEarnings * bonus.totalMultiplier);
    });
  });

  describe('calculateTeamEarnings', () => {
    it('should calculate team earnings correctly', () => {
      const result = calculateTeamEarnings(mockTeam);

      expect(result.baseEarnings).toBe(980); // Sum of all weekly earnings
      expect(result.multiplier).toBeCloseTo(1.32, 2);
      expect(result.bonusEarnings).toBeCloseTo(980 * 0.32, 2);
      expect(result.totalEarnings).toBeCloseTo(980 * 1.32, 2);
    });
  });

  describe('canJoinTeam', () => {
    it('should return true if user meets requirements', () => {
      const result = canJoinTeam(500, mockTeam);
      expect(result).toBe(true);
    });

    it('should return false if user stake is below minimum', () => {
      const result = canJoinTeam(50, mockTeam);
      expect(result).toBe(false);
    });

    it('should return false if team is full', () => {
      const fullTeam = {
        ...mockTeam,
        maxMembers: 3 // Team already has 3 members
      };

      const result = canJoinTeam(500, fullTeam);
      expect(result).toBe(false);
    });
  });
});
