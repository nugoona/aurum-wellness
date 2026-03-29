"""
리뷰 자동 수집 + 분류 + 배포 오케스트레이터
1. scrape_reviews.py  → 새 리뷰 수집
2. categorize_reviews.py → reviewData.ts 생성
3. 변경 감지 → git commit + push (변경 없으면 스킵)

Usage:
  python update_reviews.py
"""
import os
import sys
import subprocess
from datetime import datetime

SCRIPTS_DIR = os.path.dirname(os.path.abspath(__file__))
REPO_DIR = os.path.dirname(SCRIPTS_DIR)
REVIEW_DATA_PATH = os.path.join(REPO_DIR, 'src', 'data', 'reviewData.ts')
LOG_FILE = os.path.join(SCRIPTS_DIR, 'update_reviews.log')


def log(msg: str):
    ts = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{ts}] {msg}"
    print(line)
    with open(LOG_FILE, 'a', encoding='utf-8') as f:
        f.write(line + '\n')


def run_script(name: str) -> bool:
    path = os.path.join(SCRIPTS_DIR, name)
    log(f"Running {name}...")
    result = subprocess.run(
        [sys.executable, path],
        cwd=SCRIPTS_DIR,
        capture_output=True,
        text=True,
        encoding='utf-8',
    )
    if result.stdout:
        for line in result.stdout.strip().split('\n'):
            log(f"  {line}")
    if result.returncode != 0:
        log(f"  [ERROR] {name} failed (exit {result.returncode})")
        if result.stderr:
            for line in result.stderr.strip().split('\n'):
                log(f"  stderr: {line}")
        return False
    return True


def git_has_changes() -> bool:
    result = subprocess.run(
        ['git', 'diff', '--name-only', '--', 'src/data/reviewData.ts'],
        cwd=REPO_DIR,
        capture_output=True,
        text=True,
    )
    return bool(result.stdout.strip())


def git_push():
    subprocess.run(
        ['git', 'add', 'src/data/reviewData.ts'],
        cwd=REPO_DIR,
        check=True,
    )

    now = datetime.now().strftime('%Y-%m-%d %H:%M')
    subprocess.run(
        ['git', 'commit', '-m', f'chore: update review data ({now})'],
        cwd=REPO_DIR,
        check=True,
    )

    result = subprocess.run(
        ['git', 'push'],
        cwd=REPO_DIR,
        capture_output=True,
        text=True,
    )
    if result.returncode != 0:
        log(f"  [ERROR] git push failed: {result.stderr}")
        return False
    return True


def main():
    sys.stdout.reconfigure(encoding='utf-8')
    sys.stderr.reconfigure(encoding='utf-8')

    log("=" * 50)
    log("Review update pipeline started")

    # Step 1: Scrape new reviews
    if not run_script('scrape_reviews.py'):
        log("Scraping failed, aborting.")
        return 1

    # Step 2: Categorize and generate reviewData.ts
    if not run_script('categorize_reviews.py'):
        log("Categorization failed, aborting.")
        return 1

    # Step 3: Check for changes and push
    if git_has_changes():
        log("reviewData.ts changed, pushing to remote...")
        if git_push():
            log("Pushed successfully. Vercel will auto-deploy.")
        else:
            log("Push failed.")
            return 1
    else:
        log("No changes to reviewData.ts. Nothing to push.")

    log("Pipeline complete.")
    return 0


if __name__ == '__main__':
    sys.exit(main())
