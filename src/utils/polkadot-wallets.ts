// 补充 Polkadot 钱包的完整元数据
import type { PolkadotWallet, WalletMetadata } from '@/types/wallet';

export const POLKADOT_WALLETS: Record<PolkadotWallet, WalletMetadata> = {
  'polkadot-js': {
    name: 'polkadot-js',
    displayName: 'Polkadot{.js}',
    logo: '🟣',
    downloadUrl: 'https://polkadot.js.org/extension/',
    type: 'polkadot',
    description: 'Polkadot 官方钱包',
    features: ['轻量级', '安全可靠', '社区信赖']
  },
  talisman: {
    name: 'talisman',
    displayName: 'Talisman',
    logo: '✋',
    downloadUrl: 'https://talisman.xyz/',
    type: 'polkadot',
    description: 'Polkadot & Ethereum 钱包',
    features: ['多链支持', 'NFT 管理', '质押功能']
  },
  subwallet: {
    name: 'subwallet',
    displayName: 'SubWallet',
    logo: '💎',
    downloadUrl: 'https://subwallet.app/',
    type: 'polkadot',
    description: 'Polkadot 生态全能钱包',
    features: ['多链资产', 'DApp 浏览器', '质押管理']
  }
};
