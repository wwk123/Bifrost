'use client';

import { useState } from 'react';
import { EnhancedWalletButton } from '@/components/wallet/enhanced-wallet-button';
import type { WalletType, SupportedWallet } from '@/types/wallet';
import { motion } from 'framer-motion';

// Force dynamic rendering to avoid SSR window errors
export const dynamic = 'force-dynamic';

export default function EnhancedWalletDemoPage() {
  const [connectedWallet, setConnectedWallet] = useState<{
    address: string;
    type: WalletType;
    walletId: SupportedWallet;
  } | null>(null);

  const handleConnect = async (walletId: SupportedWallet, type: WalletType) => {
    console.log(`Connecting to ${walletId} (${type})...`);

    // 模拟连接
    const mockAddress = type === 'polkadot'
      ? '5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY'
      : '0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb';

    setConnectedWallet({
      address: mockAddress,
      type,
      walletId
    });
  };

  const handleDisconnect = () => {
    setConnectedWallet(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            🔗 增强版钱包连接
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70"
          >
            Polkadot/EVM 双生态标签切换
          </motion.p>
        </div>

        {/* 钱包按钮演示 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2">钱包连接</h2>
              <p className="text-white/60">点击按钮测试连接功能</p>
            </div>

            <div className="flex items-center gap-4">
              {connectedWallet && (
                <button
                  onClick={handleDisconnect}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                >
                  断开连接
                </button>
              )}
              <EnhancedWalletButton
                onConnect={handleConnect}
                currentAddress={connectedWallet?.address}
                currentWalletType={connectedWallet?.type}
                isConnected={!!connectedWallet}
              />
            </div>
          </div>

          {connectedWallet && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 bg-white/5 rounded-xl border border-white/10"
            >
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <div className="text-sm text-white/60 mb-1">钱包类型</div>
                  <div className="text-white font-medium uppercase">{connectedWallet.type}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">钱包ID</div>
                  <div className="text-white font-medium">{connectedWallet.walletId}</div>
                </div>
                <div>
                  <div className="text-sm text-white/60 mb-1">地址</div>
                  <div className="text-white font-mono text-sm">
                    {connectedWallet.address.slice(0, 8)}...{connectedWallet.address.slice(-6)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* 功能特性 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🟣</span>
            </div>
            <h3 className="text-xl font-bold text-white">Polkadot 生态</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                Polkadot.js - 官方轻量级钱包
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                Talisman - 多链支持钱包
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-purple-400 rounded-full" />
                SubWallet - 全能钱包
              </li>
            </ul>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🦊</span>
            </div>
            <h3 className="text-xl font-bold text-white">EVM 生态</h3>
            <ul className="space-y-2 text-white/70 text-sm">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                MetaMask - 最受欢迎的以太坊钱包
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                OKX / Gate Wallet - 交易所钱包
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                Enkrypt - 多链 Web3 钱包
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                WalletConnect - 移动端连接
              </li>
            </ul>
          </div>
        </motion.div>

        {/* 设计亮点 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">✨ 设计亮点</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-3xl mb-2">🎯</div>
              <div className="font-semibold text-white mb-1">双标签切换</div>
              <div className="text-sm text-white/60">Polkadot/EVM 一键切换</div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-3xl mb-2">🔍</div>
              <div className="font-semibold text-white mb-1">智能检测</div>
              <div className="text-sm text-white/60">自动识别已安装钱包</div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-3xl mb-2">📱</div>
              <div className="font-semibold text-white mb-1">钱包详情</div>
              <div className="text-sm text-white/60">功能介绍+下载引导</div>
            </div>

            <div className="p-4 bg-white/5 rounded-xl">
              <div className="text-3xl mb-2">✨</div>
              <div className="font-semibold text-white mb-1">流畅动画</div>
              <div className="text-sm text-white/60">Framer Motion 驱动</div>
            </div>
          </div>
        </motion.div>

        {/* 返回链接 */}
        <div className="text-center space-y-4">
          <a
            href="/demo/wallet"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            ← 查看原版钱包演示
          </a>
          <div className="text-white/40 text-sm">
            服务器运行在 http://localhost:3002
          </div>
        </div>
      </div>
    </div>
  );
}
