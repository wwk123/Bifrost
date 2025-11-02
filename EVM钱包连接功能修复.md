# 🔧 EVM 钱包连接功能修复

## 问题分析

### 用户报告的问题
点击 EVM 标签下的 MetaMask 钱包没有任何反应。

### 根本原因

检查 [src/components/wallet/wallet-button.tsx:204-208](src/components/wallet/wallet-button.tsx#L204-L208) 发现,EVM 钱包的点击事件中只写了 `console.log`,**没有实际调用连接逻辑**:

```typescript
// 之前的代码 ❌
onClick={() => {
  if (isInstalled) {
    // TODO: 集成 EVM 钱包连接逻辑
    console.log(`连接 EVM 钱包: ${walletKey}`);  // 只有 console.log
    // handleConnect(walletKey);  // 被注释掉了
  } else {
    window.open(wallet.downloadUrl, '_blank');
  }
}}
```

这导致:
1. 点击 MetaMask 按钮时只在控制台输出日志
2. 没有触发实际的钱包连接流程
3. 没有弹出 MetaMask 授权窗口
4. 用户看不到任何反馈

## 解决方案

### 1. 导入连接函数

在 [src/components/wallet/wallet-button.tsx:8](src/components/wallet/wallet-button.tsx#L8) 导入 `connectEVMWallet`:

```typescript
import { EVM_WALLETS, isEVMWalletInstalled, connectEVMWallet } from '@/utils/evm-wallet';
```

### 2. 添加 EVM 连接处理函数

在组件中添加专门处理 EVM 钱包连接的函数 ([src/components/wallet/wallet-button.tsx:22-40](src/components/wallet/wallet-button.tsx#L22-L40)):

```typescript
const [isConnectingEVM, setIsConnectingEVM] = useState(false);

const handleEVMConnect = async (walletName: EVMWallet) => {
  setIsConnectingEVM(true);
  try {
    console.log(`开始连接 EVM 钱包: ${walletName}`);
    const accounts = await connectEVMWallet(walletName);
    console.log(`连接成功，账户:`, accounts);

    // TODO: 将账户信息存储到状态管理中
    // 目前先显示成功消息
    alert(`成功连接 ${EVM_WALLETS[walletName].displayName}!\n地址: ${accounts[0].address}`);

    setShowWalletSelector(false);
  } catch (error: any) {
    console.error('连接 EVM 钱包失败:', error);
    alert(`连接失败: ${error.message || '未知错误'}`);
  } finally {
    setIsConnectingEVM(false);
  }
};
```

**功能说明:**
- ✅ 调用 `connectEVMWallet()` 触发钱包连接
- ✅ 显示连接状态 (连接中...)
- ✅ 成功后显示账户地址
- ✅ 错误处理和用户提示
- ✅ 自动关闭钱包选择面板

### 3. 更新点击事件

将 EVM 钱包按钮的点击事件改为调用 `handleEVMConnect`:

```typescript
// 修复后的代码 ✅
onClick={() => {
  if (isInstalled) {
    handleEVMConnect(walletKey);  // 调用实际连接函数
  } else {
    window.open(wallet.downloadUrl, '_blank');
  }
}}
```

### 4. 添加连接状态显示

```typescript
disabled={isConnectingEVM}
className="... disabled:opacity-50 disabled:cursor-not-allowed"

// 状态文本
<p className="text-xs text-text-secondary">
  {isConnectingEVM ? '连接中...' : isInstalled ? '已安装' : '未安装'}
</p>
```

## 工作流程

现在当用户点击 MetaMask 时,完整的流程如下:

```
1. 用户点击 "MetaMask" 按钮
   ↓
2. 触发 handleEVMConnect('metamask')
   ↓
3. 设置 isConnectingEVM = true
   ↓
4. 调用 connectEVMWallet('metamask')
   ↓
5. 检测 window.ethereum.isMetaMask
   ↓
6. 调用 ethereum.request({ method: 'eth_requestAccounts' })
   ↓
7. MetaMask 弹出授权窗口
   ↓
8. 用户在 MetaMask 中点击"连接"
   ↓
9. 返回账户地址数组
   ↓
10. 显示成功提示: "成功连接 MetaMask! 地址: 0x..."
   ↓
11. 关闭钱包选择面板
   ↓
12. 设置 isConnectingEVM = false
```

## 连接函数详情

### connectEVMWallet 函数 ([src/utils/evm-wallet.ts:85-161](src/utils/evm-wallet.ts#L85-L161))

```typescript
export async function connectEVMWallet(walletName: EVMWallet): Promise<WalletAccount[]> {
  if (typeof window === 'undefined') {
    throw new Error('仅在浏览器环境中可用');
  }

  let provider: any;

  try {
    // 根据钱包名称获取对应的 provider
    switch (walletName) {
      case 'metamask':
        if (!(window as any).ethereum?.isMetaMask) {
          throw new Error('未检测到 MetaMask,请先安装');
        }
        provider = (window as any).ethereum;
        break;

      case 'okx':
        provider = (window as any).okxwallet;
        break;

      // ... 其他钱包
    }

    // 请求连接账户
    const accounts = await provider.request({
      method: 'eth_requestAccounts'
    });

    // 转换为统一的 WalletAccount 格式
    return accounts.map((address: string, index: number) => ({
      address,
      name: `Account ${index + 1}`,
      source: walletName,
      type: 'evm' as const
    }));
  } catch (error: any) {
    // 用户拒绝连接
    if (error.code === 4001) {
      throw new Error('用户拒绝连接');
    }
    throw error;
  }
}
```

## 支持的 EVM 钱包

| 钱包 | 检测方式 | 状态 |
|------|---------|------|
| MetaMask | `window.ethereum?.isMetaMask` | ✅ 完全支持 |
| OKX Wallet | `window.okxwallet` | ✅ 完全支持 |
| Gate Wallet | `window.gatewallet` | ✅ 完全支持 |
| Enkrypt | `window.enkrypt?.providers?.ethereum` | ✅ 完全支持 |
| WalletConnect | - | ⚠️ 需要特殊处理 |

## 用户体验改进

### 连接中状态
- ✅ 按钮禁用 (`disabled={isConnectingEVM}`)
- ✅ 显示 "连接中..." 文字
- ✅ 降低透明度 (opacity-50)
- ✅ 鼠标指针变为禁止状态

### 成功提示
```
✅ 成功连接 MetaMask!
   地址: 0x1234...5678
```

### 错误处理
```typescript
// 用户拒绝连接
❌ 连接失败: 用户拒绝连接

// 钱包未安装
❌ 连接失败: 未检测到 MetaMask,请先安装

// 其他错误
❌ 连接失败: [具体错误信息]
```

## 测试步骤

### 测试 MetaMask 连接

1. **确保已安装 MetaMask**
   - Chrome 扩展: https://metamask.io/download/

2. **访问应用**
   ```
   http://localhost:3002
   ```

3. **打开钱包选择面板**
   - 点击 "连接钱包" 按钮

4. **切换到 EVM 标签**
   - 点击 "EVM" 标签

5. **点击 MetaMask**
   - 应该看到状态变为 "连接中..."
   - MetaMask 扩展弹出授权窗口

6. **在 MetaMask 中授权**
   - 点击 "连接" 按钮
   - 应该看到成功提示框
   - 显示连接的账户地址

7. **验证控制台输出**
   ```
   开始连接 EVM 钱包: metamask
   连接成功，账户: [{address: "0x...", name: "Account 1", ...}]
   ```

### 测试未安装钱包的行为

1. 点击未安装的钱包 (如 OKX Wallet)
2. 应该打开该钱包的官方下载页面

### 测试用户拒绝连接

1. 点击 MetaMask
2. 在 MetaMask 弹窗中点击 "取消"
3. 应该看到错误提示: "连接失败: 用户拒绝连接"

## 后续改进计划

### ⚠️ 当前限制

1. **临时状态管理**
   - 连接成功后只显示 alert
   - 账户信息没有持久化
   - 刷新页面后丢失连接状态

2. **需要集成到全局状态**
   ```typescript
   // TODO: 扩展 wallet-provider.tsx
   // 1. 支持 EVM 钱包类型
   // 2. 存储 EVM 账户信息
   // 3. 监听账户变化
   // 4. 持久化连接状态
   ```

### 🎯 下一阶段优化

#### 阶段 1: 状态管理集成 ⏳
- [ ] 扩展 `WalletProvider` 支持 EVM 钱包
- [ ] EVM 账户状态持久化
- [ ] 账户切换功能
- [ ] 断开连接功能

#### 阶段 2: 账户监听 ⏳
- [ ] 监听 MetaMask 账户切换
- [ ] 监听网络切换
- [ ] 自动重连功能
- [ ] 连接状态同步

#### 阶段 3: 高级功能 ⏳
- [ ] WalletConnect 集成
- [ ] 多钱包同时连接
- [ ] 交易签名功能
- [ ] Gas 估算

## 文件修改清单

### 修改的文件

1. **[src/components/wallet/wallet-button.tsx](src/components/wallet/wallet-button.tsx)**
   - 导入 `connectEVMWallet`, `EVMWallet` 类型
   - 添加 `isConnectingEVM` 状态
   - 新增 `handleEVMConnect` 函数
   - 更新 EVM 钱包按钮的点击事件
   - 添加连接中状态显示

### 使用的现有文件

1. **[src/utils/evm-wallet.ts](src/utils/evm-wallet.ts)**
   - `connectEVMWallet()` - 连接函数
   - `isEVMWalletInstalled()` - 检测函数
   - `EVM_WALLETS` - 钱包配置

2. **[src/types/wallet.ts](src/types/wallet.ts)**
   - `WalletType` - 钱包类型
   - `EVMWallet` - EVM 钱包类型
   - `WalletAccount` - 账户接口

## 技术细节

### MetaMask 连接 API

```typescript
// 检测 MetaMask
if (window.ethereum?.isMetaMask) {
  // MetaMask 已安装
}

// 请求连接
const accounts = await window.ethereum.request({
  method: 'eth_requestAccounts'
});

// 返回格式
accounts = ['0x1234...5678', '0xabcd...efgh']
```

### 错误码

| 错误码 | 含义 | 处理方式 |
|--------|------|---------|
| 4001 | 用户拒绝连接 | 显示友好提示 |
| 4100 | 未授权 | 请求授权 |
| 4200 | 不支持的方法 | 检查钱包版本 |
| -32002 | 请求已挂起 | 提示用户查看钱包 |

## 验证成功标志

✅ 点击 MetaMask 按钮后:
1. 按钮显示 "连接中..."
2. MetaMask 扩展弹出授权窗口
3. 授权后显示成功提示框
4. 提示框包含连接的地址
5. 钱包选择面板自动关闭
6. 控制台输出连接日志

## 总结

### 修复前 ❌
- 点击 MetaMask 无反应
- 只有 console.log 输出
- 没有实际连接逻辑

### 修复后 ✅
- 完整的连接流程
- MetaMask 授权弹窗
- 成功/失败提示
- 连接状态显示
- 错误处理

### 当前状态
- ✅ UI 集成完成
- ✅ 连接功能可用
- ✅ 错误处理完善
- ⚠️ 状态管理待集成
- ⚠️ WalletConnect 待实现

**现在 MetaMask 连接功能已经完全可用!** 🎉
