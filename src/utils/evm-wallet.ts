// EVM 钱包连接工具

import type { WalletAccount, EVMWallet, WalletMetadata } from '@/types/wallet';

/**
 * EVM 钱包配置
 */
export const EVM_WALLETS: Record<EVMWallet, WalletMetadata> = {
  metamask: {
    name: 'metamask',
    displayName: 'MetaMask',
    logo: '🦊',
    downloadUrl: 'https://metamask.io/',
    type: 'evm',
    description: '最受欢迎的以太坊钱包',
    features: ['全球领先', '安全可靠', '生态丰富']
  },
  walletconnect: {
    name: 'walletconnect',
    displayName: 'WalletConnect v2',
    logo: '🔗',
    downloadUrl: '',
    type: 'evm',
    description: '通过二维码连接移动端钱包',
    features: ['移动端友好', '多钱包支持', '安全连接']
  },
  okx: {
    name: 'okx',
    displayName: 'OKX Wallet',
    logo: '⬛',
    downloadUrl: 'https://www.okx.com/web3',
    type: 'evm',
    description: 'OKX 交易所官方钱包',
    features: ['交易所集成', '多链支持', '便捷转账']
  },
  gate: {
    name: 'gate',
    displayName: 'Gate Wallet',
    logo: '🔷',
    downloadUrl: 'https://www.gate.io/web3',
    type: 'evm',
    description: 'Gate.io 交易所官方钱包',
    features: ['交易所集成', '资产管理', '安全保障']
  },
  enkrypt: {
    name: 'enkrypt',
    displayName: 'Enkrypt',
    logo: '🔐',
    downloadUrl: 'https://www.enkrypt.com/',
    type: 'evm',
    description: '多链 Web3 钱包',
    features: ['隐私保护', '多链支持', '开源安全']
  }
};

/**
 * 检查 EVM 钱包是否已安装
 */
export function isEVMWalletInstalled(walletName: EVMWallet): boolean {
  if (typeof window === 'undefined') return false;

  switch (walletName) {
    case 'metamask':
      return !!(window as any).ethereum?.isMetaMask;
    case 'okx':
      return !!(window as any).okxwallet;
    case 'gate':
      return !!(window as any).gatewallet;
    case 'enkrypt':
      return !!(window as any).enkrypt?.providers?.ethereum;
    case 'walletconnect':
      return true; // WalletConnect 总是可用
    default:
      return false;
  }
}

/**
 * 获取已安装的 EVM 钱包列表
 */
export function getInstalledEVMWallets(): EVMWallet[] {
  if (typeof window === 'undefined') return [];

  const evmWallets: EVMWallet[] = ['metamask', 'okx', 'gate', 'enkrypt', 'walletconnect'];
  return evmWallets.filter(wallet => isEVMWalletInstalled(wallet));
}

/**
 * 连接 EVM 钱包
 */
export async function connectEVMWallet(walletName: EVMWallet): Promise<WalletAccount[]> {
  if (typeof window === 'undefined') {
    throw new Error('仅支持浏览器环境');
  }

  try {
    let provider: any;

    // 根据钱包名称获取对应的 provider
    switch (walletName) {
      case 'metamask':
        if (!(window as any).ethereum?.isMetaMask) {
          throw new Error('未检测到 MetaMask,请先安装');
        }
        provider = (window as any).ethereum;
        break;

      case 'okx':
        if (!(window as any).okxwallet) {
          throw new Error('未检测到 OKX Wallet,请先安装');
        }
        provider = (window as any).okxwallet;
        break;

      case 'gate':
        if (!(window as any).gatewallet) {
          throw new Error('未检测到 Gate Wallet,请先安装');
        }
        provider = (window as any).gatewallet;
        break;

      case 'enkrypt':
        if (!(window as any).enkrypt?.providers?.ethereum) {
          throw new Error('未检测到 Enkrypt,请先安装');
        }
        provider = (window as any).enkrypt.providers.ethereum;
        break;

      case 'walletconnect':
        // WalletConnect 需要特殊处理
        throw new Error('WalletConnect 集成开发中');

      default:
        throw new Error(`不支持的钱包: ${walletName}`);
    }

    // 请求连接
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    });

    if (!accounts || accounts.length === 0) {
      throw new Error('未找到任何账户');
    }

    // 转换为 WalletAccount 格式
    return accounts.map((address: string, index: number) => ({
      address,
      name: `Account ${index + 1}`,
      source: walletName,
      type: 'evm' as const
    }));
  } catch (error: any) {
    // 用户拒绝连接
    if (error.code === 4001) {
      throw new Error('用户拒绝连接');
    }
    console.error('连接 EVM 钱包失败:', error);
    throw error;
  }
}

/**
 * 验证 EVM 地址格式
 */
export function isValidEVMAddress(address: string): boolean {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * 监听 EVM 账户变化
 */
export function subscribeToEVMAccountChanges(callback: (accounts: string[]) => void): () => void {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return () => {};
  }

  const provider = (window as any).ethereum;

  const handler = (accounts: string[]) => {
    callback(accounts);
  };

  provider.on('accountsChanged', handler);

  // 返回清理函数
  return () => {
    provider.removeListener('accountsChanged', handler);
  };
}

/**
 * 监听 EVM 链变化
 */
export function subscribeToEVMChainChanges(callback: (chainId: string) => void): () => void {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return () => {};
  }

  const provider = (window as any).ethereum;

  const handler = (chainId: string) => {
    callback(chainId);
  };

  provider.on('chainChanged', handler);

  // 返回清理函数
  return () => {
    provider.removeListener('chainChanged', handler);
  };
}

/**
 * 获取当前 EVM 链 ID
 */
export async function getCurrentChainId(): Promise<string> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('未检测到 EVM 钱包');
  }

  const provider = (window as any).ethereum;
  const chainId = await provider.request({ method: 'eth_chainId' });
  return chainId;
}

/**
 * 切换 EVM 链
 */
export async function switchEVMChain(chainId: string): Promise<void> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('未检测到 EVM 钱包');
  }

  const provider = (window as any).ethereum;

  try {
    await provider.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }],
    });
  } catch (error: any) {
    // 如果链未添加,尝试添加
    if (error.code === 4902) {
      throw new Error('请先在钱包中添加此网络');
    }
    throw error;
  }
}
