// 音效管理工具

export type SoundEffect =
  | 'spin'        // 转盘旋转
  | 'win'         // 中奖
  | 'click'       // 点击
  | 'celebration' // 庆祝
  | 'notification'; // 通知

interface SoundConfig {
  volume: number;
  enabled: boolean;
}

class SoundManager {
  private sounds: Map<SoundEffect, HTMLAudioElement> = new Map();
  private config: SoundConfig = {
    volume: 0.5,
    enabled: true
  };

  constructor() {
    if (typeof window === 'undefined') return;

    // 预加载音效(使用web Audio API生成简单音效)
    this.initializeSounds();
  }

  private initializeSounds() {
    // 使用Web Audio API生成音效
    // 这样不需要额外的音频文件
  }

  // 生成简单的音效
  private createBeep(frequency: number, duration: number, volume: number = 0.5): void {
    if (typeof window === 'undefined' || !this.config.enabled) return;

    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume * this.config.volume, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + duration);
    } catch (error) {
      console.warn('音效播放失败:', error);
    }
  }

  // 播放指定音效
  play(effect: SoundEffect): void {
    if (!this.config.enabled) return;

    switch (effect) {
      case 'spin':
        // 旋转音效 - 升调
        this.createBeep(440, 0.1);
        break;

      case 'win':
        // 中奖音效 - 快乐的旋律
        setTimeout(() => this.createBeep(523, 0.15), 0);    // C
        setTimeout(() => this.createBeep(659, 0.15), 150);  // E
        setTimeout(() => this.createBeep(784, 0.3), 300);   // G
        break;

      case 'click':
        // 点击音效 - 简短的滴答声
        this.createBeep(800, 0.05, 0.3);
        break;

      case 'celebration':
        // 庆祝音效 - 上升的音调
        for (let i = 0; i < 5; i++) {
          setTimeout(() => this.createBeep(440 + i * 100, 0.1), i * 100);
        }
        break;

      case 'notification':
        // 通知音效 - 两次短促的声音
        this.createBeep(600, 0.1);
        setTimeout(() => this.createBeep(600, 0.1), 150);
        break;
    }
  }

  // 设置音量
  setVolume(volume: number): void {
    this.config.volume = Math.max(0, Math.min(1, volume));
  }

  // 启用/禁用音效
  setEnabled(enabled: boolean): void {
    this.config.enabled = enabled;

    // 保存到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('sound-enabled', enabled.toString());
    }
  }

  // 获取音效状态
  isEnabled(): boolean {
    return this.config.enabled;
  }

  // 从localStorage加载配置
  loadConfig(): void {
    if (typeof window === 'undefined') return;

    const savedEnabled = localStorage.getItem('sound-enabled');
    if (savedEnabled !== null) {
      this.config.enabled = savedEnabled === 'true';
    }

    const savedVolume = localStorage.getItem('sound-volume');
    if (savedVolume !== null) {
      this.config.volume = parseFloat(savedVolume);
    }
  }
}

// 导出单例
export const soundManager = new SoundManager();

// 初始化时加载配置
if (typeof window !== 'undefined') {
  soundManager.loadConfig();
}

// React Hook
export function useSoundEffects() {
  const play = (effect: SoundEffect) => {
    soundManager.play(effect);
  };

  const setEnabled = (enabled: boolean) => {
    soundManager.setEnabled(enabled);
  };

  const setVolume = (volume: number) => {
    soundManager.setVolume(volume);
  };

  return {
    play,
    setEnabled,
    setVolume,
    isEnabled: soundManager.isEnabled()
  };
}
