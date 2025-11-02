'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

import type {
  WalletContextValue,
  WalletAccount,
  WalletType,
  NetworkInfo,
  WalletBalance,
  StakingInfo
} from '@/types/wallet';

import {
  getCurrentEvmNetwork,
  getCurrentPolkadotNetwork,
  switchEvmNetwork,
  watchNetworkChange,
  watchAccountChange
} from '@/utils/network-config';

import { fetchBalance, fetchStakingInfo, startBalancePolling } from '@/utils/balance-query';

// 安全的 toast 导入 - 只在客户端使用
let toast: any = {
  success: () => {},
  error: () => {},
  warning: () => {},
  info: () => {}
};

if (typeof window !== 'undefined') {
  import('@/state/use-toast-store').then(module => {
    toast = module.toast;
  });
}

const WalletContext = createContext<WalletContextValue | null>(null);

export function WalletProvider({ children }: { children: React.ReactNode }) {
  // 基础状态
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [account, setAccount] = useState<WalletAccount | null>(null);
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [walletType, setWalletType] = useState<WalletType>('polkadot');

  // 增强状态
  const [network, setNetwork] = useState<NetworkInfo | null>(null);
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [stakingInfo, setStakingInfo] = useState<StakingInfo | null>(null);

  // 用于清理监听器的 refs
  const cleanupRefs = useRef<Array<() => void>>([]);
  const balancePollingCleanup = useRef<(() => void) | null>(null);

  // 🆕 刷新余额
  const refreshBalance = useCallback(async () => {
    if (!account) return;

    try {
      const balanceData = await fetchBalance(
        account.address,
        account.type,
        account.chainId
      );
      setBalance(balanceData);
    } catch (err) {
      console.error('刷新余额失败:', err);
    }
  }, [account]);

  // 🆕 刷新质押信息
  const refreshStakingInfo = useCallback(async () => {
    if (!account || account.type !== 'polkadot') return;

    try {
      const stakingData = await fetchStakingInfo(account.address);
      setStakingInfo(stakingData);
    } catch (err) {
      console.error('刷新质押信息失败:', err);
    }
  }, [account]);

  // 🆕 切换网络
  const switchNetwork = useCallback(async (chainId: string) => {
    if (walletType !== 'evm') {
      toast.warning('仅支持 EVM 网络切换', 'Polkadot 网络切换请在钱包中操作');
      return;
    }

    try {
      await switchEvmNetwork(chainId);
      toast.success('网络切换成功', '已切换到新网络');

      // 重新获取网络信息
      const networkInfo = await getCurrentEvmNetwork();
      setNetwork(networkInfo);
    } catch (err: any) {
      toast.error('网络切换失败', err.message || '请检查钱包设置');
      throw err;
    }
  }, [walletType]);

  // 连接钱包 - 增强版
  const connect = useCallback(async (walletName?: string, type?: WalletType) => {
    setIsConnecting(true);
    setError(null);

    const targetType = type || walletType;
    setWalletType(targetType);

    try {
      let connectedAccount: WalletAccount | null = null;
      let allAccounts: WalletAccount[] = [];

      if (targetType === 'polkadot') {
        // Polkadot 连接逻辑
        const { enableWalletExtension, getAllAccounts, saveLastAccount, getLastAccount } = await import(
          '@/utils/wallet'
        );

        await enableWalletExtension(walletName);
        const polkadotAccounts = await getAllAccounts();

        // 添加类型信息
        allAccounts = polkadotAccounts.map(acc => ({
          ...acc,
          type: 'polkadot' as WalletType
        }));

        // 恢复上次账户或使用第一个
        const lastAddress = getLastAccount();
        connectedAccount = allAccounts.find(acc => acc.address === lastAddress) || allAccounts[0] || null;

        if (connectedAccount) {
          saveLastAccount(connectedAccount.address);
        }
      } else {
        // EVM 连接逻辑
        const { connectEVMWallet } = await import('@/utils/evm-wallet');

        const evmAccounts = await connectEVMWallet(walletName as any);
        allAccounts = evmAccounts;
        connectedAccount = evmAccounts[0] || null;

        // 保存到 localStorage
        if (connectedAccount) {
          localStorage.setItem('last_evm_account', connectedAccount.address);
          localStorage.setItem('last_evm_wallet', walletName || 'metamask');
        }
      }

      if (!connectedAccount) {
        throw new Error('未找到可用账户');
      }

      setAccounts(allAccounts);
      setAccount(connectedAccount);
      setIsConnected(true);

      // 🆕 连接成功后的后续动作

      // 1. 获取网络信息
      const networkInfo = targetType === 'evm'
        ? await getCurrentEvmNetwork()
        : await getCurrentPolkadotNetwork();
      setNetwork(networkInfo);

      // 2. 检查网络是否正确
      if (!networkInfo?.isCorrectNetwork) {
        toast.warning(
          '网络提示',
          `当前网络: ${networkInfo?.chainName}。某些功能可能需要切换网络。`
        );
      }

      // 3. 获取余额
      const balanceData = await fetchBalance(
        connectedAccount.address,
        targetType,
        connectedAccount.chainId
      );
      setBalance(balanceData);

      // 4. 获取质押信息 (仅 Polkadot)
      if (targetType === 'polkadot') {
        const stakingData = await fetchStakingInfo(connectedAccount.address);
        setStakingInfo(stakingData);
      }

      // 5. 启动余额轮询
      if (balancePollingCleanup.current) {
        balancePollingCleanup.current();
      }
      balancePollingCleanup.current = startBalancePolling(
        connectedAccount.address,
        targetType,
        setBalance,
        30000 // 30秒更新一次
      );

      // 6. 监听账户和网络变更 (仅 EVM)
      if (targetType === 'evm') {
        // 清理旧监听器
        cleanupRefs.current.forEach(cleanup => cleanup());
        cleanupRefs.current = [];

        // 监听网络变更
        const networkCleanup = watchNetworkChange(async (chainId) => {
          const networkInfo = await getCurrentEvmNetwork();
          setNetwork(networkInfo);
          toast.info('网络已切换', `当前网络: ${networkInfo?.chainName}`);

          // 重新获取余额
          refreshBalance();
        });
        cleanupRefs.current.push(networkCleanup);

        // 监听账户变更
        const accountCleanup = watchAccountChange(async (addresses) => {
          if (addresses.length === 0) {
            // 用户断开了所有账户
            disconnect();
          } else if (addresses[0] !== connectedAccount.address) {
            // 用户切换了账户
            const newAccount: WalletAccount = {
              address: addresses[0],
              source: connectedAccount.source,
              type: 'evm'
            };
            setAccount(newAccount);
            localStorage.setItem('last_evm_account', addresses[0]);

            // 重新获取余额
            const balanceData = await fetchBalance(addresses[0], 'evm');
            setBalance(balanceData);

            toast.info('账户已切换', `新账户: ${addresses[0].slice(0, 6)}...${addresses[0].slice(-4)}`);
          }
        });
        cleanupRefs.current.push(accountCleanup);
      }

      // 7. 显示成功提示
      toast.success(
        '连接成功!',
        `已连接到 ${connectedAccount.source} 钱包`
      );

      // 8. 保存连接状态
      localStorage.setItem('wallet_connected', 'true');
      localStorage.setItem('wallet_type', targetType);
      if (walletName) {
        localStorage.setItem('wallet_id', walletName);
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '连接钱包失败';
      setError(errorMessage);
      toast.error('连接失败', errorMessage);
      console.error('钱包连接错误:', err);
    } finally {
      setIsConnecting(false);
    }
  }, [walletType, refreshBalance]);

  // 断开连接 - 增强版
  const disconnect = useCallback(async () => {
    // 清理所有监听器
    cleanupRefs.current.forEach(cleanup => cleanup());
    cleanupRefs.current = [];

    // 停止余额轮询
    if (balancePollingCleanup.current) {
      balancePollingCleanup.current();
      balancePollingCleanup.current = null;
    }

    // 清理本地存储
    if (walletType === 'polkadot') {
      const { clearLastAccount } = await import('@/utils/wallet');
      clearLastAccount();
    } else {
      localStorage.removeItem('last_evm_account');
      localStorage.removeItem('last_evm_wallet');
    }

    localStorage.removeItem('wallet_connected');
    localStorage.removeItem('wallet_type');
    localStorage.removeItem('wallet_id');

    // 重置所有状态
    setAccount(null);
    setAccounts([]);
    setIsConnected(false);
    setError(null);
    setNetwork(null);
    setBalance(null);
    setStakingInfo(null);

    toast.info('已断开连接', '钱包已安全断开');
  }, [walletType]);

  // 选择账户 - 增强版
  const selectAccount = useCallback(
    async (address: string) => {
      const selectedAccount = accounts.find((acc) => acc.address === address);
      if (!selectedAccount) return;

      setAccount(selectedAccount);

      // 保存选择
      if (walletType === 'polkadot') {
        const { saveLastAccount } = await import('@/utils/wallet');
        saveLastAccount(selectedAccount.address);
      } else {
        localStorage.setItem('last_evm_account', selectedAccount.address);
      }

      // 重新获取余额和质押信息
      await refreshBalance();
      if (walletType === 'polkadot') {
        await refreshStakingInfo();
      }

      toast.success('账户已切换', `当前账户: ${address.slice(0, 6)}...${address.slice(-4)}`);
    },
    [accounts, walletType, refreshBalance, refreshStakingInfo]
  );

  // 切换账户
  const switchAccount = useCallback(async () => {
    try {
      if (walletType === 'polkadot') {
        const { getAllAccounts, saveLastAccount } = await import('@/utils/wallet');
        const allAccounts = await getAllAccounts();
        const accountsWithType = allAccounts.map(acc => ({
          ...acc,
          type: 'polkadot' as WalletType
        }));
        setAccounts(accountsWithType);

        if (account && !accountsWithType.find((acc) => acc.address === account.address)) {
          if (accountsWithType.length > 0) {
            setAccount(accountsWithType[0]);
            saveLastAccount(accountsWithType[0].address);
          } else {
            disconnect();
          }
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '切换账户失败';
      setError(errorMessage);
      toast.error('切换失败', errorMessage);
      console.error('切换账户错误:', err);
    }
  }, [account, walletType, disconnect]);

  // 自动连接 (页面刷新后)
  useEffect(() => {
    const autoConnect = async () => {
      if (typeof window === 'undefined') return;

      const wasConnected = localStorage.getItem('wallet_connected');
      const savedWalletType = localStorage.getItem('wallet_type') as WalletType | null;
      const savedWalletId = localStorage.getItem('wallet_id');

      if (wasConnected === 'true' && savedWalletType && !isConnected && !isConnecting) {
        console.log('自动重新连接钱包...');
        try {
          await connect(savedWalletId || undefined, savedWalletType);
        } catch (err) {
          console.error('自动连接失败:', err);
          // 清理失效的连接状态
          localStorage.removeItem('wallet_connected');
        }
      }
    };

    // 延迟执行,避免SSR问题
    const timer = setTimeout(autoConnect, 500);
    return () => clearTimeout(timer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // 组件卸载时清理
  useEffect(() => {
    return () => {
      cleanupRefs.current.forEach(cleanup => cleanup());
      if (balancePollingCleanup.current) {
        balancePollingCleanup.current();
      }
    };
  }, []);

  const value: WalletContextValue = {
    // 基础状态
    isConnected,
    isConnecting,
    account,
    accounts,
    error,
    walletType,

    // 增强状态
    network,
    balance,
    stakingInfo,

    // 基础方法
    connect,
    disconnect,
    selectAccount,
    switchAccount,
    setWalletType,

    // 增强方法
    refreshBalance,
    refreshStakingInfo,
    switchNetwork
  };

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}

export function useWallet(): WalletContextValue {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within WalletProvider');
  }
  return context;
}
