@echo off
setlocal
title HM Academy - Offline

set "ROOT=%~dp0.."
set "SERVER=%~dp0server.ps1"
set "PORT=8765"

echo.
echo ==========================================
echo        HM Academy - OFFLINE MODE
echo ==========================================
echo.
echo Starting local server...
echo Do NOT close the server window while using the academy.
echo.

start "HM Academy Offline Server" powershell.exe -NoProfile -ExecutionPolicy Bypass -File "%SERVER%" -Root "%ROOT%" -Port %PORT%

timeout /t 2 /nobreak >nul
start "" "http://127.0.0.1:%PORT%/"

echo.
echo HM Academy is open in your browser.
echo Close the "HM Academy Offline Server" window when finished.
echo.
endlocal
