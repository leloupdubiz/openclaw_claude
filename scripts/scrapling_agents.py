#!/usr/bin/env python3
"""
scrapling_agents.py — Wrapper Scrapling pour Clawdbot Prime
Usage : python3 scrapling_agents.py <url>
Scrapling = scraping Python local, gratuit, adaptatif (sites HTML statiques)
"""

from scrapling import Fetcher, AsyncFetcher, StealthyFetcher, PlayWrightFetcher
import sys

def scrape_simple(url: str) -> str:
    """Scrape une page HTML simple (pas de JS)"""
    fetcher = Fetcher(auto_match=False)
    page = fetcher.get(url, stealthy_headers=True)
    return page.get_all_text(separator='\n')

def scrape_js(url: str) -> str:
    """Scrape une page avec JS (utilise PlayWright)"""
    page = PlayWrightFetcher().fetch(url)
    return page.get_all_text(separator='\n')

def scrape_stealthy(url: str) -> str:
    """Scrape avec anti-bot bypass (stealth mode)"""
    page = StealthyFetcher().fetch(url, headless=True, network_idle=True)
    return page.get_all_text(separator='\n')

if __name__ == '__main__':
    url = sys.argv[1] if len(sys.argv) > 1 else 'https://example.com'
    mode = sys.argv[2] if len(sys.argv) > 2 else 'simple'
    if mode == 'js':
        print(scrape_js(url))
    elif mode == 'stealthy':
        print(scrape_stealthy(url))
    else:
        print(scrape_simple(url))
