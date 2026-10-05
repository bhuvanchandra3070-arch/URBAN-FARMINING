@echo off
title Urban Farming Backend (Spring Boot 3)
color 0B
echo Starting Spring Boot Backend API on http://localhost:8080 ...
cd /d "%~dp0\backend"
java -jar target\knowledge-hub-0.0.1-SNAPSHOT.jar
pause
