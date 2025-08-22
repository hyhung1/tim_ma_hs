@echo off
title HS Code Lookup Launcher (with cp_chatai1 env)

echo 🚀 Starting HS Code Lookup with cp_chatai1 environment...
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

:: Launch Backend Server in separate terminal with conda environment
echo 📡 Starting Backend Server with cp_chatai1 environment...
start "Backend Server - Port 1000 (cp_chatai1)" cmd /k "title Backend Server - Port 1000 (cp_chatai1) && cd /d "%~dp0" && echo. && echo =============================================== && echo    BACKEND SERVER - PORT 1000 && echo    Environment: cp_chatai1 && echo =============================================== && echo. && echo 🐍 Running with conda environment... && echo 📡 Starting FastAPI server... && echo 🌐 Network IP: %IP% && echo 📱 Extension URL: http://%IP%:1000 && echo. && conda run -n cp_chatai1 python server.py"

:: Launch Frontend Client in separate terminal (no environment needed for Node.js)
echo ⚛️ Starting Frontend Client...
start "Frontend Client - Port 1200" cmd /k "title Frontend Client - Port 1200 && cd /d "%~dp0\client" && echo. && echo =============================================== && echo    FRONTEND CLIENT - PORT 1200 && echo =============================================== && echo. && echo 🌐 Starting React development server... && echo 📱 App URL: http://localhost:1200 && echo. && npm start"

:: Wait for servers to start and auto-open browser
echo ⏳ Launching servers and opening browser...
timeout /t 8 /nobreak >nul

:: Auto-open browser
start http://localhost:1200

echo.
echo ✅ Done! 2 terminals opened:
echo    📡 Backend Server (Port 1000) with cp_chatai1 environment
echo    ⚛️ Frontend Client (Port 1200) 
echo    🌐 Browser opened to http://localhost:1200
echo.
echo This launcher will close automatically...
