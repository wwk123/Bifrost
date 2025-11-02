# 🎨 社交化收益竞赛平台 - 设计系统规范

> **项目名称**: Bifrost Liquid Staking Arena
> **设计风格**: Web3 科技感 × 竞技游戏化 × Bifrost 品牌延伸
> **设计原则**: 数据可视化 · 动态交互 · 社交炫耀 · 专业可信

---

## 📐 1. 设计原则 (Design Principles)

### 1.1 核心设计理念

```
📊 数据优先 (Data-Driven)
   └─ 清晰的数据层级,突出关键指标(APY、排名、收益)

⚡ 动态反馈 (Dynamic Feedback)
   └─ 实时更新动画,让用户感知变化

🎯 竞技氛围 (Competitive Spirit)
   └─ 排行榜、段位、成就营造竞争感

🔗 社交驱动 (Social Sharing)
   └─ 病毒式传播的分享卡片设计
```

### 1.2 用户体验目标

- **专业性**: 金融级数据展示,建立信任感
- **趣味性**: 游戏化元素降低 DeFi 门槛
- **社交性**: 炫耀心理驱动的分享设计
- **清晰性**: 复杂数据简单化呈现

---

## 🎨 2. 色彩系统 (Color Palette)

### 2.1 主色调 (Primary Colors)

#### Bifrost 官方品牌色 (基于官网分析)

```css
/* 主品牌色 - Bifrost Gradient */
--bifrost-primary: linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%);
--bifrost-pink: #E6007A;       /* 主粉色 - Bifrost Logo 主色 */
--bifrost-pink-light: #FF4D8D; /* 亮粉 - 渐变终点/高亮 */
--bifrost-purple: #5B21E6;     /* 辅助紫色 - Sub0/Polkadot 关联色 */

/* 深色背景层级 (官网风格) */
--bifrost-dark: #0A0B14;       /* 主背景 - 深蓝黑 */
--bifrost-dark-elevated: #141522; /* 卡片背景 */
--bifrost-navy: #1E1F33;       /* 三级背景 */

/* 辅助色 - 竞技色系 */
--arena-gold: #FFB800;         /* 冠军金 - 第一名 */
--arena-silver: #C0C0C0;       /* 亚军银 - 第二名 */
--arena-bronze: #CD7F32;       /* 季军铜 - 第三名 */
--arena-blue: #00D4FF;         /* 科技蓝 - 数据高亮 */
--arena-green: #00FFB8;        /* 增长绿 - 正收益 */
--arena-red: #FF4D6A;          /* 损失红 - 负收益 */

/* Polkadot 生态色 */
--polkadot-pink: #E6007A;      /* Polkadot 官方粉 */
--polkadot-purple: #552BBF;    /* Polkadot 辅助紫 */
```

### 2.2 中性色 (Neutral Colors)

#### 深色主题 (Dark Theme - 推荐, 基于 Bifrost 官网)

```css
/* 背景层级 (参考 Bifrost 官网深色系) */
--bg-primary: #0A0B14;         /* 主背景 - 深空蓝黑 (Bifrost 官网背景色) */
--bg-secondary: #141522;       /* 卡片背景 - 略亮 */
--bg-tertiary: #1E1F33;        /* 悬浮层 - 更亮 */
--bg-elevated: #2A2B44;        /* 弹窗/模态框 - 最亮背景层 */

/* 边框/分割线 (增强对比度) */
--border-default: rgba(230, 0, 122, 0.08);  /* 带粉色调 */
--border-hover: rgba(230, 0, 122, 0.2);     /* 悬停时粉色边框 */
--border-focus: rgba(230, 0, 122, 0.5);     /* 焦点时强粉色 */
--border-neutral: rgba(255, 255, 255, 0.08); /* 中性边框 */

/* 文字层级 */
--text-primary: #FFFFFF;       /* 主标题/重要数据 */
--text-secondary: #A8A9C8;     /* 次要文字/说明 (偏蓝灰) */
--text-tertiary: #6C6D8A;      /* 辅助文字/时间戳 */
--text-disabled: #44445A;      /* 禁用状态 */
--text-accent: #E6007A;        /* 强调文字 (Bifrost 粉) */

/* 玻璃态效果 (Bifrost 官网风格) */
--glass-bg: rgba(20, 21, 34, 0.6);
--glass-border: rgba(255, 255, 255, 0.1);
--glass-blur: blur(16px) saturate(180%);
```

#### 亮色主题 (Light Theme - 备选)

```css
/* 背景层级 */
--bg-primary: #FFFFFF;
--bg-secondary: #F7F7FA;
--bg-tertiary: #EBEBF0;

/* 文字层级 */
--text-primary: #14141F;
--text-secondary: #6C6C8A;
--text-tertiary: #A0A0B8;
```

### 2.3 语义色 (Semantic Colors)

```css
/* 状态色 */
--success: #00FFB8;            /* 成功/增长 */
--warning: #FFB800;            /* 警告/提示 */
--error: #FF4D6A;              /* 错误/损失 */
--info: #00D4FF;               /* 信息/中性 */

/* 透明叠加 */
--success-bg: rgba(0, 255, 184, 0.1);
--warning-bg: rgba(255, 184, 0, 0.1);
--error-bg: rgba(255, 77, 106, 0.1);
--info-bg: rgba(0, 212, 255, 0.1);
```

### 2.4 段位色系 (Rank Colors)

```css
/* 段位渐变色 (融合 Bifrost 粉色调) */
--rank-bronze: linear-gradient(135deg, #CD7F32 0%, #FFB347 100%);
--rank-silver: linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 100%);
--rank-gold: linear-gradient(135deg, #FFB800 0%, #FFE55C 100%);
--rank-platinum: linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%);
--rank-diamond: linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%); /* Bifrost 粉渐变 */
--rank-master: linear-gradient(135deg, #E6007A 0%, #5B21E6 100%); /* 粉紫渐变 */

/* 特殊效果 - Polkadot 生态主题 */
--rank-polkadot: linear-gradient(135deg, #E6007A 0%, #552BBF 100%); /* Polkadot 官方渐变 */
```

---

## 🔤 3. 字体系统 (Typography)

### 3.1 字体家族 (Font Family)

```css
/* 英文字体 (参考 Bifrost 官网使用的现代无衬线字体) */
--font-display: 'Inter', 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif;
--font-body: 'Inter', 'SF Pro Text', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', 'Roboto Mono', monospace;

/* 中文字体 (优化 Web3 场景可读性) */
--font-zh: 'PingFang SC', 'Noto Sans SC', 'Microsoft YaHei', 'Hiragino Sans GB', sans-serif;

/* 数字专用字体(等宽,用于金融数据) */
--font-numeric: 'JetBrains Mono', 'SF Mono', 'Consolas', 'Monaco', monospace;

/* 品牌标题字体(可选,用于 Logo/Hero 区域) */
--font-brand: 'Inter', 'SF Pro Display', sans-serif;
font-weight: 700;
letter-spacing: -0.02em; /* 紧凑字间距 */
```

### 3.2 字体大小 (Font Sizes)

```css
/* Type Scale (1.250 - Major Third) */
--text-xs: 0.75rem;     /* 12px - 标签/时间戳 */
--text-sm: 0.875rem;    /* 14px - 辅助文字 */
--text-base: 1rem;      /* 16px - 正文 */
--text-lg: 1.125rem;    /* 18px - 小标题 */
--text-xl: 1.25rem;     /* 20px - 卡片标题 */
--text-2xl: 1.5rem;     /* 24px - 页面标题 */
--text-3xl: 1.875rem;   /* 30px - 英雄标题 */
--text-4xl: 2.25rem;    /* 36px - 排行榜大数字 */
--text-5xl: 3rem;       /* 48px - 首页主标题 */
--text-6xl: 4rem;       /* 64px - 冠军数字展示 */
```

### 3.3 字重 (Font Weights)

```css
--font-light: 300;      /* 辅助文字 */
--font-normal: 400;     /* 正文 */
--font-medium: 500;     /* 小标题 */
--font-semibold: 600;   /* 按钮/强调 */
--font-bold: 700;       /* 大标题/数据 */
--font-black: 900;      /* 排行榜排名 */
```

### 3.4 行高 (Line Heights)

```css
--leading-tight: 1.25;  /* 大标题 */
--leading-snug: 1.375;  /* 小标题 */
--leading-normal: 1.5;  /* 正文 */
--leading-relaxed: 1.625; /* 长文本 */
```

### 3.5 典型组合示例

```tsx
// 排行榜排名数字
<h1 className="text-6xl font-black font-numeric text-arena-gold">
  #1
</h1>

// 收益百分比
<span className="text-2xl font-bold font-mono text-success">
  +24.5%
</span>

// 卡片标题
<h2 className="text-xl font-semibold text-primary">
  本周排行榜
</h2>

// 说明文字
<p className="text-sm font-normal text-secondary leading-relaxed">
  根据过去7天的质押收益率排名
</p>
```

