'use client';

import { useWallet } from '@/providers/wallet-provider';
import { WalletConnector, useWalletConnector } from '@/components/wallet/WalletConnector';
import { WalletInfo } from '@/components/wallet/WalletInfo';
import { Wallet, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { canPerformTransaction } from '@/utils/wallet-checks';

export default function WalletDemoPage() {
  // 使用增强的 useWallet 而不是 useWalletConnector
  const walletState = useWallet();
  const { isConnected, account, disconnect, balance, network, stakingInfo, connect: walletConnect } = walletState;

  // WalletConnector 弹窗控制
  const { isOpen, open, close } = useWalletConnector();

  // 检查是否可以执行交易
  const canTrade = canPerformTransaction(walletState);

  // 处理钱包连接
  const handleConnect = async (walletId: string, walletType: 'polkadot' | 'evm') => {
    try {
      await walletConnect(walletId, walletType);
    } catch (error) {
      console.error('Connection failed:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* 页面标题 */}
        <div className="text-center space-y-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-white"
          >
            🔗 多钱包连接演示
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70"
          >
            支持 Polkadot 和 EVM 生态的主流钱包
          </motion.p>
        </div>

        {/* 连接状态卡片 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          {!isConnected ? (
            // 未连接状态
            <div className="text-center space-y-6">
              <div className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                <Wallet className="w-10 h-10 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">未连接钱包</h2>
                <p className="text-white/60">点击下方按钮连接您的钱包开始使用</p>
              </div>
              <button
                onClick={open}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40"
              >
                连接钱包
              </button>
            </div>
          ) : (
            // 已连接状态
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                    <Wallet className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-white/60 mb-1">已连接</div>
                    <div className="text-xl font-bold text-white capitalize">
                      {account?.source || 'Unknown Wallet'}
                    </div>
                    <div className="text-sm text-white/60 flex items-center gap-2">
                      {account?.type === 'polkadot' ? 'Polkadot 网络' : 'EVM 网络'}
                      {network && (
                        <>
                          <span>•</span>
                          <span>{network.chainName}</span>
                          {network.isCorrectNetwork && (
                            <span className="text-green-400">✓</span>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={disconnect}
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  断开连接
                </button>
              </div>

              {/* 使用新的 WalletInfo 组件 */}
              <WalletInfo />

              {/* 功能按钮 */}
              <div className="flex gap-4">
                <button
                  disabled={!canTrade}
                  className={`
                    flex-1 py-3 rounded-xl font-medium transition-all
                    ${canTrade
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                      : 'bg-white/10 text-white/40 cursor-not-allowed'
                    }
                  `}
                >
                  {canTrade ? '开始交易' : '请先切换到正确网络'}
                </button>

                <button
                  disabled={!isConnected}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  查看历史
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* 支持的钱包列表 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8"
        >
          <h2 className="text-2xl font-bold text-white mb-6">支持的钱包</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Polkadot 生态 */}
            <div className="space-y-4">
              <div className="text-lg font-semibold text-white/80 flex items-center gap-2">
                🟣 Polkadot 生态
              </div>
              <div className="space-y-2">
                {['Talisman', 'Polkadot.js', 'SubWallet'].map((wallet, index) => (
                  <div
                    key={wallet}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
                      {['✋', '🟣', '💎'][index]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{wallet}</div>
                      <div className="text-xs text-white/60">多链支持</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* EVM 生态 */}
            <div className="space-y-4">
              <div className="text-lg font-semibold text-white/80 flex items-center gap-2">
                🦊 EVM 生态
              </div>
              <div className="space-y-2">
                {['MetaMask', 'WalletConnect', 'OKX Wallet', 'Gate Wallet', 'Enkrypt'].map((wallet, index) => (
                  <div
                    key={wallet}
                    className="flex items-center gap-3 p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-xl">
                      {['🦊', '🔗', '⬛', '🔷', '🔐'][index]}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{wallet}</div>
                      <div className="text-xs text-white/60">
                        {wallet === 'WalletConnect' ? '移动端支持' : '浏览器扩展'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* 功能特性 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🔒</span>
            </div>
            <h3 className="text-xl font-bold text-white">安全可靠</h3>
            <p className="text-white/60 text-sm">
              非托管钱包,私钥由您掌控,确保资产安全
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">⚡</span>
            </div>
            <h3 className="text-xl font-bold text-white">快速连接</h3>
            <p className="text-white/60 text-sm">
              一键连接,即刻开始使用,无需繁琐注册
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 space-y-3">
            <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <h3 className="text-xl font-bold text-white">多链支持</h3>
            <p className="text-white/60 text-sm">
              同时支持 Polkadot 和 EVM 生态,资产管理更便捷
            </p>
          </div>
        </motion.div>

        {/* 返回按钮 */}
        <div className="text-center">
          <a
            href="/demo/gamification"
            className="inline-block px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
          >
            ← 返回游戏化演示
          </a>
        </div>
      </div>

      {/* 钱包连接器组件 */}
      <WalletConnector
        isOpen={isOpen}
        onClose={close}
        onConnect={handleConnect}
      />
    </div>
  );
}
