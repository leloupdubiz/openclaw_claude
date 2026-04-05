#!/usr/bin/env python3
"""
get_ai_lessons.py — Extrait les leçons ecomtalent AI via CDP websocket
Injecte du JS dans le tab Whop pour fetcher la liste et les MUX URLs
"""
import json, urllib.request, urllib.parse, websocket, time, sys, os

CDP_URL = "http://127.0.0.1:18792"
BASE = "/Users/pc2/.openclaw/workspace/formations/whop-ecomtalent"
TRANSCRIPTS = os.path.join(BASE, "transcripts")
SUMMARIES = os.path.join(BASE, "summaries")

def get_tabs():
    r = urllib.request.urlopen(f"{CDP_URL}/json", timeout=5)
    return json.loads(r.read())

def cdp_eval(ws_url, expression, timeout=15):
    """Évalue du JS dans le tab via CDP websocket"""
    import websocket as ws_lib
    import threading
    result = {"done": False, "value": None, "error": None}

    def on_message(ws, msg):
        data = json.loads(msg)
        if data.get("id") == 1:
            if "result" in data:
                rv = data["result"].get("result", {})
                result["value"] = rv.get("value", rv.get("description"))
            else:
                result["error"] = data.get("error")
            result["done"] = True
            ws.close()

    def on_error(ws, err):
        result["error"] = str(err)
        result["done"] = True

    cmd = json.dumps({"id": 1, "method": "Runtime.evaluate", "params": {
        "expression": expression, "awaitPromise": True,
        "returnByValue": True, "timeout": timeout * 1000
    }})
    wsc = ws_lib.WebSocketApp(ws_url, on_message=on_message, on_error=on_error)
    t = threading.Thread(target=wsc.run_forever)
    t.daemon = True
    t.start()
    wsc.send(cmd)
    deadline = time.time() + timeout + 5
    while not result["done"] and time.time() < deadline:
        time.sleep(0.1)
    return result["value"], result["error"]

# Trouver le tab Whop
tabs = get_tabs()
whop_tab = None
for tab in tabs:
    if "whop.com" in tab.get("url", "") and tab.get("type") == "page":
        whop_tab = tab
        break

if not whop_tab:
    print("❌ Aucun tab Whop trouvé")
    sys.exit(1)

ws_url = whop_tab["webSocketDebuggerUrl"]
print(f"✅ Tab trouvé: {whop_tab['title'][:60]}")
print(f"   URL: {whop_tab['url'][:80]}")

# Injecter JS pour fetcher les leçons AI via l'API Whop
JS_GET_AI_COURSE = """
(async () => {
  // Chercher les leçons AI en parcourant la page ou l'API Whop
  // Essai 1 : fetch API courses
  try {
    const r = await fetch('/api/v5/experiences/?type=course&product=ecomtalent-ai&limit=20', {credentials:'include'});
    if (r.ok) return JSON.stringify(await r.json());
  } catch(e) {}
  
  // Essai 2 : fetch v2
  try {
    const r = await fetch('/api/v2/courses/?experience=ecomtalent-ai', {credentials:'include'});
    if (r.ok) return JSON.stringify(await r.json());
  } catch(e) {}
  
  // Essai 3 : chercher dans le DOM les liens de leçons AI
  const links = Array.from(document.querySelectorAll('a[href*="/lessons/"]'))
    .map(a => ({href: a.href, text: a.textContent.trim().slice(0,60)}))
    .filter(l => l.href.length > 0);
  return JSON.stringify({dom_links: links});
})()
"""

print("🔍 Injection JS pour récupérer les leçons AI...")
val, err = cdp_eval(ws_url, JS_GET_AI_COURSE, timeout=20)
if err:
    print(f"❌ Erreur JS: {err}")
elif val:
    print("📋 Résultat:")
    try:
        data = json.loads(val)
        print(json.dumps(data, indent=2, ensure_ascii=False)[:2000])
    except:
        print(val[:500])

# Si pas de résultat, naviguer vers Knowledge et récupérer les liens
if not val or '"dom_links": []' in str(val):
    print("\n🔄 Tentative de navigation vers la page Knowledge AI...")
    
    JS_NAV = """
    (async () => {
      window.location.href = 'https://whop.com/joined/ecomtalent/knowledge-KBhMkENW27qoZB/app/';
      await new Promise(r => setTimeout(r, 5000));
      return 'navigated';
    })()
    """
    cdp_eval(ws_url, JS_NAV, timeout=10)
    time.sleep(6)
    
    JS_GET_LINKS = """
    (async () => {
      await new Promise(r => setTimeout(r, 2000));
      const buttons = Array.from(document.querySelectorAll('button')).filter(b => b.textContent.includes('ecomtalent AI'));
      if (buttons[0]) buttons[0].click();
      await new Promise(r => setTimeout(r, 3000));
      const links = Array.from(document.querySelectorAll('a[href*="/lessons/"]'))
        .map(a => ({href: a.href, id: (a.href.match(/lesn_[a-zA-Z0-9]+/) || ['?'])[0], text: a.textContent.trim().slice(0,80)}));
      return JSON.stringify(links);
    })()
    """
    val2, err2 = cdp_eval(ws_url, JS_GET_LINKS, timeout=15)
    if val2:
        try:
            links = json.loads(val2)
            print(f"✅ {len(links)} liens trouvés:")
            for l in links[:15]:
                print(f"  {l['id']} — {l['text'][:60]}")
            # Sauvegarder
            with open("/tmp/ai_lesson_links.json", "w") as f:
                json.dump(links, f, indent=2, ensure_ascii=False)
            print("\n💾 Sauvegardé dans /tmp/ai_lesson_links.json")
        except:
            print(val2[:500])
