'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Download, ChevronRight, Info } from 'lucide-react';
import type { WalletType, SupportedWallet } from '@/types/wallet';
import { POLKADOT_WALLETS } from '@/utils/polkadot-wallets';
import { EVM_WALLETS, isEVMWalletInstalled } from '@/utils/evm-wallet';
import { isWalletInstalled } from '@/utils/wallet';

interface EnhancedWalletButtonProps {
  onConnect?: (walletId: SupportedWallet, type: WalletType) => void;
  currentAddress?: string;
  currentWalletType?: WalletType;
  isConnected?: boolean;
}

export function EnhancedWalletButton({
  onConnect,
  currentAddress,
  currentWalletType,
  isConnected = false
}: EnhancedWalletButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<WalletType>(currentWalletType || 'polkadot');
  const [selectedWallet, setSelectedWallet] = useState<any>(null);

  // 格式化地址
  const formatAddress = (address: string) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // 获取当前类型的钱包
  const walletsForCurrentType = selectedType === 'polkadot'
    ? Object.values(POLKADOT_WALLETS)
    : Object.values(EVM_WALLETS);

  // 检查钱包是否已安装
  const checkInstalled = (walletId: string) => {
    if (selectedType === 'polkadot') {
      return isWalletInstalled(walletId as any);
    } else {
      return isEVMWalletInstalled(walletId as any);
    }
  };

  // 处理钱包点击
  const handleWalletClick = (wallet: any) => {
    const installed = checkInstalled(wallet.name);

    if (!installed && wallet.downloadUrl) {
      setSelectedWallet(wallet);
    } else {
      onConnect?.(wallet.name, selectedType);
      setIsOpen(false);
    }
  };

  // 处理下载
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  if (isConnected && currentAddress) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-arena-purple to-bifrost-pink px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-arena-purple/50"
      >
        <div className="h-2 w-2 rounded-full bg-green-400" />
        {formatAddress(currentAddress)}
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-arena-purple to-bifrost-pink px-4 py-2 text-sm font-medium text-white transition-all hover:shadow-lg hover:shadow-arena-purple/50"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        连接钱包
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => {
              setIsOpen(false);
              setSelectedWallet(null);
            }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-md w-full shadow-2xl overflow-hidden"
            >
              {/* 头部 */}
              <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">链接钱包</h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setSelectedWallet(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              {/* 钱包类型切换 */}
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex gap-2 bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => {
                      setSelectedType('polkadot');
                      setSelectedWallet(null);
                    }}
                    className={`
                      flex-1 px-4 py-2 rounded-md font-medium transition-all
                      ${selectedType === 'polkadot'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    Polkadot
                  </button>
                  <button
                    onClick={() => {
                      setSelectedType('evm');
                      setSelectedWallet(null);
                    }}
                    className={`
                      flex-1 px-4 py-2 rounded-md font-medium transition-all
                      ${selectedType === 'evm'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                      }
                    `}
                  >
                    EVM
                  </button>
                </div>
              </div>

              {/* 钱包列表 */}
              <div className="px-6 py-4 max-h-[400px] overflow-y-auto">
                <AnimatePresence mode="wait">
                  {!selectedWallet ? (
                    <motion.div
                      key="wallet-list"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="space-y-2"
                    >
                      {walletsForCurrentType.map((wallet) => {
                        const installed = checkInstalled(wallet.name);

                        return (
                          <motion.button
                            key={wallet.name}
                            onClick={() => handleWalletClick(wallet)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                                {wallet.logo}
                              </div>
                              <div className="text-left">
                                <div className="font-semibold text-gray-900">{wallet.displayName}</div>
                                {installed && (
                                  <div className="text-xs text-green-600 font-medium">已安装</div>
                                )}
                              </div>
                            </div>

                            {installed ? (
                              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            ) : (
                              <Download className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                            )}
                          </motion.button>
                        );
                      })}
                    </motion.div>
                  ) : (
                    // 钱包详情页
                    <motion.div
                      key="wallet-detail"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      className="space-y-4"
                    >
                      <button
                        onClick={() => setSelectedWallet(null)}
                        className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                      >
                        <ChevronRight className="w-4 h-4 rotate-180" />
                        返回
                      </button>

                      <div className="text-center space-y-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center text-5xl mx-auto">
                          {selectedWallet.logo}
                        </div>

                        <div>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2">
                            {selectedWallet.displayName}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {selectedWallet.description}
                          </p>
                        </div>

                        {selectedWallet.features && (
                          <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                            <div className="flex items-center gap-2 text-sm font-medium text-gray-700">
                              <Info className="w-4 h-4" />
                              特性
                            </div>
                            <div className="space-y-1">
                              {selectedWallet.features.map((feature: string, index: number) => (
                                <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                                  {feature}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {selectedWallet.downloadUrl && (
                          <button
                            onClick={() => handleDownload(selectedWallet.downloadUrl)}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
                          >
                            下载 {selectedWallet.displayName}
                          </button>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 底部提示 */}
              {!selectedWallet && (
                <div className="px-6 py-4 bg-blue-50 border-t border-blue-100">
                  <div className="flex items-start gap-2 text-sm text-blue-800">
                    <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <p>
                      {selectedType === 'polkadot'
                        ? 'Bifrost-polkadot 现在完全支持使用 EVM 地址进行任何交易和操作。请注意,Bifrost EVM 地址不支持任何形式的 CEX 存款。'
                        : '请确保您的钱包已连接到正确的网络。'}
                    </p>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
