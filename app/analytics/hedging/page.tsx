import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, AlertTriangle, TrendingDown, CheckCircle, XCircle } from 'lucide-react';

export const metadata: Metadata = {
  title: '智能对冲 - Bifrost Arena',
  description: '优化资产配置,降低波动风险',
};

export default function HedgingPage() {
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
          <h1 className="text-3xl font-bold text-white">智能对冲</h1>
          <p className="text-sm text-text-secondary">Smart Hedging · 优化资产配置,降低波动风险</p>
        </div>
      </div>

      {/* Risk Overview */}
      <div className="glass-panel rounded-2xl border border-info/30 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-info/20">
            <Shield className="h-6 w-6 text-info" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">当前风险评分</h2>
            <p className="text-sm text-text-secondary">根据资产配置和市场波动性计算</p>
          </div>
        </div>

        {/* Risk Score Gauge */}
        <div className="mb-6 flex items-center justify-center">
          <div className="relative h-48 w-48">
            <svg className="h-full w-full -rotate-90" viewBox="0 0 100 100">
              {/* Background Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.1)"
                strokeWidth="8"
              />
              {/* Progress Circle */}
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#riskGradient)"
                strokeWidth="8"
                strokeDasharray={`${(6.2 / 10) * 251.2} 251.2`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="riskGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="50%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#ef4444" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-4xl font-bold text-white">6.2</div>
              <div className="text-sm text-text-secondary">/10</div>
            </div>
          </div>
        </div>

        {/* Risk Level Indicators */}
        <div className="grid grid-cols-3 gap-4">
          <RiskLevelCard level="低风险" range="0-3" color="text-success" active={false} />
          <RiskLevelCard level="中风险" range="4-7" color="text-warning" active={true} />
          <RiskLevelCard level="高风险" range="8-10" color="text-danger" active={false} />
        </div>
      </div>

      {/* Current Portfolio Analysis */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">当前资产组合分析</h2>

        <div className="space-y-4">
          <PortfolioAssetRow
            asset="vDOT"
            allocation="45%"
            risk="中"
            correlation="+0.85"
            riskColor="text-warning"
          />
          <PortfolioAssetRow
            asset="vGLMR"
            allocation="30%"
            risk="中高"
            correlation="+0.72"
            riskColor="text-orange-500"
          />
          <PortfolioAssetRow
            asset="vASTR"
            allocation="15%"
            risk="中"
            correlation="+0.68"
            riskColor="text-warning"
          />
          <PortfolioAssetRow
            asset="稳定币"
            allocation="10%"
            risk="低"
            correlation="-0.05"
            riskColor="text-success"
          />
        </div>

        <div className="mt-6 rounded-xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <div>
              <div className="font-semibold text-warning">风险提示</div>
              <div className="mt-1 text-sm text-text-secondary">
                您的资产组合中高相关性资产占比较高(75%),建议增加对冲资产以降低整体风险。
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hedging Recommendations */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">对冲建议</h2>

        <div className="space-y-4">
          <RecommendationCard
            title="增加稳定币配置"
            impact="降低风险 -1.5"
            description="建议将稳定币配置从10%提升至20%,可有效降低整体波动性"
            effectiveness="85%"
            type="recommended"
          />

          <RecommendationCard
            title="引入负相关资产"
            impact="降低风险 -1.2"
            description="考虑配置黄金或债券类资产,与现有加密资产形成对冲"
            effectiveness="78%"
            type="recommended"
          />

          <RecommendationCard
            title="降低vGLMR配置"
            impact="降低风险 -0.8"
            description="vGLMR与vDOT相关性较高,建议减少配置至15%"
            effectiveness="65%"
            type="optional"
          />
        </div>
      </div>

      {/* Hedging Strategy Selector */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">选择对冲策略</h2>

        <div className="space-y-4">
          <StrategyCard
            name="保守型对冲"
            targetRisk="3.5-4.5"
            description="大幅增加稳定资产,适合风险厌恶型投资者"
            allocation={{
              'vDOT': '25%',
              'vGLMR': '15%',
              '稳定币': '40%',
              '黄金': '20%'
            }}
          />

          <StrategyCard
            name="平衡型对冲"
            targetRisk="5.0-6.0"
            description="适度增加对冲资产,保持收益与风险平衡"
            allocation={{
              'vDOT': '35%',
              'vGLMR': '25%',
              '稳定币': '25%',
              '黄金': '15%'
            }}
            recommended
          />

          <StrategyCard
            name="最小化对冲"
            targetRisk="6.5-7.5"
            description="保持现有配置,仅做微调"
            allocation={{
              'vDOT': '40%',
              'vGLMR': '30%',
              '稳定币': '20%',
              'vASTR': '10%'
            }}
          />
        </div>
      </div>

      {/* Historical Performance */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">对冲效果历史</h2>

        <div className="space-y-3">
          <HistoryRow
            date="2024-01-15"
            action="增加稳定币 10%"
            riskChange="-1.2"
            result="有效"
          />
          <HistoryRow
            date="2024-01-10"
            action="减少vGLMR 5%"
            riskChange="-0.8"
            result="有效"
          />
          <HistoryRow
            date="2024-01-05"
            action="引入黄金资产"
            riskChange="-0.5"
            result="有效"
          />
        </div>
      </div>
    </div>
  );
}

function RiskLevelCard({
  level,
  range,
  color,
  active
}: {
  level: string;
  range: string;
  color: string;
  active: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 text-center transition ${
        active
          ? `border-${color.replace('text-', '')}/50 bg-${color.replace('text-', '')}/10`
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className={`text-sm font-semibold ${active ? color : 'text-text-secondary'}`}>
        {level}
      </div>
      <div className="mt-1 text-xs text-text-secondary">{range}</div>
    </div>
  );
}

function PortfolioAssetRow({
  asset,
  allocation,
  risk,
  correlation,
  riskColor
}: {
  asset: string;
  allocation: string;
  risk: string;
  correlation: string;
  riskColor: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4">
      <div className="flex-1">
        <div className="font-semibold text-white">{asset}</div>
        <div className="mt-1 text-xs text-text-secondary">配置: {allocation}</div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-center">
          <div className="text-xs text-text-secondary">风险</div>
          <div className={`text-sm font-bold ${riskColor}`}>{risk}</div>
        </div>
        <div className="text-center">
          <div className="text-xs text-text-secondary">相关性</div>
          <div className="text-sm font-bold text-white">{correlation}</div>
        </div>
      </div>
    </div>
  );
}

function RecommendationCard({
  title,
  impact,
  description,
  effectiveness,
  type
}: {
  title: string;
  impact: string;
  description: string;
  effectiveness: string;
  type: 'recommended' | 'optional';
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        type === 'recommended'
          ? 'border-success/30 bg-success/5'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="mb-2 flex items-start justify-between">
        <div className="flex items-center gap-2">
          {type === 'recommended' ? (
            <CheckCircle className="h-5 w-5 text-success" />
          ) : (
            <XCircle className="h-5 w-5 text-text-secondary" />
          )}
          <div className="font-semibold text-white">{title}</div>
        </div>
        <div className="flex items-center gap-2">
          <TrendingDown className="h-4 w-4 text-success" />
          <span className="text-sm font-bold text-success">{impact}</span>
        </div>
      </div>
      <p className="mb-2 text-sm text-text-secondary">{description}</p>
      <div className="flex items-center gap-2">
        <div className="text-xs text-text-secondary">效果评估:</div>
        <div className="text-xs font-bold text-info">{effectiveness}</div>
      </div>
    </div>
  );
}

function StrategyCard({
  name,
  targetRisk,
  description,
  allocation,
  recommended = false
}: {
  name: string;
  targetRisk: string;
  description: string;
  allocation: Record<string, string>;
  recommended?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        recommended
          ? 'border-bifrost-pink/30 bg-bifrost-pink/5'
          : 'border-white/10 bg-white/5'
      }`}
    >
      <div className="mb-3 flex items-center justify-between">
        <div>
          <div className="font-semibold text-white">{name}</div>
          {recommended && (
            <div className="mt-1 text-xs text-bifrost-pink">推荐策略</div>
          )}
        </div>
        <div className="text-right">
          <div className="text-xs text-text-secondary">目标风险</div>
          <div className="text-sm font-bold text-info">{targetRisk}</div>
        </div>
      </div>
      <p className="mb-3 text-sm text-text-secondary">{description}</p>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(allocation).map(([asset, percent]) => (
          <div key={asset} className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2">
            <span className="text-xs text-white">{asset}</span>
            <span className="text-xs font-bold text-success">{percent}</span>
          </div>
        ))}
      </div>
      <button
        className={`mt-4 w-full rounded-lg border py-2 text-sm font-semibold transition ${
          recommended
            ? 'border-bifrost-pink bg-bifrost-pink/20 text-bifrost-pink hover:bg-bifrost-pink/30'
            : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
        }`}
      >
        {recommended ? '应用此策略' : '查看详情'}
      </button>
    </div>
  );
}

function HistoryRow({
  date,
  action,
  riskChange,
  result
}: {
  date: string;
  action: string;
  riskChange: string;
  result: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div className="flex-1">
        <div className="font-semibold text-white">{action}</div>
        <div className="mt-1 text-xs text-text-secondary">{date}</div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-sm font-bold text-success">{riskChange}</div>
        <div className="rounded-full bg-success/20 px-3 py-1 text-xs font-semibold text-success">
          {result}
        </div>
      </div>
    </div>
  );
}
