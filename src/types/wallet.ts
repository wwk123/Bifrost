// 钱包类型定义

export type WalletType = 'polkadot' | 'evm';

export interface WalletAccount {
  address: string;
  name?: string;
  source: string; // 钱包来源 (钱包ID: metamask, talisman, etc.)
  type: WalletType; // 钱包类型
  balance?: string; // 主币余额
  chainId?: string; // 链ID (仅EVM)
}

export interface NetworkInfo {
  chainId: string;
  chainName: string;
  isCorrectNetwork: boolean;
  nativeCurrency?: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

export interface WalletBalance {
  address: string;
  balance: string;
  formattedBalance: string;
  tokens?: Array<{
    symbol: string;
    balance: string;
    decimals: number;
  }>;
}

export interface StakingInfo {
  staked: string;
  rewards: string;
  validators?: string[];
}

export interface WalletState {
  isConnected: boolean;
  isConnecting: boolean;
  account: WalletAccount | null;
  accounts: WalletAccount[];
  error: string | null;
  walletType: WalletType; // 当前选择的钱包类型
  network: NetworkInfo | null; // 网络信息
  balance: WalletBalance | null; // 余额信息
  stakingInfo: StakingInfo | null; // 质押信息 (仅Polkadot)
}

export interface WalletContextValue extends WalletState {
  connect: (walletName?: string, type?: WalletType) => Promise<void>;
  disconnect: () => void;
  selectAccount: (address: string) => void;
  switchAccount: () => Promise<void>;
  setWalletType: (type: WalletType) => void;
  refreshBalance: () => Promise<void>;
  refreshStakingInfo: () => Promise<void>;
  switchNetwork: (chainId: string) => Promise<void>;
}

// Polkadot 生态钱包
export type PolkadotWallet = 'polkadot-js' | 'talisman' | 'subwallet';

// EVM 生态钱包
export type EVMWallet = 'metamask' | 'walletconnect' | 'okx' | 'gate' | 'enkrypt';

// 所有支持的钱包
export type SupportedWallet = PolkadotWallet | EVMWallet;

export interface WalletMetadata {
  name: SupportedWallet;
  displayName: string;
  logo: string;
  downloadUrl: string;
  type: WalletType;
  description?: string;
  features?: string[];
}