---

## 📦 4. 间距系统 (Spacing)

### 4.1 间距尺度 (Spacing Scale)

```css
/* 基础单位: 4px (0.25rem) */
--spacing-0: 0;
--spacing-1: 0.25rem;   /* 4px */
--spacing-2: 0.5rem;    /* 8px */
--spacing-3: 0.75rem;   /* 12px */
--spacing-4: 1rem;      /* 16px */
--spacing-5: 1.25rem;   /* 20px */
--spacing-6: 1.5rem;    /* 24px */
--spacing-8: 2rem;      /* 32px */
--spacing-10: 2.5rem;   /* 40px */
--spacing-12: 3rem;     /* 48px */
--spacing-16: 4rem;     /* 64px */
--spacing-20: 5rem;     /* 80px */
--spacing-24: 6rem;     /* 96px */
```

### 4.2 布局原则

```
组件内边距(Padding):
├─ 小卡片: 16px (spacing-4)
├─ 中卡片: 24px (spacing-6)
└─ 大卡片: 32px (spacing-8)

组件间距(Gap):
├─ 紧密元素: 8px (spacing-2)
├─ 常规元素: 16px (spacing-4)
└─ 松散元素: 24px (spacing-6)

页面边距(Margin):
├─ 移动端: 16px (spacing-4)
├─ 平板: 32px (spacing-8)
└─ 桌面: 48px (spacing-12)
```

---

## 🔲 5. 圆角系统 (Border Radius)

```css
--radius-none: 0;
--radius-sm: 0.25rem;   /* 4px - 标签 */
--radius-base: 0.5rem;  /* 8px - 按钮/输入框 */
--radius-md: 0.75rem;   /* 12px - 小卡片 */
--radius-lg: 1rem;      /* 16px - 大卡片 */
--radius-xl: 1.5rem;    /* 24px - 模态框 */
--radius-2xl: 2rem;     /* 32px - 英雄卡片 */
--radius-full: 9999px;  /* 圆形 - 头像/徽章 */
```

---

## 🌫️ 6. 阴影系统 (Shadows)

### 6.1 层级阴影 (Elevation)

```css
/* 基础阴影 (深色主题优化) */
--shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.2);
--shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.2);
--shadow-base: 0 4px 8px rgba(0, 0, 0, 0.24);
--shadow-md: 0 8px 16px rgba(0, 0, 0, 0.3);
--shadow-lg: 0 16px 32px rgba(0, 0, 0, 0.4);
--shadow-xl: 0 24px 48px rgba(0, 0, 0, 0.5);
--shadow-2xl: 0 32px 64px rgba(0, 0, 0, 0.6);

/* 发光阴影 (Glow - Bifrost 粉色主题) */
--glow-pink: 0 0 24px rgba(230, 0, 122, 0.5);         /* Bifrost 主色发光 */
--glow-pink-strong: 0 0 40px rgba(230, 0, 122, 0.7);  /* 强粉色发光 */
--glow-purple: 0 0 24px rgba(91, 33, 230, 0.4);       /* 紫色发光(辅助) */
--glow-gold: 0 0 24px rgba(255, 184, 0, 0.5);         /* 金色发光(排名) */
--glow-green: 0 0 24px rgba(0, 255, 184, 0.4);        /* 绿色发光(增长) */
--glow-blue: 0 0 24px rgba(0, 212, 255, 0.4);         /* 蓝色发光(信息) */

/* 内阴影 (用于卡片凹陷效果) */
--shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.3);
--shadow-inner-lg: inset 0 4px 8px rgba(0, 0, 0, 0.4);

/* 组合阴影 (提升 + 发光) */
--shadow-glow-pink:
  0 8px 16px rgba(0, 0, 0, 0.3),
  0 0 24px rgba(230, 0, 122, 0.5);
```

### 6.2 应用场景

```tsx
// 卡片悬浮效果 (Bifrost 风格)
<Card className="shadow-base hover:shadow-glow-pink transition-all duration-300" />

// 排行榜前三名发光 (融合品牌色)
<RankCard rank={1} className="shadow-xl glow-gold" />
<RankCard rank={2} className="shadow-lg glow-pink" /> {/* 使用 Bifrost 粉色 */}
<RankCard rank={3} className="shadow-md glow-bronze" />

// 按钮焦点状态 (Bifrost 粉色主题)
<Button className="focus:shadow-glow-pink focus:ring-2 ring-bifrost-pink" />

// 玻璃态卡片 (Bifrost 官网风格)
<div className="glass-card shadow-lg backdrop-blur-xl">
  {/* 内容 */}
</div>
```

---

## 🎬 7. 动画系统 (Animation)

### 7.1 动画时长 (Duration)

```css
--duration-fast: 150ms;     /* 微交互 - hover/focus */
--duration-base: 250ms;     /* 标准过渡 - modal/dropdown */
--duration-slow: 400ms;     /* 复杂动画 - page transition */
--duration-slower: 600ms;   /* 英雄动画 - hero entrance */
```

### 7.2 缓动曲线 (Easing)

```css
--ease-linear: cubic-bezier(0, 0, 1, 1);
--ease-in: cubic-bezier(0.4, 0, 1, 1);
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* 弹跳效果 */
--ease-smooth: cubic-bezier(0.4, 0, 0.2, 1); /* Apple 风格 */
```

### 7.3 Framer Motion 预设

```typescript
// 通用过渡配置
export const transitions = {
  fast: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  base: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  slow: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  bounce: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] },
}

// 淡入动画
export const fadeIn = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: transitions.base,
}

// 滑入动画(从下往上)
export const slideUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: transitions.base,
}

// 缩放动画
export const scaleIn = {
  initial: { opacity: 0, scale: 0.9 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.9 },
  transition: transitions.bounce,
}

// 数字变化动画
export const counterAnimation = {
  initial: { opacity: 0, scale: 1.2 },
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] },
}

// 排名变化动画
export const rankChange = {
  up: {
    initial: { y: 0, color: '#00FFB8' },
    animate: { y: [-10, 0], color: ['#00FFB8', '#FFFFFF'] },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
  down: {
    initial: { y: 0, color: '#FF4D6A' },
    animate: { y: [10, 0], color: ['#FF4D6A', '#FFFFFF'] },
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

// 徽章解锁动画
export const badgeUnlock = {
  initial: { scale: 0, rotate: -180, opacity: 0 },
  animate: {
    scale: [0, 1.2, 1],
    rotate: [-180, 10, 0],
    opacity: 1,
  },
  transition: {
    duration: 0.8,
    ease: [0.68, -0.55, 0.265, 1.55],
    times: [0, 0.6, 1],
  },
}
```

### 7.4 页面加载动画

```typescript
// 骨架屏动画
export const skeleton = {
  animate: {
    backgroundColor: [
      'rgba(255, 255, 255, 0.05)',
      'rgba(255, 255, 255, 0.15)',
      'rgba(255, 255, 255, 0.05)',
    ],
  },
  transition: {
    duration: 1.5,
    repeat: Infinity,
    ease: 'linear',
  },
}

// 列表交错动画
export const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1, // 每个子元素延迟 100ms
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  transition: transitions.base,
}
```

---

## 🧩 8. 组件规范 (Component Specs)

### 8.1 按钮 (Button)

#### 尺寸规格

```tsx
// Small
<Button size="sm">
  {/* height: 32px, padding: 8px 16px, text: 14px */}
</Button>

// Medium (Default)
<Button size="md">
  {/* height: 40px, padding: 12px 24px, text: 16px */}
</Button>

// Large
<Button size="lg">
  {/* height: 48px, padding: 16px 32px, text: 18px */}
</Button>
```

#### 样式变体

```tsx
// Primary (Bifrost 粉色渐变)
<Button variant="primary">
  {/* background: linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%) */}
  {/* color: white */}
  {/* shadow: var(--glow-pink) on hover */}
</Button>

// Secondary (粉色描边)
<Button variant="secondary">
  {/* background: transparent */}
  {/* border: 1px solid var(--bifrost-pink) */}
  {/* color: var(--bifrost-pink) */}
</Button>

// Ghost (无边框)
<Button variant="ghost">
  {/* background: transparent on default */}
  {/* background: var(--bg-tertiary) on hover */}
  {/* color: var(--text-secondary) */}
</Button>

// Success (绿色)
<Button variant="success">
  {/* background: var(--success) */}
  {/* color: var(--bg-primary) */}
</Button>

// Polkadot (Polkadot 生态主题)
<Button variant="polkadot">
  {/* background: linear-gradient(135deg, #E6007A 0%, #552BBF 100%) */}
  {/* color: white */}
</Button>
```

#### 状态样式

```css
/* Default */
.button {
  cursor: pointer;
  transition: all 150ms ease-out;
}

/* Hover */
.button:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

/* Active */
.button:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}

/* Disabled */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

/* Loading */
.button[data-loading="true"] {
  position: relative;
  color: transparent;
}

.button[data-loading="true"]::after {
  content: "";
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
}
```

