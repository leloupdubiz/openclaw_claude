#!/usr/bin/env node
// get_ai_course.cjs — Extrait les leçons du cours ecomtalent AI
const { chromium } = require('/opt/homebrew/lib/node_modules/playwright');
const fs = require('fs');
const { execSync } = require('child_process');

const COOKIES_FILE = '/Users/pc2/workspace/formations/whop-ecomtalent/scripts/whop_cookies.json';
const KNOWLEDGE_URL = 'https://whop.com/joined/ecomtalent/knowledge-KBhMkENW27qoZB/app/';

function refreshCookies() {
  const code = `
import pycookiecheat, json, time, os
cf = r'${COOKIES_FILE}'
if os.path.exists(cf) and (time.time() - os.path.getmtime(cf)) < 7200:
    import sys; sys.exit(0)
try:
    c = pycookiecheat.chrome_cookies('https://whop.com', browser='Chrome')
    json.dump([{'name':k,'value':v} for k,v in c.items()], open(cf,'w'))
    print(str(len(c))+' cookies refreshed')
except Exception as e:
    print('Cookie error: '+str(e))
`;
  const pyFile = '/tmp/_wc.py';
  fs.writeFileSync(pyFile, code);
  try { execSync('python3 ' + pyFile, { timeout: 15000, stdio: 'inherit' }); } catch(e) {}
}

(async () => {
  refreshCookies();
  let rawCookies = [];
  try { rawCookies = JSON.parse(fs.readFileSync(COOKIES_FILE, 'utf8')); }
  catch(e) { process.stderr.write('No cookies: ' + e.message + '\n'); process.exit(1); }

  const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
  const context = await browser.newContext({
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
  });
  for (const c of rawCookies) {
    try { await context.addCookies([{ name: c.name, value: String(c.value), url: 'https://whop.com' }]); }
    catch {}
  }

  const page = await context.newPage();
  process.stderr.write('Navigating...\n');
  await page.goto(KNOWLEDGE_URL, { waitUntil: 'domcontentloaded', timeout: 30000 });
  await page.waitForTimeout(6000);

  const aiBtn = await page.$('button:has-text("ecomtalent AI")');
  if (aiBtn) {
    process.stderr.write('Clicking AI course button...\n');
    await aiBtn.click();
    await page.waitForTimeout(3000);
  }

  const lessonLinks = await page.$$eval('a[href*="/lessons/"]', links =>
    links.map(l => ({
      href: l.href,
      lessonId: (l.href.match(/lesn_[a-zA-Z0-9]+/) || ['?'])[0],
      courseId: (l.href.match(/cors_[a-zA-Z0-9]+/) || ['?'])[0],
      text: l.textContent.trim().slice(0, 80)
    }))
  );

  const mainCourseId = 'cors_tK36r7j14Fn5Q';
  const aiLessons = lessonLinks.filter(l => l.courseId !== mainCourseId && l.courseId !== '?');
  const allUnique = [...new Map(lessonLinks.map(l => [l.lessonId, l])).values()];

  process.stderr.write('Total links: ' + lessonLinks.length + ', AI only: ' + aiLessons.length + '\n');
  console.log(JSON.stringify({ all_unique: allUnique, ai_only: aiLessons }, null, 2));

  await browser.close();
})().catch(e => { process.stderr.write('ERROR: ' + e.message + '\n'); process.exit(1); });
