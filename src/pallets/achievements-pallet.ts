// Substrate Achievement Pallet
// 链上成就系统的 Substrate Pallet 实现

/*
⚠️ 注意: 这是一个 Rust Substrate Pallet 的实现示例
   实际部署需要在 Substrate/Polkadot 开发环境中编译和部署

文件路径: pallets/achievements/src/lib.rs
*/

export const SUBSTRATE_ACHIEVEMENT_PALLET = `
#![cfg_attr(not(feature = "std"), no_std)]

pub use pallet::*;

#[frame_support::pallet]
pub mod pallet {
    use frame_support::{
        pallet_prelude::*,
        traits::{Currency, ReservableCurrency},
    };
    use frame_system::pallet_prelude::*;
    use sp_std::vec::Vec;

    #[pallet::config]
    pub trait Config: frame_system::Config {
        type Event: From<Event<Self>> + IsType<<Self as frame_system::Config>::Event>;
        type Currency: Currency<Self::AccountId> + ReservableCurrency<Self::AccountId>;
    }

    #[pallet::pallet]
    #[pallet::generate_store(pub(super) trait Store)]
    pub struct Pallet<T>(_);

    // 成就类别
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum AchievementCategory {
        Staking,      // 质押相关
        Earnings,     // 收益相关
        Social,       // 社交相关
        Competition,  // 竞赛相关
        Loyalty,      // 忠诚度相关
    }

    // 成就稀有度
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub enum AchievementRarity {
        Common,    // 50% 用户可获得
        Rare,      // 20% 用户可获得
        Epic,      // 5% 用户可获得
        Legendary, // 1% 用户可获得
    }

    // 成就定义
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    #[scale_info(skip_type_params(T))]
    pub struct Achievement<T: Config> {
        pub id: u32,
        pub name: BoundedVec<u8, ConstU32<64>>,
        pub description: BoundedVec<u8, ConstU32<256>>,
        pub category: AchievementCategory,
        pub rarity: AchievementRarity,
        pub threshold: u128,
        pub reward_xp: u32,
        pub metadata_uri: BoundedVec<u8, ConstU32<128>>,
    }

    // 用户成就数据
    #[derive(Encode, Decode, Clone, PartialEq, Eq, RuntimeDebug, TypeInfo, MaxEncodedLen)]
    pub struct UserAchievementData<BlockNumber> {
        pub unlocked_at: BlockNumber,
        pub progress: u128,
    }

    // Storage
    #[pallet::storage]
    #[pallet::getter(fn achievement)]
    pub type AchievementRegistry<T: Config> =
        StorageMap<_, Blake2_128Concat, u32, Achievement<T>>;

    #[pallet::storage]
    #[pallet::getter(fn user_achievements)]
    pub type UserAchievements<T: Config> =
        StorageDoubleMap<_,
            Blake2_128Concat, T::AccountId,
            Blake2_128Concat, u32,
            UserAchievementData<T::BlockNumber>
        >;

    #[pallet::storage]
    #[pallet::getter(fn user_progress)]
    pub type UserProgress<T: Config> =
        StorageDoubleMap<_,
            Blake2_128Concat, T::AccountId,
            Blake2_128Concat, u32,
            u128,
            ValueQuery
        >;

    #[pallet::storage]
    #[pallet::getter(fn next_achievement_id)]
    pub type NextAchievementId<T> = StorageValue<_, u32, ValueQuery>;

    #[pallet::storage]
    #[pallet::getter(fn user_total_xp)]
    pub type UserTotalXp<T: Config> =
        StorageMap<_, Blake2_128Concat, T::AccountId, u32, ValueQuery>;

    // Events
    #[pallet::event]
    #[pallet::generate_deposit(pub(super) fn deposit_event)]
    pub enum Event<T: Config> {
        /// 成就已创建 [achievement_id, name]
        AchievementCreated(u32, Vec<u8>),
        /// 成就已解锁 [user, achievement_id, rarity]
        AchievementUnlocked(T::AccountId, u32, AchievementRarity),
        /// 进度已更新 [user, achievement_id, progress]
        ProgressUpdated(T::AccountId, u32, u128),
        /// XP已获得 [user, xp_amount, total_xp]
        XpEarned(T::AccountId, u32, u32),
    }

    // Errors
    #[pallet::error]
    pub enum Error<T> {
        /// 成就不存在
        AchievementNotFound,
        /// 已经解锁
        AlreadyUnlocked,
        /// 条件未满足
        ConditionsNotMet,
        /// 名称过长
        NameTooLong,
        /// 描述过长
        DescriptionTooLong,
        /// URI过长
        UriTooLong,
    }

    // Calls (外部函数)
    #[pallet::call]
    impl<T: Config> Pallet<T> {
        /// 创建成就 (仅限治理)
        #[pallet::weight(10_000)]
        pub fn create_achievement(
            origin: OriginFor<T>,
            name: Vec<u8>,
            description: Vec<u8>,
            category: AchievementCategory,
            rarity: AchievementRarity,
            threshold: u128,
            reward_xp: u32,
            metadata_uri: Vec<u8>,
        ) -> DispatchResult {
            ensure_root(origin)?;

            ensure!(name.len() <= 64, Error::<T>::NameTooLong);
            ensure!(description.len() <= 256, Error::<T>::DescriptionTooLong);
            ensure!(metadata_uri.len() <= 128, Error::<T>::UriTooLong);

            let achievement_id = NextAchievementId::<T>::get();

            let achievement = Achievement {
                id: achievement_id,
                name: BoundedVec::try_from(name.clone()).map_err(|_| Error::<T>::NameTooLong)?,
                description: BoundedVec::try_from(description).map_err(|_| Error::<T>::DescriptionTooLong)?,
                category,
                rarity: rarity.clone(),
                threshold,
                reward_xp,
                metadata_uri: BoundedVec::try_from(metadata_uri).map_err(|_| Error::<T>::UriTooLong)?,
            };

            AchievementRegistry::<T>::insert(achievement_id, achievement);
            NextAchievementId::<T>::put(achievement_id + 1);

            Self::deposit_event(Event::AchievementCreated(achievement_id, name));
            Ok(())
        }

        /// 更新用户进度
        #[pallet::weight(5_000)]
        pub fn update_progress(
            origin: OriginFor<T>,
            user: T::AccountId,
            achievement_id: u32,
            progress: u128,
        ) -> DispatchResult {
            ensure_signed(origin)?;

            ensure!(
                AchievementRegistry::<T>::contains_key(achievement_id),
                Error::<T>::AchievementNotFound
            );

            UserProgress::<T>::insert(&user, achievement_id, progress);

            Self::deposit_event(Event::ProgressUpdated(user, achievement_id, progress));
            Ok(())
        }

        /// 解锁成就
        #[pallet::weight(10_000)]
        pub fn unlock_achievement(
            origin: OriginFor<T>,
            achievement_id: u32,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            let achievement = AchievementRegistry::<T>::get(achievement_id)
                .ok_or(Error::<T>::AchievementNotFound)?;

            ensure!(
                !UserAchievements::<T>::contains_key(&who, achievement_id),
                Error::<T>::AlreadyUnlocked
            );

            // 验证进度是否达到阈值
            let progress = UserProgress::<T>::get(&who, achievement_id);
            ensure!(progress >= achievement.threshold, Error::<T>::ConditionsNotMet);

            // 记录解锁数据
            let achievement_data = UserAchievementData {
                unlocked_at: <frame_system::Pallet<T>>::block_number(),
                progress,
            };
            UserAchievements::<T>::insert(&who, achievement_id, achievement_data);

            // 增加用户XP
            let current_xp = UserTotalXp::<T>::get(&who);
            let new_xp = current_xp.saturating_add(achievement.reward_xp);
            UserTotalXp::<T>::insert(&who, new_xp);

            Self::deposit_event(Event::AchievementUnlocked(
                who.clone(),
                achievement_id,
                achievement.rarity.clone(),
            ));

            Self::deposit_event(Event::XpEarned(
                who,
                achievement.reward_xp,
                new_xp,
            ));

            Ok(())
        }

        /// 批量解锁成就
        #[pallet::weight(50_000)]
        pub fn batch_unlock_achievements(
            origin: OriginFor<T>,
            achievement_ids: Vec<u32>,
        ) -> DispatchResult {
            let who = ensure_signed(origin)?;

            for achievement_id in achievement_ids {
                let _ = Self::unlock_achievement(
                    frame_system::RawOrigin::Signed(who.clone()).into(),
                    achievement_id,
                );
            }

            Ok(())
        }
    }

    // Helper functions
    impl<T: Config> Pallet<T> {
        /// 获取用户已解锁成就数量
        pub fn get_user_achievement_count(user: &T::AccountId) -> u32 {
            let mut count = 0;
            for achievement_id in 0..NextAchievementId::<T>::get() {
                if UserAchievements::<T>::contains_key(user, achievement_id) {
                    count += 1;
                }
            }
            count
        }

        /// 获取用户等级 (基于XP)
        pub fn get_user_level(user: &T::AccountId) -> u32 {
            let xp = UserTotalXp::<T>::get(user);
            // 简单等级公式: level = sqrt(xp / 100)
            ((xp / 100) as f64).sqrt() as u32
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use frame_support::{assert_ok, assert_noop};

    // 测试用例会在这里实现
}
`;