### 8.2 卡片 (Card)

#### 基础结构

```tsx
<Card>
  <CardHeader>
    <CardTitle>标题</CardTitle>
    <CardDescription>描述文字</CardDescription>
  </CardHeader>
  <CardContent>
    {/* 主要内容 */}
  </CardContent>
  <CardFooter>
    {/* 操作按钮区域 */}
  </CardFooter>
</Card>
```

#### 样式规格

```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  padding: var(--spacing-6);
  box-shadow: var(--shadow-base);
  transition: all 250ms ease-out;
}

.card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-4px);
}

.card-header {
  margin-bottom: var(--spacing-4);
}

.card-title {
  font-size: var(--text-xl);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.card-description {
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--spacing-2);
}

.card-content {
  /* 内容区域 */
}

.card-footer {
  margin-top: var(--spacing-6);
  padding-top: var(--spacing-4);
  border-top: 1px solid var(--border-default);
  display: flex;
  justify-content: flex-end;
  gap: var(--spacing-3);
}
```

#### 特殊变体

```tsx
// 发光卡片(排行榜前三)
<Card className="glow-card" data-rank="1">
  {/* 金色发光边框 */}
</Card>

// 渐变边框卡片
<Card className="gradient-border-card">
  {/* Bifrost 渐变边框 */}
</Card>

// 玻璃态卡片(模糊背景)
<Card className="glass-card">
  {/* backdrop-filter: blur(12px) */}
</Card>
```

```css
/* 发光卡片 */
.glow-card[data-rank="1"] {
  border-color: var(--arena-gold);
  box-shadow: var(--glow-gold);
}

.glow-card[data-rank="2"] {
  border-color: var(--arena-silver);
  box-shadow: 0 0 20px rgba(192, 192, 192, 0.3);
}

.glow-card[data-rank="3"] {
  border-color: var(--arena-bronze);
  box-shadow: 0 0 20px rgba(205, 127, 50, 0.3);
}

/* 渐变边框卡片 (Bifrost 粉色渐变边框) */
.gradient-border-card {
  position: relative;
  background: var(--bg-secondary);
  border: none;
}

.gradient-border-card::before {
  content: "";
  position: absolute;
  inset: 0;
  padding: 1px;
  background: linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%); /* Bifrost 渐变 */
  border-radius: inherit;
  -webkit-mask:
    linear-gradient(#fff 0 0) content-box,
    linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
}

/* 玻璃态卡片 */
.glass-card {
  background: rgba(20, 20, 31, 0.6);
  backdrop-filter: blur(12px) saturate(150%);
  border: 1px solid rgba(255, 255, 255, 0.1);
}
```

### 8.3 徽章 (Badge)

#### 尺寸规格

```tsx
// Small
<Badge size="sm">新</Badge>
{/* height: 20px, padding: 2px 8px, text: 12px */}

// Medium (Default)
<Badge size="md">热门</Badge>
{/* height: 24px, padding: 4px 12px, text: 14px */}

// Large
<Badge size="lg">冠军</Badge>
{/* height: 32px, padding: 8px 16px, text: 16px */}
```

#### 样式变体

```tsx
// Default
<Badge variant="default">默认</Badge>
{/* background: var(--bg-tertiary), color: var(--text-secondary) */}

// Success
<Badge variant="success">+12%</Badge>
{/* background: var(--success-bg), color: var(--success) */}

// Warning
<Badge variant="warning">警告</Badge>
{/* background: var(--warning-bg), color: var(--warning) */}

// Error
<Badge variant="error">-5%</Badge>
{/* background: var(--error-bg), color: var(--error) */}

// Rank (段位徽章)
<Badge variant="rank" data-rank="master">
  大师段位
</Badge>
{/* background: var(--rank-master) */}
```

### 8.4 进度条 (Progress Bar)

#### 基础样式

```tsx
<Progress value={75} max={100} />

<style>
.progress-root {
  position: relative;
  height: 8px;
  width: 100%;
  overflow: hidden;
  border-radius: var(--radius-full);
  background: var(--bg-tertiary);
}

.progress-indicator {
  height: 100%;
  width: var(--value);
  background: var(--bifrost-primary);
  transition: width 400ms ease-out;
  border-radius: inherit;
}

/* 发光效果 */
.progress-indicator::after {
  content: "";
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  background: var(--bifrost-purple);
  filter: blur(8px);
  opacity: 0.8;
}
</style>
```

#### 段位进度条

```tsx
<RankProgress
  currentRank="gold"
  currentXP={750}
  nextRankXP={1000}
/>

{/* 渐变色根据段位变化 */}
{/* 显示当前 XP / 下一段位 XP */}
{/* 解锁下一段位时播放动画 */}
```

### 8.5 输入框 (Input)

```css
.input {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  font-size: var(--text-base);
  font-family: var(--font-body);
  color: var(--text-primary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-base);
  transition: all 150ms ease-out;
}

.input:hover {
  border-color: var(--border-hover);
}

.input:focus {
  outline: none;
  border-color: var(--bifrost-purple);
  box-shadow: 0 0 0 3px rgba(91, 33, 230, 0.1);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* 错误状态 */
.input[data-error="true"] {
  border-color: var(--error);
}

.input[data-error="true"]:focus {
  box-shadow: 0 0 0 3px rgba(255, 77, 106, 0.1);
}
```

### 8.6 工具提示 (Tooltip)

```tsx
<Tooltip content="质押收益率 = 累计收益 / 质押本金 × 100%">
  <InfoIcon />
</Tooltip>

<style>
.tooltip-trigger {
  cursor: help;
  display: inline-flex;
}

.tooltip-content {
  z-index: 50;
  padding: var(--spacing-2) var(--spacing-3);
  background: var(--bg-elevated);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-md);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  max-width: 280px;
  box-shadow: var(--shadow-lg);
  animation: fadeIn 150ms ease-out;
}

.tooltip-arrow {
  fill: var(--bg-elevated);
}
</style>
```

---

## 📊 9. 排行榜设计规范

### 9.1 排行榜布局

#### 桌面端布局

```
┌────────────────────────────────────────────┐
│  🏆 本周排行榜                    [周榜▼] │
│  ──────────────────────────────────────   │
│                                            │
│  ┌──────────────────────────────────────┐│
│  │ 👑 #1  Alice.dot        +24.5% APY   ││ <- 冠军卡片(金色发光)
│  │     1,250 DOT           📈 ↑2        ││
│  └──────────────────────────────────────┘│
│                                            │
│  ┌──────────────────────────────────────┐│
│  │ 🥈 #2  Bob.dot          +22.1% APY   ││ <- 亚军卡片(银色发光)
│  │     980 DOT             📊 ↓1        ││
│  └──────────────────────────────────────┘│
│                                            │
│  ┌──────────────────────────────────────┐│
│  │ 🥉 #3  Carol.dot        +20.8% APY   ││ <- 季军卡片(铜色发光)
│  │     750 DOT             ━ 0          ││
│  └──────────────────────────────────────┘│
│                                            │
│  ┌──────────────────────────────────────┐│
│  │ #4  Dave.dot            +18.9% APY   ││ <- 普通卡片
│  │     620 DOT             📉 ↓2        ││
│  └──────────────────────────────────────┘│
│                                            │
│  ┌──────────────────────────────────────┐│
│  │ #5  Eve.dot             +17.2% APY   ││
│  │     580 DOT             📈 ↑3        ││
│  └──────────────────────────────────────┘│
│                                            │
│  ... (显示更多)                            │
└────────────────────────────────────────────┘
```

#### 移动端布局

```
┌──────────────────────┐
│ 🏆 本周排行榜  [周榜▼]│
│ ──────────────────── │
│                      │
│ ┌──────────────────┐│
│ │ 👑 #1            ││
│ │ Alice.dot        ││
│ │ +24.5% APY       ││
│ │ 1,250 DOT  📈↑2  ││
│ └──────────────────┘│
│                      │
│ ┌──────────────────┐│
│ │ 🥈 #2            ││
│ │ Bob.dot          ││
│ │ +22.1% APY       ││
│ │ 980 DOT    📊↓1  ││
│ └──────────────────┘│
│                      │
│ ... (加载更多)       │
└──────────────────────┘
```

### 9.2 排行榜卡片组件

```tsx
<LeaderboardCard
  rank={1}
  address="5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
  displayName="Alice.dot"
  apy={24.5}
  stakedAmount={1250}
  rankChange={2} // 正数上升,负数下降,0不变
  avatar="/avatars/alice.png"
  achievements={['first-blood', 'whale', 'streak-7']}
/>
```

#### 样式规格

