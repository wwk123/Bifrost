/**
 * 余额查询工具
 * 提供 Polkadot 和 EVM 链的余额查询功能
 */

import { formatUnits } from '@ethersproject/units';
import type { WalletBalance } from '@/types/wallet';

/**
 * 格式化余额显示
 */
export function formatBalance(balance: string, decimals: number = 18): string {
  try {
    const formatted = formatUnits(balance, decimals);
    const num = parseFloat(formatted);

    if (num === 0) return '0';
    if (num < 0.0001) return '< 0.0001';
    if (num < 1) return num.toFixed(4);
    if (num < 1000) return num.toFixed(2);
    if (num < 1000000) return (num / 1000).toFixed(2) + 'K';
    return (num / 1000000).toFixed(2) + 'M';
  } catch {
    return '0';
  }
}

/**
 * 查询 EVM 地址余额
 */
export async function fetchEvmBalance(
  address: string,
  chainId?: string
): Promise<WalletBalance | null> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return null;
  }

  try {
    // 查询主币余额
    const balance = await (window as any).ethereum.request({
      method: 'eth_getBalance',
      params: [address, 'latest']
    });

    // 转换为可读格式
    const balanceInEther = formatUnits(balance, 18);

    return {
      address,
      balance: balance,
      formattedBalance: formatBalance(balance, 18)
    };
  } catch (error) {
    console.error('查询 EVM 余额失败:', error);
    return null;
  }
}

/**
 * 查询 Polkadot 地址余额
 */
export async function fetchPolkadotBalance(
  address: string
): Promise<WalletBalance | null> {
  try {
    // 注意: 这里需要使用 @polkadot/api 连接到链
    // 为了简化,这里返回模拟数据
    // 实际使用时需要:
    // 1. 连接到 Polkadot API
    // 2. 查询账户信息
    // 3. 获取自由余额和锁定余额

    // TODO: 实现真实的 Polkadot 余额查询
    console.log('Polkadot 余额查询功能待实现:', address);

    return {
      address,
      balance: '0',
      formattedBalance: '0'
    };
  } catch (error) {
    console.error('查询 Polkadot 余额失败:', error);
    return null;
  }
}

/**
 * 统一的余额查询接口
 */
export async function fetchBalance(
  address: string,
  walletType: 'polkadot' | 'evm',
  chainId?: string
): Promise<WalletBalance | null> {
  if (!address) return null;

  if (walletType === 'evm') {
    return fetchEvmBalance(address, chainId);
  } else {
    return fetchPolkadotBalance(address);
  }
}

/**
 * 查询 ERC20 代币余额
 */
export async function fetchErc20Balance(
  tokenAddress: string,
  walletAddress: string
): Promise<string | null> {
  if (typeof window === 'undefined' || !(window as any).ethereum) {
    return null;
  }

  try {
    // ERC20 balanceOf 函数签名
    const data =
      '0x70a08231' +
      '000000000000000000000000' +
      walletAddress.slice(2).toLowerCase();

    const balance = await (window as any).ethereum.request({
      method: 'eth_call',
      params: [
        {
          to: tokenAddress,
          data: data
        },
        'latest'
      ]
    });

    return balance;
  } catch (error) {
    console.error('查询 ERC20 余额失败:', error);
    return null;
  }
}

/**
 * 批量查询代币余额
 */
export async function fetchMultipleTokenBalances(
  tokens: Array<{ address: string; symbol: string; decimals: number }>,
  walletAddress: string
): Promise<
  Array<{
    symbol: string;
    balance: string;
    decimals: number;
  }>
> {
  const balances = await Promise.all(
    tokens.map(async (token) => {
      const balance = await fetchErc20Balance(token.address, walletAddress);
      return {
        symbol: token.symbol,
        balance: balance || '0',
        decimals: token.decimals
      };
    })
  );

  return balances;
}

/**
 * 查询质押信息 (Polkadot)
 */
export async function fetchStakingInfo(address: string): Promise<{
  staked: string;
  rewards: string;
  validators?: string[];
} | null> {
  try {
    // TODO: 实现真实的 Polkadot 质押信息查询
    // 需要使用 @polkadot/api 查询:
    // 1. 质押的数量
    // 2. 待领取的奖励
    // 3. 验证人列表

    console.log('Polkadot 质押信息查询功能待实现:', address);

    return {
      staked: '0',
      rewards: '0',
      validators: []
    };
  } catch (error) {
    console.error('查询质押信息失败:', error);
    return null;
  }
}

/**
 * 轮询余额更新
 */
export function startBalancePolling(
  address: string,
  walletType: 'polkadot' | 'evm',
  callback: (balance: WalletBalance | null) => void,
  interval: number = 30000 // 默认30秒
): () => void {
  let isActive = true;
  let timeoutId: NodeJS.Timeout;

  const poll = async () => {
    if (!isActive) return;

    const balance = await fetchBalance(address, walletType);
    callback(balance);

    if (isActive) {
      timeoutId = setTimeout(poll, interval);
    }
  };

  // 立即执行一次
  poll();

  // 返回停止函数
  return () => {
    isActive = false;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
  };
}

/**
 * 验证余额是否足够
 */
export function hasEnoughBalance(
  currentBalance: string,
  requiredAmount: string,
  decimals: number = 18
): boolean {
  try {
    const current = parseFloat(formatUnits(currentBalance, decimals));
    const required = parseFloat(requiredAmount);
    return current >= required;
  } catch {
    return false;
  }
}

/**
 * 计算交易后的预估余额
 */
export function estimateBalanceAfterTx(
  currentBalance: string,
  txAmount: string,
  gasEstimate: string,
  decimals: number = 18
): string {
  try {
    const current = parseFloat(formatUnits(currentBalance, decimals));
    const amount = parseFloat(txAmount);
    const gas = parseFloat(formatUnits(gasEstimate, decimals));

    const after = current - amount - gas;
    return after.toString();
  } catch {
    return '0';
  }
}
