import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, TrendingUp, Calendar, Award, BarChart3 } from 'lucide-react';

export const metadata: Metadata = {
  title: '表现趋势 - Bifrost Arena',
  description: '查看详细的收益趋势和历史表现分析',
};

export default function PerformancePage() {
  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link
          href="/arena"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-all hover:bg-white/10"
        >
          <ArrowLeft className="h-5 w-5 text-white" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white">表现趋势</h1>
          <p className="text-sm text-text-secondary">Performance Trends · 收益分析与历史表现</p>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          icon={<TrendingUp className="h-5 w-5" />}
          label="总收益"
          value="+28.3%"
          trend="+3.2%"
          color="text-success"
        />
        <StatCard
          icon={<Calendar className="h-5 w-5" />}
          label="7日收益"
          value="+12.5%"
          trend="+1.8%"
          color="text-info"
        />
        <StatCard
          icon={<Award className="h-5 w-5" />}
          label="最佳单日"
          value="+5.2%"
          trend="2024-01-15"
          color="text-yellow-500"
        />
        <StatCard
          icon={<BarChart3 className="h-5 w-5" />}
          label="平均日收益"
          value="+0.8%"
          trend="稳定增长"
          color="text-bifrost-pink"
        />
      </div>

      {/* Performance Chart */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">收益趋势图</h2>
          <div className="flex gap-2">
            <TimeRangeButton label="7天" active />
            <TimeRangeButton label="30天" />
            <TimeRangeButton label="90天" />
            <TimeRangeButton label="全部" />
          </div>
        </div>

        {/* Chart Placeholder */}
        <div className="flex h-80 items-center justify-center rounded-xl border border-white/10 bg-white/5">
          <div className="text-center">
            <TrendingUp className="mx-auto h-12 w-12 text-success/50" />
            <p className="mt-4 text-sm text-text-secondary">图表组件加载中...</p>
            <p className="mt-1 text-xs text-text-secondary">将集成 Chart.js 或 Recharts</p>
          </div>
        </div>
      </div>

      {/* Performance Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* By Asset */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">资产表现</h3>
          <div className="space-y-3">
            <AssetPerformanceRow asset="vDOT" apy="18.5%" gain="+15.2%" color="text-success" />
            <AssetPerformanceRow asset="vGLMR" apy="22.3%" gain="+8.7%" color="text-success" />
            <AssetPerformanceRow asset="vASTR" apy="15.8%" gain="+4.4%" color="text-success" />
            <AssetPerformanceRow asset="vFIL" apy="12.1%" gain="+2.1%" color="text-success" />
          </div>
        </div>

        {/* By Strategy */}
        <div className="glass-panel rounded-2xl border border-white/10 p-6">
          <h3 className="mb-4 text-lg font-bold text-white">策略表现</h3>
          <div className="space-y-3">
            <StrategyPerformanceRow strategy="激进多链" winRate="87%" avgGain="+3.2%" />
            <StrategyPerformanceRow strategy="稳健配置" winRate="91%" avgGain="+1.8%" />
            <StrategyPerformanceRow strategy="自动复投" winRate="85%" avgGain="+2.1%" />
            <StrategyPerformanceRow strategy="长期持有" winRate="88%" avgGain="+1.5%" />
          </div>
        </div>
      </div>

      {/* Historical Milestones */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h3 className="mb-4 text-lg font-bold text-white">历史里程碑</h3>
        <div className="space-y-4">
          <MilestoneRow
            date="2024-01-15"
            title="单日最高收益"
            value="+5.2%"
            description="vGLMR 策略表现优异"
          />
          <MilestoneRow
            date="2024-01-10"
            title="突破 25% 总收益"
            value="+25.0%"
            description="达成重要收益里程碑"
          />
          <MilestoneRow
            date="2024-01-05"
            title="7日连续盈利"
            value="+12.3%"
            description="稳定盈利策略生效"
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  trend,
  color
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  trend: string;
  color: string;
}) {
  return (
    <div className="glass-panel rounded-xl border border-white/10 p-4">
      <div className="mb-2 flex items-center gap-2">
        <div className={color}>{icon}</div>
        <span className="text-xs text-text-secondary">{label}</span>
      </div>
      <div className={`text-2xl font-bold ${color}`}>{value}</div>
      <div className="mt-1 text-xs text-text-secondary">{trend}</div>
    </div>
  );
}

function TimeRangeButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-lg border px-4 py-2 text-xs font-semibold transition ${
        active
          ? 'border-success bg-success/20 text-success'
          : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function AssetPerformanceRow({
  asset,
  apy,
  gain,
  color
}: {
  asset: string;
  apy: string;
  gain: string;
  color: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <div className="font-semibold text-white">{asset}</div>
        <div className="text-xs text-text-secondary">APY {apy}</div>
      </div>
      <div className={`text-sm font-bold ${color}`}>{gain}</div>
    </div>
  );
}

function StrategyPerformanceRow({
  strategy,
  winRate,
  avgGain
}: {
  strategy: string;
  winRate: string;
  avgGain: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <div className="font-semibold text-white">{strategy}</div>
        <div className="text-xs text-text-secondary">胜率 {winRate}</div>
      </div>
      <div className="text-sm font-bold text-success">{avgGain}</div>
    </div>
  );
}

function MilestoneRow({
  date,
  title,
  value,
  description
}: {
  date: string;
  title: string;
  value: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4 rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500/20">
        <Award className="h-5 w-5 text-yellow-500" />
      </div>
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <div className="font-semibold text-white">{title}</div>
          <div className="text-sm font-bold text-success">{value}</div>
        </div>
        <div className="mt-1 text-xs text-text-secondary">{description}</div>
        <div className="mt-1 text-xs text-text-secondary">{date}</div>
      </div>
    </div>
  );
}
