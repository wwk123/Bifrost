"use client";

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

import { fetchPerformanceTrend, type PerformancePoint } from '@/data/mock';
import { useDashboardStore } from '@/state/use-dashboard-store';
import { formatCurrency } from '@/utils/format';

export function PerformanceTrend() {
  const timeframe = useDashboardStore((state) => state.timeframe);
  const { data, isLoading } = useQuery({
    queryKey: ['performance-trend', timeframe],
    queryFn: () => fetchPerformanceTrend(timeframe),
    placeholderData: (previous) => previous
  });

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-2 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">收益趋势对比</h2>
          <p className="text-sm text-text-secondary">与基准组合对比，展示你持续跑赢市场的幅度。</p>
        </div>
        <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
          更新时间: 刚刚
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="h-72"
      >
        {isLoading || !data ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex flex-col items-center gap-3 text-sm text-text-secondary">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-white/60" />
              <span>趋势数据加载中...</span>
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
              <defs>
                <linearGradient id="colorGain" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#E6007A" stopOpacity={0.7} />
                  <stop offset="100%" stopColor="#E6007A" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorBenchmark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity={0.6} />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.05)" strokeDasharray="4 4" />
              <XAxis
                dataKey="label"
                stroke="#6C6D8A"
                tickLine={false}
                axisLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#6C6D8A"
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                tick={{ fontSize: 12 }}
              />
              <Tooltip content={<TrendTooltip />} />
              <Area
                type="monotone"
                dataKey="gain"
                stroke="#E6007A"
                strokeWidth={2}
                fill="url(#colorGain)"
              />
              <Area
                type="monotone"
                dataKey="benchmark"
                stroke="#38BDF8"
                strokeWidth={2}
                fill="url(#colorBenchmark)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </motion.div>
    </section>
  );
}

function TrendTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) {
    return null;
  }

  const data = payload[0].payload as PerformancePoint;

  return (
    <div className="rounded-2xl border border-white/10 bg-surface-secondary px-4 py-3 text-xs text-text-secondary shadow-card">
      <p className="text-sm font-semibold text-white">{label}</p>
      <div className="mt-2 space-y-1">
        <p>
          <span className="text-text-secondary">我的收益: </span>
          <span className="text-white">{formatCurrency(data.gain)}</span>
        </p>
        <p>
          <span className="text-text-secondary">基准组合: </span>
          <span className="text-white">{formatCurrency(data.benchmark)}</span>
        </p>
        <p>
          <span className="text-text-secondary">领先幅度: </span>
          <span className="text-success">
            {formatCurrency(data.gain - data.benchmark)}
          </span>
        </p>
      </div>
    </div>
  );
}

