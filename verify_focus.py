import time
from playwright.sync_api import sync_playwright

def test_header_focus_states():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        # Create a new context with reduced motion to minimize animation interference
        context = browser.new_context(viewport={"width": 1280, "height": 720})
        page = context.new_page()

        # Navigate to the local preview server
        print("Navigating to http://localhost:4173")
        page.goto("http://localhost:4173")

        # Wait for the header to be visible
        page.wait_for_selector("header")

        # The header has a language select, data saver button, and theme toggle.
        # Let's focus them one by one.

        # 1. Language Selector
        print("Focusing Language Selector...")
        lang_select = page.locator("select[aria-label='Select Language']")
        lang_select.focus()
        time.sleep(1) # wait for focus styles to settle
        page.screenshot(path="/home/jules/verification/focus_lang_inset.png")

        # 2. Data Saver Toggle
        print("Focusing Data Saver Toggle...")
        data_saver_btn = page.locator("button[aria-label='Toggle Data Saver']").first
        data_saver_btn.focus()
        time.sleep(1)
        page.screenshot(path="/home/jules/verification/focus_data_saver_inset.png")

        # 3. Dark Mode Toggle
        print("Focusing Dark Mode Toggle...")
        dark_mode_btn = page.locator("button[aria-label='Toggle Dark Mode']").first
        dark_mode_btn.focus()
        time.sleep(1)
        page.screenshot(path="/home/jules/verification/focus_dark_mode_inset.png")

        print("Screenshots captured successfully.")
        browser.close()

if __name__ == "__main__":
    import os
    os.makedirs("/home/jules/verification", exist_ok=True)
    test_header_focus_states()
