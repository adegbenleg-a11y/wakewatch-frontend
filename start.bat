@echo off
title WakeWatch Dev Server - Bitnox Technology Solutions
color 0b
echo ==============================================================================
echo   WakeWatch Development Server
echo   Bitnox Technology Solutions Ltd. - Abeokuta
echo ==============================================================================
echo.

:: Automatically detect the active Node.js runtime
set "NODE_BIN="
for /d %%D in ("%LOCALAPPDATA%\OpenAI\Codex\runtimes\cua_node\*") do (
    if exist "%%D\bin\node.exe" set "NODE_BIN=%%D\bin"
)

if not defined NODE_BIN (
    echo Error: Node.js runtime not found.
    pause
    exit /b 1
)

set "PATH=%NODE_BIN%;%PATH%"
cd /d "C:\Users\HP\.gemini\antigravity\scratch\wakewatch"

echo Node runtime detected: %NODE_BIN%
echo Starting Vite Dev Server on http://localhost:3000...
echo.

:: Wait 2 seconds for Vite to initialize, then launch the browser
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:3000"

:: Start Vite directly with Node
"%NODE_BIN%\node.exe" "node_modules\vite\bin\vite.js" --host 0.0.0.0 --port 3000

pause
