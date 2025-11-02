'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, AlertCircle, Loader2, Info } from 'lucide-react';
import { checkTeamNameAvailable } from '@/data/mock';

interface DuplicateCheckerProps {
  name: string;
  onValidationChange?: (isValid: boolean) => void;
  disabled?: boolean;
}

export function DuplicateChecker({ name, onValidationChange, disabled = false }: DuplicateCheckerProps) {
  const [status, setStatus] = useState<'idle' | 'checking' | 'available' | 'unavailable' | 'similar'>('idle');
  const [suggestion, setSuggestion] = useState<string | undefined>();

  useEffect(() => {
    // 如果名称太短,不进行检查
    if (!name || name.trim().length < 2) {
      setStatus('idle');
      onValidationChange?.(false);
      return;
    }

    // 防抖检查
    const timeoutId = setTimeout(async () => {
      setStatus('checking');
      setSuggestion(undefined);

      try {
        const result = await checkTeamNameAvailable(name.trim());

        if (result.available) {
          setStatus('available');
          onValidationChange?.(true);
        } else {
          setStatus('unavailable');
          setSuggestion(result.suggestion);
          onValidationChange?.(false);
        }
      } catch (error) {
        console.error('检查名称失败:', error);
        setStatus('idle');
        onValidationChange?.(false);
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [name, onValidationChange]);

  if (disabled || !name || name.trim().length < 2) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-2"
    >
      {/* 检查中 */}
      {status === 'checking' && (
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>检查名称可用性...</span>
        </div>
      )}

      {/* 可用 */}
      {status === 'available' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 text-sm text-success"
        >
          <div className="flex items-center justify-center h-5 w-5 rounded-full bg-success">
            <Check className="h-3 w-3 text-white" />
          </div>
          <span className="font-medium">名称可用!</span>
        </motion.div>
      )}

      {/* 不可用 */}
      {status === 'unavailable' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="space-y-2"
        >
          <div className="flex items-center gap-2 text-sm text-error">
            <AlertCircle className="h-4 w-4" />
            <span className="font-medium">该名称已被使用</span>
          </div>

          {suggestion && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-warning/10 border border-warning/30">
              <Info className="h-4 w-4 text-warning flex-shrink-0 mt-0.5" />
              <div className="flex-1 min-w-0">
                <div className="text-xs text-warning font-medium mb-1">
                  建议替代名称:
                </div>
                <button
                  type="button"
                  onClick={() => {
                    // 这里可以触发一个回调来更新表单的名称
                    // 暂时只显示建议
                  }}
                  className="text-sm font-semibold text-white hover:text-bifrost-primary transition-colors"
                >
                  {suggestion}
                </button>
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* 相似(但可用) */}
      {status === 'similar' && (
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-start gap-2 p-3 rounded-lg bg-info/10 border border-info/30"
        >
          <Info className="h-4 w-4 text-info flex-shrink-0 mt-0.5" />
          <div className="text-xs text-info">
            <span className="font-medium">提示: </span>
            存在相似的战队名称,但当前名称仍然可用
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
