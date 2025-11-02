'use client';

import { WizardContainer } from '@/components/teams/WizardSteps';
import { Shield, TrendingUp, Info } from 'lucide-react';

interface Step3Props {
  formData: any;
  setFormData: (data: any) => void;
  isConnected: boolean;
}

export function Step3Requirements({ formData, setFormData, isConnected }: Step3Props) {
  // 根据成员数计算建议质押
  const suggestedStake = Math.max(100, formData.maxMembers * 50);

  const quickSetStake = (amount: number) => {
    setFormData((prev: any) => ({ ...prev, minStakeToJoin: amount }));
  };

  return (
    <WizardContainer
      title="入队要求"
      subtitle="设置加入战队的条件和门槛"
    >
      <div className="space-y-6">
        {/* 最低质押 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Shield className="inline h-4 w-4 mr-1" />
            最低质押要求 <span className="text-error">*</span>
          </label>

          <div className="relative">
            <input
              type="number"
              min="0"
              step="10"
              value={formData.minStakeToJoin}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, minStakeToJoin: Number(e.target.value) }))}
              disabled={!isConnected}
              className="w-full px-4 py-3 pr-16 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-bifrost-primary/50 transition-all disabled:opacity-50"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary text-sm">
              DOT
            </span>
          </div>

          <p className="mt-2 text-xs text-text-secondary">
            设为 0 表示无最低质押要求
          </p>

          {/* 快速设置按钮 */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className="text-xs text-text-secondary">快速设置:</span>
            {[0, 100, 500, 1000, suggestedStake].filter((v, i, arr) => arr.indexOf(v) === i).map((amount) => (
              <button
                key={amount}
                type="button"
                onClick={() => quickSetStake(amount)}
                disabled={!isConnected}
                className={`
                  px-3 py-1 rounded-lg text-xs font-medium transition-all
                  ${
                    formData.minStakeToJoin === amount
                      ? 'bg-bifrost-primary text-white'
                      : 'bg-white/10 text-text-secondary hover:bg-white/20'
                  }
                  disabled:opacity-50
                `}
              >
                {amount === 0 ? '无要求' : `${amount} DOT`}
                {amount === suggestedStake && ' (推荐)'}
              </button>
            ))}
          </div>

          {/* 建议提示 */}
          <div className="mt-3 p-3 rounded-lg bg-info/10 border border-info/30">
            <p className="text-xs text-info flex items-start gap-2">
              <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
              <span>
                根据您设置的 {formData.maxMembers} 人团队规模,建议最低质押设为 {suggestedStake} DOT,以确保成员承诺度
              </span>
            </p>
          </div>
        </div>

        {/* 预期影响 */}
        <div className="space-y-3 p-6 bg-white/5 rounded-xl border border-white/10">
          <div className="flex items-center gap-2 text-white font-medium">
            <TrendingUp className="h-5 w-5 text-success" />
            <h3 className="text-base font-semibold">预期影响分析</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-text-secondary mb-1">入队门槛</div>
              <div className="text-lg font-bold text-white">
                {formData.minStakeToJoin === 0 ? '无' : formData.minStakeToJoin < 500 ? '低' : formData.minStakeToJoin < 1000 ? '中' : '高'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-text-secondary mb-1">预期招募速度</div>
              <div className="text-lg font-bold text-white">
                {formData.minStakeToJoin === 0 ? '很快' : formData.minStakeToJoin < 500 ? '快' : formData.minStakeToJoin < 1000 ? '中等' : '较慢'}
              </div>
            </div>

            <div className="p-3 rounded-lg bg-white/5 border border-white/10">
              <div className="text-xs text-text-secondary mb-1">成员质量</div>
              <div className="text-lg font-bold text-white">
                {formData.minStakeToJoin === 0 ? '一般' : formData.minStakeToJoin < 500 ? '中等' : formData.minStakeToJoin < 1000 ? '良好' : '优秀'}
              </div>
            </div>
          </div>
        </div>

        {/* 附加要求 */}
        <div>
          <label className="block text-sm font-medium text-white mb-2">
            附加要求 <span className="text-text-secondary">(可选)</span>
          </label>

          <textarea
            value={formData.additionalRequirements || ''}
            onChange={(e) => setFormData((prev: any) => ({ ...prev, additionalRequirements: e.target.value }))}
            rows={3}
            placeholder="例如: 需要有DeFi经验、每周至少活跃3天等..."
            disabled={!isConnected}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-bifrost-primary/50 transition-all resize-none disabled:opacity-50"
          />

          <p className="mt-1 text-xs text-text-secondary">
            详细说明其他加入条件(会在战队详情中显示)
          </p>
        </div>
      </div>
    </WizardContainer>
  );
}
