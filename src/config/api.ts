// Bifrost API客户端配置

export const API_CONFIG = {
  // Bifrost RPC节点
  rpcEndpoint: process.env.NEXT_PUBLIC_RPC_URL || 'wss://bifrost-polkadot.api.onfinality.io/public-ws',

  // SubQuery GraphQL端点
  subqueryEndpoint: process.env.NEXT_PUBLIC_SUBQUERY_URL || 'https://api.subquery.network/sq/bifrost-finance/bifrost',

  // 备用端点
  fallbackRpcEndpoints: [
    'wss://bifrost-rpc.dwellir.com',
    'wss://hk.p.bifrost-rpc.liebi.com/ws'
  ],

  // API超时设置
  timeout: 30000, // 30秒

  // 重试配置
  retry: {
    attempts: 3,
    delay: 1000
  }
};

// vToken资产映射
export const VTOKEN_ASSETS = {
  vDOT: {
    symbol: 'vDOT',
    decimals: 10,
    assetId: 0
  },
  vGLMR: {
    symbol: 'vGLMR',
    decimals: 18,
    assetId: 1
  },
  vASTR: {
    symbol: 'vASTR',
    decimals: 18,
    assetId: 2
  },
  vFIL: {
    symbol: 'vFIL',
    decimals: 18,
    assetId: 3
  },
  vMOVR: {
    symbol: 'vMOVR',
    decimals: 18,
    assetId: 4
  },
  vPHA: {
    symbol: 'vPHA',
    decimals: 12,
    assetId: 5
  }
} as const;

export type VTokenSymbol = keyof typeof VTOKEN_ASSETS;
