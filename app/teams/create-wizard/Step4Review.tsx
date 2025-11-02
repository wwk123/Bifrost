'use client';

import { WizardContainer } from '@/components/teams/WizardSteps';
import { TeamPreviewCard } from '@/components/teams/TeamPreviewCard';
import { Edit2, CheckCircle } from 'lucide-react';

interface Step4Props {
  formData: any;
  onEdit: (step: number) => void;
  isConnected: boolean;
}

export function Step4Review({ formData, onEdit, isConnected }: Step4Props) {
  const sections = [
    {
      step: 1,
      title: '基本信息',
      items: [
        { label: '战队名称', value: formData.name || '未设置' },
        { label: '战队描述', value: formData.description || '未设置' },
        { label: '图标', value: formData.icon },
        { label: '颜色主题', value: formData.colorTheme }
      ]
    },
    {
      step: 2,
      title: '团队配置',
      items: [
        { label: '最大成员数', value: `${formData.maxMembers} 人` },
        { label: '可见性', value: formData.isPublic ? '公开' : '私密' },
        { label: '加入审批', value: formData.requireApproval ? '需要' : '不需要' }
      ]
    },
    {
      step: 3,
      title: '入队要求',
      items: [
        { label: '最低质押', value: formData.minStakeToJoin === 0 ? '无要求' : `${formData.minStakeToJoin} DOT` },
        { label: '附加要求', value: formData.additionalRequirements || '无' }
      ]
    }
  ];

  return (
    <WizardContainer
      title="确认信息"
      subtitle="请仔细检查战队设置,确认无误后提交创建"
    >
      <div className="space-y-6">
        {/* 完整预览 */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-semibold text-white">战队预览</h3>
            <span className="text-xs text-text-secondary">创建后的样子</span>
          </div>

          <TeamPreviewCard
            name={formData.name}
            description={formData.description}
            icon={formData.icon}
            colorTheme={formData.colorTheme}
            maxMembers={formData.maxMembers}
            minStakeToJoin={formData.minStakeToJoin}
            isPublic={formData.isPublic}
            requireApproval={formData.requireApproval}
          />
        </div>

        {/* 详细信息卡片 */}
        <div className="space-y-4">
          <h3 className="text-base font-semibold text-white">详细配置</h3>

          {sections.map((section) => (
            <div
              key={section.step}
              className="p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="text-sm font-medium text-white">
                  {section.title}
                </div>
                <button
                  type="button"
                  onClick={() => onEdit(section.step)}
                  className="flex items-center gap-1 px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-text-secondary hover:text-white text-xs transition-colors"
                >
                  <Edit2 className="h-3 w-3" />
                  编辑
                </button>
              </div>

              <div className="space-y-2">
                {section.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between text-sm"
                  >
                    <span className="text-text-secondary">{item.label}:</span>
                    <span className="text-white font-medium text-right max-w-[60%] break-words">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 确认提示 */}
        <div className="p-4 rounded-xl bg-success/10 border border-success/30">
          <div className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
            <div>
              <div className="text-sm font-semibold text-success mb-1">
                准备就绪!
              </div>
              <div className="text-xs text-text-secondary">
                点击下方"创建战队"按钮完成创建。创建后部分设置仍可修改。
              </div>
            </div>
          </div>
        </div>

        {/* 创建后的提示 */}
        <div className="space-y-2">
          <div className="text-sm font-medium text-white">创建后可以做什么?</div>
          <ul className="space-y-1 text-xs text-text-secondary">
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>邀请好友加入战队,开始组建团队</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>参与团队竞赛,争夺奖池奖励</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>享受团队收益加成,最高可达 +15%</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-bifrost-primary mt-0.5">•</span>
              <span>在战队设置中修改名称、描述等信息</span>
            </li>
          </ul>
        </div>
      </div>
    </WizardContainer>
  );
}
