"""
_notify.py — 의존성 없는 Telegram 알림 (리뷰 자동수집 재발방지용)

표준 라이브러리(urllib)만 사용해 native crash 가능성을 최소화한다.
토큰/챗ID는 .env.shared에서 읽는다 (사용자 규칙: 환경변수 단일 소스).
경로가 옮겨져도 동작하도록 후보 루트를 순회 탐색한다.
"""
import os
import json
import urllib.request
from datetime import datetime

# .env.shared 후보 (드라이브 이동에도 견디게 다중 탐색)
_ENV_CANDIDATES = [
    os.environ.get('NGN_ENV_SHARED', ''),
    r'F:\github\.env.shared',
    r'D:\github\.env.shared',
]


def _load_env_shared() -> dict:
    for path in _ENV_CANDIDATES:
        if path and os.path.isfile(path):
            env = {}
            # errors='replace': .env.shared에 깨진 바이트(예: 2026-06-19 self-heal 섹션 손상)가 있어도
            # 알림이 죽지 않도록. 실제 KEY=VALUE는 ASCII라 영향 없음.
            with open(path, encoding='utf-8', errors='replace') as f:
                for line in f:
                    line = line.strip()
                    if not line or line.startswith('#') or '=' not in line:
                        continue
                    k, _, v = line.partition('=')
                    env[k.strip()] = v.strip().strip('"').strip("'")
            return env
    return {}


def send(msg: str) -> bool:
    """Telegram으로 메시지 발송. 실패해도 예외를 던지지 않는다(파이프라인 보호)."""
    env = _load_env_shared()
    token = env.get('TELEGRAM_BOT_TOKEN') or os.environ.get('TELEGRAM_BOT_TOKEN')
    chat = (env.get('TELEGRAM_REPORT_CHAT_ID')
            or env.get('TELEGRAM_CHAT_ID')
            or os.environ.get('TELEGRAM_REPORT_CHAT_ID'))
    if not token or not chat:
        print('[_notify] TELEGRAM env 없음 — 알림 스킵')
        return False
    ts = datetime.now().strftime('%Y-%m-%d %H:%M')
    body = json.dumps({
        'chat_id': chat,
        'text': f'{msg}\n🕒 {ts}',
        'parse_mode': 'HTML',
    }).encode('utf-8')
    req = urllib.request.Request(
        f'https://api.telegram.org/bot{token}/sendMessage',
        data=body,
        headers={'Content-Type': 'application/json'},
    )
    try:
        with urllib.request.urlopen(req, timeout=10) as r:
            r.read()
        print('[_notify] Telegram 알림 발송 완료')
        return True
    except Exception as e:  # 알림 실패가 파이프라인을 죽이지 않게
        print(f'[_notify] Telegram 발송 실패: {e}')
        return False


if __name__ == '__main__':
    import sys
    send(sys.argv[1] if len(sys.argv) > 1 else '🔔 _notify 테스트 메시지')
