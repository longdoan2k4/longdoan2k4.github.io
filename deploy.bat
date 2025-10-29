@echo off
REM === Hugo Auto Deploy Script ===
REM Author: ChatGPT (for LongDoan)
REM Blog: DoanDucLong - Hugo Reimu Theme

echo 🚀 Building Hugo site...
hugo -D

echo.
echo ✅ Build complete. Deploying to GitHub...

cd public
git add .
git commit -m "Deploy blog"
git push origin main

cd ..
echo.
echo 🎉 Blog deployed successfully!
echo 🌍 Check it here: https://longdoan2k4.github.io/
pause
