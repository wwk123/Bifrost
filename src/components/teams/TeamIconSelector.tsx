'use client';

import { motion } from 'framer-motion';

export const TEAM_ICONS = [
  '🐉', '🦅', '🛡️', '⚔️', '🔥', '💎', '🌟', '🚀',
  '👑', '🦁', '🐯', '🐺', '🦊', '🐲', '🦄', '🐉',
  '⚡', '🌊', '🌙', '☀️', '🎯', '🏆', '🎪', '🎭',
  '🎨', '🎪', '🎸', '🎮', '🔮', '💫', '✨', '⭐'
];

export const TEAM_COLOR_THEMES = [
  { id: 'blue', name: '蓝色', gradient: 'from-blue-500/30 to-cyan-500/30', border: 'border-blue-500/30' },
  { id: 'purple', name: '紫色', gradient: 'from-purple-500/30 to-pink-500/30', border: 'border-purple-500/30' },
  { id: 'green', name: '绿色', gradient: 'from-green-500/30 to-emerald-500/30', border: 'border-green-500/30' },
  { id: 'yellow', name: '金色', gradient: 'from-yellow-500/30 to-orange-500/30', border: 'border-yellow-500/30' },
  { id: 'red', name: '红色', gradient: 'from-red-500/30 to-rose-500/30', border: 'border-red-500/30' },
  { id: 'indigo', name: '靛蓝', gradient: 'from-indigo-500/30 to-violet-500/30', border: 'border-indigo-500/30' },
  { id: 'pink', name: '粉色', gradient: 'from-pink-500/30 to-rose-500/30', border: 'border-pink-500/30' },
  { id: 'teal', name: '青色', gradient: 'from-teal-500/30 to-cyan-500/30', border: 'border-teal-500/30' }
];

interface TeamIconSelectorProps {
  selectedIcon: string;
  onSelectIcon: (icon: string) => void;
  disabled?: boolean;
}

export function TeamIconSelector({ selectedIcon, onSelectIcon, disabled }: TeamIconSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        战队图标 <span className="text-text-secondary">(可选)</span>
      </label>

      <div className="grid grid-cols-8 gap-2">
        {TEAM_ICONS.map((icon) => (
          <motion.button
            key={icon}
            type="button"
            onClick={() => onSelectIcon(icon)}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.1 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`
              h-12 w-12 rounded-xl border-2 transition-all
              flex items-center justify-center text-2xl
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selectedIcon === icon
                  ? 'border-bifrost-primary bg-bifrost-primary/20 shadow-lg'
                  : 'border-white/10 bg-white/5 hover:border-white/30 hover:bg-white/10'
              }
            `}
          >
            {icon}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

interface TeamColorSelectorProps {
  selectedColor: string;
  onSelectColor: (colorId: string) => void;
  disabled?: boolean;
}

export function TeamColorSelector({ selectedColor, onSelectColor, disabled }: TeamColorSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        主题颜色 <span className="text-text-secondary">(可选)</span>
      </label>

      <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
        {TEAM_COLOR_THEMES.map((theme) => (
          <motion.button
            key={theme.id}
            type="button"
            onClick={() => onSelectColor(theme.id)}
            disabled={disabled}
            whileHover={{ scale: disabled ? 1 : 1.05 }}
            whileTap={{ scale: disabled ? 1 : 0.95 }}
            className={`
              h-12 rounded-xl border-2 transition-all relative overflow-hidden
              disabled:opacity-50 disabled:cursor-not-allowed
              ${
                selectedColor === theme.id
                  ? `${theme.border} shadow-lg`
                  : 'border-white/10 hover:border-white/30'
              }
            `}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${theme.gradient}`} />
            {selectedColor === theme.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="relative z-10 flex items-center justify-center h-full text-white"
              >
                ✓
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      <div className="text-xs text-text-secondary">
        已选择: {TEAM_COLOR_THEMES.find(t => t.id === selectedColor)?.name || '默认'}
      </div>
    </div>
  );
}
