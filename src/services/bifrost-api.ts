// Bifrost API服务层

import { ApiPromise, WsProvider } from '@polkadot/api';
import { API_CONFIG, VTOKEN_ASSETS, type VTokenSymbol } from '@/config/api';

let apiInstance: ApiPromise | null = null;
let isConnecting = false;

/**
 * 获取或创建API实例
 */
export async function getApi(): Promise<ApiPromise> {
  if (apiInstance && apiInstance.isConnected) {
    return apiInstance;
  }

  if (isConnecting) {
    // 等待连接完成
    while (isConnecting) {
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
    if (apiInstance) return apiInstance;
  }

  isConnecting = true;

  try {
    const provider = new WsProvider(API_CONFIG.rpcEndpoint, 1000);
    const api = await ApiPromise.create({ provider });
    await api.isReady;

    apiInstance = api;
    return api;
  } catch (error) {
    console.error('连接Bifrost节点失败:', error);
    // 尝试备用节点
    for (const endpoint of API_CONFIG.fallbackRpcEndpoints) {
      try {
        console.log('尝试备用节点:', endpoint);
        const provider = new WsProvider(endpoint, 1000);
        const api = await ApiPromise.create({ provider });
        await api.isReady;

        apiInstance = api;
        return api;
      } catch (err) {
        console.error(`备用节点 ${endpoint} 连接失败:`, err);
        continue;
      }
    }

    throw new Error('无法连接到Bifrost网络');
  } finally {
    isConnecting = false;
  }
}

/**
 * 断开API连接
 */
export async function disconnectApi(): Promise<void> {
  if (apiInstance) {
    await apiInstance.disconnect();
    apiInstance = null;
  }
}

/**
 * 获取vToken余额
 */
export async function getVTokenBalance(address: string, vToken: VTokenSymbol): Promise<string> {
  const api = await getApi();
  const asset = VTOKEN_ASSETS[vToken];

  try {
    const balance = await api.query.tokens.accounts(address, { Token: asset.symbol });
    const data = balance.toJSON() as any;
    return data?.free || '0';
  } catch (error) {
    console.error(`获取${vToken}余额失败:`, error);
    return '0';
  }
}

/**
 * 获取所有vToken余额
 */
export async function getAllVTokenBalances(address: string): Promise<Record<VTokenSymbol, string>> {
  const balances = {} as Record<VTokenSymbol, string>;

  await Promise.all(
    Object.keys(VTOKEN_ASSETS).map(async (symbol) => {
      const vToken = symbol as VTokenSymbol;
      balances[vToken] = await getVTokenBalance(address, vToken);
    })
  );

  return balances;
}

/**
 * 获取vToken兑换率
 */
export async function getVTokenExchangeRate(vToken: VTokenSymbol): Promise<number> {
  const api = await getApi();

  try {
    // 获取vToken到原生Token的兑换率
    const rate = await api.query.vtokenMinting.tokenPool({ Token: vToken });
    const data = rate.toJSON() as any;

    // 计算兑换率: vToken数量 / 原生Token数量
    if (data && data.token_pool) {
      const vTokenAmount = parseFloat(data.token_pool);
      const nativeAmount = parseFloat(data.current_supply || '0');
      return nativeAmount > 0 ? vTokenAmount / nativeAmount : 1;
    }

    return 1;
  } catch (error) {
    console.error(`获取${vToken}兑换率失败:`, error);
    return 1;
  }
}

/**
 * 获取当前APY
 */
export async function getCurrentApy(vToken: VTokenSymbol): Promise<number> {
  try {
    // 通过SubQuery获取历史数据计算APY
    const response = await fetch(API_CONFIG.subqueryEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            vtokenSnapshots(
              filter: { vtoken: { equalTo: "${vToken}" } }
              orderBy: TIMESTAMP_DESC
              first: 30
            ) {
              nodes {
                vtoken
                exchangeRate
                timestamp
              }
            }
          }
        `
      })
    });

    const data = await response.json();
    const snapshots = data?.data?.vtokenSnapshots?.nodes || [];

    if (snapshots.length < 2) {
      // 默认APY估算
      const defaultApys: Record<VTokenSymbol, number> = {
        vDOT: 12.5,
        vGLMR: 8.3,
        vASTR: 10.2,
        vFIL: 6.8,
        vMOVR: 7.5,
        vPHA: 9.1
      };
      return defaultApys[vToken] || 10;
    }

    // 计算最近7天的APY
    const latest = snapshots[0];
    const weekAgo = snapshots[Math.min(6, snapshots.length - 1)];

    const rateChange = (parseFloat(latest.exchangeRate) - parseFloat(weekAgo.exchangeRate)) / parseFloat(weekAgo.exchangeRate);
    const daysElapsed = (new Date(latest.timestamp).getTime() - new Date(weekAgo.timestamp).getTime()) / (1000 * 60 * 60 * 24);

    const annualizedRate = (rateChange / daysElapsed) * 365 * 100;
    return Math.max(0, Math.min(100, annualizedRate)); // 限制在0-100%之间
  } catch (error) {
    console.error(`获取${vToken} APY失败:`, error);
    return 10; // 返回默认值
  }
}

/**
 * 铸造vToken
 */
export async function mintVToken(
  address: string,
  vToken: VTokenSymbol,
  amount: string,
  signer: any
): Promise<{ success: boolean; hash?: string; error?: string }> {
  try {
    const api = await getApi();

    const tx = api.tx.vtokenMinting.mint(
      { Token: vToken },
      amount
    );

    return new Promise((resolve, reject) => {
      tx.signAndSend(address, { signer }, ({ status, dispatchError }) => {
        if (status.isInBlock) {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
              reject({ success: false, error: `${section}.${name}: ${docs.join(' ')}` });
            } else {
              reject({ success: false, error: dispatchError.toString() });
            }
          } else {
            resolve({ success: true, hash: status.asInBlock.toString() });
          }
        }
      }).catch((err) => reject({ success: false, error: err.message }));
    });
  } catch (error) {
    console.error('铸造vToken失败:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

/**
 * 赎回vToken
 */
export async function redeemVToken(
  address: string,
  vToken: VTokenSymbol,
  amount: string,
  signer: any
): Promise<{ success: boolean; hash?: string; error?: string }> {
  try {
    const api = await getApi();

    const tx = api.tx.vtokenMinting.redeem(
      { Token: vToken },
      amount
    );

    return new Promise((resolve, reject) => {
      tx.signAndSend(address, { signer }, ({ status, dispatchError }) => {
        if (status.isInBlock) {
          if (dispatchError) {
            if (dispatchError.isModule) {
              const decoded = api.registry.findMetaError(dispatchError.asModule);
              const { docs, name, section } = decoded;
              reject({ success: false, error: `${section}.${name}: ${docs.join(' ')}` });
            } else {
              reject({ success: false, error: dispatchError.toString() });
            }
          } else {
            resolve({ success: true, hash: status.asInBlock.toString() });
          }
        }
      }).catch((err) => reject({ success: false, error: err.message }));
    });
  } catch (error) {
    console.error('赎回vToken失败:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
