"""Download images from aurumwellness.co.kr via Playwright browser context (bypass 403)."""
import asyncio, sys, os, re
from urllib.parse import urljoin, urlparse
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

SITE = "http://aurumwellness.co.kr"
OUT = "public/images"

# Images we want to capture, organized by category
TARGETS = {
    # Hero / Main visuals
    "hero": [
        # Main page hero & sections
        "/images/vis.jpg",          # Main visual banner
        "/images/main1_bg.jpg",     # Brand story background
        "/images/main3_bg.jpg",     # Section background
        "/images/main4_1.jpg",      # Therapy intro
        "/images/main4_2.jpg",      # B2B intro
        "/images/main4_3.jpg",      # Class intro
        "/images/main4_4.jpg",      # Additional
        "/images/main6_1.jpg",      # Representative section
        "/images/main6_2.jpg",      # Representative section 2
        "/images/main8_1.jpg",      # Gallery
        "/images/main8_2.jpg",
        "/images/main8_3.jpg",
        "/images/main8_4.jpg",
        "/images/main8_5.jpg",
        "/images/main8_6.jpg",
        "/images/main2_1.jpg",      # Portfolio carousel
        "/images/main2_2.jpg",
        "/images/main2_3.jpg",
        "/images/main2_4.jpg",
        "/images/main2_5.jpg",
        "/images/main2_6.jpg",
        "/images/main2_9.jpg",
        "/images/main2_10.jpg",
        "/images/main2_11.jpg",
        "/images/main2_12.jpg",
        "/images/main2_13.jpg",
        "/images/main2_14.jpg",
        "/images/main7_1.jpg",      # Instagram feed
        "/images/main7_2.jpg",
        "/images/main7_3.jpg",
        "/images/main7_4.jpg",
        "/images/main5_bg.png",     # CTA background
        "/images/logo.svg",         # Logo dark
        "/images/logo2.svg",        # Logo light
        "/images/logo3.svg",        # Logo variant
        "/images/sub_vis01.jpg",    # Sub-page hero 1
        "/images/sub_vis02.jpg",    # Sub-page hero 2
        "/images/sub_vis03.jpg",    # Sub-page hero 3
    ],
    # Therapy page images
    "therapy": [
        "/images/sub0101_store1.jpg",
        "/images/sub0101_store2.jpg",
        "/images/sub0101_store3.jpg",
        "/images/sub0101_store4.jpg",
        "/images/sub0101_store5.jpg",
        "/images/sub0101_store6.jpg",
        "/images/sub0101_17.jpg",    # Representative photo
        "/images/sub0101_5.jpg",     # Credentials / certs
        "/images/sub0101_6.jpg",
        "/images/sub0101_7.jpg",     # Feature images
        "/images/sub0101_8.jpg",
        "/images/sub0101_9.jpg",
        "/images/sub0101_10.jpg",
        "/images/sub0101_bg1.jpg",   # Section backgrounds
        "/images/sub0101_bg2.jpg",
        "/images/sub0101_bg3.jpg",
        "/images/sub010201_1.jpg",   # Program images
        "/images/sub010201_2.jpg",
        "/images/sub010201_3.jpg",
        "/images/sub010201_4.jpg",
        "/images/sub010201_5.jpg",
    ],
    # B2B page images
    "b2b": [
        "/images/sub0201_1.png",     # B2B main
        "/images/sub0201_2.jpg",     # B2B background
        "/images/sub0201_3.jpg",     # B2B services
        "/images/sub0201_4.jpg",
        "/images/sub0201_8.jpg",     # B2B intro bg
        "/images/sub0202_1.jpg",     # Service images
        "/images/sub0202_2.jpg",
        "/images/sub0202_3.jpg",
        "/images/sub0202_4.jpg",
        "/images/sub0202_5.jpg",
        "/images/sub0202_6.jpg",
    ],
    # Class page images
    "class": [
        "/images/sub0301_2.png",     # Teacher/instructor
        "/images/sub0301_3.jpg",     # Portfolio
        "/images/sub0301_3.png",     # Teacher bg
        "/images/sub0301_4.jpg",
        "/images/sub0301_5.jpg",
        "/images/sub0301_6.jpg",
        "/images/sub0301_7.jpg",
        "/images/sub0301_8.jpg",
        "/images/sub0301_9.jpg",
        "/images/sub0301_10.jpg",
        "/images/sub0301_11.jpg",
        "/images/sub0301_12.jpg",
        "/images/sub0301_13.jpg",
        "/images/sub0301_14.jpg",
        "/images/sub030301_1.jpg",   # Class program
    ],
    # Client logos
    "logos": [
        f"/images/main9_{i}.jpg" for i in range(2, 40)
    ],
}


