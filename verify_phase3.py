import asyncio
from playwright.async_api import async_playwright
import os

async def verify_phase3():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        # Large viewport for side-by-side
        page = await browser.new_page(viewport={"width": 1440, "height": 1080})

        try:
            await page.goto("http://localhost:3000")
            await page.wait_for_selector("text=Current Input Stats")

            # Fill with multiple sentences for analytics
            test_text = "This is the first sentence. This is the second sentence of the test. And here is a third sentence to check if the analytics work correctly. Artificial intelligence is changing the way we write."
            await page.fill("textarea", test_text)

            # Capture initial dashboard with input stats
            await page.screenshot(path="verification/phase3_input.png")
            print("Input stats screenshot taken.")

            # Humanize
            await page.click("text=Humanize Content")
            await page.wait_for_selector("text=Improvement Summary", timeout=10000)

            # Scroll down to see comparison
            await page.evaluate("window.scrollTo(0, 1000)")
            await asyncio.sleep(1)

            # Capture comparison view
            await page.screenshot(path="verification/phase3_comparison.png", full_page=True)
            print("Comparison view screenshot taken.")

            # Verify analytics panels exist
            original_stats = await page.query_selector("text=Input Analytics")
            output_stats = await page.query_selector("text=Output Analytics")

            if original_stats and output_stats:
                print("Analytics panels verified for both sides.")
            else:
                print("Warning: One or more analytics panels missing.")

        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            await browser.close()

if __name__ == "__main__":
    if not os.path.exists("verification"):
        os.makedirs("verification")
    asyncio.run(verify_phase3())
