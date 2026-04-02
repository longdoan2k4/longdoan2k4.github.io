@echo off
REM === Hugo Build Helper ===
REM This script only builds locally.
REM Deployment is handled by GitHub Actions on push to main.

echo Building Hugo site...
hugo --gc --minify

if errorlevel 1 (
  echo.
  echo Build failed. Please fix errors and run again.
  pause
  exit /b 1
)

echo.
echo Build complete.
echo Deployment step:
echo   1. git add .
echo   2. git commit -m "Update content"
echo   3. git push origin main
echo GitHub Actions will publish from this repository automatically.
pause
