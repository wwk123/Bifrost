'use client';

import Link from 'next/link';
import { ArrowRight, Trophy, BookOpen, Swords, Shield, Sparkles, Brain } from 'lucide-react';

const arenaZones = [
  {
    href: '/arena',
    icon: Trophy,
    emoji: '📊',
    title: '战绩大厅',
    subtitle: 'Personal Dashboard',
    description: '查看你的竞技数据、收益趋势和实时排名',
    gradient: 'from-success/20 to-info/20',
    borderColor: 'border-success/30',
    delay: 0
  },
  {
    href: '/leaderboard',
    icon: Trophy,
    emoji: '🏆',
    title: '荣耀榜',
    subtitle: 'Global Leaderboard',
    description: '挑战全球顶尖高手,争夺荣耀榜首',
    gradient: 'from-yellow-500/20 to-orange-500/20',
    borderColor: 'border-yellow-500/30',
    delay: 0.1
  },
  {
    href: '/strategies',
    icon: BookOpen,
    emoji: '📚',
    title: '策略图书馆',
    subtitle: 'Strategy Hub',
    description: '学习、分享和复制顶级投资策略',
    gradient: 'from-bifrost-pink/20 to-arena-purple/20',
    borderColor: 'border-bifrost-pink/30',
    delay: 0.2
  },
  {
    href: '/challenges',
    icon: Swords,
    emoji: '⚔️',
    title: '挑战塔',
    subtitle: 'Challenges',
    description: '完成每周挑战,解锁成就和特殊奖励',
    gradient: 'from-warning/20 to-error/20',
    borderColor: 'border-warning/30',
    delay: 0.3
  },
  {
    href: '/teams',
    icon: Shield,
    emoji: '🛡️',
    title: '战队营地',
    subtitle: 'Team Competition',
    description: '组建战队,协同作战,共享收益加成',
    gradient: 'from-info/20 to-arena-blue/20',
    borderColor: 'border-info/30',
    delay: 0.4
  },
  {
    href: '/prediction',
    icon: Sparkles,
    emoji: '🔮',
    title: '预言殿',
    subtitle: 'APY Prediction Market',
    description: '预测APY走势,赢取预测奖励',
    gradient: 'from-purple-500/20 to-pink-500/20',
    borderColor: 'border-purple-500/30',
    delay: 0.5
  },
  {
    href: '/hedging',
    icon: Brain,
    emoji: '🧠',
    title: '智慧神殿',
    subtitle: 'Smart Hedging',
    description: '智能对冲策略,锁定收益,规避风险',
    gradient: 'from-green-500/20 to-teal-500/20',
    borderColor: 'border-green-500/30',
    delay: 0.6
  }
];

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute left-1/4 top-20 h-96 w-96 rounded-full bg-bifrost-primary/30 blur-3xl" />
          <div className="absolute bottom-20 right-1/4 h-96 w-96 rounded-full bg-arena-blue/20 blur-3xl" />
          <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-arena-purple/20 blur-3xl" />
        </div>

        <div className="mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="text-2xl">🏟️</span>
            <span className="text-text-secondary">Welcome to Bifrost Arena</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
            社交化收益竞技平台
          </h1>

          <p className="mx-auto mb-4 max-w-3xl text-xl text-text-secondary md:text-2xl">
            将 Bifrost 液态质押收益转化为可比较、可分享的竞技体验
          </p>

          <p className="mx-auto mb-12 max-w-2xl text-lg text-text-secondary/80">
            通过排行榜、成就与策略共创，激发用户持续参与
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/arena"
              className="group inline-flex items-center gap-2 rounded-full bg-bifrost-primary px-8 py-4 text-lg font-semibold text-white shadow-[0_12px_32px_rgba(230,0,122,0.4)] transition-all hover:scale-105 hover:shadow-[0_16px_40px_rgba(230,0,122,0.5)]"
            >
              进入竞技场
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/10"
            >
              查看荣耀榜
            </Link>
          </div>

          {/* Stats */}
          <div className="mx-auto mt-16 grid max-w-4xl gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm">
              <div className="mb-2 text-4xl font-bold text-bifrost-primary">1,250+</div>
              <div className="text-sm text-text-secondary">活跃竞技者</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm">
              <div className="mb-2 text-4xl font-bold text-success">$12.5M+</div>
              <div className="text-sm text-text-secondary">总锁定价值</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 px-6 py-8 backdrop-blur-sm">
              <div className="mb-2 text-4xl font-bold text-info">15.8%</div>
              <div className="text-sm text-text-secondary">平均年化收益</div>
            </div>
          </div>
        </div>
      </section>

      {/* Arena Zones */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-white">探索竞技场区域</h2>
            <p className="text-lg text-text-secondary">
              每个区域都有独特的功能和奖励,选择你的战场!
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {arenaZones.map((zone) => {
              const Icon = zone.icon;

              return (
                <Link
                  key={zone.href}
                  href={zone.href}
                  className={`group relative overflow-hidden rounded-3xl border ${zone.borderColor} bg-gradient-to-br ${zone.gradient} p-8 backdrop-blur-sm transition-all hover:scale-105 hover:shadow-2xl`}
                >
                  {/* Icon & Emoji */}
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                      <span className="text-3xl">{zone.emoji}</span>
                    </div>
                    <Icon className="h-8 w-8 text-white/60" />
                  </div>

                  {/* Content */}
                  <h3 className="mb-2 text-2xl font-bold text-white">{zone.title}</h3>
                  <p className="mb-3 text-sm font-medium text-white/60">{zone.subtitle}</p>
                  <p className="text-sm text-text-secondary">{zone.description}</p>

                  {/* Hover Arrow */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-bifrost-primary opacity-0 transition-all group-hover:opacity-100">
                    进入区域
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>

                  {/* Glow Effect */}
                  <div className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/5 opacity-0 blur-2xl transition-opacity group-hover:opacity-100" />
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 text-4xl">🎯</div>
              <h3 className="mb-3 text-xl font-bold text-white">实时竞技</h3>
              <p className="text-text-secondary">
                实时排行榜、即时成就解锁,让收益变得可视化、可比较
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 text-4xl">🤝</div>
              <h3 className="mb-3 text-xl font-bold text-white">社交互动</h3>
              <p className="text-text-secondary">组建战队、分享策略、挑战好友,让DeFi不再孤单</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <div className="mb-4 text-4xl">🎁</div>
              <h3 className="mb-3 text-xl font-bold text-white">丰厚奖励</h3>
              <p className="text-text-secondary">完成挑战、赢得比赛、推荐好友,多重奖励等你拿</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-3xl border border-bifrost-primary/30 bg-gradient-to-br from-bifrost-primary/10 to-arena-purple/10 p-12 text-center backdrop-blur-sm">
          <h2 className="mb-4 text-4xl font-bold text-white">准备好开始你的竞技之旅了吗?</h2>
          <p className="mb-8 text-lg text-text-secondary">连接钱包,立即加入全球DeFi竞技场</p>
          <Link
            href="/arena"
            className="inline-flex items-center gap-2 rounded-full bg-bifrost-primary px-10 py-5 text-xl font-semibold text-white shadow-[0_12px_32px_rgba(230,0,122,0.4)] transition-all hover:scale-105"
          >
            立即开始
            <ArrowRight className="h-6 w-6" />
          </Link>
        </div>
      </section>
    </div>
  );
}
