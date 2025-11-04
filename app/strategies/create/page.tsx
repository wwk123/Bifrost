'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Trash2, Info, Sparkles, ChevronDown, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useWallet } from '@/providers/wallet-provider';
import { toast } from '@/state/use-toast-store';

interface AssetSegment {
  id: string;
  asset: string;
  ratio: number;
  tone: 'low' | 'mid' | 'high';
}

const availableAssets = [
  { name: 'vDOT', tone: 'low' as const, description: 'Bifrost 流动性质押 DOT' },
  { name: 'vKSM', tone: 'low' as const, description: 'Bifrost 流动性质押 KSM' },
  { name: 'vGLMR', tone: 'mid' as const, description: 'Bifrost 流动性质押 GLMR' },
  { name: 'vMOVR', tone: 'mid' as const, description: 'Bifrost 流动性质押 MOVR' },
  { name: 'vASTR', tone: 'mid' as const, description: 'Bifrost 流动性质押 ASTR' },
  { name: 'LP-DOT/USDT', tone: 'high' as const, description: 'DOT/USDT 流动性池' },
  { name: 'LP-vDOT/DOT', tone: 'mid' as const, description: 'vDOT/DOT 流动性池' },
];

const riskLevels = ['低风险', '中风险', '高风险'] as const;