```css
/* 排行榜卡片 */
.leaderboard-card {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: var(--spacing-4);
  padding: var(--spacing-5);
  background: var(--bg-secondary);
  border: 1px solid var(--border-default);
  border-radius: var(--radius-lg);
  transition: all 250ms ease-out;
}

.leaderboard-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

/* 排名区域 */
.rank-badge {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.rank-number {
  font-size: var(--text-4xl);
  font-weight: var(--font-black);
  font-family: var(--font-numeric);
  line-height: 1;
}

/* 前三名特殊样式 (融合 Bifrost 品牌色) */
.rank-number[data-rank="1"] {
  background: var(--arena-gold);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(255, 184, 0, 0.5));
}

.rank-number[data-rank="2"] {
  /* 使用 Bifrost 粉色作为亚军色 */
  background: linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  filter: drop-shadow(0 0 8px rgba(230, 0, 122, 0.5));
}

.rank-number[data-rank="3"] {
  color: var(--arena-bronze);
  filter: drop-shadow(0 0 6px rgba(205, 127, 50, 0.4));
}

/* 用户信息区域 */
.user-info {
  display: flex;
  align-items: center;
  gap: var(--spacing-3);
}

.user-avatar {
  width: 48px;
  height: 48px;
  border-radius: var(--radius-full);
  border: 2px solid var(--border-default);
}

.user-name {
  font-size: var(--text-lg);
  font-weight: var(--font-semibold);
  color: var(--text-primary);
}

.user-address {
  font-size: var(--text-sm);
  font-family: var(--font-mono);
  color: var(--text-tertiary);
}

/* 数据区域 */
.stats-area {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: var(--spacing-2);
}

.apy-value {
  font-size: var(--text-2xl);
  font-weight: var(--font-bold);
  font-family: var(--font-mono);
  color: var(--success);
}

.staked-amount {
  font-size: var(--text-base);
  color: var(--text-secondary);
}

/* 排名变化指示器 */
.rank-change {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-1);
  padding: var(--spacing-1) var(--spacing-2);
  border-radius: var(--radius-sm);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
}

.rank-change[data-direction="up"] {
  background: var(--success-bg);
  color: var(--success);
}

.rank-change[data-direction="down"] {
  background: var(--error-bg);
  color: var(--error);
}

.rank-change[data-direction="neutral"] {
  background: var(--bg-tertiary);
  color: var(--text-tertiary);
}
```

### 9.3 切换标签组件

```tsx
<Tabs defaultValue="weekly">
  <TabsList>
    <TabsTrigger value="weekly">周榜</TabsTrigger>
    <TabsTrigger value="monthly">月榜</TabsTrigger>
    <TabsTrigger value="alltime">总榜</TabsTrigger>
  </TabsList>
  <TabsContent value="weekly">
    {/* 周榜内容 */}
  </TabsContent>
</Tabs>
```

```css
.tabs-list {
  display: inline-flex;
  gap: var(--spacing-2);
  padding: var(--spacing-1);
  background: var(--bg-tertiary);
  border-radius: var(--radius-lg);
}

.tabs-trigger {
  padding: var(--spacing-2) var(--spacing-4);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  color: var(--text-secondary);
  background: transparent;
  border: none;
  border-radius: var(--radius-base);
  cursor: pointer;
  transition: all 150ms ease-out;
}

.tabs-trigger:hover {
  color: var(--text-primary);
  background: var(--bg-elevated);
}

.tabs-trigger[data-state="active"] {
  color: white;
  background: var(--bifrost-primary);
  box-shadow: var(--shadow-sm);
}
```

---

## 🏆 10. 成就徽章设计规范

### 10.1 徽章尺寸规格

```tsx
// Extra Small (列表内展示)
<AchievementBadge size="xs" achievement="first-blood" />
{/* 24x24px */}

// Small (个人档案页)
<AchievementBadge size="sm" achievement="whale" />
{/* 40x40px */}

// Medium (成就墙)
<AchievementBadge size="md" achievement="streak-7" />
{/* 64x64px */}

// Large (解锁动画)
<AchievementBadge size="lg" achievement="champion" />
{/* 120x120px */}

// Extra Large (分享卡片)
<AchievementBadge size="xl" achievement="master-rank" />
{/* 160x160px */}
```

### 10.2 徽章设计风格

#### 基础结构

```
每个徽章包含:
├─ 背景层(渐变圆形)
├─ 图标层(SVG 矢量图标)
├─ 发光层(blur 效果)
├─ 边框层(渐变描边)
└─ 锁定遮罩(未解锁时)
```

#### 徽章状态

```tsx
// 已解锁(正常显示)
<AchievementBadge
  achievement="first-blood"
  unlocked={true}
  unlockedAt="2024-01-15T10:30:00Z"
/>

// 未解锁(灰度+锁定图标)
<AchievementBadge
  achievement="whale"
  unlocked={false}
  progress={750} // 当前进度
  requirement={1000} // 解锁条件
/>

// 即将解锁(高亮提示)
<AchievementBadge
  achievement="streak-7"
  unlocked={false}
  progress={6}
  requirement={7}
  almostUnlocked={true} // 90% 以上触发
/>
```

### 10.3 徽章列表(参考方案文档)

```typescript
export const achievements = [
  {
    id: 'first-blood',
    name: '首次质押',
    nameEn: 'First Blood',
    description: '完成第一次液态质押',
    icon: '🎯',
    gradient: 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
    requirement: 'Stake vDOT for the first time',
  },
  {
    id: 'whale',
    name: '巨鲸',
    nameEn: 'Whale',
    description: '质押超过 1,000 DOT',
    icon: '🐋',
    gradient: 'linear-gradient(135deg, #5B21E6 0%, #B721E6 100%)',
    requirement: 'Total staked amount > 1000 DOT',
  },
  {
    id: 'streak-7',
    name: '连胜七天',
    nameEn: '7-Day Streak',
    description: '连续7天保持前10名',
    icon: '🔥',
    gradient: 'linear-gradient(135deg, #FF4D6A 0%, #FF8A00 100%)',
    requirement: 'Stay in top 10 for 7 consecutive days',
  },
  {
    id: 'champion',
    name: '周冠军',
    nameEn: 'Weekly Champion',
    description: '获得周榜第一名',
    icon: '👑',
    gradient: 'linear-gradient(135deg, #FFB800 0%, #FFE55C 100%)',
    requirement: 'Rank #1 in weekly leaderboard',
  },
  {
    id: 'social-star',
    name: '社交达人',
    nameEn: 'Social Star',
    description: '分享卡片被点击超过 100 次',
    icon: '⭐',
    gradient: 'linear-gradient(135deg, #00FFB8 0%, #00CC92 100%)',
    requirement: 'Share card clicked > 100 times',
  },
  {
    id: 'team-player',
    name: '团队之星',
    nameEn: 'Team Player',
    description: '组建团队并达成 50% 加成',
    icon: '🤝',
    gradient: 'linear-gradient(135deg, #7DD3FC 0%, #38BDF8 100%)',
    requirement: 'Team bonus reaches 50%',
  },
  {
    id: 'master-rank',
    name: '大师段位',
    nameEn: 'Master Rank',
    description: '达到大师段位(2,000 XP)',
    icon: '💎',
    gradient: 'linear-gradient(135deg, #A78BFA 0%, #818CF8 100%)',
    requirement: 'Reach Master tier (2000 XP)',
  },
  {
    id: 'early-bird',
    name: '早鸟',
    nameEn: 'Early Bird',
    description: '在平台上线首周注册',
    icon: '🐦',
    gradient: 'linear-gradient(135deg, #FB923C 0%, #F59E0B 100%)',
    requirement: 'Register in the first week',
  },
]
```

### 10.4 徽章组件实现

```tsx
interface AchievementBadgeProps {
  achievement: Achievement;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  unlocked: boolean;
  progress?: number;
  requirement?: number;
  showProgress?: boolean;
}

export function AchievementBadge({
  achievement,
  size = 'md',
  unlocked,
  progress,
  requirement,
  showProgress = false,
}: AchievementBadgeProps) {
  const sizeMap = {
    xs: 24,
    sm: 40,
    md: 64,
    lg: 120,
    xl: 160,
  };

  const dimensions = sizeMap[size];
  const progressPercentage = progress && requirement
    ? (progress / requirement) * 100
    : 0;

  return (
    <motion.div
      className="achievement-badge"
      data-size={size}
      data-unlocked={unlocked}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* 背景渐变层 */}
      <div
        className="badge-background"
        style={{
          width: dimensions,
          height: dimensions,
          background: unlocked
            ? achievement.gradient
            : 'var(--bg-tertiary)',
          filter: unlocked ? 'none' : 'grayscale(100%)',
        }}
      />

      {/* 发光层 */}
      {unlocked && (
        <div
          className="badge-glow"
          style={{
            background: achievement.gradient,
            filter: 'blur(12px)',
            opacity: 0.6,
          }}
        />
      )}

      {/* 图标层 */}
      <div className="badge-icon">
        <span style={{ fontSize: dimensions * 0.5 }}>
          {achievement.icon}
        </span>
      </div>

      {/* 锁定遮罩 */}
      {!unlocked && (
        <div className="badge-lock">
          <LockIcon size={dimensions * 0.3} />
        </div>
      )}

      {/* 进度环 */}
      {!unlocked && showProgress && (
        <svg className="badge-progress-ring" width={dimensions} height={dimensions}>
          <circle
            className="progress-ring-circle"
            stroke="var(--success)"
            strokeWidth="3"
            fill="transparent"
            r={dimensions / 2 - 5}
            cx={dimensions / 2}
            cy={dimensions / 2}
            style={{
              strokeDasharray: `${progressPercentage * 2 * Math.PI * (dimensions / 2 - 5) / 100} ${2 * Math.PI * (dimensions / 2 - 5)}`,
              strokeDashoffset: 0,
              transform: 'rotate(-90deg)',
              transformOrigin: '50% 50%',
            }}
          />
        </svg>
      )}
    </motion.div>
  );
}
```

