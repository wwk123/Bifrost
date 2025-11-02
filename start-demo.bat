@echo off
chcp 65001 >nul
cls

echo 🎮 启动 Bifrost 社交竞赛 - 游戏化功能演示
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.

REM 检查 Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ 未检测到 Node.js，请先安装
    pause
    exit /b 1
)

echo ✅ Node.js 已安装
echo.

REM 检查依赖
if not exist "node_modules\" (
    echo 📦 安装依赖...
    call npm install
)

echo 🚀 启动开发服务器...
echo.
start /b npm run dev

REM 等待服务器启动
timeout /t 5 /nobreak >nul

echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo ✨ 服务器已启动!
echo.
echo 📍 演示页面地址:
echo    http://localhost:3001/demo/gamification
echo.
echo 🎯 功能列表:
echo    1. 💸 实时动画反馈系统
echo    2. 🎰 每日幸运转盘
echo    3. 📢 社交动态流
echo.
echo ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
echo.
echo 💡 提示:
echo    - 点击按钮测试各种动画效果
echo    - 尝试转动幸运转盘
echo    - 生成模拟社交动态
echo.
echo 🌐 正在打开浏览器...
echo.

REM 打开浏览器
start http://localhost:3001/demo/gamification

echo 🛑 按任意键关闭服务器...
pause >nul

REM 关闭 Node.js 进程
taskkill /f /im node.exe >nul 2>nul