async def main():
    for folder in ["hero", "therapy", "b2b", "class", "logos"]:
        os.makedirs(f"{OUT}/{folder}", exist_ok=True)

    captured = {}

    async with async_playwright() as pw:
        br = await pw.chromium.launch(headless=True)
        ctx = await br.new_context(
            viewport={"width": 1280, "height": 900},
            extra_http_headers={
                "Referer": SITE + "/",
                "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            }
        )

        # Intercept all responses and save image data
        async def handle_response(response):
            url = response.url
            if "/images/" in url and response.status == 200:
                try:
                    body = await response.body()
                    if len(body) > 1000:  # Skip tiny images
                        path = urlparse(url).path
                        captured[path] = body
                except Exception:
                    pass

        pg = await ctx.new_page()
        pg.on("response", handle_response)

        # Visit all pages to trigger image loading
        pages_to_visit = [
            SITE,
            f"{SITE}/html/sub0101.php",
            f"{SITE}/html/sub0102.php",
            f"{SITE}/html/sub0201.php",
            f"{SITE}/html/sub0202.php",
            f"{SITE}/html/sub0301.php",
            f"{SITE}/html/sub0302.php",
        ]

        for page_url in pages_to_visit:
            name = page_url.split("/")[-1] or "main"
            print(f"Visiting {name}...")
            try:
                await pg.goto(page_url, wait_until="networkidle", timeout=30000)
                # Scroll down to load lazy images
                await pg.evaluate("""async () => {
                    const delay = ms => new Promise(r => setTimeout(r, ms));
                    for (let i = 0; i < document.body.scrollHeight; i += 300) {
                        window.scrollTo(0, i);
                        await delay(100);
                    }
                    window.scrollTo(0, 0);
                }""")
                await asyncio.sleep(2)
            except Exception as e:
                print(f"  Error: {e}")

        await br.close()

    print(f"\nCaptured {len(captured)} images from browser")

    # Save captured images
    count = 0
    for category, paths in TARGETS.items():
        for img_path in paths:
            if img_path in captured:
                filename = img_path.split("/")[-1]
                out_path = f"{OUT}/{category}/{filename}"
                os.makedirs(os.path.dirname(out_path), exist_ok=True)
                with open(out_path, "wb") as f:
                    f.write(captured[img_path])
                size_kb = len(captured[img_path]) / 1024
                print(f"  OK {size_kb:.0f}KB -> {out_path}")
                count += 1
            else:
                print(f"  MISS {img_path}")

    # Also save any uncategorized captures
    saved_paths = set()
    for paths in TARGETS.values():
        saved_paths.update(paths)

    extra = 0
    for path, body in captured.items():
        if path not in saved_paths:
            filename = path.split("/")[-1]
            out_path = f"{OUT}/extra/{filename}"
            os.makedirs(os.path.dirname(out_path), exist_ok=True)
            with open(out_path, "wb") as f:
                f.write(body)
            extra += 1

    print(f"\nDone! Saved {count} categorized + {extra} extra images")

if __name__ == "__main__":
    asyncio.run(main())
