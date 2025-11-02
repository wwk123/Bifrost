#!/bin/bash

# 游戏化功能演示启动脚本

echo "🎮 启动 Bifrost 社交竞赛 - 游戏化功能演示"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 未检测到 Node.js，请先安装"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"

# 检查依赖
if [ ! -d "node_modules" ]; then
    echo "📦 安装依赖..."
    npm install
fi

echo ""
echo "🚀 启动开发服务器..."
echo ""

# 启动服务器
npm run dev &
SERVER_PID=$!

# 等待服务器启动
sleep 5

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✨ 服务器已启动!"
echo ""
echo "📍 演示页面地址:"
echo "   http://localhost:3001/demo/gamification"
echo ""
echo "🎯 功能列表:"
echo "   1. 💸 实时动画反馈系统"
echo "   2. 🎰 每日幸运转盘"
echo "   3. 📢 社交动态流"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "💡 提示:"
echo "   - 点击按钮测试各种动画效果"
echo "   - 尝试转动幸运转盘"
echo "   - 生成模拟社交动态"
echo ""
echo "🛑 按 Ctrl+C 停止服务器"
echo ""

# 尝试自动打开浏览器
if command -v xdg-open &> /dev/null; then
    xdg-open "http://localhost:3001/demo/gamification"
elif command -v open &> /dev/null; then
    open "http://localhost:3001/demo/gamification"
elif command -v start &> /dev/null; then
    start "http://localhost:3001/demo/gamification"
fi

# 等待用户中断
wait $SERVER_PID