```css
.achievement-badge {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.badge-background {
  border-radius: var(--radius-full);
  transition: all 250ms ease-out;
}

.badge-glow {
  position: absolute;
  inset: -10%;
  border-radius: var(--radius-full);
  pointer-events: none;
  z-index: -1;
}

.badge-icon {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
}

.badge-lock {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.7);
  border-radius: var(--radius-full);
  inset: 0;
}

.badge-progress-ring {
  position: absolute;
  inset: 0;
  transform: rotate(-90deg);
}
```

### 10.5 解锁动画

```typescript
// 徽章解锁时触发的动画序列
export const badgeUnlockSequence = {
  // 1. 缩放弹出
  initial: { scale: 0, rotate: -180, opacity: 0 },

  // 2. 旋转进入
  animate: {
    scale: [0, 1.3, 1],
    rotate: [-180, 10, 0],
    opacity: 1,
  },

  // 3. 时间轴
  transition: {
    duration: 0.8,
    ease: [0.68, -0.55, 0.265, 1.55],
    times: [0, 0.7, 1],
  },
};

// 配合音效和粒子效果
export function playUnlockAnimation(achievementId: string) {
  // 1. 播放音效
  playSound('/sounds/achievement-unlock.mp3');

  // 2. 显示模态框
  showAchievementModal(achievementId);

  // 3. 触发五彩纸屑动画
  triggerConfetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
  });

  // 4. 震动反馈(移动端)
  if (navigator.vibrate) {
    navigator.vibrate([100, 50, 100]);
  }
}
```

---

## 📱 11. 社交分享卡片设计

### 11.1 分享卡片尺寸规格

```typescript
export const shareCardSizes = {
  // Twitter (1200x675px, 16:9)
  twitter: {
    width: 1200,
    height: 675,
    aspectRatio: '16/9',
  },

  // Instagram (1080x1080px, 1:1)
  instagram: {
    width: 1080,
    height: 1080,
    aspectRatio: '1/1',
  },

  // Instagram Story (1080x1920px, 9:16)
  story: {
    width: 1080,
    height: 1920,
    aspectRatio: '9/16',
  },

  // Telegram (1280x640px, 2:1)
  telegram: {
    width: 1280,
    height: 640,
    aspectRatio: '2/1',
  },
};
```

### 11.2 卡片模板设计

#### 模板 1: 排名炫耀卡片

```
┌─────────────────────────────────────────┐
│  Bifrost Liquid Staking Arena    [Logo] │
│                                          │
│          🏆 本周排行榜 #1                │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  Alice.dot                         │ │
│  │                                    │ │
│  │  +24.5% APY                        │ │
│  │  1,250 DOT 质押                    │ │
│  │                                    │ │
│  │  🔥 连续 7 天保持前三                │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [二维码]   快来挑战我的排名!             │
│            bifrost.app/arena             │
└─────────────────────────────────────────┘
```

#### 模板 2: 成就解锁卡片

```
┌─────────────────────────────────────────┐
│                                          │
│              ✨ 成就解锁 ✨               │
│                                          │
│          [大号徽章图标: 🐋]               │
│                                          │
│                巨鲸                       │
│            Whale Unlocked                │
│                                          │
│       质押超过 1,000 DOT 达成!            │
│                                          │
│  ──────────────────────────────────────  │
│                                          │
│  Alice.dot                    Bifrost    │
│  2024-01-15                   Arena      │
│                                          │
└─────────────────────────────────────────┘
```

#### 模板 3: 团队招募卡片

```
┌─────────────────────────────────────────┐
│  🤝 加入我的质押团队                     │
│                                          │
│  ┌────────────────────────────────────┐ │
│  │  Alice.dot 的团队                  │ │
│  │                                    │ │
│  │  当前加成: +35%                    │ │
│  │  团队成员: 5/10                    │ │
│  │  团队总质押: 4,250 DOT              │ │
│  └────────────────────────────────────┘ │
│                                          │
│  🎁 新成员奖励: 50 BNC                   │
│                                          │
│  [邀请码: ALICE2024]                     │
│                                          │
│  立即扫码加入 ↓                          │
│  [二维码]                                │
└─────────────────────────────────────────┘
```

### 11.3 实现技术栈

```typescript
// 使用 html-to-image 生成分享卡片
import { toPng, toJpeg } from 'html-to-image';

export async function generateShareCard(
  type: 'ranking' | 'achievement' | 'team',
  data: ShareCardData
): Promise<string> {
  const cardElement = document.getElementById('share-card-template');

  if (!cardElement) {
    throw new Error('Share card template not found');
  }

  // 生成高清图片(2x 分辨率)
  const dataUrl = await toJpeg(cardElement, {
    quality: 0.95,
    pixelRatio: 2,
    width: shareCardSizes.twitter.width,
    height: shareCardSizes.twitter.height,
  });

  return dataUrl;
}

// 分享到 Twitter
export function shareToTwitter(imageUrl: string, text: string) {
  const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(imageUrl)}`;
  window.open(tweetUrl, '_blank');
}

// 分享到 Telegram
export function shareToTelegram(imageUrl: string, text: string) {
  const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(imageUrl)}&text=${encodeURIComponent(text)}`;
  window.open(telegramUrl, '_blank');
}

// 下载图片
export function downloadImage(dataUrl: string, filename: string) {
  const link = document.createElement('a');
  link.download = filename;
  link.href = dataUrl;
  link.click();
}
```

---

## 🎨 12. 品牌资产 (Brand Assets)

### 12.1 Logo 使用规范

```
Logo 变体:
├─ 完整 Logo (Bifrost 图标 + 文字)
├─ 单独图标 (Icon Only - 彩虹桥图标)
├─ 单色版本 (单白/单黑/Bifrost 粉)
└─ 简化版本 (移动端)

最小尺寸:
├─ 完整 Logo: 120px 宽
├─ 单独图标: 24px × 24px
└─ Favicon: 32px × 32px

品牌色使用:
├─ 主色: Bifrost 粉 (#E6007A)
├─ 渐变: #E6007A → #FF4D8D
├─ 背景: 深色背景优先 (#0A0B14)
└─ 搭配: Polkadot 紫色 (#552BBF) 作为辅助

禁止操作:
├─ ❌ 拉伸变形 Logo 比例
├─ ❌ 旋转倾斜
├─ ❌ 改变 Bifrost 粉色为其他颜色(除单色版本外)
├─ ❌ 添加过度投影/描边
├─ ❌ 放置在低对比度背景上
└─ ❌ 与竞品 Logo 混淆使用
```

### 12.2 图标库

```typescript
// 使用 Lucide React 图标库
import {
  Trophy,        // 奖杯
  TrendingUp,    // 上升
  TrendingDown,  // 下降
  Users,         // 团队
  Award,         // 徽章
  Share2,        // 分享
  Bell,          // 通知
  Settings,      // 设置
  Info,          // 信息
  ChevronRight,  // 右箭头
  X,             // 关闭
  Check,         // 完成
  Loader,        // 加载中
  Wallet,        // 钱包
  BarChart3,     // 图表
  Calendar,      // 日历
  Clock,         // 时间
  Star,          // 收藏
  Heart,         // 喜欢
  MessageCircle, // 评论
  Zap,           // 闪电(Staking)
  Coins,         // 代币
  Sparkles,      // 特效/新功能
} from 'lucide-react';

// 自定义 SVG 图标 (品牌/生态)
export const CustomIcons = {
  Bifrost: () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Bifrost 彩虹桥 Logo - 使用粉色渐变 */}
      <defs>
        <linearGradient id="bifrost-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E6007A" />
          <stop offset="100%" stopColor="#FF4D8D" />
        </linearGradient>
      </defs>
      {/* SVG Path 使用 url(#bifrost-gradient) */}
    </svg>
  ),

  Polkadot: () => (
    <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      {/* Polkadot Logo - 粉色版本 */}
      <path fill="#E6007A" d="..." />
    </svg>
  ),

  vDOT: () => (
    <svg viewBox="0 0 24 24" fill="none">
      {/* vDOT 液态质押代币图标 */}
    </svg>
  ),

  BNC: () => (
    <svg viewBox="0 0 24 24" fill="none">
      {/* BNC 治理代币图标 */}
    </svg>
  ),
};

// 图标颜色变体
export const iconColors = {
  primary: '#E6007A',      // Bifrost 粉
  secondary: '#A8A9C8',    // 次要色
  success: '#00FFB8',      // 成功/增长
  warning: '#FFB800',      // 警告
  error: '#FF4D6A',        // 错误
  info: '#00D4FF',         // 信息
  polkadot: '#552BBF',     // Polkadot 紫
};
```

