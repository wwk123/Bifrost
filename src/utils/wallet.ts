// Polkadot钱包连接工具

import { web3Enable, web3Accounts, web3FromSource } from '@polkadot/extension-dapp';
import type { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import type { WalletAccount, SupportedWallet, PolkadotWallet } from '@/types/wallet';

const APP_NAME = 'Bifrost Social Arena';

/**
 * 支持的 Polkadot 钱包配置
 */
export const SUPPORTED_WALLETS: Record<PolkadotWallet, { displayName: string; downloadUrl: string }> = {
  'polkadot-js': {
    displayName: 'Polkadot{.js}',
    downloadUrl: 'https://polkadot.js.org/extension/'
  },
  talisman: {
    displayName: 'Talisman',
    downloadUrl: 'https://talisman.xyz/'
  },
  subwallet: {
    displayName: 'SubWallet',
    downloadUrl: 'https://subwallet.app/'
  }
};

/**
 * 启用钱包扩展
 */
export async function enableWalletExtension(walletName?: string): Promise<boolean> {
  try {
    const extensions = await web3Enable(APP_NAME);

    if (extensions.length === 0) {
      throw new Error('未检测到钱包扩展,请先安装 Polkadot{.js} 或其他支持的钱包');
    }

    // 如果指定了钱包名称,检查是否存在
    if (walletName) {
      const hasWallet = extensions.some((ext) => ext.name === walletName);
      if (!hasWallet) {
        throw new Error(`未找到 ${walletName} 钱包扩展`);
      }
    }

    return true;
  } catch (error) {
    console.error('启用钱包扩展失败:', error);
    throw error;
  }
}

/**
 * 获取所有账户
 */
export async function getAllAccounts(): Promise<WalletAccount[]> {
  try {
    const injectedAccounts: InjectedAccountWithMeta[] = await web3Accounts();

    if (injectedAccounts.length === 0) {
      throw new Error('未找到任何账户,请先在钱包中创建或导入账户');
    }

    return injectedAccounts.map((account) => ({
      address: account.address,
      name: account.meta.name,
      source: account.meta.source,
      type: 'polkadot' as const
    }));
  } catch (error) {
    console.error('获取账户失败:', error);
    throw error;
  }
}

/**
 * 获取账户签名器
 */
export async function getAccountSigner(address: string, source: string) {
  try {
    const injector = await web3FromSource(source);
    return injector.signer;
  } catch (error) {
    console.error('获取签名器失败:', error);
    throw error;
  }
}

/**
 * 格式化地址显示
 */
export function formatAddress(address: string, length: number = 8): string {
  if (!address || address.length < length * 2) return address;
  return `${address.slice(0, length)}...${address.slice(-length)}`;
}

/**
 * 检查钱包扩展是否已安装
 */
export function isWalletInstalled(walletName: SupportedWallet): boolean {
  if (typeof window === 'undefined') return false;

  const injectedWeb3 = (window as any).injectedWeb3;
  if (!injectedWeb3) return false;

  return !!injectedWeb3[walletName];
}

/**
 * 获取已安装的钱包列表
 */
export function getInstalledWallets(): SupportedWallet[] {
  if (typeof window === 'undefined') return [];

  const injectedWeb3 = (window as any).injectedWeb3;
  if (!injectedWeb3) return [];

  const wallets: SupportedWallet[] = [];
  Object.keys(SUPPORTED_WALLETS).forEach((key) => {
    if (injectedWeb3[key]) {
      wallets.push(key as SupportedWallet);
    }
  });

  return wallets;
}

/**
 * 验证地址格式
 */
export function isValidAddress(address: string): boolean {
  try {
    const { decodeAddress, encodeAddress } = require('@polkadot/util-crypto');
    const decoded = decodeAddress(address);
    const encoded = encodeAddress(decoded);
    return encoded === address;
  } catch {
    return false;
  }
}

/**
 * 存储最后使用的账户
 */
export function saveLastAccount(address: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('bifrost-last-account', address);
  }
}

/**
 * 获取最后使用的账户
 */
export function getLastAccount(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('bifrost-last-account');
  }
  return null;
}

/**
 * 清除存储的账户信息
 */
export function clearLastAccount(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('bifrost-last-account');
  }
}
