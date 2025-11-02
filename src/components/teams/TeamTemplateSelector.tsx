'use client';

import { motion } from 'framer-motion';
import { Check, Sparkles } from 'lucide-react';
import { TEAM_TEMPLATES, TeamTemplate } from '@/data/team-templates';

interface TeamTemplateSelectorProps {
  selectedTemplateId?: string;
  onSelectTemplate: (template: TeamTemplate) => void;
  disabled?: boolean;
}

export function TeamTemplateSelector({
  selectedTemplateId,
  onSelectTemplate,
  disabled = false
}: TeamTemplateSelectorProps) {
  // 按类别分组
  const categorizedTemplates = {
    beginner: TEAM_TEMPLATES.filter(t => t.category === 'beginner'),
    balanced: TEAM_TEMPLATES.filter(t => t.category === 'balanced'),
    elite: TEAM_TEMPLATES.filter(t => t.category === 'elite'),
    competitive: TEAM_TEMPLATES.filter(t => t.category === 'competitive')
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'beginner':
        return '新手入门';
      case 'balanced':
        return '均衡发展';
      case 'elite':
        return '精英高端';
      case 'competitive':
        return '竞技导向';
      default:
        return category;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'beginner':
        return 'from-blue-500/20 to-cyan-500/20 border-blue-500/30';
      case 'balanced':
        return 'from-green-500/20 to-emerald-500/20 border-green-500/30';
      case 'elite':
        return 'from-yellow-500/20 to-orange-500/20 border-yellow-500/30';
      case 'competitive':
        return 'from-purple-500/20 to-pink-500/20 border-purple-500/30';
      default:
        return 'from-white/10 to-white/5 border-white/20';
    }
  };

  return (
    <div className="space-y-6">
      {/* 头部说明 */}
      <div className="flex items-start gap-3 p-4 rounded-xl bg-bifrost-primary/10 border border-bifrost-primary/30">
        <Sparkles className="h-5 w-5 text-bifrost-primary flex-shrink-0 mt-0.5" />
        <div>
          <div className="text-sm font-semibold text-bifrost-primary mb-1">
            快速开始
          </div>
          <div className="text-xs text-text-secondary">
            选择一个预设模板快速创建战队,所有设置都可以在后续步骤中调整
          </div>
        </div>
      </div>

      {/* 模板列表 */}
      {Object.entries(categorizedTemplates).map(([category, templates]) => (
        templates.length > 0 && (
          <div key={category} className="space-y-3">
            <div className="text-sm font-semibold text-white flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-bifrost-primary" />
              {getCategoryLabel(category)}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {templates.map((template) => {
                const isSelected = selectedTemplateId === template.id;

                return (
                  <motion.button
                    key={template.id}
                    type="button"
                    onClick={() => onSelectTemplate(template)}
                    disabled={disabled}
                    whileHover={!disabled ? { scale: 1.02 } : {}}
                    whileTap={!disabled ? { scale: 0.98 } : {}}
                    className={`
                      relative overflow-hidden rounded-xl border-2 p-4 text-left
                      transition-all disabled:opacity-50 disabled:cursor-not-allowed
                      ${
                        isSelected
                          ? 'border-bifrost-primary bg-bifrost-primary/20 shadow-lg shadow-bifrost-primary/30'
                          : `bg-gradient-to-br ${getCategoryColor(template.category)} hover:border-white/30`
                      }
                    `}
                  >
                    {/* 选中指示器 */}
                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute top-3 right-3 h-6 w-6 rounded-full bg-bifrost-primary flex items-center justify-center"
                      >
                        <Check className="h-4 w-4 text-white" />
                      </motion.div>
                    )}

                    {/* 图标和名称 */}
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`
                        h-12 w-12 rounded-xl flex items-center justify-center text-2xl
                        bg-gradient-to-br ${template.colorTheme}
                        border border-white/10
                      `}>
                        {template.icon}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="text-base font-semibold text-white mb-1">
                          {template.name}
                        </div>
                        <div className="text-xs text-text-secondary">
                          {template.recommendedFor}
                        </div>
                      </div>
                    </div>

                    {/* 描述 */}
                    <p className="text-sm text-text-secondary mb-3 line-clamp-2">
                      {template.description}
                    </p>

                    {/* 配置概览 */}
                    <div className="flex items-center gap-3 text-xs">
                      <div className="flex items-center gap-1 text-info">
                        <span>👥</span>
                        <span>{template.maxMembers}人</span>
                      </div>
                      <div className="flex items-center gap-1 text-success">
                        <span>💎</span>
                        <span>{template.minStakeToJoin} DOT</span>
                      </div>
                      <div className="flex items-center gap-1 text-warning">
                        <span>{template.isPublic ? '🌐' : '🔒'}</span>
                        <span>{template.isPublic ? '公开' : '私密'}</span>
                      </div>
                    </div>

                    {/* 优势标签 */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {template.benefits.slice(0, 2).map((benefit, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 rounded-full bg-white/10 text-[10px] text-white/80"
                        >
                          {benefit}
                        </span>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </div>
        )
      ))}

      {/* 自定义选项 */}
      <motion.button
        type="button"
        onClick={() => onSelectTemplate({
          id: 'custom',
          name: '自定义配置',
          description: '完全自定义你的战队配置',
          icon: '⚙️',
          colorTheme: 'from-gray-500/30 to-slate-500/30',
          maxMembers: 5,
          minStakeToJoin: 100,
          isPublic: true,
          requireApproval: false,
          category: 'balanced',
          recommendedFor: '高级用户',
          benefits: ['完全自定义', '灵活配置']
        })}
        disabled={disabled}
        whileHover={!disabled ? { scale: 1.01 } : {}}
        whileTap={!disabled ? { scale: 0.99 } : {}}
        className={`
          w-full rounded-xl border-2 border-dashed p-4 text-center
          transition-all disabled:opacity-50 disabled:cursor-not-allowed
          ${
            selectedTemplateId === 'custom'
              ? 'border-bifrost-primary bg-bifrost-primary/10'
              : 'border-white/20 bg-white/5 hover:border-white/40 hover:bg-white/10'
          }
        `}
      >
        <div className="text-3xl mb-2">⚙️</div>
        <div className="text-base font-semibold text-white mb-1">
          自定义配置
        </div>
        <div className="text-sm text-text-secondary">
          不使用模板,从零开始配置你的战队
        </div>
      </motion.button>
    </div>
  );
}
