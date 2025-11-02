// IPFS上传服务

import { IPFS_CONFIG } from '@/config/ipfs';

export interface UploadResult {
  success: boolean;
  ipfsHash?: string;
  url?: string;
  error?: string;
}

/**
 * 将base64图片上传到IPFS (通过Pinata)
 */
export async function uploadImageToIPFS(dataUrl: string, filename?: string): Promise<UploadResult> {
  try {
    // 验证数据URL格式
    if (!dataUrl.startsWith('data:image/')) {
      throw new Error('Invalid image data URL');
    }

    // 提取base64数据和MIME类型
    const [header, base64Data] = dataUrl.split(',');
    const mimeType = header.match(/data:(.*);base64/)?.[1];

    if (!mimeType || !IPFS_CONFIG.allowedTypes.includes(mimeType)) {
      throw new Error(`不支持的图片类型: ${mimeType}`);
    }

    // 将base64转换为Blob
    const blob = base64ToBlob(base64Data, mimeType);

    // 检查文件大小
    if (blob.size > IPFS_CONFIG.maxFileSize) {
      throw new Error(`文件大小超过限制 (最大 ${IPFS_CONFIG.maxFileSize / 1024 / 1024}MB)`);
    }

    // 使用客户端API路由上传
    return await uploadViaAPI(blob, filename);
  } catch (error) {
    console.error('上传到IPFS失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '上传失败'
    };
  }
}

/**
 * 通过API路由上传 (隐藏API密钥)
 */
async function uploadViaAPI(blob: Blob, filename?: string): Promise<UploadResult> {
  const formData = new FormData();
  formData.append('file', blob, filename || `share-card-${Date.now()}.png`);

  const response = await fetch('/api/upload-ipfs', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || '上传失败');
  }

  const data = await response.json();
  return {
    success: true,
    ipfsHash: data.ipfsHash,
    url: `${IPFS_CONFIG.gateway}${data.ipfsHash}`
  };
}

/**
 * 通过临时云存储上传 (fallback方案)
 */
export async function uploadImageToTemporaryStorage(dataUrl: string): Promise<UploadResult> {
  try {
    // 使用临时图片托管服务 (如imgbb, imgur等)
    // 这里使用内置的临时存储API
    const response = await fetch('/api/upload-temporary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl })
    });

    if (!response.ok) {
      throw new Error('上传失败');
    }

    const data = await response.json();
    return {
      success: true,
      url: data.url
    };
  } catch (error) {
    console.error('上传到临时存储失败:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : '上传失败'
    };
  }
}

/**
 * 获取IPFS内容 (尝试多个网关)
 */
export async function getIPFSContent(ipfsHash: string): Promise<string | null> {
  const gateways = [IPFS_CONFIG.gateway, ...IPFS_CONFIG.fallbackGateways];

  for (const gateway of gateways) {
    try {
      const url = `${gateway}${ipfsHash}`;
      const response = await fetch(url, { method: 'HEAD' });
      if (response.ok) {
        return url;
      }
    } catch (error) {
      continue;
    }
  }

  return null;
}

/**
 * Base64转Blob
 */
function base64ToBlob(base64: string, mimeType: string): Blob {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  return new Blob([byteArray], { type: mimeType });
}

/**
 * 验证IPFS哈希格式
 */
export function isValidIPFSHash(hash: string): boolean {
  // CIDv0: Qm开头, 46字符
  const cidv0Regex = /^Qm[a-zA-Z0-9]{44}$/;
  // CIDv1: b开头
  const cidv1Regex = /^b[a-zA-Z0-9]+$/;

  return cidv0Regex.test(hash) || cidv1Regex.test(hash);
}

/**
 * 从URL提取IPFS哈希
 */
export function extractIPFSHash(url: string): string | null {
  const match = url.match(/\/(Qm[a-zA-Z0-9]{44}|b[a-zA-Z0-9]+)/);
  return match ? match[1] : null;
}
