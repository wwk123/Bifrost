"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, TrendingUp, Shield, Brain } from 'lucide-react';
import {
  PerformanceTrend,
  SmartHedgingSection,
  ApyPredictionSection
} from '@/components/dashboard';

export function AdvancedAnalytics() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden">
      {/* Header - Collapsible Trigger */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-5 lg:px-8 flex items-center justify-between text-left hover:bg-white/5 transition"
        whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-500/20">
            <Brain className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">高级分析</h3>
            <p className="text-sm text-text-secondary">性能趋势 · 智能对冲 · APY预测</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Stats Preview */}
          {!isExpanded && (
            <motion.div
              className="hidden items-center gap-4 text-sm md:flex"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                <TrendingUp className="h-3 w-3 text-success" />
                <span className="text-success">+12.5%</span>
              </div>
              <div className="flex items-center gap-2 rounded-full bg-white/5 px-3 py-1.5">
                <Shield className="h-3 w-3 text-cyan-400" />
                <span className="text-cyan-400">3 个对冲</span>
              </div>
            </motion.div>
          )}

          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="h-5 w-5 text-text-secondary" />
          </motion.div>
        </div>
      </motion.button>

      {/* Expandable Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="space-y-8 border-t border-white/10 p-6 lg:p-8">
              {/* Performance Trend */}
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <h4 className="font-semibold text-white">性能趋势</h4>
                </div>
                <PerformanceTrend />
              </div>

              {/* Hedging & Prediction */}
              <div className="grid gap-8 xl:grid-cols-2">
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-cyan-400" />
                    <h4 className="font-semibold text-white">智能对冲</h4>
                  </div>
                  <SmartHedgingSection />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <Brain className="h-4 w-4 text-purple-400" />
                    <h4 className="font-semibold text-white">APY 预测</h4>
                  </div>
                  <ApyPredictionSection />
                </div>
              </div>

              {/* Collapse Button */}
              <div className="flex justify-center pt-4">
                <motion.button
                  onClick={() => setIsExpanded(false)}
                  className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
                  whileHover={{ scale: 1.05 }}
                >
                  收起分析
                  <ChevronDown className="h-4 w-4 rotate-180" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
