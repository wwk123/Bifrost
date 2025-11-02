// 分享卡片生成工具

export interface ShareCardData {
  username: string;
  avatar: string;
  rank: number;
  weeklyEarnings: number;
  totalStaked: number;
  achievements: string[];
  theme: 'gradient' | 'dark' | 'neon';
}

export interface ShareCardTheme {
  container: string;
  background: string;
  textPrimary: string;
  textSecondary: string;
}

/**
 * 获取主题样式
 */
export function getThemeStyles(theme: ShareCardData['theme']): ShareCardTheme {
  const themes: Record<ShareCardData['theme'], ShareCardTheme> = {
    gradient: {
      container:
        'background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); width: 800px; height: 450px; position: relative; overflow: hidden;',
      background:
        'position: absolute; inset: 0; background: radial-gradient(circle at 20% 20%, rgba(255,255,255,0.2), transparent 50%);',
      textPrimary: 'color: white;',
      textSecondary: 'color: rgba(255, 255, 255, 0.8);'
    },
    dark: {
      container:
        'background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); width: 800px; height: 450px; position: relative; overflow: hidden;',
      background:
        'position: absolute; inset: 0; background: radial-gradient(circle at 80% 20%, rgba(230, 0, 122, 0.3), transparent 60%);',
      textPrimary: 'color: white;',
      textSecondary: 'color: rgba(255, 255, 255, 0.7);'
    },
    neon: {
      container:
        'background: linear-gradient(135deg, #0f0c29 0%, #302b63 50%, #24243e 100%); width: 800px; height: 450px; position: relative; overflow: hidden;',
      background:
        'position: absolute; inset: 0; background: radial-gradient(circle at 50% 50%, rgba(0, 212, 255, 0.2), transparent 70%);',
      textPrimary: 'color: #00d4ff;',
      textSecondary: 'color: rgba(0, 212, 255, 0.8);'
    }
  };

  return themes[theme];
}

/**
 * 生成分享卡片 HTML
 */
export function generateShareCardHTML(data: ShareCardData): string {
  const styles = getThemeStyles(data.theme);

  return `
    <div style="${styles.container}">
      <!-- 背景装饰 -->
      <div style="${styles.background}"></div>

      <!-- 顶部栏 -->
      <div style="display: flex; align-items: center; gap: 16px; padding: 32px; position: relative; z-index: 1;">
        <div style="width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border: 4px solid rgba(255,255,255,0.3);"></div>
        <div>
          <div style="font-size: 32px; font-weight: bold; ${styles.textPrimary} margin-bottom: 8px; font-family: system-ui, -apple-system, sans-serif;">
            ${data.username}
          </div>
          <div style="font-size: 18px; ${styles.textSecondary} font-family: system-ui, -apple-system, sans-serif;">
            Bifrost Staking Champion
          </div>
        </div>
      </div>

      <!-- 核心数据 -->
      <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 24px; padding: 0 32px; position: relative; z-index: 1;">
        <!-- 排名 -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 24px; text-align: center;">
          <div style="font-size: 48px; font-weight: bold; color: #FFD700; font-family: system-ui, -apple-system, sans-serif;">
            #${data.rank}
          </div>
          <div style="font-size: 16px; ${styles.textSecondary} margin-top: 8px; font-family: system-ui, -apple-system, sans-serif;">
            排行榜
          </div>
        </div>

        <!-- 收益 -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 24px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; color: #4CAF50; font-family: system-ui, -apple-system, sans-serif;">
            $${data.weeklyEarnings.toFixed(2)}
          </div>
          <div style="font-size: 16px; ${styles.textSecondary} margin-top: 8px; font-family: system-ui, -apple-system, sans-serif;">
            本周收益
          </div>
        </div>

        <!-- 质押量 -->
        <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border-radius: 16px; padding: 24px; text-align: center;">
          <div style="font-size: 36px; font-weight: bold; ${styles.textPrimary} font-family: system-ui, -apple-system, sans-serif;">
            ${data.totalStaked.toFixed(0)}
          </div>
          <div style="font-size: 16px; ${styles.textSecondary} margin-top: 8px; font-family: system-ui, -apple-system, sans-serif;">
            DOT 质押
          </div>
        </div>
      </div>

      <!-- 成就徽章 -->
      <div style="padding: 32px; position: relative; z-index: 1;">
        <div style="display: flex; gap: 12px; align-items: center;">
          ${data.achievements
            .slice(0, 3)
            .map(
              (achievement) => `
            <div style="background: rgba(255,255,255,0.15); border-radius: 12px; padding: 8px 16px; font-size: 14px; ${styles.textPrimary} font-family: system-ui, -apple-system, sans-serif;">
              🏆 ${achievement}
            </div>
          `
            )
            .join('')}
        </div>
      </div>

      <!-- 底部 CTA -->
      <div style="position: absolute; bottom: 32px; left: 32px; right: 32px; display: flex; justify-content: space-between; align-items: center; z-index: 1;">
        <div style="font-size: 14px; ${styles.textSecondary} font-family: system-ui, -apple-system, sans-serif;">
          Join: bifrost-compete.app
        </div>
        <div style="background: rgba(255,255,255,0.2); border-radius: 8px; padding: 12px 24px; font-size: 16px; font-weight: bold; ${styles.textPrimary} font-family: system-ui, -apple-system, sans-serif;">
          挑战我的收益 →
        </div>
      </div>
    </div>
  `;
}

