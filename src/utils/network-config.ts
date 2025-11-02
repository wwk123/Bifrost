/**
 * 网络配置和验证工具
 */

import type { NetworkInfo } from '@/types/wallet';

// 支持的 EVM 网络配置
export const EVM_NETWORKS = {
  // 以太坊主网
  ethereum: {
    chainId: '0x1',
    chainIdDecimal: 1,
    chainName: 'Ethereum Mainnet',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'ETH',
      decimals: 18
    },
    rpcUrls: ['https://eth.llamarpc.com'],
    blockExplorerUrls: ['https://etherscan.io']
  },
  // Bifrost EVM (示例 - 请替换为实际配置)
  bifrostEvm: {
    chainId: '0x3e8', // 1000
    chainIdDecimal: 1000,
    chainName: 'Bifrost EVM',
    nativeCurrency: {
      name: 'BNC',
      symbol: 'BNC',
      decimals: 18
    },
    rpcUrls: ['https://bifrost-rpc.dwellir.com'],
    blockExplorerUrls: ['https://bifrost.subscan.io']
  },
  // Polygon
  polygon: {
    chainId: '0x89',
    chainIdDecimal: 137,
    chainName: 'Polygon Mainnet',
    nativeCurrency: {
      name: 'MATIC',
      symbol: 'MATIC',
      decimals: 18
    },
    rpcUrls: ['https://polygon-rpc.com'],
    blockExplorerUrls: ['https://polygonscan.com']
  },
  // BSC
  bsc: {
    chainId: '0x38',
    chainIdDecimal: 56,
    chainName: 'BNB Smart Chain',
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    },
    rpcUrls: ['https://bsc-dataseed.binance.org'],
    blockExplorerUrls: ['https://bscscan.com']
  }
} as const;

// 支持的 Polkadot 网络配置
export const POLKADOT_NETWORKS = {
  polkadot: {
    chainId: 'polkadot',
    chainName: 'Polkadot',
    nativeCurrency: {
      name: 'Polkadot',
      symbol: 'DOT',
      decimals: 10
    },
    rpcUrls: ['wss://rpc.polkadot.io']
  },
  kusama: {
    chainId: 'kusama',
    chainName: 'Kusama',
    nativeCurrency: {
      name: 'Kusama',
      symbol: 'KSM',
      decimals: 12
    },
    rpcUrls: ['wss://kusama-rpc.polkadot.io']
  },
  bifrost: {
    chainId: 'bifrost',
    chainName: 'Bifrost Polkadot',
    nativeCurrency: {
      name: 'Bifrost',
      symbol: 'BNC',
      decimals: 12
    },
    rpcUrls: ['wss://bifrost-rpc.dwellir.com']
  }
} as const;

// 默认网络 (根据项目需求配置)
export const DEFAULT_NETWORK = {
  evm: EVM_NETWORKS.bifrostEvm,
  polkadot: POLKADOT_NETWORKS.bifrost
};

/**
 * 获取当前 EVM 网络
 */
export async function getCurrentEvmNetwork(): Promise<NetworkInfo | null> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return null;
  }

  try {
    const chainId = await (window as any).ethereum.request({
      method: 'eth_chainId'
    });

    const network = Object.values(EVM_NETWORKS).find(
      (net) => net.chainId === chainId
    );

    if (!network) {
      return {
        chainId,
        chainName: 'Unknown Network',
        isCorrectNetwork: false
      };
    }

    return {
      chainId: network.chainId,
      chainName: network.chainName,
      isCorrectNetwork: chainId === DEFAULT_NETWORK.evm.chainId,
      nativeCurrency: network.nativeCurrency
    };
  } catch (error) {
    console.error('获取 EVM 网络失败:', error);
    return null;
  }
}

/**
 * 获取当前 Polkadot 网络
 */
export async function getCurrentPolkadotNetwork(): Promise<NetworkInfo | null> {
  // Polkadot 网络检测逻辑
  // 注意: Polkadot.js 扩展不直接提供网络信息,需要连接到链后获取

  // 暂时返回默认网络
  return {
    chainId: DEFAULT_NETWORK.polkadot.chainId,
    chainName: DEFAULT_NETWORK.polkadot.chainName,
    isCorrectNetwork: true,
    nativeCurrency: DEFAULT_NETWORK.polkadot.nativeCurrency
  };
}

/**
 * 切换 EVM 网络
 */
export async function switchEvmNetwork(chainId: string): Promise<boolean> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('未检测到 EVM 钱包');
  }

  try {
    await (window as any).ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId }]
    });
    return true;
  } catch (error: any) {
    // 如果网络不存在,尝试添加
    if (error.code === 4902) {
      return await addEvmNetwork(chainId);
    }
    console.error('切换网络失败:', error);
    throw error;
  }
}

/**
 * 添加 EVM 网络
 */
export async function addEvmNetwork(chainId: string): Promise<boolean> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    throw new Error('未检测到 EVM 钱包');
  }

  const network = Object.values(EVM_NETWORKS).find(
    (net) => net.chainId === chainId
  );

  if (!network) {
    throw new Error('不支持的网络');
  }

  try {
    await (window as any).ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: network.chainId,
          chainName: network.chainName,
          nativeCurrency: network.nativeCurrency,
          rpcUrls: network.rpcUrls,
          blockExplorerUrls: network.blockExplorerUrls
        }
      ]
    });
    return true;
  } catch (error) {
    console.error('添加网络失败:', error);
    throw error;
  }
}

/**
 * 验证是否在正确的网络上
 */
export async function verifyNetwork(
  walletType: 'polkadot' | 'evm'
): Promise<boolean> {
  if (walletType === 'evm') {
    const network = await getCurrentEvmNetwork();
    return network?.isCorrectNetwork ?? false;
  } else {
    const network = await getCurrentPolkadotNetwork();
    return network?.isCorrectNetwork ?? false;
  }
}

/**
 * 获取网络名称
 */
export function getNetworkName(chainId: string, walletType: 'polkadot' | 'evm'): string {
  if (walletType === 'evm') {
    const network = Object.values(EVM_NETWORKS).find(
      (net) => net.chainId === chainId
    );
    return network?.chainName || 'Unknown Network';
  } else {
    const network = Object.values(POLKADOT_NETWORKS).find(
      (net) => net.chainId === chainId
    );
    return network?.chainName || 'Unknown Network';
  }
}

/**
 * 监听网络变更
 */
export function watchNetworkChange(
  callback: (chainId: string) => void
): () => void {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return () => {};
  }

  const handleChainChanged = (chainId: string) => {
    console.log('网络已切换:', chainId);
    callback(chainId);
  };

  (window as any).ethereum.on('chainChanged', handleChainChanged);

  // 返回清理函数
  return () => {
    (window as any).ethereum?.removeListener('chainChanged', handleChainChanged);
  };
}

/**
 * 监听账户变更
 */
export function watchAccountChange(
  callback: (accounts: string[]) => void
): () => void {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return () => {};
  }

  const handleAccountsChanged = (accounts: string[]) => {
    console.log('账户已变更:', accounts);
    callback(accounts);
  };

  (window as any).ethereum.on('accountsChanged', handleAccountsChanged);

  // 返回清理函数
  return () => {
    (window as any).ethereum?.removeListener('accountsChanged', handleAccountsChanged);
  };
}
