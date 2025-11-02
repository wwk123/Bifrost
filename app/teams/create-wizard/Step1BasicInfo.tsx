'use client';

import { WizardContainer } from '@/components/teams/WizardSteps';
import { TeamIconSelector, TeamColorSelector } from '@/components/teams/TeamIconSelector';
import { NameSuggestions } from '@/components/teams/NameSuggestions';
import { DuplicateChecker } from '@/components/teams/DuplicateChecker';
import { TeamTemplateSelector } from '@/components/teams/TeamTemplateSelector';
import { TeamTemplate } from '@/data/team-templates';
import { AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface Step1Props {
  formData: any;
  setFormData: (data: any) => void;
  onApplyTemplate: (template: TeamTemplate) => void;
  isConnected: boolean;
}

export function Step1BasicInfo({ formData, setFormData, onApplyTemplate, isConnected }: Step1Props) {
  const [showTemplates, setShowTemplates] = useState(true);
  const [nameValid, setNameValid] = useState(false);

  const handleTemplateSelect = (template: TeamTemplate) => {
    if (template.id === 'custom') {
      setShowTemplates(false);
      return;
    }

    onApplyTemplate(template);
    setShowTemplates(false);

    // 预填充描述建议
    if (!formData.description) {
      setFormData((prev: any) => ({
        ...prev,
        description: template.description
      }));
    }
  };

  return (
    <WizardContainer
      title="基本信息"
      subtitle="设置战队名称、描述和视觉风格"
    >
      <div className="space-y-6">
        {/* 钱包提示 */}
        {!isConnected && (
          <div className="rounded-xl border border-warning/30 bg-warning/10 p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
              <div className="text-sm text-text-secondary">
                请先连接钱包以继续创建战队
              </div>
            </div>
          </div>
        )}

        {/* 模板选择 */}
        {showTemplates && (
          <div>
            <TeamTemplateSelector
              selectedTemplateId={formData.templateId}
              onSelectTemplate={handleTemplateSelect}
              disabled={!isConnected}
            />
            <button
              type="button"
              onClick={() => setShowTemplates(false)}
              className="mt-4 text-sm text-text-secondary hover:text-white transition-colors"
            >
              跳过模板选择 →
            </button>
          </div>
        )}

        {/* 表单 */}
        {!showTemplates && (
          <>
            {/* 视觉设置 */}
            <div className="space-y-4 p-6 bg-white/5 rounded-xl border border-white/10">
              <h3 className="text-base font-semibold text-white">视觉风格</h3>

              <TeamIconSelector
                selectedIcon={formData.icon}
                onSelectIcon={(icon) => setFormData((prev: any) => ({ ...prev, icon }))}
                disabled={!isConnected}
              />

              <TeamColorSelector
                selectedColor={formData.colorTheme}
                onSelectColor={(color) => setFormData((prev: any) => ({ ...prev, colorTheme: color }))}
                disabled={!isConnected}
              />
            </div>

            {/* 战队名称 */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                战队名称 <span className="text-error">*</span>
              </label>

              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, name: e.target.value }))}
                placeholder="输入战队名称"
                disabled={!isConnected}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-bifrost-primary/50 transition-all disabled:opacity-50"
              />

              <p className="mt-1 text-xs text-text-secondary">
                {formData.name.length}/30 字符
              </p>

              <DuplicateChecker
                name={formData.name}
                onValidationChange={setNameValid}
                disabled={!isConnected}
              />

              <NameSuggestions
                onSelectName={(name) => setFormData((prev: any) => ({ ...prev, name }))}
                currentName={formData.name}
                disabled={!isConnected}
              />
            </div>

            {/* 战队描述 */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">
                战队描述 <span className="text-error">*</span>
              </label>

              <textarea
                value={formData.description}
                onChange={(e) => setFormData((prev: any) => ({ ...prev, description: e.target.value }))}
                rows={4}
                placeholder="介绍战队文化、目标和招募要求..."
                disabled={!isConnected}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-bifrost-primary/50 transition-all resize-none disabled:opacity-50"
              />

              <p className="mt-1 text-xs text-text-secondary">
                {formData.description.length}/200 字符
              </p>
            </div>
          </>
        )}
      </div>
    </WizardContainer>
  );
}