/**
 * 成就 Pallet 使用说明
 */
export const ACHIEVEMENT_PALLET_README = `
# Bifrost Achievement Pallet

链上成就系统的 Substrate Pallet 实现

## 功能特性

1. **成就创建**: 治理可以创建新的成就
2. **进度追踪**: 跟踪用户在各个成就上的进度
3. **自动解锁**: 用户达到阈值后可以解锁成就
4. **XP 系统**: 解锁成就获得经验值
5. **等级系统**: 基于总XP计算用户等级

## 成就类别

- \`Staking\`: 质押相关成就
- \`Earnings\`: 收益相关成就
- \`Social\`: 社交相关成就
- \`Competition\`: 竞赛相关成就
- \`Loyalty\`: 忠诚度相关成就

## 稀有度等级

- \`Common\`: 普通 (50%用户可获得)
- \`Rare\`: 稀有 (20%用户可获得)
- \`Epic\`: 史诗 (5%用户可获得)
- \`Legendary\`: 传奇 (1%用户可获得)

## 使用示例

### 创建成就

\`\`\`rust
// 通过治理创建成就
let _ = Achievements::create_achievement(
    Origin::root(),
    b"First Stake".to_vec(),
    b"Complete your first DOT stake".to_vec(),
    AchievementCategory::Staking,
    AchievementRarity::Common,
    1, // threshold: 1次质押
    100, // reward_xp: 100 XP
    b"ipfs://QmXxx.../first-stake.json".to_vec(),
);
\`\`\`

### 更新进度

\`\`\`rust
// 用户完成质押后,更新进度
let _ = Achievements::update_progress(
    Origin::signed(user),
    user.clone(),
    achievement_id,
    1, // progress: 1次质押
);
\`\`\`

### 解锁成就

\`\`\`rust
// 用户解锁成就
let _ = Achievements::unlock_achievement(
    Origin::signed(user),
    achievement_id,
);
\`\`\`

## 部署说明

1. 将代码添加到 \`pallets/achievements/src/lib.rs\`
2. 在 \`runtime/src/lib.rs\` 中添加 pallet:

\`\`\`rust
impl pallet_achievements::Config for Runtime {
    type Event = Event;
    type Currency = Balances;
}

construct_runtime! {
    pub enum Runtime where
        Block = Block,
        NodeBlock = opaque::Block,
        UncheckedExtrinsic = UncheckedExtrinsic
    {
        // ... other pallets
        Achievements: pallet_achievements,
    }
}
\`\`\`

3. 编译和部署到链上

## 前端集成

使用 Polkadot.js API 与 pallet 交互:

\`\`\`typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

// 连接到链
const api = await ApiPromise.create({
    provider: new WsProvider('wss://your-node-url')
});

// 查询用户成就
const achievements = await api.query.achievements.userAchievements.entries(userAddress);

// 解锁成就
const tx = api.tx.achievements.unlockAchievement(achievementId);
await tx.signAndSend(userAccount);
\`\`\`
`;
