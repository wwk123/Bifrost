import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Inter', 'SF Pro Display', 'PingFang SC', 'Noto Sans SC', 'sans-serif'],
        body: ['Inter', 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', 'sans-serif'],
        mono: ['JetBrains Mono', 'SF Mono', 'Fira Code', 'monospace']
      },
      colors: {
        bifrost: {
          pink: '#E6007A',
          'pink-light': '#FF4D8D',
          purple: '#5B21E6',
          dark: '#0A0B14',
          'dark-elevated': '#141522',
          navy: '#1E1F33'
        },
        arena: {
          gold: '#FFB800',
          silver: '#C0C0C0',
          bronze: '#CD7F32',
          blue: '#00D4FF',
          green: '#00FFB8',
          red: '#FF4D6A'
        },
        surface: {
          primary: '#0A0B14',
          secondary: '#141522',
          tertiary: '#1E1F33',
          elevated: '#2A2B44'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A8A9C8',
          tertiary: '#6C6D8A',
          disabled: '#44445A',
          accent: '#E6007A'
        },
        success: '#00FFB8',
        warning: '#FFB800',
        error: '#FF4D6A',
        info: '#00D4FF'
      },
      boxShadow: {
        glass: '0 24px 72px rgba(10, 11, 20, 0.5)',
        card: '0 12px 32px rgba(10, 11, 20, 0.35)'
      },
      backgroundImage: {
        'bifrost-primary': 'linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%)',
        'rank-bronze': 'linear-gradient(135deg, #CD7F32 0%, #FFB347 100%)',
        'rank-silver': 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%)',
        'rank-gold': 'linear-gradient(135deg, #FFB800 0%, #FFE55C 100%)',
        'rank-platinum': 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)',
        'rank-diamond': 'linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%)',
        'rank-master': 'linear-gradient(135deg, #E6007A 0%, #5B21E6 100%)',
        'glass-layer': 'linear-gradient(180deg, rgba(20, 21, 34, 0.7) 0%, rgba(10, 11, 20, 0.85) 100%)'
      },
      borderColor: {
        glass: 'rgba(255, 255, 255, 0.1)'
      },
      blur: {
        glass: '16px'
      }
    }
  },
  plugins: []
};

export default config;
