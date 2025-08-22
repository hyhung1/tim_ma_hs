@echo off
title HS Code Lookup Launcher - Single Terminal (No Environment)

echo 🚀 Starting HS Code Lookup in single terminal (no environment)...
echo.

:: Quick checks
python --version >nul 2>&1 || (echo ❌ Python not found! && pause && exit /b 1)
node --version >nul 2>&1 || (echo ❌ Node.js not found! && pause && exit /b 1)

:: Get network IP for extension
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do set "IP=%%a"
set IP=%IP: =%

echo ✅ Requirements OK! Network IP: %IP%
echo.

echo ===============================================
echo    STARTING SERVICES IN SINGLE TERMINAL
echo ===============================================
echo.

:: Start Backend Server in background (no new window)
echo 📡 Starting Backend Server...
echo 🌐 Network IP: %IP%
echo 📱 Extension URL: http://%IP%:1000
echo.

:: Start backend in background without opening new window
start /B python server.py

:: Wait a moment for backend to start
timeout /t 3 /nobreak >nul

:: Start Frontend Client in current terminal
echo ⚛️ Starting Frontend Client...
echo 📱 App URL: http://localhost:1200
echo.
cd client

:: Wait for backend to fully start and auto-open browser
echo ⏳ Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul
start http://localhost:1200

echo.
echo 🌐 Starting React development server...
echo 📝 Press Ctrl+C to stop both services
echo.

:: Run frontend in current terminal (this will block until stopped)
npm start

:: When npm start is stopped, this will run
echo.
echo 🛑 Services stopped.
pause
