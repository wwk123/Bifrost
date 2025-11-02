'use client';

import { WizardContainer } from '@/components/teams/WizardSteps';
import { Users, Globe, Lock, Info } from 'lucide-react';

interface Step2Props {
  formData: any;
  setFormData: (data: any) => void;
  isConnected: boolean;
}

export function Step2Configuration({ formData, setFormData, isConnected }: Step2Props) {
  return (
    <WizardContainer
      title="团队配置"
      subtitle="设置成员数量和权限管理"
    >
      <div className="space-y-6">
        {/* 最大成员数 */}
        <div>
          <label className="block text-sm font-medium text-white mb-3">
            <Users className="inline h-4 w-4 mr-1" />
            最大成员数 <span className="text-error">*</span>
          </label>

          <div className="space-y-3">
            <input
              type="range"
              min="2"
              max="10"
              value={formData.maxMembers}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, maxMembers: Number(e.target.value) }))}
              disabled={!isConnected}
              className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-bifrost-primary disabled:opacity-50"
            />

            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">2人</span>
              <div className="text-center">
                <div className="text-3xl font-bold text-bifrost-primary">
                  {formData.maxMembers}
                </div>
                <div className="text-xs text-text-secondary">名成员</div>
              </div>
              <span className="text-sm text-text-secondary">10人</span>
            </div>

            <div className="p-3 rounded-lg bg-info/10 border border-info/30">
              <p className="text-xs text-info flex items-start gap-2">
                <Info className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>成员越多,团队加成越高,但管理难度也会增加</span>
              </p>
            </div>
          </div>
        </div>

        {/* 公开/私密 */}
        <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-base font-semibold text-white">可见性设置</h3>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              checked={formData.isPublic}
              onChange={() => setFormData((prev: any) => ({ ...prev, isPublic: true }))}
              disabled={!isConnected}
              className="mt-1 h-5 w-5 text-bifrost-primary focus:ring-2 focus:ring-bifrost-primary/50 disabled:opacity-50"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white font-medium group-hover:text-bifrost-primary transition-colors">
                <Globe className="h-4 w-4" />
                公开战队
              </div>
              <p className="text-sm text-text-secondary mt-1">
                任何人都可以查看战队信息并申请加入
              </p>
            </div>
          </label>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="radio"
              checked={!formData.isPublic}
              onChange={() => setFormData((prev: any) => ({ ...prev, isPublic: false }))}
              disabled={!isConnected}
              className="mt-1 h-5 w-5 text-bifrost-primary focus:ring-2 focus:ring-bifrost-primary/50 disabled:opacity-50"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2 text-white font-medium group-hover:text-bifrost-primary transition-colors">
                <Lock className="h-4 w-4" />
                私密战队
              </div>
              <p className="text-sm text-text-secondary mt-1">
                仅通过邀请链接加入,不在公开列表中显示
              </p>
            </div>
          </label>
        </div>

        {/* 审批设置 */}
        <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
          <h3 className="text-base font-semibold text-white">加入审批</h3>

          <label className="flex items-start gap-3 cursor-pointer group">
            <input
              type="checkbox"
              checked={formData.requireApproval}
              onChange={(e) => setFormData((prev: any) => ({ ...prev, requireApproval: e.target.checked }))}
              disabled={!isConnected}
              className="mt-1 h-5 w-5 rounded border-white/20 bg-white/5 text-bifrost-primary focus:ring-2 focus:ring-bifrost-primary/50 disabled:opacity-50"
            />
            <div className="flex-1">
              <div className="text-white font-medium group-hover:text-bifrost-primary transition-colors">
                需要队长审批
              </div>
              <p className="text-sm text-text-secondary mt-1">
                新成员申请需要队长审核通过后才能加入
              </p>
            </div>
          </label>

          {formData.requireApproval && (
            <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
              <p className="text-xs text-warning">
                ⚠️ 启用审批后,你需要及时处理加入申请,避免流失潜在成员
              </p>
            </div>
          )}
        </div>
      </div>
    </WizardContainer>
  );
}
