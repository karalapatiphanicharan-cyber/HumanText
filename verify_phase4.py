import asyncio
from playwright.async_api import async_playwright
import os
import subprocess
import time

async def verify_phase4():
    print("Starting Phase 4 Verification...")

    # 1. Start Backend
    backend_proc = subprocess.Popen(
        ["python3", "HumanText/backend/app.py"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    # 2. Start Frontend
    frontend_proc = subprocess.Popen(
        ["npm", "run", "dev", "--", "--port", "3000"],
        cwd="HumanText/frontend",
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE
    )

    # Wait for servers to start
    time.sleep(5)

    try:
        async with async_playwright() as p:
            browser = await p.chromium.launch()
            page = await browser.new_page(viewport={'width': 1280, 'height': 1600})

            await page.goto("http://localhost:3000")
            await page.wait_for_selector("text=HumanText")

            # Create verification folder
            os.makedirs("verification", exist_ok=True)

            # --- TEST 1: MODE SELECTOR ---
            print("Checking Mode Selector...")
            modes = ["Humanize", "Simplify", "Expand", "Shorten", "Grammar Fix"]
            for mode in modes:
                await page.wait_for_selector(f"text={mode}")

            await page.screenshot(path="verification/phase4_initial.png")

            # --- TEST 2: QUICK EXAMPLES ---
            print("Testing Quick Examples...")
            await page.click("text=Simplify Example")
            input_val = await page.locator("textarea").input_value()
            if "The implementation of automated systems" not in input_val:
                raise Exception("Simplify Example failed to fill textarea")

            # --- TEST 3: DYNAMIC BUTTON ---
            print("Checking Dynamic Button...")
            await page.wait_for_selector("text=Simplify Content")

            # --- TEST 4: REWRITE PROCESS (Simplify) ---
            print("Testing Simplify Rewrite...")
            await page.click("text=Simplify Content")

            # Wait for results
            await page.wait_for_selector("text=Transformation Summary", timeout=15000)
            await page.wait_for_selector("text=Simplified for better readability")

            await page.screenshot(path="verification/phase4_simplify_result.png")

            # --- TEST 5: MODE SWITCH (Expand) ---
            print("Testing Expand Mode...")
            await page.click("text=Expand Example")
            await page.click("button:has-text('EXPAND')") # The mode button label is uppercase in the component
            await page.wait_for_selector("text=Expand Content")
            await page.click("text=Expand Content")

            await page.wait_for_selector("text=words added", timeout=15000)
            await page.screenshot(path="verification/phase4_expand_result.png")

            # --- TEST 6: BADGES ---
            print("Checking Selection Badges...")
            await page.wait_for_selector("text=expand")
            await page.wait_for_selector("text=professional")

            print("Verification Successful!")

            await browser.close()

    finally:
        backend_proc.terminate()
        frontend_proc.terminate()

if __name__ == "__main__":
    asyncio.run(verify_phase4())