// 自定义资产选择器组件
function AssetSelector({
  value,
  onChange,
  assets
}: {
  value: string;
  onChange: (value: string) => void;
  assets: typeof availableAssets;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedAsset = assets.find(a => a.name === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getToneColor = (tone: 'low' | 'mid' | 'high') => {
    switch (tone) {
      case 'low':
        return 'text-success';
      case 'mid':
        return 'text-info';
      case 'high':
        return 'text-warning';
    }
  };

  const getToneBg = (tone: 'low' | 'mid' | 'high') => {
    switch (tone) {
      case 'low':
        return 'bg-success/10 border-success/20';
      case 'mid':
        return 'bg-info/10 border-info/20';
      case 'high':
        return 'bg-warning/10 border-warning/20';
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-left text-sm text-white transition-colors hover:border-white/20 focus:border-bifrost-primary/50 focus:outline-none"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className={`text-xs ${getToneColor(selectedAsset?.tone || 'mid')}`}>●</span>
            <span>{selectedAsset?.name}</span>
            <span className="text-xs text-text-secondary">- {selectedAsset?.description}</span>
          </div>
          <ChevronDown className={`h-4 w-4 text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.15 }}
            className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-white/10 bg-dark-bg/95 backdrop-blur-xl shadow-xl"
          >
            <div className="max-h-60 overflow-y-auto">
              {assets.map((asset) => (
                <button
                  key={asset.name}
                  type="button"
                  onClick={() => {
                    onChange(asset.name);
                    setIsOpen(false);
                  }}
                  className={`w-full px-4 py-3 text-left text-sm transition-colors hover:bg-white/10 ${
                    value === asset.name ? 'bg-white/5' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`text-xs ${getToneColor(asset.tone)}`}>●</span>
                      <span className="font-medium text-white">{asset.name}</span>
                      <span className="text-xs text-text-secondary">{asset.description}</span>
                    </div>
                    {value === asset.name && (
                      <Check className="h-4 w-4 text-bifrost-primary" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CreateStrategyPage() {
  const router = useRouter();
  const { isConnected } = useWallet();

  const [strategyName, setStrategyName] = useState('');
  const [description, setDescription] = useState('');
  const [riskLevel, setRiskLevel] = useState<typeof riskLevels[number]>('中风险');
  const [segments, setSegments] = useState<AssetSegment[]>([
    { id: '1', asset: 'vDOT', ratio: 100, tone: 'low' }
  ]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const totalRatio = segments.reduce((sum, seg) => sum + seg.ratio, 0);

  const handleAddSegment = () => {
    const newId = (Math.max(...segments.map(s => parseInt(s.id)), 0) + 1).toString();
    setSegments([...segments, { id: newId, asset: 'vDOT', ratio: 0, tone: 'low' }]);
  };

  const handleRemoveSegment = (id: string) => {
    if (segments.length > 1) {
      setSegments(segments.filter(s => s.id !== id));
    }
  };

  const handleSegmentChange = (id: string, field: keyof AssetSegment, value: any) => {
    setSegments(segments.map(seg => {
      if (seg.id === id) {
        if (field === 'asset') {
          const selectedAsset = availableAssets.find(a => a.name === value);
          return { ...seg, asset: value, tone: selectedAsset?.tone || 'mid' };
        }
        return { ...seg, [field]: value };
      }
      return seg;
    }));
  };

  const handleAutoBalance = () => {
    const equalRatio = Math.floor(100 / segments.length);
    const remainder = 100 - (equalRatio * segments.length);

    setSegments(segments.map((seg, index) => ({
      ...seg,
      ratio: index === 0 ? equalRatio + remainder : equalRatio
    })));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isConnected) {
      toast.warning('请先连接钱包', '需要连接钱包才能创建策略');
      return;
    }

    if (!strategyName.trim()) {
      toast.error('策略名称不能为空', '请输入策略名称');
      return;
    }

    if (totalRatio !== 100) {
      toast.error('资产比例错误', `当前总比例为 ${totalRatio}%，必须等于 100%`);
      return;
    }

    setIsSubmitting(true);

    try {
      // 模拟创建策略
      await new Promise(resolve => setTimeout(resolve, 2000));

      toast.success('策略创建成功!', `「${strategyName}」已发布到策略广场`);

      // 跳转回策略列表
      router.push('/strategies');
    } catch (error) {
      toast.error('创建失败', '请稍后重试');
      console.error('Strategy creation error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Header */}
      <div className="glass-panel relative overflow-hidden rounded-3xl border border-bifrost-primary/30 px-8 py-8">
        <div className="absolute right-0 top-0 h-56 w-56 translate-x-16 -translate-y-16 rounded-full bg-bifrost-primary/20 blur-3xl" />
        <div className="absolute -bottom-16 left-16 h-48 w-48 rounded-full bg-arena-purple/15 blur-3xl" />

        <div className="relative">
          <Link
            href="/strategies"
            className="mb-4 inline-flex items-center gap-2 text-sm text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            返回策略图书馆
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-bifrost-primary/30 to-arena-purple/30">
              <Sparkles className="h-10 w-10 text-bifrost-primary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-white">创建你的策略</h1>
              <p className="text-lg text-text-secondary">
                设计独特的投资组合，分享给社区并赚取收益
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Basic Info */}
        <div className="glass-panel rounded-3xl border border-white/5 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">基本信息</h2>

          <div className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                策略名称 *
              </label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="例如：稳健收益策略"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-secondary/50 transition-colors focus:border-bifrost-primary/50 focus:outline-none"
                maxLength={50}
              />
              <p className="mt-1 text-xs text-text-secondary">
                {strategyName.length}/50 字符
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                策略描述 *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="简要描述你的策略思路、适用场景和预期收益..."
                rows={4}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-text-secondary/50 transition-colors focus:border-bifrost-primary/50 focus:outline-none"
                maxLength={500}
              />
              <p className="mt-1 text-xs text-text-secondary">
                {description.length}/500 字符
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-white">
                风险等级 *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {riskLevels.map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setRiskLevel(level)}
                    className={`rounded-xl border px-4 py-3 text-sm font-semibold transition-all ${
                      riskLevel === level
                        ? 'border-bifrost-primary bg-bifrost-primary/20 text-white'
                        : 'border-white/10 bg-white/5 text-text-secondary hover:border-white/20 hover:text-white'
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Asset Allocation */}
        <div className="glass-panel rounded-3xl border border-white/5 p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">资产配置</h2>
              <p className="text-sm text-text-secondary">
                配置不同资产的投资比例（总计必须为 100%）
              </p>
            </div>
            <button
              type="button"
              onClick={handleAutoBalance}
              className="rounded-full border border-white/10 px-4 py-2 text-xs font-semibold text-text-secondary transition-colors hover:border-white/20 hover:text-white"
            >
              自动平衡
            </button>
          </div>

          <div className="space-y-4">
            {segments.map((segment, index) => (
              <motion.div
                key={segment.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="mb-2 block text-xs text-text-secondary">
                      资产类型
                    </label>
                    <AssetSelector
                      value={segment.asset}
                      onChange={(value) => handleSegmentChange(segment.id, 'asset', value)}
                      assets={availableAssets}
                    />
                  </div>

                  <div className="w-32">
                    <label className="mb-2 block text-xs text-text-secondary">
                      比例 (%)
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={segment.ratio}
                      onChange={(e) => handleSegmentChange(segment.id, 'ratio', parseInt(e.target.value) || 0)}
                      className="w-full rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white transition-colors focus:border-bifrost-primary/50 focus:outline-none"
                    />
                  </div>

                  {segments.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveSegment(segment.id)}
                      className="mt-6 rounded-lg border border-error/30 bg-error/10 p-2 text-error transition-colors hover:bg-error/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}

            <button
              type="button"
              onClick={handleAddSegment}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-white/20 bg-white/5 px-4 py-4 text-sm font-semibold text-text-secondary transition-colors hover:border-white/30 hover:bg-white/10 hover:text-white"
            >
              <Plus className="h-4 w-4" />
              添加资产
            </button>
          </div>

          {/* Total Ratio Indicator */}
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">总比例</span>
              <span
                className={`text-2xl font-bold ${
                  totalRatio === 100
                    ? 'text-success'
                    : totalRatio > 100
                    ? 'text-error'
                    : 'text-warning'
                }`}
              >
                {totalRatio}%
              </span>
            </div>
            {totalRatio !== 100 && (
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-warning/10 p-3">
                <Info className="h-4 w-4 flex-shrink-0 text-warning" />
                <p className="text-xs text-warning">
                  {totalRatio > 100
                    ? `比例超出 ${totalRatio - 100}%，请调整`
                    : `还需分配 ${100 - totalRatio}%`}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Preview */}
        <div className="glass-panel rounded-3xl border border-white/5 p-8">
          <h2 className="mb-6 text-2xl font-bold text-white">策略预览</h2>

          <div className="space-y-4 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <h3 className="text-xl font-bold text-white">
                {strategyName || '未命名策略'}
              </h3>
              <p className="mt-1 text-sm text-text-secondary">
                {description || '暂无描述'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-text-secondary">
                {riskLevel}
              </span>
            </div>

            <div className="flex flex-wrap gap-2">
              {segments.map((segment) => (
                <span
                  key={segment.id}
                  className={`rounded-full border px-3 py-1 text-xs font-medium ${
                    segment.tone === 'low'
                      ? 'border-success/30 bg-success/15 text-success'
                      : segment.tone === 'mid'
                      ? 'border-info/30 bg-info/15 text-info'
                      : 'border-warning/30 bg-warning/15 text-warning'
                  }`}
                >
                  {segment.asset} · {segment.ratio}%
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-4">
          <Link
            href="/strategies"
            className="flex-1 rounded-full border border-white/10 px-8 py-4 text-center font-semibold text-text-secondary transition-colors hover:border-white/20 hover:text-white"
          >
            取消
          </Link>
          <button
            type="submit"
            disabled={isSubmitting || totalRatio !== 100 || !strategyName.trim()}
            className="flex-1 rounded-full bg-bifrost-primary px-8 py-4 font-semibold text-white shadow-[0_12px_24px_rgba(230,0,122,0.35)] transition-all hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
          >
            {isSubmitting ? '发布中...' : '发布策略'}
          </button>
        </div>
      </form>

      {/* Tips */}
      <div className="glass-panel rounded-2xl border border-info/20 p-6">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 flex-shrink-0 text-info" />
          <div className="space-y-2 text-sm text-text-secondary">
            <p className="font-semibold text-white">创建提示</p>
            <ul className="list-inside list-disc space-y-1">
              <li>策略发布后将对所有用户可见，其他人可以复制你的策略</li>
              <li>当有人使用你的策略产生收益时，你将获得一定比例的分成</li>
              <li>建议根据市场环境和风险承受能力合理配置资产比例</li>
              <li>定期更新和优化你的策略可以获得更多关注</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
