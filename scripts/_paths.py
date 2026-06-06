"""
_paths.py — 리뷰 파이프라인 공용 경로 단일 소스(Single Source of Truth)

배경: 원시 저장소 경로가 scrape_reviews.py / restore_reviews_raw.py 에 각각
하드코딩돼 있어, 경로 이전(2026-05 fd65e06) 때 한쪽만 바뀌며 데이터가
빈 위치를 가리켜 전체 리뷰가 덮어써지는 사고가 발생했다.
=> 경로는 반드시 이 파일 한 곳에서만 정의한다.
"""
import os

# 네이버 원시 리뷰 누적 저장소 (스크래퍼의 증분 누적 대상 = 절대 비우면 안 됨)
REVIEWS_PATH = os.path.abspath(r"D:/업체영상/아우름웰니스/aurum_reviews/reviews_raw.json")
