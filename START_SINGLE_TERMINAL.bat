@echo off
title HS Code Lookup Launcher - Single Terminal (with cp_chatai1 env)

echo 🚀 Starting HS Code Lookup with cp_chatai1 environment in single terminal...
echo.

:: Check if conda is available
conda --version >nul 2>&1 || (echo ❌ Conda not found! Make sure Anaconda/Miniconda is installed. && pause && exit /b 1)

:: Check if the environment exists
conda info --envs | findstr "cp_chatai1" >nul 2>&1 || (echo ❌ Environment 'cp_chatai1' not found! && echo Please create it first with: conda create -n cp_chatai1 python && pause && exit /b 1)

:: Check Node.js
node --version >nul 2>&1 || (echo ❌ Node.js not found! && pause && exit /b 1)

:: Get network IP for extension
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do set "IP=%%a"
set IP=%IP: =%

echo ✅ Requirements OK! Network IP: %IP%
echo 🐍 Using conda environment: cp_chatai1
echo.

echo ===============================================
echo    STARTING SERVICES IN SINGLE TERMINAL
echo ===============================================
echo.

:: Start Backend Server in background (no new window)
echo 📡 Starting Backend Server with cp_chatai1 environment...
echo 🌐 Network IP: %IP%
echo 📱 Extension URL: http://%IP%:1000
echo.

:: Start backend in background without opening new window
start /B conda run -n cp_chatai1 python server.py

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