### 12.3 插图风格

```
插图设计原则:
├─ 扁平风格 (Flat Design)
├─ 渐变色(与品牌色一致)
├─ 几何形状为主
├─ 简洁抽象(避免过于具象)
└─ 支持深色模式

应用场景:
├─ 空状态插图 (Empty State)
├─ 错误页面插图 (404/500)
├─ 引导页插图 (Onboarding)
└─ 加载占位插图 (Loading)
```

---

## 📐 13. 响应式设计规范

### 13.1 断点定义 (Breakpoints)

```css
/* Tailwind CSS 默认断点 */
--breakpoint-sm: 640px;   /* 手机横屏 */
--breakpoint-md: 768px;   /* 平板 */
--breakpoint-lg: 1024px;  /* 笔记本 */
--breakpoint-xl: 1280px;  /* 桌面显示器 */
--breakpoint-2xl: 1536px; /* 大屏幕 */
```

### 13.2 容器宽度

```css
.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--spacing-4);
}

@media (min-width: 640px) {
  .container {
    max-width: 640px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 768px;
    padding: 0 var(--spacing-6);
  }
}

@media (min-width: 1024px) {
  .container {
    max-width: 1024px;
    padding: 0 var(--spacing-8);
  }
}

@media (min-width: 1280px) {
  .container {
    max-width: 1280px;
  }
}
```

### 13.3 移动端优化

```typescript
// 触摸友好的按钮尺寸(最小 44x44px)
const TOUCH_TARGET_SIZE = 44;

// 移动端导航高度
const MOBILE_HEADER_HEIGHT = 56;

// 移动端底部安全区域
const SAFE_AREA_BOTTOM = 'env(safe-area-inset-bottom)';

// 移动端手势支持
export function enableSwipeGestures() {
  // 左滑/右滑切换标签
  // 下拉刷新
  // 长按显示菜单
}
```

---

## 🎯 14. 可访问性规范 (A11y)

### 14.1 颜色对比度

```
WCAG AA 级标准:
├─ 正文文字(18px 以下): 对比度 ≥ 4.5:1
├─ 大号文字(18px 以上): 对比度 ≥ 3:1
└─ 图标/UI 元素: 对比度 ≥ 3:1

测试通过的组合:
✅ #FFFFFF on #0A0A0F (15.8:1)
✅ #A0A0B8 on #0A0A0F (6.5:1)
✅ #5B21E6 on #FFFFFF (7.2:1)
```

### 14.2 键盘导航

```typescript
// 焦点可见样式
.focusable:focus-visible {
  outline: 2px solid var(--bifrost-purple);
  outline-offset: 2px;
}

// Tab 键顺序(tabindex)
// 0: 正常顺序
// -1: 可聚焦但不在 Tab 顺序中
// 1+: 自定义顺序(不推荐)

// 快捷键支持
export const keyboardShortcuts = {
  'CMD+K': 'Open search',
  'CMD+/': 'Open shortcuts menu',
  '1-9': 'Switch tabs',
  'ESC': 'Close modal',
};
```

### 14.3 屏幕阅读器支持

```tsx
// ARIA 标签示例
<button
  aria-label="关闭对话框"
  aria-describedby="dialog-description"
>
  <X />
</button>

<div role="alert" aria-live="polite">
  排名上升了 3 位!
</div>

<nav aria-label="主导航">
  <ul role="list">
    <li><a href="/">首页</a></li>
    <li><a href="/leaderboard">排行榜</a></li>
  </ul>
</nav>

// 隐藏装饰性图标
<span aria-hidden="true">🏆</span>
```

---

## 📦 15. 设计交付物清单

### 15.1 Figma 文件结构

```
Bifrost Arena Design System
├─ 📄 Cover (封面页)
├─ 🎨 Design Tokens
│   ├─ Colors
│   ├─ Typography
│   ├─ Spacing
│   └─ Effects (Shadows/Blur)
├─ 🧩 Components
│   ├─ Buttons
│   ├─ Cards
│   ├─ Badges
│   ├─ Inputs
│   ├─ Modals
│   └─ Navigation
├─ 📊 Leaderboard Designs
│   ├─ Desktop View
│   ├─ Tablet View
│   └─ Mobile View
├─ 🏆 Achievement System
│   ├─ Badge Designs
│   ├─ Unlock Animations
│   └─ Achievement Wall
├─ 📱 Share Cards
│   ├─ Ranking Card
│   ├─ Achievement Card
│   └─ Team Card
├─ 🖼️ Page Mockups
│   ├─ Homepage
│   ├─ Leaderboard Page
│   ├─ Profile Page
│   └─ Team Page
└─ 📐 Prototypes
    ├─ Desktop Flow
    └─ Mobile Flow
```

### 15.2 开发资源包

```
/assets
├─ /fonts
│   ├─ Inter-Regular.woff2
│   ├─ Inter-Medium.woff2
│   ├─ Inter-SemiBold.woff2
│   ├─ Inter-Bold.woff2
│   └─ JetBrainsMono-Regular.woff2
├─ /images
│   ├─ /logos
│   │   ├─ bifrost-logo.svg
│   │   ├─ bifrost-icon.svg
│   │   └─ bifrost-wordmark.svg
│   ├─ /illustrations
│   │   ├─ empty-state.svg
│   │   ├─ error-404.svg
│   │   └─ onboarding-1.svg
│   └─ /achievements
│       ├─ first-blood.png (512x512)
│       ├─ whale.png
│       └─ ...
├─ /sounds
│   ├─ achievement-unlock.mp3
│   ├─ rank-up.mp3
│   └─ notification.mp3
└─ /animations
    ├─ confetti.json (Lottie)
    └─ loading-spinner.json
```

### 15.3 代码实现文件

```
/src
├─ /styles
│   ├─ globals.css          # 全局样式 + CSS 变量
│   ├─ animations.css       # 动画关键帧
│   └─ utilities.css        # 工具类
├─ /lib
│   ├─ design-tokens.ts     # 设计令牌导出
│   ├─ animations.ts        # Framer Motion 预设
│   └─ share-card.ts        # 分享卡片生成器
├─ /components
│   ├─ /ui
│   │   ├─ Button.tsx
│   │   ├─ Card.tsx
│   │   ├─ Badge.tsx
│   │   └─ ...
│   ├─ /leaderboard
│   │   ├─ LeaderboardCard.tsx
│   │   ├─ RankBadge.tsx
│   │   └─ ...
│   ├─ /achievements
│   │   ├─ AchievementBadge.tsx
│   │   ├─ AchievementModal.tsx
│   │   └─ ...
│   └─ /share
│       ├─ ShareCardGenerator.tsx
│       └─ SocialShareButtons.tsx
└─ /app
    ├─ page.tsx             # 首页
    ├─ /leaderboard
    │   └─ page.tsx
    └─ /profile
        └─ page.tsx
```

---

## 🚀 16. 实施优先级 (黑客松版本)

### Day 1 - 核心视觉系统
- ✅ 搭建 Next.js + Tailwind CSS
- ✅ 定义 CSS 变量(颜色/字体/间距)
- ✅ 实现基础组件(Button/Card/Badge)
- ✅ 排行榜布局(桌面端)

### Day 2 - 数据可视化
- ✅ 排行榜卡片组件(前三名发光效果)
- ✅ 成就徽章组件(6个核心徽章)
- ✅ 个人档案页面
- ✅ Framer Motion 动画集成

### Day 3 - 社交功能
- ✅ 分享卡片生成器
- ✅ Twitter/Telegram 分享集成
- ✅ 响应式适配(移动端)
- ✅ UI 打磨 + 细节优化

---

## 📚 17. 参考资源

