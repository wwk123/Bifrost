# Bifrost 社交化收益竞赛平台

结合 Bifrost 液态质押数据、竞技化交互与社交传播能力的前端 Demo，实现收益排行榜、成就勋章、策略共创、挑战任务等核心模块，为黑客松提交提供可演示的产品体验。

## ✨ 核心特性
- **收益排行榜**：支持按周/月/季度切换，展示前排选手卡片及完整榜单，突出当前用户追赶目标。
- **成就与段位**：成就勋章列表展示解锁状态、奖励与进度条，英雄区同步段位积分进度。
- **策略共创广场**：列出热门策略卡片，含风险标签、收益表现、复制/讨论操作，并记录选中策略状态。
- **挑战与推荐**：每周挑战与推荐激励模块展现奖励、进度与行动按钮，辅助引导用户完成任务。
- **分享卡片**：可在多套模板间切换，实时预览社交炫耀卡片并保留用户选择。
- **数据可视化**：通过 Recharts 呈现收益趋势与基准对比，支撑数据驱动的叙事。

## 🛠️ 技术栈
- **框架**：Next.js 14（App Router）+ TypeScript
- **样式**：TailwindCSS、自定义设计 Token
- **状态管理**：Zustand（含 LocalStorage 持久化）
- **数据请求**：TanStack Query + Mock 数据服务
- **动画 & 图表**：Framer Motion、Recharts
- **测试**：Vitest + Testing Library

## 📦 本地开发
```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
# 浏览器访问 http://localhost:3000

# 代码质量检查
npm run lint

# 运行单元测试
npm run test
```

如需自定义环境变量，可复制 `.env.example` 到 `.env.local` 并填写实际值。

## 📁 目录结构
```
app/                       // Next.js App Router 页面
  layout.tsx               // 全局布局与 Provider 挂载
  page.tsx                 // 主控制台视图
  globals.css              // Tailwind 基础样式 & 全局皮肤
src/
  components/dashboard/    // 仪表盘模块化组件
  data/                    // Mock 数据与异步封装
  providers/               // 全局状态、Query Provider
  state/                   // Zustand store
  utils/                   // 工具函数与格式化逻辑
``` 

## ✅ 验证
| 命令 | 说明 | 状态 |
| --- | --- | --- |
| `npm run lint` | ESLint 规则检查 | ✅ 已通过 |
| `npm run test` | Vitest 单元测试 | ✅ 已通过 |

## 📄 后续扩展建议
1. 接入真实的 Bifrost/SubQuery API，替换当前 Mock 数据。
2. 增加钱包连接与链上交易签名流程。
3. 生成分享卡片图片（结合 `html-to-image` 或服务器端渲染）。
4. 引入国际化与可访问性检查。

---
如需进一步优化或扩展，请参考 `.agentdocs/workflow/251029-social-reward-competition.md` 中的阶段记录。
