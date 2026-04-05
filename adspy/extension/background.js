/**
 * ADSPY PRO — Background Service Worker
 * Handles communication between content scripts and popup
 */

const ADSPY_API = 'http://localhost:3004/api';

// Listen for messages from content scripts
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'SAVE_AD') {
    saveAdToAdspyPro(message.data, message.boardId)
      .then(result => sendResponse({ ok: true, result }))
      .catch(err => sendResponse({ ok: false, error: err.message }));
    return true; // keep channel open for async
  }
  
  if (message.type === 'GET_BOARDS') {
    fetchBoards().then(boards => sendResponse({ boards })).catch(() => sendResponse({ boards: [] }));
    return true;
  }
  
  if (message.type === 'CHECK_API') {
    checkApiStatus().then(status => sendResponse(status)).catch(() => sendResponse({ ok: false }));
    return true;
  }
});

async function saveAdToAdspyPro(data, boardId) {
  const response = await fetch(`${ADSPY_API}/extension/save`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ type: 'ad', source: data.source || 'extension', data, boardId }),
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  return response.json();
}

async function fetchBoards() {
  const r = await fetch(`${ADSPY_API}/boards`);
  return r.json();
}

async function checkApiStatus() {
  try {
    const r = await fetch(`${ADSPY_API}/config`, { signal: AbortSignal.timeout(2000) });
    return { ok: r.ok };
  } catch(e) {
    return { ok: false, error: e.message };
  }
}
