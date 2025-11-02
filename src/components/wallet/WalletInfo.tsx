'use client';

import { useWallet } from '@/providers/wallet-provider';
import { formatAddress } from '@/utils/wallet-utils';
import { motion } from 'framer-motion';
import { Copy, Check, RefreshCw, ExternalLink, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export function WalletInfo() {
  const {
    account,
    isConnected,
    network,
    balance,
    stakingInfo,
    refreshBalance,
    refreshStakingInfo,
    switchNetwork
  } = useWallet();

  const [copied, setCopied] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  if (!isConnected || !account) return null;

  // 复制地址
  const handleCopy = () => {
    if (account?.address) {
      navigator.clipboard.writeText(account.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // 刷新数据
  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      await refreshBalance();
      if (account.type === 'polkadot') {
        await refreshStakingInfo();
      }
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  // 在区块浏览器中查看
  const viewOnExplorer = () => {
    if (!account) return;

    const explorerUrl =
      account.type === 'evm'
        ? `https://etherscan.io/address/${account.address}`
        : `https://polkadot.subscan.io/account/${account.address}`;

    window.open(explorerUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel rounded-2xl border border-white/10 p-6 space-y-6"
    >
      {/* 标题 */}
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">钱包信息</h3>
        <button
          onClick={handleRefresh}
          disabled={isRefreshing}
          className="p-2 hover:bg-white/10 rounded-lg transition-colors disabled:opacity-50"
          title="刷新数据"
        >
          <RefreshCw
            className={`w-5 h-5 text-white/60 ${isRefreshing ? 'animate-spin' : ''}`}
          />
        </button>
      </div>

      {/* 账户信息 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
          <div className="flex-1">
            <div className="text-sm text-white/60 mb-1">钱包地址</div>
            <div className="text-lg font-mono text-white">
              {formatAddress(account.address)}
            </div>
            <div className="text-xs text-white/40 mt-1">
              {account.type === 'polkadot' ? 'Polkadot 网络' : 'EVM 网络'}
              {account.name && ` • ${account.name}`}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="复制地址"
            >
              {copied ? (
                <Check className="w-5 h-5 text-green-400" />
              ) : (
                <Copy className="w-5 h-5 text-white/60" />
              )}
            </button>

            <button
              onClick={viewOnExplorer}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              title="在区块浏览器中查看"
            >
              <ExternalLink className="w-5 h-5 text-white/60" />
            </button>
          </div>
        </div>

        {/* 网络信息 */}
        {network && (
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-white/60 mb-1">当前网络</div>
                <div className="text-lg font-medium text-white flex items-center gap-2">
                  {network.chainName}
                  {network.isCorrectNetwork ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-green-500/20 text-green-400">
                      ✓ 正确
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs bg-yellow-500/20 text-yellow-400">
                      ⚠ 需切换
                    </span>
                  )}
                </div>
              </div>

              {!network.isCorrectNetwork && account.type === 'evm' && (
                <button
                  onClick={() => switchNetwork('0x3e8')} // Bifrost EVM chain ID
                  className="px-4 py-2 bg-bifrost-pink/20 hover:bg-bifrost-pink/30 text-bifrost-pink rounded-lg transition-colors text-sm font-medium"
                >
                  切换网络
                </button>
              )}
            </div>
          </div>
        )}

        {/* 余额信息 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-sm text-white/60 mb-1">主币余额</div>
            <div className="text-2xl font-bold text-white">
              {balance?.formattedBalance || '0'}
            </div>
            <div className="text-xs text-white/40 mt-1">
              {account.type === 'polkadot' ? 'DOT' : network?.nativeCurrency?.symbol || 'ETH'}
            </div>
          </div>

          {/* 质押信息 (仅 Polkadot) */}
          {account.type === 'polkadot' && stakingInfo && (
            <>
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-sm text-white/60 mb-1">质押数量</div>
                <div className="text-2xl font-bold text-white">
                  {stakingInfo.staked || '0'}
                </div>
                <div className="text-xs text-white/40 mt-1">DOT</div>
              </div>

              <div className="p-4 bg-white/5 rounded-xl border border-white/10 md:col-span-2">
                <div className="text-sm text-white/60 mb-1">待领取奖励</div>
                <div className="text-2xl font-bold text-green-400">
                  {stakingInfo.rewards || '0'}
                </div>
                <div className="text-xs text-white/40 mt-1">DOT</div>
              </div>
            </>
          )}
        </div>

        {/* 代币列表 (如果有) */}
        {balance?.tokens && balance.tokens.length > 0 && (
          <div className="p-4 bg-white/5 rounded-xl border border-white/10">
            <div className="text-sm text-white/60 mb-3">代币资产</div>
            <div className="space-y-2">
              {balance.tokens.map((token, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white font-medium">{token.symbol}</span>
                  <span className="text-white/60">
                    {parseFloat(token.balance).toFixed(4)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 网络警告 */}
        {!network?.isCorrectNetwork && (
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-sm font-medium text-yellow-400 mb-1">
                  网络不匹配
                </div>
                <div className="text-xs text-yellow-400/80">
                  当前连接到 {network?.chainName},某些功能可能无法使用。
                  {account.type === 'evm' && '请点击上方"切换网络"按钮。'}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
