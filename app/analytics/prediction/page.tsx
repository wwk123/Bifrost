import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Target, TrendingUp, Calendar, Activity, ChevronRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'APY 预测 - Bifrost Arena',
  description: '基于历史数据预测未来收益率',
};

export default function PredictionPage() {
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
          <h1 className="text-3xl font-bold text-white">APY 预测</h1>
          <p className="text-sm text-text-secondary">APY Prediction · 基于历史数据预测未来收益率</p>
        </div>
      </div>

      {/* Prediction Overview */}
      <div className="glass-panel rounded-2xl border border-bifrost-pink/30 p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-bifrost-pink/20">
            <Target className="h-6 w-6 text-bifrost-pink" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">预测结果</h2>
            <p className="text-sm text-text-secondary">基于过去30天数据和AI模型计算</p>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <PredictionCard
            period="7天预测"
            apy="18.2%"
            confidence="92%"
            trend="+2.3%"
            color="text-success"
          />
          <PredictionCard
            period="30天预测"
            apy="24.5%"
            confidence="78%"
            trend="+5.8%"
            color="text-info"
          />
          <PredictionCard
            period="90天预测"
            apy="32.1%"
            confidence="65%"
            trend="+8.4%"
            color="text-bifrost-pink"
          />
        </div>
      </div>

      {/* Select Pool for Prediction */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">选择预测池</h2>

        <div className="space-y-4">
          <PoolCard
            name="vDOT"
            currentApy="18.5%"
            predictedApy="22.3%"
            tvl="$12.5M"
            trend="上升"
            active
          />
          <PoolCard
            name="vGLMR"
            currentApy="22.3%"
            predictedApy="25.8%"
            tvl="$8.2M"
            trend="上升"
          />
          <PoolCard
            name="vASTR"
            currentApy="15.8%"
            predictedApy="17.2%"
            tvl="$5.6M"
            trend="稳定"
          />
          <PoolCard
            name="vFIL"
            currentApy="12.1%"
            predictedApy="14.5%"
            tvl="$3.8M"
            trend="上升"
          />
        </div>
      </div>

      {/* Prediction Factors */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">预测因素分析</h2>

        <div className="space-y-4">
          <FactorRow
            factor="历史APY趋势"
            weight="35%"
            impact="正面"
            description="过去30天APY持续上升"
          />
          <FactorRow
            factor="TVL增长率"
            weight="25%"
            impact="正面"
            description="总锁仓量稳定增长,资金流入积极"
          />
          <FactorRow
            factor="市场波动性"
            weight="20%"
            impact="中性"
            description="市场波动处于正常范围"
          />
          <FactorRow
            factor="链上活跃度"
            weight="15%"
            impact="正面"
            description="交易量和活跃地址数增加"
          />
          <FactorRow
            factor="竞品收益率"
            weight="5%"
            impact="负面"
            description="部分竞品推出更高收益产品"
          />
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">自定义预测参数</h2>

        <div className="space-y-6">
          {/* Time Range */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-white">
              预测时间范围
            </label>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
              <TimeRangeButton label="7天" />
              <TimeRangeButton label="30天" active />
              <TimeRangeButton label="90天" />
              <TimeRangeButton label="自定义" />
            </div>
          </div>

          {/* Investment Amount */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-white">
              投资金额 (USD)
            </label>
            <input
              type="number"
              placeholder="输入投资金额"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-secondary focus:border-bifrost-pink focus:outline-none focus:ring-2 focus:ring-bifrost-pink/20"
              defaultValue="10000"
            />
          </div>

          {/* Risk Tolerance */}
          <div>
            <label className="mb-3 block text-sm font-semibold text-white">
              风险承受度
            </label>
            <div className="grid grid-cols-3 gap-3">
              <RiskButton label="保守" />
              <RiskButton label="平衡" active />
              <RiskButton label="激进" />
            </div>
          </div>

          <button className="w-full rounded-xl border border-bifrost-pink bg-bifrost-pink/20 py-3 font-semibold text-bifrost-pink transition hover:bg-bifrost-pink/30">
            重新计算预测
          </button>
        </div>
      </div>

      {/* Expected Returns */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">预期收益计算</h2>

        <div className="space-y-4">
          <ExpectedReturnRow
            period="7天后"
            investment="$10,000"
            expectedReturn="$10,127"
            profit="+$127"
            apy="18.2%"
          />
          <ExpectedReturnRow
            period="30天后"
            investment="$10,000"
            expectedReturn="$10,542"
            profit="+$542"
            apy="24.5%"
          />
          <ExpectedReturnRow
            period="90天后"
            investment="$10,000"
            expectedReturn="$11,712"
            profit="+$1,712"
            apy="32.1%"
          />
        </div>

        <div className="mt-6 rounded-xl border border-info/30 bg-info/10 p-4">
          <div className="flex items-start gap-3">
            <Activity className="h-5 w-5 text-info" />
            <div>
              <div className="font-semibold text-info">预测说明</div>
              <div className="mt-1 text-sm text-text-secondary">
                以上预测基于历史数据和AI模型计算,实际收益可能受市场波动影响。预测结果仅供参考,不构成投资建议。
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Historical Accuracy */}
      <div className="glass-panel rounded-2xl border border-white/10 p-6">
        <h2 className="mb-6 text-xl font-bold text-white">预测准确度历史</h2>

        <div className="space-y-3">
          <AccuracyRow
            date="2024-01-08"
            predicted="23.5%"
            actual="24.1%"
            accuracy="97.5%"
          />
          <AccuracyRow
            date="2023-12-25"
            predicted="19.2%"
            actual="18.8%"
            accuracy="97.9%"
          />
          <AccuracyRow
            date="2023-12-10"
            predicted="21.8%"
            actual="20.5%"
            accuracy="94.0%"
          />
        </div>

        <div className="mt-4 text-center text-sm text-text-secondary">
          模型平均准确度: <span className="font-bold text-success">96.5%</span>
        </div>
      </div>
    </div>
  );
}

function PredictionCard({
  period,
  apy,
  confidence,
  trend,
  color
}: {
  period: string;
  apy: string;
  confidence: string;
  trend: string;
  color: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 text-sm text-text-secondary">{period}</div>
      <div className={`mb-2 text-3xl font-bold ${color}`}>{apy}</div>
      <div className="flex items-center justify-between">
        <div className="text-xs text-text-secondary">置信度: {confidence}</div>
        <div className="flex items-center gap-1 text-xs text-success">
          <TrendingUp className="h-3 w-3" />
          {trend}
        </div>
      </div>
    </div>
  );
}

function PoolCard({
  name,
  currentApy,
  predictedApy,
  tvl,
  trend,
  active = false
}: {
  name: string;
  currentApy: string;
  predictedApy: string;
  tvl: string;
  trend: string;
  active?: boolean;
}) {
  return (
    <div
      className={`flex items-center justify-between rounded-xl border p-4 transition ${
        active
          ? 'border-bifrost-pink/50 bg-bifrost-pink/10'
          : 'border-white/10 bg-white/5 hover:border-white/20'
      }`}
    >
      <div className="flex-1">
        <div className="mb-2 flex items-center gap-3">
          <div className="text-lg font-bold text-white">{name}</div>
          <div className="rounded-full bg-success/20 px-2 py-0.5 text-xs font-semibold text-success">
            {trend}
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <div className="text-xs text-text-secondary">当前 APY</div>
            <div className="font-semibold text-white">{currentApy}</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">预测 APY</div>
            <div className="font-semibold text-bifrost-pink">{predictedApy}</div>
          </div>
          <div>
            <div className="text-xs text-text-secondary">TVL</div>
            <div className="font-semibold text-info">{tvl}</div>
          </div>
        </div>
      </div>
      <ChevronRight className="h-5 w-5 text-text-secondary" />
    </div>
  );
}

function FactorRow({
  factor,
  weight,
  impact,
  description
}: {
  factor: string;
  weight: string;
  impact: string;
  description: string;
}) {
  const impactColor =
    impact === '正面' ? 'text-success' : impact === '负面' ? 'text-danger' : 'text-warning';

  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="mb-2 flex items-center justify-between">
        <div className="font-semibold text-white">{factor}</div>
        <div className="flex items-center gap-4">
          <div className="text-sm text-text-secondary">权重: {weight}</div>
          <div className={`rounded-full px-3 py-1 text-xs font-semibold ${impactColor}`}>
            {impact}
          </div>
        </div>
      </div>
      <p className="text-sm text-text-secondary">{description}</p>
    </div>
  );
}

function TimeRangeButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'border-bifrost-pink bg-bifrost-pink/20 text-bifrost-pink'
          : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function RiskButton({ label, active = false }: { label: string; active?: boolean }) {
  return (
    <button
      className={`rounded-lg border px-4 py-2 text-sm font-semibold transition ${
        active
          ? 'border-info bg-info/20 text-info'
          : 'border-white/10 text-text-secondary hover:border-white/20 hover:text-white'
      }`}
    >
      {label}
    </button>
  );
}

function ExpectedReturnRow({
  period,
  investment,
  expectedReturn,
  profit,
  apy
}: {
  period: string;
  investment: string;
  expectedReturn: string;
  profit: string;
  apy: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4">
      <div>
        <div className="font-semibold text-white">{period}</div>
        <div className="mt-1 text-xs text-text-secondary">投资: {investment} · APY: {apy}</div>
      </div>
      <div className="text-right">
        <div className="text-lg font-bold text-white">{expectedReturn}</div>
        <div className="text-sm font-semibold text-success">{profit}</div>
      </div>
    </div>
  );
}

function AccuracyRow({
  date,
  predicted,
  actual,
  accuracy
}: {
  date: string;
  predicted: string;
  actual: string;
  accuracy: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-3">
      <div>
        <div className="font-semibold text-white">{date}</div>
        <div className="mt-1 text-xs text-text-secondary">
          预测: {predicted} · 实际: {actual}
        </div>
      </div>
      <div className="rounded-full bg-success/20 px-3 py-1 text-sm font-semibold text-success">
        {accuracy}
      </div>
    </div>
  );
}
