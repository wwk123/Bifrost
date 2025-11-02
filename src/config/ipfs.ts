// IPFS上传配置

export const IPFS_CONFIG = {
  // Pinata API配置
  pinataApiKey: process.env.NEXT_PUBLIC_PINATA_API_KEY || '',
  pinataSecretKey: process.env.PINATA_SECRET_KEY || '',
  pinataJWT: process.env.PINATA_JWT || '',

  // Pinata Gateway
  gateway: process.env.NEXT_PUBLIC_IPFS_GATEWAY || 'https://gateway.pinata.cloud/ipfs/',

  // 备用公共网关
  fallbackGateways: [
    'https://ipfs.io/ipfs/',
    'https://cloudflare-ipfs.com/ipfs/',
    'https://dweb.link/ipfs/'
  ],

  // 上传限制
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif']
};
