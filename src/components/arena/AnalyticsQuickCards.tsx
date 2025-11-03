"use client";

import { motion } from 'framer-motion';
import { TrendingUp, Shield, Target, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function AnalyticsQuickCards() {
  const cards = [
    {
      title: '表现趋势',
      description: '查看详细的收益趋势和历史表现分析',
      icon: TrendingUp,
      href: '/analytics/performance',
      color: 'text-success',
      borderColor: 'border-success/30',
      bgGradient: 'from-success/10 to-success/5',
      stats: [
        { label: '7日收益', value: '+12.5%' },
        { label: '总收益', value: '+28.3%' }
      ]
    },
    {
      title: '智能对冲',
      description: '优化资产配置,降低波动风险',
      icon: Shield,
      href: '/analytics/hedging',
      color: 'text-info',
      borderColor: 'border-info/30',
      bgGradient: 'from-info/10 to-info/5',
      stats: [
        { label: '风险评分', value: '6.2/10' },
        { label: '对冲效率', value: '85%' }
      ]
    },
    {
      title: 'APY 预测',
      description: '基于历史数据预测未来收益率',
      icon: Target,
      href: '/analytics/prediction',
      color: 'text-bifrost-pink',
      borderColor: 'border-bifrost-pink/30',
      bgGradient: 'from-bifrost-pink/10 to-bifrost-pink/5',
      stats: [
        { label: '预测 APY', value: '24.5%' },
        { label: '置信度', value: '78%' }
      ]
    }
  ];

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <Link key={card.title} href={card.href}>
            <motion.div
              className={`glass-panel group relative overflow-hidden rounded-2xl border ${card.borderColor} p-6 transition-all hover:shadow-xl`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
            >
              {/* Background Gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 transition-opacity group-hover:opacity-100`} />

              {/* Content */}
              <div className="relative">
                {/* Header */}
                <div className="mb-4 flex items-start justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.bgGradient} bg-gradient-to-br`}>
                    <Icon className={`h-6 w-6 ${card.color}`} />
                  </div>
                  <motion.div
                    className={`${card.color} opacity-0 group-hover:opacity-100`}
                    initial={{ x: -10 }}
                    whileHover={{ x: 0 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                </div>

                {/* Title & Description */}
                <h3 className="mb-2 text-lg font-bold text-white">{card.title}</h3>
                <p className="mb-4 text-sm text-text-secondary">{card.description}</p>

                {/* Stats */}
                <div className="space-y-2">
                  {card.stats.map((stat) => (
                    <div key={stat.label} className="flex items-center justify-between">
                      <span className="text-xs text-text-secondary">{stat.label}</span>
                      <span className={`text-sm font-bold ${card.color}`}>{stat.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
}
