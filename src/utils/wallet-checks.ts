/**
 * 钱包状态检查工具
 * 提供统一的钱包状态验证函数
 */

import type { WalletState } from '@/types/wallet';

/**
 * 检查是否可以执行交易
 * 需要: 已连接 + 有账户 + 非连接中 + 无错误 + 正确网络
 */
export function canPerformTransaction(wallet: WalletState): boolean {
  const isNetworkValid = wallet.network?.isCorrectNetwork ?? true; // 如果网络信息不存在，默认允许交易

  return (
    wallet.isConnected &&
    wallet.account !== null &&
    !wallet.isConnecting &&
    wallet.error === null &&
    isNetworkValid
  );
}

/**
 * 检查是否可以查看受保护内容
 * 需要: 已连接 + 有账户
 */
export function canViewProtectedContent(wallet: WalletState): boolean {
  return wallet.isConnected && wallet.account !== null;
}

/**
 * 检查是否在正确的网络上
 */
export function isOnCorrectNetwork(wallet: WalletState): boolean {
  return wallet.network?.isCorrectNetwork ?? false;
}

/**
 * 检查是否有足够的余额执行操作
 */
export function hasSufficientBalance(
  wallet: WalletState,
  requiredAmount: string
): boolean {
  if (!wallet.balance) return false;

  try {
    const balance = parseFloat(wallet.balance.balance);
    const required = parseFloat(requiredAmount);
    return balance >= required;
  } catch {
    return false;
  }
}

/**
 * 获取钱包错误信息
 * 返回人类可读的错误提示
 */
export function getWalletErrorMessage(wallet: WalletState): string {
  if (!wallet.isConnected) {
    return '请先连接钱包';
  }

  if (!wallet.account) {
    return '未找到账户,请检查钱包';
  }

  if (wallet.isConnecting) {
    return '正在连接钱包,请稍候...';
  }

  if (wallet.error) {
    return wallet.error;
  }

  if (!wallet.network?.isCorrectNetwork) {
    return `请切换到正确的网络: ${wallet.network?.chainName || '未知网络'}`;
  }

  return '未知错误';
}

/**
 * 获取钱包连接状态的详细信息
 */
export function getWalletStatus(wallet: WalletState): {
  status: 'connected' | 'connecting' | 'disconnected' | 'error';
  message: string;
} {
  if (wallet.error) {
    return { status: 'error', message: wallet.error };
  }

  if (wallet.isConnecting) {
    return { status: 'connecting', message: '正在连接...' };
  }

  if (wallet.isConnected && wallet.account) {
    return { status: 'connected', message: '已连接' };
  }

  return { status: 'disconnected', message: '未连接' };
}

/**
 * 验证钱包地址格式
 */
export function isValidAddress(address: string, type: 'polkadot' | 'evm'): boolean {
  if (!address) return false;

  if (type === 'evm') {
    // EVM 地址: 0x + 40个十六进制字符
    return /^0x[a-fA-F0-9]{40}$/.test(address);
  } else {
    // Polkadot 地址: 通常以特定字符开头,长度48+
    return address.length >= 47 && /^[1-9A-HJ-NP-Za-km-z]+$/.test(address);
  }
}

/**
 * 检查钱包功能是否需要额外权限
 */
export function requiresWalletPermission(action: string): boolean {
  const permissionActions = [
    'sign',
    'send',
    'approve',
    'stake',
    'unstake',
    'swap',
    'transfer'
  ];

  return permissionActions.includes(action.toLowerCase());
}

/**
 * 比较两个钱包状态是否相等
 */
export function isWalletStateEqual(
  prev: WalletState | null,
  current: WalletState | null
): boolean {
  if (!prev || !current) return prev === current;

  return (
    prev.isConnected === current.isConnected &&
    prev.isConnecting === current.isConnecting &&
    prev.account?.address === current.account?.address &&
    prev.error === current.error &&
    prev.network?.chainId === current.network?.chainId
  );
}

/**
 * 获取操作所需的最小余额提示
 */
export function getMinimumBalanceHint(
  walletType: 'polkadot' | 'evm'
): string {
  if (walletType === 'polkadot') {
    return '至少需要 1 DOT 用于存续保证金和交易费用';
  } else {
    return '至少需要少量 ETH 用于支付 Gas 费用';
  }
}
