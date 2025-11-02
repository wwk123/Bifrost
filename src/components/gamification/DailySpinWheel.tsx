'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Gift, Sparkles, Clock, Zap, Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '@/utils/sound';

interface Reward {
  id: string;
  item: string;
  icon: string;
  probability: number;
  color: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const REWARDS: Reward[] = [
  { id: '1', item: '10 BNC', icon: '🪙', probability: 40, color: '#94a3b8', rarity: 'common' },
  { id: '2', item: '+5% 收益加成', icon: '📈', probability: 30, color: '#3b82f6', rarity: 'rare' },
  { id: '3', item: '神秘徽章', icon: '🏆', probability: 5, color: '#a855f7', rarity: 'legendary' },
  { id: '4', item: '50 经验值', icon: '⭐', probability: 25, color: '#10b981', rarity: 'common' },
  { id: '5', item: '100 BNC', icon: '💎', probability: 10, color: '#eab308', rarity: 'epic' },
  { id: '6', item: '再来一次', icon: '🎯', probability: 20, color: '#f97316', rarity: 'rare' },
  { id: '7', item: '24h双倍积分', icon: '⚡', probability: 15, color: '#06b6d4', rarity: 'rare' },
  { id: '8', item: '幸运符', icon: '🍀', probability: 5, color: '#84cc16', rarity: 'epic' }
];

interface DailySpinWheelProps {
  onRewardClaimed?: (reward: Reward) => void;
  canSpin?: boolean;
  remainingTime?: number; // 下次可转时间(秒)
}

export function DailySpinWheel({
  onRewardClaimed,
  canSpin = true,
  remainingTime = 0
}: DailySpinWheelProps) {
  const [isSpinning, setIsSpinning] = useState(false);
  const [selectedReward, setSelectedReward] = useState<Reward | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [timeLeft, setTimeLeft] = useState(remainingTime);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [winningSegment, setWinningSegment] = useState<number | null>(null);
  const controls = useAnimation();

  // 加载音效配置
  useEffect(() => {
    setSoundEnabled(soundManager.isEnabled());
  }, []);

  // 倒计时
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => Math.max(0, prev - 1));
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  // 根据概率选择奖励
  const selectReward = (): Reward => {
    const random = Math.random() * 100;
    let cumulative = 0;

    for (const reward of REWARDS) {
      cumulative += reward.probability;
      if (random <= cumulative) {
        return reward;
      }
    }

    return REWARDS[0];
  };

  const handleSpin = async () => {
    if (!canSpin || isSpinning || timeLeft > 0) return;

    // 播放点击音效
    soundManager.play('click');

    setIsSpinning(true);
    setShowResult(false);

    const reward = selectReward();
    setSelectedReward(reward);

    // 播放旋转音效
    soundManager.play('spin');

    // 找到奖励在轮盘上的索引
    const targetIndex = REWARDS.findIndex(r => r.id === reward.id);

    // 计算旋转角度(多转几圈增加悬念)
    const segmentAngle = 360 / REWARDS.length;
    const targetAngle = targetIndex * segmentAngle;
    const fullRotations = 1440; // 4圈
    const finalAngle = fullRotations + (360 - targetAngle); // 逆时针旋转

    // 执行旋转动画 (改进的缓动效果)
    await controls.start({
      rotate: finalAngle,
      transition: {
        duration: 4,
        ease: [0.33, 0.01, 0.1, 1.0], // 更流畅的缓动曲线
        type: 'tween'
      }
    });

    // 设置中奖区域高亮
    setWinningSegment(targetIndex);

    // 播放中奖音效
    if (reward.rarity === 'legendary' || reward.rarity === 'epic') {
      soundManager.play('celebration');
    } else {
      soundManager.play('win');
    }

    // 显示结果
    setIsSpinning(false);
    setShowResult(true);
    setTimeLeft(86400); // 24小时后可再次抽奖

    onRewardClaimed?.(reward);
  };

