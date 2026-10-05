@echo off
title Push Urban Farming Hub to GitHub
color 0A

echo ========================================================
echo    Push Urban Farming Knowledge Hub to GitHub
echo ========================================================
echo.

set "PATH=C:\Users\bhuva\AppData\Local\github-copilot-git-2.53.0-4\cmd;%PATH%"

cd /d "%~dp0"

echo Current Git Status:
git status -s
echo.

set /p REPO_URL="Enter your GitHub Repository URL (e.g. https://github.com/YOUR_USERNAME/YOUR_REPO.git): "

if "%REPO_URL%"=="" (
    echo.
    echo [ERROR] No GitHub URL provided. Exiting...
    pause
    exit /b
)

echo.
echo [1/3] Setting remote origin...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%

echo [2/3] Setting branch to main...
git branch -M main

echo [3/3] Pushing code to GitHub...
git push -u origin main

if %ERRORLEVEL% equ 0 (
    echo.
    echo ========================================================
    echo    SUCCESS! Your code has been pushed to GitHub!
    echo ========================================================
) else (
    echo.
    echo ========================================================
    echo   [NOTE] If authentication is required, sign in through
    echo   the browser popup or Git Credential Manager.
    echo ========================================================
)

echo.
pause
