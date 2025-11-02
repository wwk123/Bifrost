'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, ChevronRight, Info } from 'lucide-react';

// 钱包类型定义
export type WalletType = 'polkadot' | 'evm';

export interface Wallet {
  id: string;
  name: string;
  icon: string;
  type: WalletType;
  installed?: boolean;
  downloadUrl?: string;
  description?: string;
  features?: string[];
}

// 支持的钱包列表
const WALLETS: Wallet[] = [
  // Polkadot 钱包
  {
    id: 'talisman',
    name: 'Talisman',
    icon: '✋',
    type: 'polkadot',
    installed: false,
    downloadUrl: 'https://talisman.xyz/',
    description: 'Polkadot & Ethereum 钱包',
    features: ['多链支持', 'NFT 管理', '质押功能']
  },
  {
    id: 'polkadot-js',
    name: 'Polkadot.js',
    icon: '🟣',
    type: 'polkadot',
    installed: false,
    downloadUrl: 'https://polkadot.js.org/extension/',
    description: 'Polkadot 官方钱包',
    features: ['轻量级', '安全可靠', '社区信赖']
  },
  {
    id: 'subwallet',
    name: 'SubWallet',
    icon: '💎',
    type: 'polkadot',
    installed: false,
    downloadUrl: 'https://subwallet.app/',
    description: 'Polkadot 生态全能钱包',
    features: ['多链资产', 'DApp 浏览器', '质押管理']
  },

  // EVM 钱包
  {
    id: 'metamask',
    name: 'MetaMask',
    icon: '🦊',
    type: 'evm',
    installed: false,
    description: '最受欢迎的以太坊钱包',
    features: ['全球领先', '安全可靠', '生态丰富']
  },
  {
    id: 'walletconnect',
    name: 'WalletConnect v2',
    icon: '🔗',
    type: 'evm',
    installed: true,
    description: '通过二维码连接移动端钱包',
    features: ['移动端友好', '多钱包支持', '安全连接']
  },
  {
    id: 'okx',
    name: 'OKX Wallet',
    icon: '⬛',
    type: 'evm',
    installed: false,
    downloadUrl: 'https://www.okx.com/web3',
    description: 'OKX 交易所官方钱包',
    features: ['交易所集成', '多链支持', '便捷转账']
  },
  {
    id: 'gate',
    name: 'Gate Wallet',
    icon: '🔷',
    type: 'evm',
    installed: false,
    downloadUrl: 'https://www.gate.io/web3',
    description: 'Gate.io 交易所官方钱包',
    features: ['交易所集成', '资产管理', '安全保障']
  },
  {
    id: 'enkrypt',
    name: 'Enkrypt',
    icon: '🔐',
    type: 'evm',
    installed: false,
    downloadUrl: 'https://www.enkrypt.com/',
    description: '多链 Web3 钱包',
    features: ['隐私保护', '多链支持', '开源安全']
  }
];

interface WalletConnectorProps {
  isOpen: boolean;
  onClose: () => void;
  onConnect: (walletId: string, walletType: WalletType) => void | Promise<void>;
}

export function WalletConnector({ isOpen, onClose, onConnect }: WalletConnectorProps) {
  const [selectedType, setSelectedType] = useState<WalletType>('polkadot');
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);

  // 过滤当前类型的钱包
  const filteredWallets = WALLETS.filter(wallet => wallet.type === selectedType);

  // 检测钱包是否已安装
  const checkWalletInstalled = (walletId: string): boolean => {
    if (typeof window === 'undefined') return false;

    switch (walletId) {
      case 'metamask':
        return !!(window as any).ethereum?.isMetaMask;
      case 'talisman':
        return !!(window as any).talismanEth;
      case 'polkadot-js':
        return !!(window as any).injectedWeb3?.['polkadot-js'];
      case 'subwallet':
        return !!(window as any).injectedWeb3?.['subwallet-js'];
      case 'okx':
        return !!(window as any).okxwallet;
      case 'gate':
        return !!(window as any).gatewallet;
      case 'enkrypt':
        return !!(window as any).enkrypt;
      case 'walletconnect':
        return true; // WalletConnect 总是可用
      default:
        return false;
    }
  };

  // 处理钱包连接
  const handleWalletClick = async (wallet: Wallet) => {
    const installed = checkWalletInstalled(wallet.id);

    if (!installed && wallet.downloadUrl) {
      // 显示钱包详情和下载按钮
      setSelectedWallet(wallet);
    } else {
      // 直接连接
      try {
        await onConnect(wallet.id, wallet.type);
        onClose();
      } catch (error) {
        console.error('Connection failed:', error);
      }
    }
  };

  // 处理下载
  const handleDownload = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={onClose}
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
                onClick={onClose}
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
                    {filteredWallets.map((wallet) => {
                      const installed = checkWalletInstalled(wallet.id);

                      return (
                        <motion.button
                          key={wallet.id}
                          onClick={() => handleWalletClick(wallet)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 rounded-xl transition-colors group"
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center text-2xl shadow-sm">
                              {wallet.icon}
                            </div>
                            <div className="text-left">
                              <div className="font-semibold text-gray-900">{wallet.name}</div>
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
                        {selectedWallet.icon}
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {selectedWallet.name}
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
                            {selectedWallet.features.map((feature, index) => (
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
                          onClick={() => handleDownload(selectedWallet.downloadUrl!)}
                          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-500/30"
                        >
                          下载 {selectedWallet.name}
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
  );
}

// 导出钱包连接 Hook
// 这个 Hook 现在只用于控制弹窗显示,实际的连接逻辑使用 useWallet
export function useWalletConnector() {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  // connect 函数用于从 WalletConnector 组件触发连接
  // 实际连接逻辑在 WalletProvider 中
  const connect = async (walletId: string, walletType: WalletType) => {
    // 这个函数会通过 onConnect prop 传递给 WalletConnector
    // WalletConnector 内部会调用实际的连接函数
    console.log(`Triggering connection to ${walletId} (${walletType})...`);
  };

  return {
    isOpen,
    open,
    close,
    connect
  };
}