/**
 * 将HTML转换为图片 (需要在浏览器环境中使用)
 */
export async function generateShareCardImage(data: ShareCardData): Promise<string> {
  if (typeof window === 'undefined') {
    throw new Error('此功能只能在浏览器环境中使用');
  }

  // 创建隐藏的DOM元素
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.innerHTML = generateShareCardHTML(data);
  document.body.appendChild(container);

  try {
    // 动态导入 html-to-image
    const { toPng } = await import('html-to-image');

    // 转换为PNG
    const dataUrl = await toPng(container.firstElementChild as HTMLElement, {
      quality: 1.0,
      pixelRatio: 2
    });

    return dataUrl;
  } finally {
    // 清理DOM
    document.body.removeChild(container);
  }
}

/**
 * 下载分享卡片
 */
export async function downloadShareCard(data: ShareCardData, filename: string = 'bifrost-share-card.png'): Promise<void> {
  const dataUrl = await generateShareCardImage(data);

  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}

/**
 * 分享到Twitter
 */
export async function shareToTwitter(data: ShareCardData): Promise<void> {
  const imageUrl = await generateShareCardImage(data);

  // 实际应用中,需要先上传图片到服务器或IPFS
  const uploadedUrl = await uploadImage(imageUrl);

  const text = `
🏆 我在 Bifrost 收益竞赛中排名第 ${data.rank}!

💰 本周收益: $${data.weeklyEarnings.toFixed(2)}
📊 质押: ${data.totalStaked.toFixed(0)} DOT

挑战我的收益 👇
`.trim();

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(uploadedUrl)}`;
  window.open(twitterUrl, '_blank');
}

/**
 * 分享到Telegram
 */
export async function shareToTelegram(data: ShareCardData): Promise<void> {
  const imageUrl = await generateShareCardImage(data);
  const uploadedUrl = await uploadImage(imageUrl);

  const message = `
🏆 Bifrost 收益竞赛战报

排名: #${data.rank}
本周收益: $${data.weeklyEarnings.toFixed(2)}
质押量: ${data.totalStaked.toFixed(0)} DOT

Join: bifrost-compete.app
`.trim();

  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(uploadedUrl)}&text=${encodeURIComponent(message)}`;
  window.open(telegramUrl, '_blank');
}

/**
 * 上传图片到服务器
 */
async function uploadImage(dataUrl: string): Promise<string> {
  // 优先尝试IPFS上传
  try {
    const { uploadImageToIPFS } = await import('@/services/ipfs-upload');
    const result = await uploadImageToIPFS(dataUrl);
    if (result.success && result.url) {
      return result.url;
    }
  } catch (error) {
    console.warn('IPFS上传失败,使用临时存储:', error);
  }

  // Fallback: 使用临时存储
  const { uploadImageToTemporaryStorage } = await import('@/services/ipfs-upload');
  const result = await uploadImageToTemporaryStorage(dataUrl);
  if (result.success && result.url) {
    return result.url;
  }

  throw new Error('图片上传失败');
}
