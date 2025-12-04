import asyncio
import pandas as pd
from playwright.async_api import async_playwright
import csv
import os
import random

# Configuration
INPUT_FILE = 'keyword.csv'
OUTPUT_FILE = 'ranking_results.csv'
TARGET_URL = 'https://seocheki.net/site-check.php?u=https%3A%2F%2Fwww.ratatone.com%2F'
CHUNK_SIZE = 1 # Sequential processing
MAX_DAILY_REQUESTS = 180

# List of valid User-Agents for rotation
USER_AGENTS = [
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36',
    'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 13_5) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Safari/605.1.15'
]

async def check_rankings(keywords_chunk, page):
    """
    Checks rankings for a chunk of keywords (max 3).
    """
    try:
        # Navigate to the page
        await page.goto(TARGET_URL)
        
        # Ensure the target URL is filled in the ranking check section
        # The main URL is in url0, but ranking check uses url1.
        # We fill it to be safe.
        target_site = "https://www.ratatone.com/"
        await page.fill('#url1', target_site)

        # Fill keywords
        for i, keyword in enumerate(keywords_chunk):
            await page.fill(f'#word{i+1}', keyword)

        # Click Check button
        # Using the onclick attribute to be specific to the ranking check button
        await page.click('input[onclick="go_rank_check()"]')

        # Wait for results
        # The result div #rank-result is initially display:none.
        # We wait for it to become visible.
        try:
            await page.wait_for_selector('#rank-result', state='visible', timeout=30000)
            
            # Wait for the loading spinner to disappear from the first result
            # The loader is an img with src containing 'ajax-loader'
            # We wait until the cell does NOT contain the loader.
            for _ in range(30): # Wait up to 30 seconds
                content = await page.inner_html('#grank1')
                if 'ajax-loader' not in content:
                    break
                await asyncio.sleep(1)
            
        except Exception as e:
            print(f"Timeout waiting for results for chunk {keywords_chunk}: {e}")
            return [{'keyword': k, 'rank': 'Timeout'} for k in keywords_chunk]

        # Parse results
        results = []
        for i, keyword in enumerate(keywords_chunk):
            rank_id = f'#grank{i+1}'
            try:
                # Get the text content of the Google rank cell
                rank_text = await page.text_content(rank_id)
                rank_text = rank_text.strip() if rank_text else "N/A"
            except:
                rank_text = "Error"
            
            results.append({'keyword': keyword, 'rank': rank_text})

        return results

    except Exception as e:
        print(f"Error checking chunk {keywords_chunk}: {e}")
        return [{'keyword': k, 'rank': 'Error'} for k in keywords_chunk]

async def main():
    # Read keywords
    if not os.path.exists(INPUT_FILE):
        print(f"Error: {INPUT_FILE} not found.")
        return

    # Assuming no header, or we should check. 
    # The user said "keyword.csv" has a list. Let's assume single column.
    try:
        df = pd.read_csv(INPUT_FILE, header=None, names=['keyword'])
        keywords = df['keyword'].tolist()
    except Exception as e:
        print(f"Error reading CSV: {e}")
        return

    results = []
    requests_today = 0

    async with async_playwright() as p:
        # Launch browser once
        browser = await p.chromium.launch(headless=True)
        
        # Chunk keywords
        for i in range(0, len(keywords), CHUNK_SIZE):
            if requests_today >= MAX_DAILY_REQUESTS:
                print(f"Daily limit of {MAX_DAILY_REQUESTS} requests reached. Stopping.")
                break

            chunk = keywords[i:i + CHUNK_SIZE]
            print(f"Checking keywords: {chunk}")
            
            # Rotate User-Agent for each request (or context)
            # Creating a new context for each request ensures clean state and new UA
            user_agent = random.choice(USER_AGENTS)
            context = await browser.new_context(user_agent=user_agent)
            page = await context.new_page()
            
            chunk_results = await check_rankings(chunk, page)
            results.extend(chunk_results)
            
            await context.close()
            requests_today += 1
            
            # Strict random delay between requests (20-60 seconds)
            if i + CHUNK_SIZE < len(keywords): # Don't sleep after the last one
                delay = random.uniform(20, 60)
                print(f"Waiting for {delay:.2f} seconds...")
                await asyncio.sleep(delay)

        await browser.close()

    # Save results
    results_df = pd.DataFrame(results)
    results_df.to_csv(OUTPUT_FILE, index=False)
    print(f"Results saved to {OUTPUT_FILE}")

if __name__ == '__main__':
    asyncio.run(main())
