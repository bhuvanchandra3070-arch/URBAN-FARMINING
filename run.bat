@echo off
title CommonGround - Urban Farming Knowledge Hub Launcher
color 0A

echo ========================================================
echo   Starting Urban Farming Community Knowledge Hub
echo ========================================================
echo.

cd /d "%~dp0"

echo [1/3] Starting Spring Boot Backend API (Port 8080)...
start "Urban Farming Backend (Spring Boot)" cmd /k "cd backend && java -jar target\knowledge-hub-0.0.1-SNAPSHOT.jar"

echo [2/3] Starting React + Vite Frontend (Port 5173)...
start "Urban Farming Frontend (React Vite)" cmd /k "cd frontend && npm.cmd run dev"

echo [3/3] Waiting for servers to initialize...
timeout /t 5 /nobreak >nul

echo Opening browser at http://localhost:5173 ...
start http://localhost:5173

echo.
echo ========================================================
echo   All systems running!
echo   - Web UI: http://localhost:5173
echo   - Backend API: http://localhost:8080
echo   - H2 Console: http://localhost:8080/h2-console
echo ========================================================
echo.
pause
