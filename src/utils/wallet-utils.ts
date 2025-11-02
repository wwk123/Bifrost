// 综合钱包工具 - 支持 Polkadot 和 EVM
export * from './wallet';
export * from './evm-wallet';
export * from './polkadot-wallets';

import type { WalletType, WalletMetadata, SupportedWallet } from '@/types/wallet';
import { POLKADOT_WALLETS } from './polkadot-wallets';
import { EVM_WALLETS } from './evm-wallet';

/**
 * 所有支持的钱包
 */
export const ALL_WALLETS: Record<SupportedWallet, WalletMetadata> = {
  ...POLKADOT_WALLETS,
  ...EVM_WALLETS
};

/**
 * 根据类型获取钱包列表
 */
export function getWalletsByType(type: WalletType): WalletMetadata[] {
  return Object.values(ALL_WALLETS).filter(wallet => wallet.type === type);
}

/**
 * 存储钱包类型偏好
 */
export function saveWalletTypePreference(type: WalletType): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bifrost-wallet-type', type);
  }
}

/**
 * 获取钱包类型偏好
 */
export function getWalletTypePreference(): WalletType | null {
  if (typeof window !== 'undefined') {
    const type = localStorage.getItem('bifrost-wallet-type');
    return type as WalletType | null;
  }
  return null;
}

/**
 * 格式化地址 (兼容 Polkadot 和 EVM)
 */
export function formatUniversalAddress(address: string, type: WalletType, length: number = 6): string {
  if (!address) return '';

  if (type === 'polkadot') {
    // Polkadot 地址通常更长,使用 8 位
    const displayLength = Math.max(length, 8);
    return `${address.slice(0, displayLength)}...${address.slice(-displayLength)}`;
  } else {
    // EVM 地址使用 6 位
    return `${address.slice(0, length + 2)}...${address.slice(-length)}`;
  }
}
