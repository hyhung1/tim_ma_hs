@echo off
title HS Code Lookup Launcher

echo 🚀 Starting HS Code Lookup in 2 separate terminals...
echo.

:: Quick checks
python --version >nul 2>&1 || (echo ❌ Python not found! && pause && exit /b 1)
node --version >nul 2>&1 || (echo ❌ Node.js not found! && pause && exit /b 1)

:: Get network IP for extension
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /i "IPv4"') do set "IP=%%a"
set IP=%IP: =%

echo ✅ Requirements OK! Network IP: %IP%
echo.

:: Launch Backend Server in separate terminal (no colors)
echo 📡 Starting Backend Server...
start "Backend Server - Port 1000" cmd /k "title Backend Server - Port 1000 && cd /d "%~dp0" && echo. && echo =============================================== && echo    BACKEND SERVER - PORT 1000 && echo =============================================== && echo. && echo 📡 Starting FastAPI server... && echo 🌐 Network IP: %IP% && echo 📱 Extension URL: http://%IP%:1000 && echo. && python server.py"

:: Launch Frontend Client in separate terminal (no colors)
echo ⚛️ Starting Frontend Client...
start "Frontend Client - Port 1200" cmd /k "title Frontend Client - Port 1200 && cd /d "%~dp0\client" && echo. && echo =============================================== && echo    FRONTEND CLIENT - PORT 1200 && echo =============================================== && echo. && echo 🌐 Starting React development server... && echo 📱 App URL: http://localhost:1200 && echo. && npm start"

:: Wait for servers to start and auto-open browser
echo ⏳ Launching servers and opening browser...
timeout /t 6 /nobreak >nul

:: Auto-open browser
start http://localhost:1200

echo.
echo ✅ Done! 2 terminals opened:
echo    📡 Backend Server (Port 1000)
echo    ⚛️ Frontend Client (Port 1200) 
echo    🌐 Browser opened to http://localhost:1200
echo.
echo This launcher will close automatically...