"""Download images from aurumwellness.co.kr for the new site."""
import asyncio, sys, os
sys.stdout.reconfigure(encoding='utf-8')
from playwright.async_api import async_playwright

SITE = "http://aurumwellness.co.kr"
OUT = "public/images"

async def main():
    async with async_playwright() as pw:
        br = await pw.chromium.launch(headless=True)
        pg = await (await br.new_context(viewport={"width": 1280, "height": 900})).new_page()

        # 1. Main page - get hero/slider images
        print("Getting main page images...")
        await pg.goto(SITE, wait_until="load", timeout=30000)
        await asyncio.sleep(3)

        # Screenshot main hero area
        await pg.screenshot(path=f"{OUT}/hero/main.jpg", full_page=False, type="jpeg", quality=90)
        print("  Saved hero/main.jpg")

        # 2. Therapy page
        print("Getting therapy page...")
        await pg.goto(f"{SITE}/html/sub0101.php", wait_until="load", timeout=30000)
        await asyncio.sleep(2)
        await pg.screenshot(path=f"{OUT}/hero/therapy.jpg", full_page=False, type="jpeg", quality=90)
        print("  Saved hero/therapy.jpg")

        # 3. B2B page
        print("Getting B2B page...")
        await pg.goto(f"{SITE}/html/sub0201.php", wait_until="load", timeout=30000)
        await asyncio.sleep(2)
        await pg.screenshot(path=f"{OUT}/hero/b2b.jpg", full_page=False, type="jpeg", quality=90)
        print("  Saved hero/b2b.jpg")

        # 4. Class page
        print("Getting class page...")
        await pg.goto(f"{SITE}/html/sub0301.php", wait_until="load", timeout=30000)
        await asyncio.sleep(2)
        await pg.screenshot(path=f"{OUT}/hero/class.jpg", full_page=False, type="jpeg", quality=90)
        print("  Saved hero/class.jpg")

        # 5. CTA - use main page scrolled down
        print("Getting CTA background...")
        await pg.goto(f"{SITE}/html/sub0102.php", wait_until="load", timeout=30000)
        await asyncio.sleep(2)
        await pg.screenshot(path=f"{OUT}/hero/cta.jpg", full_page=False, type="jpeg", quality=90)
        print("  Saved hero/cta.jpg")

        # 6. Try to get actual background images from CSS
        await pg.goto(SITE, wait_until="load", timeout=30000)
        await asyncio.sleep(3)
        images = await pg.evaluate("""() => {
            const imgs = [];
            document.querySelectorAll('img').forEach(img => {
                if (img.naturalWidth > 400) {
                    imgs.push({src: img.src, w: img.naturalWidth, h: img.naturalHeight, alt: img.alt});
                }
            });
            // Also check background images
            document.querySelectorAll('[style*="background"]').forEach(el => {
                const bg = el.style.backgroundImage;
                if (bg && bg.includes('url')) {
                    const match = bg.match(/url\\(['"](.*?)['"]\\)/);
                    if (match) imgs.push({src: match[1], w: 0, h: 0, alt: 'bg'});
                }
            });
            return imgs;
        }""")
        print(f"\nFound {len(images)} images on main page:")
        for img in images[:15]:
            print(f"  {img['w']}x{img['h']} {img['alt'][:30]} — {img['src'][:80]}")

        await br.close()
        print("\nDone!")

if __name__ == "__main__":
    asyncio.run(main())
