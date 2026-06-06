@echo off
REM ============================================================
REM  run_review_update.bat
REM  ReviewAutoUpdate2 작업이 호출하는 외곽 래퍼.
REM  - update_reviews.py 실행
REM  - 비정상 종료(ERRORLEVEL != 0) 시 Telegram 알림 (이중 안전망 outer layer)
REM    : 파이썬이 자체 알림조차 못 보내고 죽는 native crash 대비.
REM  스크립트 위치 기준으로 동작 → 레포가 옮겨가도 래퍼 경유로 견고.
REM ============================================================
setlocal
cd /d "%~dp0"

set "PY=C:\Users\oscar\AppData\Local\Programs\Python\Python314\python.exe"
if not exist "%PY%" set "PY=python"

"%PY%" update_reviews.py
set "RC=%ERRORLEVEL%"

if not "%RC%"=="0" (
  echo [run_review_update] update_reviews.py exited with %RC%
  "%PY%" _notify.py "[ALERT] Aurume review pipeline wrapper caught nonzero exit (code %RC%). Check aurum/scripts/update_reviews.log"
)

endlocal & exit /b %RC%