  // 切换音效
  const toggleSound = () => {
    const newState = !soundEnabled;
    setSoundEnabled(newState);
    soundManager.setEnabled(newState);
    soundManager.play('click');
  };

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6 bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl border border-slate-700 relative">
      {/* 音效控制按钮 */}
      <button
        onClick={toggleSound}
        className="absolute top-4 right-4 p-2 rounded-full bg-slate-700/50 hover:bg-slate-600/50 transition-colors z-10"
        title={soundEnabled ? '关闭音效' : '开启音效'}
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-yellow-500" />
        ) : (
          <VolumeX className="w-5 h-5 text-slate-400" />
        )}
      </button>

      {/* 标题区 */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Gift className="w-6 h-6 text-yellow-500" />
          <h2 className="text-2xl font-bold text-white">每日幸运转盘</h2>
          <Sparkles className="w-6 h-6 text-yellow-500" />
        </div>
        {timeLeft > 0 ? (
          <div className="flex items-center justify-center gap-2 text-slate-400">
            <Clock className="w-4 h-4" />
            <span>下次可转: {formatTime(timeLeft)}</span>
          </div>
        ) : (
          <p className="text-green-400 font-semibold">今日转盘已就绪!</p>
        )}
      </div>

      {/* 转盘主体 */}
      <div className="relative w-[400px] h-[400px]">
        {/* 外圈装饰 - 旋转时发光 */}
        <motion.div
          className={`
            absolute inset-0 rounded-full border-8
            shadow-xl transition-all duration-300
            ${isSpinning
              ? 'border-yellow-400 shadow-yellow-400/50 animate-pulse'
              : 'border-yellow-500/30 shadow-yellow-500/20'
            }
          `}
          animate={isSpinning ? {
            boxShadow: [
              '0 0 20px rgba(250, 204, 21, 0.3)',
              '0 0 40px rgba(250, 204, 21, 0.6)',
              '0 0 20px rgba(250, 204, 21, 0.3)'
            ]
          } : {}}
          transition={{
            duration: 1,
            repeat: isSpinning ? Infinity : 0
          }}
        />

        {/* 转盘 */}
        <motion.div
          animate={controls}
          className="absolute inset-4 rounded-full overflow-hidden shadow-2xl"
          style={{ transformOrigin: 'center' }}
        >
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {REWARDS.map((reward, index) => {
              const segmentAngle = 360 / REWARDS.length;
              const startAngle = index * segmentAngle - 90;
              const endAngle = startAngle + segmentAngle;

              const startRad = (startAngle * Math.PI) / 180;
              const endRad = (endAngle * Math.PI) / 180;

              const x1 = 50 + 50 * Math.cos(startRad);
              const y1 = 50 + 50 * Math.sin(startRad);
              const x2 = 50 + 50 * Math.cos(endRad);
              const y2 = 50 + 50 * Math.sin(endRad);

              return (
                <g key={reward.id}>
                  <path
                    d={`M 50 50 L ${x1} ${y1} A 50 50 0 0 1 ${x2} ${y2} Z`}
                    fill={reward.color}
                    stroke="#1e293b"
                    strokeWidth="0.5"
                    className={`transition-all duration-300 ${
                      winningSegment === index && !isSpinning
                        ? 'drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]'
                        : ''
                    }`}
                    style={{
                      filter: winningSegment === index && !isSpinning
                        ? 'brightness(1.3)'
                        : 'none'
                    }}
                  />
                  <text
                    x="50"
                    y="50"
                    fill="white"
                    fontSize="10"
                    fontWeight="bold"
                    textAnchor="middle"
                    transform={`rotate(${startAngle + segmentAngle / 2}, 50, 50) translate(0, -25)`}
                    className={winningSegment === index && !isSpinning ? 'animate-pulse' : ''}
                  >
                    {reward.icon}
                  </text>
                </g>
              );
            })}
          </svg>
        </motion.div>

        {/* 中心按钮容器 - 用于保持位置不变 */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 z-10">
          <motion.button
            whileHover={!isSpinning && canSpin && timeLeft === 0 ? { scale: 1.1 } : {}}
            whileTap={!isSpinning && canSpin && timeLeft === 0 ? { scale: 0.95 } : {}}
            onClick={handleSpin}
            disabled={isSpinning || !canSpin || timeLeft > 0}
            className={`
              w-full h-full rounded-full
              flex items-center justify-center
              font-bold text-lg
              shadow-2xl
              transition-shadow duration-300
              ${isSpinning || timeLeft > 0
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-yellow-400 to-yellow-600 text-white hover:shadow-yellow-500/50 cursor-pointer'
              }
            `}
          >
            {isSpinning ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              >
                <Zap className="w-8 h-8" />
              </motion.div>
            ) : timeLeft > 0 ? (
              <Clock className="w-8 h-8" />
            ) : (
              '开始'
            )}
          </motion.button>
        </div>

        {/* 指针 */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-20"
          animate={isSpinning ? {
            scale: [1, 1.15, 1],
            y: [0, -3, 0]
          } : {}}
          transition={{
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
            ease: 'easeInOut'
          }}
        >
          <div className={`
            w-0 h-0
            border-l-[15px] border-r-[15px] border-t-[30px]
            border-l-transparent border-r-transparent border-t-red-500
            drop-shadow-lg
            ${isSpinning ? 'drop-shadow-[0_0_10px_rgba(239,68,68,0.8)]' : ''}
          `} />
        </motion.div>
      </div>

      {/* 奖励列表 */}
      <div className="w-full">
        <h3 className="text-sm font-semibold text-slate-400 mb-2 text-center">可能获得的奖励</h3>
        <div className="grid grid-cols-4 gap-2">
          {REWARDS.map((reward) => (
            <div
              key={reward.id}
              className={`
                p-2 rounded-lg text-center
                border-2
                ${reward.rarity === 'legendary' ? 'border-purple-500/50 bg-purple-500/10' :
                  reward.rarity === 'epic' ? 'border-yellow-500/50 bg-yellow-500/10' :
                  reward.rarity === 'rare' ? 'border-blue-500/50 bg-blue-500/10' :
                  'border-slate-600 bg-slate-800/50'
                }
              `}
            >
              <div className="text-2xl mb-1">{reward.icon}</div>
              <div className="text-xs text-slate-300 line-clamp-2">{reward.item}</div>
              <div className="text-[10px] text-slate-500 mt-1">{reward.probability}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* 结果弹窗 */}
      {showResult && selectedReward && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowResult(false)}
        >
          <motion.div
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className={`
              p-8 rounded-2xl text-center
              bg-gradient-to-br
              ${selectedReward.rarity === 'legendary' ? 'from-purple-600 to-pink-600' :
                selectedReward.rarity === 'epic' ? 'from-yellow-500 to-orange-600' :
                selectedReward.rarity === 'rare' ? 'from-blue-500 to-cyan-600' :
                'from-slate-600 to-slate-700'
              }
              shadow-2xl border-4 border-white/30
              max-w-md
            `}
          >
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-8xl mb-4"
            >
              {selectedReward.icon}
            </motion.div>

            <h3 className="text-3xl font-bold text-white mb-2">恭喜获得!</h3>
            <p className="text-2xl text-white/90 mb-6">{selectedReward.item}</p>

            <div className="flex gap-3 justify-center">
              <button
                onClick={() => {
                  setShowResult(false);
                  setWinningSegment(null);
                }}
                className="px-6 py-3 bg-white text-slate-900 rounded-lg font-semibold hover:bg-slate-100 transition-colors"
              >
                太棒了!
              </button>
              <button
                onClick={() => {
                  setShowResult(false);
                  setWinningSegment(null);
                  // TODO: 触发分享功能
                }}
                className="px-6 py-3 bg-white/20 text-white rounded-lg font-semibold hover:bg-white/30 transition-colors"
              >
                分享
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
