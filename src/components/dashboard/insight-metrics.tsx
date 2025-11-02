"use client";

import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import { fetchMetrics, type Metric } from '@/data/mock';

const toneClass: Record<Metric['tone'], string> = {
  success: 'text-success',
  info: 'text-info',
  warning: 'text-warning'
};

export function InsightMetrics() {
  const { data, isLoading } = useQuery({
    queryKey: ['dashboard', 'metrics'],
    queryFn: fetchMetrics,
    staleTime: 1000 * 60
  });

  const metrics = isLoading ? Array.from({ length: 4 }) : (data || []);

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((metric, index) => {
        const hasMetric = metric && typeof metric === 'object' && 'label' in metric;
        const typedMetric = hasMetric ? (metric as Metric) : null;

        return (
          <motion.div
            key={typedMetric ? typedMetric.label : `skeleton-${index}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.05 * index }}
            className="glass-panel rounded-2xl border border-white/5 px-6 py-6 shadow-card"
          >
            {typedMetric ? (
              <>
                <p className="text-sm text-text-secondary">{typedMetric.label}</p>
                <div className="mt-3 flex items-baseline justify-between gap-2">
                  <span className="text-3xl font-semibold text-white">
                    {typedMetric.value}
                  </span>
                  <span className={`text-sm font-medium ${toneClass[typedMetric.tone]}`}>
                    {typedMetric.delta}
                  </span>
                </div>
              </>
            ) : (
              <div className="flex flex-col gap-3">
                <div className="h-3 w-24 animate-pulse rounded-full bg-white/10" />
                <div className="h-8 w-32 animate-pulse rounded-full bg-white/10" />
              </div>
            )}
          </motion.div>
        );
      })}
    </section>
  );
}

