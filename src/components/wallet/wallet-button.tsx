'use client';

import { useState } from 'react';
import { useWallet } from '@/providers/wallet-provider';
import { formatAddress, SUPPORTED_WALLETS, getInstalledWallets } from '@/utils/wallet';
import type { SupportedWallet, WalletType, EVMWallet } from '@/types/wallet';
import { POLKADOT_WALLETS } from '@/utils/polkadot-wallets';
import { EVM_WALLETS, isEVMWalletInstalled } from '@/utils/evm-wallet';

export function WalletButton() {
  const { isConnected, isConnecting, account, accounts, connect, disconnect, selectAccount } = useWallet();
  const [showAccountSelector, setShowAccountSelector] = useState(false);
  const [showWalletSelector, setShowWalletSelector] = useState(false);
  const [selectedWalletType, setSelectedWalletType] = useState<WalletType>('polkadot');

  const handleConnect = async (walletName?: SupportedWallet) => {
    setShowWalletSelector(false);
    await connect(walletName);
  };

  const handleEVMConnect = async (walletName: EVMWallet) => {
    setShowWalletSelector(false);
    // 使用统一的 connect 方法,确保全局状态正确更新
    await connect(walletName, 'evm');
  };

  const handleAccountSelect = (address: string) => {
    selectAccount(address);
    setShowAccountSelector(false);
  };

  if (isConnecting) {
    return (
      <button
        disabled
        className="inline-flex items-center gap-2 rounded-lg bg-arena-purple/20 px-4 py-2 text-sm font-medium text-text-primary backdrop-blur-sm"
      >
        <div className="h-4 w-4 animate-spin rounded-full border-2 border-arena-purple border-t-transparent" />
        连接中...
      </button>
    );
  }

  if (isConnected && account) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowAccountSelector(!showAccountSelector)}
          className="inline-flex items-center gap-2 rounded-lg bg-arena-purple px-4 py-2 text-sm font-medium text-white transition-all hover:bg-arena-purple/90"
        >
          <div className="h-2 w-2 rounded-full bg-green-400" />
          {account.name || formatAddress(account.address)}
          <svg
            className={`h-4 w-4 transition-transform ${showAccountSelector ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {/* 账户选择器下拉菜单 */}
        {showAccountSelector && (
          <div className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-surface-elevated bg-surface-primary p-2 shadow-xl backdrop-blur-xl">
            <div className="mb-2 border-b border-surface-elevated pb-2">
              <p className="text-xs text-text-secondary">已连接账户</p>
            </div>

            {accounts.map((acc) => (
              <button
                key={acc.address}
                onClick={() => handleAccountSelect(acc.address)}
                className={`mb-1 w-full rounded-lg px-3 py-2 text-left transition-colors ${
                  acc.address === account.address
                    ? 'bg-arena-purple/20 text-arena-purple'
                    : 'text-text-primary hover:bg-surface-secondary'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{acc.name || '未命名账户'}</p>
                    <p className="text-xs text-text-secondary">{formatAddress(acc.address, 6)}</p>
                  </div>
                  {acc.address === account.address && (
                    <svg className="h-4 w-4 text-arena-purple" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <p className="mt-1 text-xs text-text-tertiary">{acc.source}</p>
              </button>
            ))}

            <div className="mt-2 border-t border-surface-elevated pt-2">
              <button
                onClick={disconnect}
                className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 transition-colors hover:bg-red-400/10"
              >
                断开连接
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowWalletSelector(!showWalletSelector)}
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

      {/* 钱包选择器 */}
      {showWalletSelector && (
        <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-lg border border-surface-elevated bg-surface-primary p-4 shadow-xl backdrop-blur-xl">
          <div className="mb-3">
            <h3 className="text-sm font-semibold text-text-primary">选择钱包</h3>
            <p className="text-xs text-text-secondary">连接你的 {selectedWalletType === 'polkadot' ? 'Polkadot' : 'EVM'} 钱包</p>
          </div>

          {/* Polkadot/EVM 标签切换 */}
          <div className="mb-3 flex gap-2 bg-surface-secondary rounded-lg p-1">
            <button
              onClick={() => setSelectedWalletType('polkadot')}
              className={`
                flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all
                ${selectedWalletType === 'polkadot'
                  ? 'bg-arena-purple text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              Polkadot
            </button>
            <button
              onClick={() => setSelectedWalletType('evm')}
              className={`
                flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all
                ${selectedWalletType === 'evm'
                  ? 'bg-arena-purple text-white shadow-sm'
                  : 'text-text-secondary hover:text-text-primary'
                }
              `}
            >
              EVM
            </button>
          </div>

          <div className="space-y-2">
            {selectedWalletType === 'polkadot' ? (
              // Polkadot 钱包列表
              (Object.keys(POLKADOT_WALLETS) as (keyof typeof POLKADOT_WALLETS)[]).map((walletKey) => {
                const wallet = POLKADOT_WALLETS[walletKey];
                const isInstalled = getInstalledWallets().includes(walletKey);

                return (
                  <button
                    key={walletKey}
                    onClick={() => (isInstalled ? handleConnect(walletKey) : window.open(wallet.downloadUrl, '_blank'))}
                    className="flex w-full items-center justify-between rounded-lg border border-surface-elevated p-3 text-left transition-all hover:border-arena-purple hover:bg-surface-secondary"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated">
                        <span className="text-xl">{wallet.logo}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{wallet.displayName}</p>
                        <p className="text-xs text-text-secondary">{isInstalled ? '已安装' : '未安装'}</p>
                      </div>
                    </div>
                    {!isInstalled && (
                      <svg className="h-4 w-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            ) : (
              // EVM 钱包列表
              (Object.keys(EVM_WALLETS) as (keyof typeof EVM_WALLETS)[]).map((walletKey) => {
                const wallet = EVM_WALLETS[walletKey];
                const isInstalled = isEVMWalletInstalled(walletKey);

                return (
                  <button
                    key={walletKey}
                    onClick={() => {
                      if (isInstalled) {
                        handleEVMConnect(walletKey);
                      } else {
                        window.open(wallet.downloadUrl, '_blank');
                      }
                    }}
                    disabled={isConnecting}
                    className="flex w-full items-center justify-between rounded-lg border border-surface-elevated p-3 text-left transition-all hover:border-arena-purple hover:bg-surface-secondary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-elevated">
                        <span className="text-xl">{wallet.logo}</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-text-primary">{wallet.displayName}</p>
                        <p className="text-xs text-text-secondary">
                          {isConnecting ? '连接中...' : isInstalled ? '已安装' : '未安装'}
                        </p>
                      </div>
                    </div>
                    {!isInstalled && (
                      <svg className="h-4 w-4 text-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                    )}
                  </button>
                );
              })
            )}
          </div>

          <div className="mt-3 rounded-lg bg-surface-secondary p-3">
            <p className="text-xs text-text-secondary">
              {selectedWalletType === 'polkadot' ? (
                <>
                  💡 没有钱包? 推荐安装{' '}
                  <a
                    href={POLKADOT_WALLETS['polkadot-js'].downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-arena-purple hover:underline"
                  >
                    Polkadot{'{.js}'}
                  </a>{' '}
                  或{' '}
                  <a
                    href={POLKADOT_WALLETS.talisman.downloadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-arena-purple hover:underline"
                  >
                    Talisman
                  </a>
                </>
              ) : (
                <>
                  💡 Bifrost-polkadot 现在完全支持使用 EVM 地址进行任何交易和操作。请注意,Bifrost EVM 地址不支持任何形式的 CEX 存款。
                </>
              )}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
