/**
 * ADSPY PRO — Content Script
 * Injects "Save to ADSPY PRO" buttons on:
 * - Facebook Ad Library
 * - TikTok Ad Library
 */

const SOURCE = detectSource();
let _boards = [];
let _saveButtonsAdded = new WeakSet();

function detectSource() {
  const url = window.location.href;
  if (url.includes('facebook.com/ads/library')) return 'facebook';
  if (url.includes('library.tiktok.com') || url.includes('tiktok.com/business/creativecenter')) return 'tiktok';
  if (url.includes('instagram.com')) return 'instagram';
  return 'unknown';
}

// Load boards from background
chrome.runtime.sendMessage({ type: 'GET_BOARDS' }, (response) => {
  _boards = response?.boards || [];
});

// Observer to detect new ad cards
const observer = new MutationObserver(() => {
  if (SOURCE === 'facebook') injectFacebookButtons();
  if (SOURCE === 'tiktok') injectTikTokButtons();
});

observer.observe(document.body, { childList: true, subtree: true });

// Initial injection
setTimeout(() => {
  if (SOURCE === 'facebook') injectFacebookButtons();
  if (SOURCE === 'tiktok') injectTikTokButtons();
}, 2000);

// ============================================================
// FACEBOOK AD LIBRARY
// ============================================================
function injectFacebookButtons() {
  // Facebook Ad Library card selector (updates with FB changes)
  const selectors = [
    '[data-testid="ad_library_ad_preview"]',
    'div[class*="_8lm5"]',  // common FB ad card class
    'div[class*="x1cy8zhl"]',
    '.adLibraryAdCard',
  ];
  
  let cards = [];
  for (const sel of selectors) {
    cards = document.querySelectorAll(sel);
    if (cards.length > 0) break;
  }
  
  // Fallback: look for elements containing "Sponsored" text + creative
  if (cards.length === 0) {
    // Try to find ad containers by structure
    const allDivs = document.querySelectorAll('div[data-ad-id], div[data-pageid]');
    cards = allDivs;
  }

  cards.forEach(card => {
    if (_saveButtonsAdded.has(card)) return;
    _saveButtonsAdded.add(card);
    
    const btn = createSaveButton('facebook', card);
    try {
      card.style.position = 'relative';
      card.appendChild(btn);
    } catch(e) {}
  });
  
  // Also inject on ad preview modals
  injectOnFBAdCards();
}

function injectOnFBAdCards() {
  // More specific: look for "See ad details" links and inject near them
  document.querySelectorAll('a[href*="ads/library"]').forEach(link => {
    const card = link.closest('div[class]');
    if (!card || _saveButtonsAdded.has(card)) return;
    _saveButtonsAdded.add(card);
    const btn = createSaveButton('facebook', card);
    try { card.appendChild(btn); } catch(e) {}
  });
}

// ============================================================
// TIKTOK AD LIBRARY
// ============================================================
function injectTikTokButtons() {
  const selectors = [
    '.creative-card',
    '.ad-card',
    '[class*="creative-card"]',
    '[class*="AdCard"]',
    '.cc-ad-item',
  ];
  
  let cards = [];
  for (const sel of selectors) {
    cards = document.querySelectorAll(sel);
    if (cards.length > 0) break;
  }
  
  cards.forEach(card => {
    if (_saveButtonsAdded.has(card)) return;
    _saveButtonsAdded.add(card);
    const btn = createSaveButton('tiktok', card);
    try {
      card.style.position = 'relative';
      card.appendChild(btn);
    } catch(e) {}
  });
}

// ============================================================
// CREATE SAVE BUTTON
// ============================================================
function createSaveButton(source, card) {
  const wrapper = document.createElement('div');
  wrapper.className = 'adspy-save-wrapper';
  wrapper.innerHTML = `
    <button class="adspy-save-btn" title="Sauvegarder dans ADSPY PRO">
      🔭 Save
    </button>
    <div class="adspy-dropdown" style="display:none">
      <div class="adspy-dropdown-header">Sauvegarder dans :</div>
      ${_boards.map(b => `<div class="adspy-board-item" data-board-id="${b._id}">${b.emoji} ${b.name}</div>`).join('')}
      <div class="adspy-board-item adspy-board-item--new" data-board-id="__extension__">+ Extension Saves</div>
    </div>
  `;
  
  const btn = wrapper.querySelector('.adspy-save-btn');
  const dropdown = wrapper.querySelector('.adspy-dropdown');
  
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
  });
  
  wrapper.querySelectorAll('.adspy-board-item').forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const boardId = item.dataset.boardId;
      const adData = extractAdData(source, card);
      
      chrome.runtime.sendMessage({ type: 'SAVE_AD', data: adData, boardId }, (response) => {
        dropdown.style.display = 'none';
        if (response?.ok) {
          btn.textContent = '✅ Sauvé!';
          btn.style.background = '#10b981';
          setTimeout(() => {
            btn.textContent = '🔭 Save';
            btn.style.background = '';
          }, 2000);
        } else {
          btn.textContent = '❌ Erreur';
          setTimeout(() => { btn.textContent = '🔭 Save'; }, 2000);
        }
      });
    });
  });
  
  // Close dropdown when clicking outside
  document.addEventListener('click', () => { dropdown.style.display = 'none'; }, { once: false });
  
  return wrapper;
}

// ============================================================
// EXTRACT AD DATA
// ============================================================
function extractAdData(source, card) {
  if (source === 'facebook') return extractFBAdData(card);
  if (source === 'tiktok') return extractTikTokAdData(card);
  return { source, text: '', emoji: '📢', brand: 'Unknown' };
}

function extractFBAdData(card) {
  const text = card.querySelector('[data-ad-preview="message"]')?.textContent ||
               card.querySelector('div[class*="message"]')?.textContent ||
               card.innerText?.slice(0, 200) || '';
  
  const pageName = card.querySelector('a[href*="/ads/library"]')?.textContent ||
                   card.querySelector('[class*="pageName"]')?.textContent || 'Unknown';
  
  const imgUrl = card.querySelector('img')?.src || '';
  const videoUrl = card.querySelector('video')?.src || '';
  const linkUrl = card.querySelector('a[href*="facebook.com"]')?.href || window.location.href;
  
  return {
    source: 'facebook',
    brand: pageName.trim(),
    text: text.trim().slice(0, 500),
    imageUrl: imgUrl,
    videoUrl,
    pageUrl: linkUrl,
    savedAt: new Date().toISOString(),
    pageHref: window.location.href,
    emoji: '📘',
    domain: extractDomain(linkUrl),
    headline: text.trim().slice(0, 80),
  };
}

function extractTikTokAdData(card) {
  const text = card.querySelector('.creative-text, .ad-text, [class*="adText"]')?.textContent ||
               card.innerText?.slice(0, 200) || '';
  
  const brand = card.querySelector('.brand-name, .advertiser-name, [class*="advertiser"]')?.textContent || 'Unknown';
  const imgUrl = card.querySelector('img')?.src || '';
  
  return {
    source: 'tiktok',
    brand: brand.trim(),
    text: text.trim().slice(0, 500),
    imageUrl: imgUrl,
    savedAt: new Date().toISOString(),
    pageHref: window.location.href,
    emoji: '♪',
    headline: text.trim().slice(0, 80),
  };
}

function extractDomain(url) {
  try {
    return new URL(url).hostname.replace('www.', '');
  } catch(e) { return ''; }
}
