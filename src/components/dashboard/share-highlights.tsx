"use client";

import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import { motion } from 'framer-motion';

import { fetchShareTemplates, type ShareTemplate } from '@/data/mock';
import { useDashboardStore } from '@/state/use-dashboard-store';

const templateGradient: Record<ShareTemplate['background'], string> = {
  pink: 'from-[#E6007A] via-[#FF4D8D] to-[#FF89C2]',
  blue: 'from-[#00D4FF] via-[#38BDF8] to-[#7DD3FC]',
  gold: 'from-[#FFB800] via-[#FFE55C] to-[#FFF3B0]'
};

export function ShareHighlights() {
  const selectedTemplate = useDashboardStore((state) => state.selectedShareTemplateId);
  const setSelectedTemplate = useDashboardStore((state) => state.setSelectedShareTemplateId);

  const { data, isLoading } = useQuery({
    queryKey: ['share-templates'],
    queryFn: fetchShareTemplates,
    staleTime: 1000 * 60 * 10
  });

  const templates = data ?? Array.from({ length: 3 });
  const activeTemplate =
    data?.find((template) => template.id === selectedTemplate) ?? data?.[0] ?? null;

  return (
    <section className="glass-panel rounded-3xl border border-white/5 px-6 py-6 shadow-card lg:px-8">
      <div className="flex flex-col gap-3 pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-white">社交炫耀卡片</h2>
          <p className="text-sm text-text-secondary">
            一键生成适配 Twitter、Telegram 的动态分享视觉。
          </p>
        </div>
        <button className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary hover:border-white/20 hover:text-white">
          导出高清图片
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 text-white shadow-card"
        >
          {isLoading || !activeTemplate ? (
            <div className="space-y-4">
              <div className="h-4 w-32 animate-pulse rounded-full bg-white/10" />
              <div className="h-3 w-48 animate-pulse rounded-full bg-white/10" />
              <div className="h-48 w-full animate-pulse rounded-2xl bg-white/10" />
            </div>
          ) : (
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br p-6 shadow-[0_24px_60px_rgba(10,11,20,0.45)]">
              <div
                className={clsx(
                  'absolute inset-0 -z-10 bg-gradient-to-br opacity-80',
                  templateGradient[activeTemplate.background]
                )}
              />
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.25),transparent_55%)]" />
              <div className="flex flex-col gap-12">
                <div className="flex flex-col gap-3">
                  <span className="text-xs uppercase tracking-[0.2em] text-white/80">
                    Bifrost Arena
                  </span>
                  <h3 className="text-3xl font-semibold leading-tight">{activeTemplate.title}</h3>
                  <p className="text-sm text-white/80">{activeTemplate.subtitle}</p>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="rounded-2xl bg-white/15 px-4 py-3">
                    <p>🏆 我的战绩</p>
                    <p className="text-sm text-white/80">收益持续正增长 · 段位黄金</p>
                  </div>
                  <div className="rounded-2xl bg-white/15 px-4 py-3">
                    <p>💡 复制策略</p>
                    <p className="text-sm text-white/80">vDOT 50% · vGLMR 30% · 现金 20%</p>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 pt-6 text-xs">
                {activeTemplate.ctas.map((cta) => (
                  <span key={cta} className="rounded-full bg-white/20 px-4 py-2 font-semibold">
                    {cta}
                  </span>
                ))}
              </div>
            </div>
          )}
        </motion.div>

        <div className="space-y-3">
          {templates.map((template, index) => (
            <motion.button
              key={template && 'id' in template ? template.id : index}
              type="button"
              onClick={() =>
                template && 'id' in template ? setSelectedTemplate(template.id) : undefined
              }
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className={clsx(
                'w-full rounded-2xl border px-4 py-3 text-left text-sm transition',
                template && 'id' in template && template.id === activeTemplate?.id
                  ? 'border-bifrost-pink bg-bifrost-pink/10 text-white'
                  : 'border-white/10 bg-white/5 text-text-secondary hover:border-white/20 hover:text-white'
              )}
            >
              {template && 'id' in template ? (
                <div className="flex flex-col gap-1">
                  <span className="text-base font-semibold text-white">{template.title}</span>
                  <span className="text-xs text-text-secondary">{template.subtitle}</span>
                </div>
              ) : (
                <div className="h-4 w-36 animate-pulse rounded-full bg-white/10" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