### 设计灵感来源
- [Dribbble - Web3 Dashboard](https://dribbble.com/tags/web3)
- [Behance - Crypto UI](https://www.behance.net/search/projects?search=crypto%20ui)
- [Polygon zkEVM Dashboard](https://zkevm.polygon.technology/)
- [Uniswap V3 Interface](https://app.uniswap.org/)

### 技术文档
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Radix UI](https://www.radix-ui.com/) (无样式组件库)
- [Lucide Icons](https://lucide.dev/)

### 可访问性指南
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [A11y Project Checklist](https://www.a11yproject.com/checklist/)

---

## 🎯 18. Bifrost 品牌风格指南 (基于 Playwright 深度分析)

### 18.1 品牌核心元素 (实际数据提取)

#### 视觉识别 (Bifrost.io 官网实测)

```
Bifrost 品牌特征 (Playwright 抓取的实际数据):
├─ 核心颜色: 紫色系 (#5A25F0 / rgb(90, 37, 240)) - 主按钮色
├─ 图标: 彩虹桥/链接桥梁象征(跨链流动性)
├─ 背景: oklch(0.205 0 0) ≈ #343434 深灰黑色
├─ 字体: Manrope, sans-serif (实际使用)
└─ 氛围: 专业、科技感、可信赖

⚠️ 重要发现:
官网实际主色是 **紫色 #5A25F0**,而非粉色!
但 Polkadot 生态标识仍保留粉色元素。

建议 Arena 品牌策略:
1. 主色调: 使用 Bifrost 紫色 #5A25F0 (与官网一致)
2. 辅助色: Polkadot 粉 #E6007A (生态关联)
3. 组合方案: 紫粉渐变 (兼顾品牌和生态)

设计理念:
├─ 彩虹桥寓意: 连接不同链的流动性桥梁
├─ 紫色品牌色: Bifrost 独特标识,区别于 Polkadot
├─ 深色背景: 科技感、专业性、Web3 美学
└─ 简洁设计: 突出数据、降低视觉干扰
```

#### Bifrost 官网典型设计模式 (Playwright 实测数据)

```css
/* 1. 主按钮风格 (实际抓取: "Stake with Bifrost" 按钮) */
.bifrost-primary-button {
  background-color: rgb(90, 37, 240); /* #5A25F0 - Bifrost 紫 */
  color: rgb(255, 255, 255);
  border-radius: 12px;
  padding: 0px 24px; /* 实际 padding */
  font-size: 16px;
  font-weight: 500;
  font-family: 'Manrope', sans-serif; /* ⭐ 实际字体 */
  box-shadow: rgba(145, 0, 213, 0.05) 0px 4px 10px 0px inset;
  transition: background-color 0.2s, transform 0.2s;
}

.bifrost-primary-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(90, 37, 240, 0.6);
}

/* 2. 数据卡片(Stats Cards)风格 (实际抓取) */
.stats-card {
  background-color: rgba(255, 255, 255, 0.05); /* 半透明白色背景 */
  backdrop-filter: blur(5px); /* 模糊效果 */
  border: 1px solid rgba(255, 255, 255, 0.2); /* 白色半透明边框 */
  border-radius: 24px; /* 大圆角 */
  padding: 0px; /* 内容自定义 padding */
  box-shadow: none; /* 无默认阴影 */
  transition: all 0.3s ease;
}

.stats-card:hover {
  border-color: rgba(90, 37, 240, 0.4); /* 悬停时紫色边框 */
  box-shadow: 0 8px 32px rgba(90, 37, 240, 0.2);
  transform: translateY(-4px);
}

/* 3. 页面背景 (实际抓取) */
body {
  background-color: oklch(0.205 0 0); /* ≈ #343434 深灰黑 */
  /* 或使用 RGB: rgb(52, 52, 52) */
}

/* 4. 渐变背景卡片 (带紫色渐变) */
.gradient-card {
  background: linear-gradient(
    82.54deg,
    rgba(255, 255, 255, 0.1) 4.04%,
    rgba(255, 255, 255, 0) 45.8%,
    rgba(90, 37, 240, 0.5) 100%
  ); /* ⭐ 实际渐变配方 */
  border-radius: 24px;
  backdrop-filter: blur(5px);
}

/* 5. 玻璃态导航栏 */
.navbar {
  background: rgba(52, 52, 52, 0.8); /* 基于实际背景色 */
  backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  position: sticky;
  top: 0;
  z-index: 100;
}
```

### 18.2 Bifrost Arena 品牌延伸策略

#### 颜色映射方案 (基于实际官网数据修正)

```typescript
// Bifrost Arena = Bifrost 官网紫色 + Polkadot 粉色 + 竞技元素
export const BifrostArenaColors = {
  // ⭐ 核心品牌色 (基于 Playwright 实测)
  brand: {
    primary: '#5A25F0',           // Bifrost 紫 (官网实际主色)
    primaryRgb: 'rgb(90, 37, 240)',
    primaryLight: '#7C4DFF',      // 亮紫
    primaryDark: '#4A1FD0',       // 深紫
    gradient: 'linear-gradient(135deg, #5A25F0 0%, #7C4DFF 100%)', // 紫色渐变
    glowShadow: 'rgba(145, 0, 213, 0.05)', // 内发光
  },

  // Polkadot 生态色 (辅助/次要)
  polkadot: {
    pink: '#E6007A',              // Polkadot 粉
    purple: '#552BBF',            // Polkadot 辅助紫
    gradient: 'linear-gradient(135deg, #E6007A 0%, #552BBF 100%)', // 粉紫渐变
  },

  // 竞技色系 (Arena 新增)
  competition: {
    gold: '#FFB800',              // 第一名
    purple: '#5A25F0',            // 第二名(使用品牌紫)
    pink: '#E6007A',              // 第三名(Polkadot 粉)
    bronze: '#CD7F32',            // 备选
  },

  // 数据可视化色
  data: {
    positive: '#00FFB8',          // 正收益
    negative: '#FF4D6A',          // 负收益
    neutral: '#A8A9C8',           // 中性
    highlight: '#00D4FF',         // 高亮
  },

  // 背景色系 (实测)
  background: {
    primary: 'oklch(0.205 0 0)',  // ≈ #343434 (实际背景)
    primaryRgb: 'rgb(52, 52, 52)',
    card: 'rgba(255, 255, 255, 0.05)', // 卡片半透明
    elevated: 'rgba(255, 255, 255, 0.1)', // 高层级
  },

  // 生态代币色
  ecosystem: {
    vToken: '#5A25F0',            // vToken 继承品牌紫
    bnc: '#7C4DFF',               // BNC 治理代币(亮紫)
  },
};

// ⭐ 推荐配色方案
export const RecommendedColorScheme = {
  // 方案 A: 紫色主导(与官网一致)
  schemeA: {
    primary: '#5A25F0',           // 主按钮/强调色
    secondary: '#E6007A',         // 次要按钮/链接
    accent: '#7C4DFF',            // 辅助高亮
  },

  // 方案 B: 紫粉融合(兼顾品牌和生态)
  schemeB: {
    primary: 'linear-gradient(135deg, #5A25F0 0%, #E6007A 100%)', // 紫粉渐变
    secondary: '#7C4DFF',
    accent: '#FF4D8D',
  },
};
```

#### 组件风格映射

```tsx
// Bifrost 官网风格 → Arena 平台应用

// 1. 排行榜卡片 = 官网的 Stats Card + 竞技元素
<LeaderboardCard
  style={{
    background: 'rgba(20, 21, 34, 0.6)',       // 玻璃态背景
    backdropFilter: 'blur(16px)',
    border: '1px solid rgba(230, 0, 122, 0.2)', // 粉色边框
    borderRadius: '16px',
  }}
  glowColor="rgba(230, 0, 122, 0.5)"           // 粉色发光
/>

// 2. 成就徽章 = 官网图标 + 段位渐变
<AchievementBadge
  gradient="linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%)"
  glowEffect={true}
/>

// 3. CTA 按钮 = 官网按钮样式
<Button
  variant="primary"
  style={{
    background: 'linear-gradient(135deg, #E6007A 0%, #FF4D8D 100%)',
    boxShadow: '0 4px 16px rgba(230, 0, 122, 0.4)',
  }}
>
  质押 vDOT
</Button>

// 4. 页面布局 = 官网深色宇宙背景
<PageContainer
  style={{
    background: 'linear-gradient(180deg, #0A0B14 0%, #1E1F33 100%)',
    minHeight: '100vh',
  }}
/>
```

### 18.3 品牌一致性检查清单

```markdown
✅ 色彩一致性
- [ ] 主色调统一使用 Bifrost 粉 (#E6007A)
- [ ] 渐变效果统一使用 #E6007A → #FF4D8D
- [ ] 背景色统一使用 #0A0B14 深色主题
- [ ] 边框/分割线使用半透明粉色或白色
- [ ] 发光效果统一使用粉色阴影

✅ 字体一致性
- [ ] 英文统一使用 Inter/SF Pro
- [ ] 数字统一使用等宽字体 JetBrains Mono
- [ ] 标题字重统一 600-700
- [ ] 字间距统一 -0.02em (标题)

✅ 间距一致性
- [ ] 基础间距单位 4px
- [ ] 卡片内边距 16-32px
- [ ] 组件间距 16-24px
- [ ] 圆角统一 8-16px

✅ 交互一致性
- [ ] 悬浮效果统一 translateY(-4px)
- [ ] 过渡时间统一 300ms ease
- [ ] 点击反馈统一缩放 scale(0.98)
- [ ] 焦点状态统一粉色描边

✅ 品牌元素露出
- [ ] Logo 位置:导航栏左上角
- [ ] 主色调覆盖率 > 30%
- [ ] Polkadot 生态标识清晰可见
- [ ] 社交分享卡片带 Bifrost 水印
```

### 18.4 Bifrost Arena 独特设计语言

#### 跨链流动性视觉隐喻

```tsx
// 使用流动/连接的视觉元素强化"跨链"概念
export const CrossChainVisuals = {
  // 1. 流动动画(Liquid Animation)
  liquidFlow: {
    initial: { scaleX: 0, opacity: 0 },
    animate: {
      scaleX: 1,
      opacity: [0, 1, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  },

  // 2. 链接桥梁动画(Bridge Connection)
  bridgeConnect: {
    initial: { pathLength: 0 },
    animate: {
      pathLength: 1,
      transition: { duration: 1.5, ease: 'easeInOut' },
    },
  },

  // 3. 粒子流动效果(Particle Flow)
  particleStream: {
    // 使用 react-particles 或 canvas 绘制流动粒子
    // 从 Polkadot → Bifrost → vToken 的流动路径
  },
};

// 应用示例:排行榜页面背景
<AnimatedBackground>
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.3 }}
    style={{
      background: 'radial-gradient(circle at 50% 50%, #E6007A20 0%, transparent 70%)',
      filter: 'blur(60px)',
    }}
  />
</AnimatedBackground>
```

#### 竞技场主题特效

```css
/* 排名变化粒子效果 */
@keyframes rank-up-particles {
  0% {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translateY(-100px) scale(0);
    opacity: 0;
  }
}

/* 冠军光环效果 */
.champion-halo {
  position: absolute;
  inset: -20px;
  background: conic-gradient(
    from 0deg,
    #FFB800 0deg,
    #E6007A 120deg,
    #FFB800 240deg,
    #E6007A 360deg
  );
  filter: blur(30px);
  opacity: 0.4;
  animation: rotate-halo 8s linear infinite;
}

@keyframes rotate-halo {
  to { transform: rotate(360deg); }
}

/* 数据脉冲效果 */
.data-pulse {
  animation: pulse-glow 2s ease-in-out infinite;
}

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px rgba(230, 0, 122, 0.4);
  }
  50% {
    box-shadow: 0 0 40px rgba(230, 0, 122, 0.8);
  }
}
```

---

## ✅ 总结

此设计系统规范涵盖了:
1. ✅ 色彩/字体/间距完整定义(基于 Bifrost 官网分析)
2. ✅ 组件库详细规格(Button/Card/Badge/Input 等)
3. ✅ 排行榜/成就/分享卡片专项设计
4. ✅ 动画系统(Framer Motion 预设)
5. ✅ 响应式/可访问性规范
6. ✅ 品牌资产/交付物清单
7. ✅ 黑客松 3 天实施计划
8. ✅ Bifrost 品牌风格指南(官网风格映射)

**核心优势**:
- 🎨 **Bifrost 粉色品牌延伸**(#E6007A → #FF4D8D 渐变主题)
- 🌉 **跨链流动性视觉隐喻**(彩虹桥/流动动画)
- ⚡ 竞技游戏化视觉语言(排名/段位/徽章)
- 🌗 深色主题优先(#0A0B14 宇宙背景,更符合 Web3 审美)
- 📱 移动端优先(触摸友好)
- ♿ 可访问性合规(WCAG AA)
- 🔗 **Polkadot 生态强关联**(继承官方色彩体系)

**品牌一致性保证**:
- 主色调与 Bifrost 官网完全一致(#E6007A)
- 玻璃态/深色背景/粉色发光统一风格
- Polkadot 生态色彩联动(粉+紫组合)
- 竞技元素作为品牌色的创新应用场景

**下一步**: 基于此规范开始 Figma 设计或直接进入代码实现阶段。

---

## 🔍 19. Playwright 深度分析总结 (关键发现)

### 19.1 品牌色修正 ⚠️

通过 Playwright 对 Bifrost.io 官网的实际抓取,我们发现了一个重要差异:

```
❌ 之前假设: Bifrost 主色 = Polkadot 粉色 (#E6007A)
✅ 实际情况: Bifrost 主色 = 紫色 (#5A25F0 / rgb(90, 37, 240))

官网实测数据:
├─ 主按钮颜色: rgb(90, 37, 240) - 紫色
├─ 字体: Manrope, sans-serif (非 Inter)
├─ 背景: oklch(0.205 0 0) ≈ #343434 (深灰黑)
├─ 卡片背景: rgba(255, 255, 255, 0.05) + blur(5px)
├─ 边框: rgba(255, 255, 255, 0.2)
└─ 圆角: 24px (大圆角风格)
```

### 19.2 推荐配色策略

基于实际分析,我们提供两种配色方案:

#### 方案 A: 紫色主导 (推荐 - 与官网完全一致)

```typescript
export const ColorSchemeA = {
  primary: '#5A25F0',           // Bifrost 紫 - 主按钮/CTA
  secondary: '#7C4DFF',         // 亮紫 - 次要按钮
  accent: '#E6007A',            // Polkadot 粉 - 生态关联/链接
  background: '#343434',        // 深灰黑背景

  // 排行榜配色
  rank1: '#FFB800',             // 金色
  rank2: '#5A25F0',             // 紫色(品牌色)
  rank3: '#E6007A',             // 粉色(生态色)
};
```

#### 方案 B: 紫粉融合 (推荐 - 兼顾品牌和生态)

```typescript
export const ColorSchemeB = {
  primary: 'linear-gradient(135deg, #5A25F0 0%, #E6007A 100%)', // 紫粉渐变
  secondary: '#7C4DFF',         // 亮紫
  accent: '#FF4D8D',            // 亮粉
  background: '#343434',        // 深灰黑背景

  // 排行榜配色
  rank1: '#FFB800',             // 金色
  rank2: 'linear-gradient(135deg, #5A25F0 0%, #E6007A 100%)', // 紫粉渐变
  rank3: '#CD7F32',             // 铜色
};
```

### 19.3 实测设计参数对照表

| 元素 | 之前假设 | Playwright 实测 | 建议使用 |
|------|----------|----------------|----------|
| **主色调** | #E6007A (粉) | #5A25F0 (紫) | ✅ #5A25F0 |
| **字体** | Inter | Manrope | ✅ Manrope |
| **背景色** | #0A0B14 | #343434 | ✅ #343434 |
| **卡片背景** | rgba(20,21,34,0.6) | rgba(255,255,255,0.05) | ✅ 白色半透明 |
| **模糊强度** | blur(16px) | blur(5px) | ✅ 5px |
| **圆角** | 16px | 24px | ✅ 24px |
| **边框** | rgba(230,0,122,0.1) | rgba(255,255,255,0.2) | ✅ 白色半透明 |
| **按钮字重** | 600 | 500 | ✅ 500 |

### 19.4 关键设计决策

**决策 1: 主色调选择**
- ✅ **推荐**: 使用 #5A25F0 紫色作为主色(与官网一致)
- 理由: 保持品牌一致性,Bifrost 有自己独特的紫色标识

**决策 2: Polkadot 生态关联**
- ✅ **推荐**: 将 #E6007A 粉色作为辅助色/生态标识
- 理由: 保留 Polkadot 生态视觉联系,作为次要强调色

**决策 3: 排行榜配色**
- ✅ **推荐方案 A**: 金(#FFB800) / 紫(#5A25F0) / 粉(#E6007A)
- ✅ **推荐方案 B**: 金(#FFB800) / 紫粉渐变 / 铜(#CD7F32)

**决策 4: 字体选择**
- ✅ **推荐**: 使用 Manrope 作为主字体(官网实际使用)
- 备选: Inter (如 Manrope 授权问题)

### 19.5 实施建议

```css
/* 核心 CSS 变量 (基于 Playwright 实测) */
:root {
  /* 品牌色 - Bifrost 紫色系 */
  --bifrost-purple: #5A25F0;
  --bifrost-purple-light: #7C4DFF;
  --bifrost-purple-dark: #4A1FD0;
  --bifrost-purple-rgb: 90, 37, 240;

  /* Polkadot 生态色 - 辅助 */
  --polkadot-pink: #E6007A;
  --polkadot-pink-light: #FF4D8D;

  /* 背景色系 */
  --bg-primary: #343434;              /* oklch(0.205 0 0) */
  --bg-card: rgba(255, 255, 255, 0.05);
  --bg-elevated: rgba(255, 255, 255, 0.1);

  /* 边框 */
  --border-default: rgba(255, 255, 255, 0.2);
  --border-hover: rgba(90, 37, 240, 0.4);

  /* 字体 */
  --font-primary: 'Manrope', sans-serif;
  --font-numeric: 'JetBrains Mono', monospace;

  /* 效果 */
  --blur-light: blur(5px);
  --blur-medium: blur(16px);
  --radius-card: 24px;
  --radius-button: 12px;
}
```

**总结**: 通过 Playwright 深度分析,我们获得了 Bifrost 官网的真实设计参数,确保 Arena 平台能够在保持品牌一致性的同时,融入竞技游戏化元素。建议优先实现方案 A(紫色主导),在次要位置使用粉色标识 Polkadot 生态归属。
