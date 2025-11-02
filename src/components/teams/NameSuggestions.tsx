'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, RefreshCw } from 'lucide-react';
import { NAME_SUGGESTIONS, getRandomSuggestions, getSuggestionsByCategory } from '@/data/team-name-suggestions';

interface NameSuggestionsProps {
  onSelectName: (name: string) => void;
  currentName?: string;
  disabled?: boolean;
}

export function NameSuggestions({ onSelectName, currentName, disabled = false }: NameSuggestionsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedCategory === 'all') {
      setSuggestions(getRandomSuggestions(8));
    } else {
      const category = NAME_SUGGESTIONS.find(c => c.category === selectedCategory);
      if (category) {
        setSuggestions(category.names.slice(0, 8));
      }
    }
  }, [selectedCategory]);

  const handleRefresh = () => {
    if (selectedCategory === 'all') {
      setSuggestions(getRandomSuggestions(8));
    }
  };

  return (
    <div className="space-y-3">
      {/* 展开/收起按钮 */}
      <button
        type="button"
        onClick={() => setIsExpanded(!isExpanded)}
        disabled={disabled}
        className="w-full flex items-center justify-between p-3 rounded-xl bg-bifrost-primary/10 border border-bifrost-primary/30 hover:bg-bifrost-primary/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-bifrost-primary" />
          <span className="text-sm font-medium text-bifrost-primary">
            需要灵感? 查看名称建议
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          ▼
        </motion.div>
      </button>

      {/* 建议内容 */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-3 p-4 rounded-xl bg-white/5 border border-white/10">
              {/* 类别选择器 */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setSelectedCategory('all')}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                    ${
                      selectedCategory === 'all'
                        ? 'bg-bifrost-primary text-white'
                        : 'bg-white/10 text-text-secondary hover:bg-white/20'
                    }
                  `}
                >
                  全部
                </button>

                {NAME_SUGGESTIONS.map((category) => (
                  <button
                    key={category.category}
                    type="button"
                    onClick={() => setSelectedCategory(category.category)}
                    className={`
                      px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                      ${
                        selectedCategory === category.category
                          ? 'bg-bifrost-primary text-white'
                          : 'bg-white/10 text-text-secondary hover:bg-white/20'
                      }
                    `}
                  >
                    {category.categoryLabel}
                  </button>
                ))}

                {selectedCategory === 'all' && (
                  <button
                    type="button"
                    onClick={handleRefresh}
                    className="ml-auto p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-text-secondary transition-colors"
                    title="换一批"
                  >
                    <RefreshCw className="h-4 w-4" />
                  </button>
                )}
              </div>

              {/* 建议列表 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {suggestions.map((name, index) => (
                  <motion.button
                    key={`${name}-${index}`}
                    type="button"
                    onClick={() => onSelectName(name)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`
                      px-3 py-2 rounded-lg text-sm font-medium text-left
                      transition-all
                      ${
                        currentName === name
                          ? 'bg-bifrost-primary text-white'
                          : 'bg-white/10 text-white hover:bg-white/20'
                      }
                    `}
                  >
                    {name}
                  </motion.button>
                ))}
              </div>

              {/* 类别描述 */}
              {selectedCategory !== 'all' && (
                <p className="text-xs text-text-secondary">
                  {NAME_SUGGESTIONS.find(c => c.category === selectedCategory)?.description}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
