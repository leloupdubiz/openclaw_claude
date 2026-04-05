#!/usr/bin/env python3
"""Shopify OAuth — serveur local pour capturer le token automatiquement"""
import http.server, urllib.parse, urllib.request, json, ssl, os, secrets, threading, webbrowser

CLIENT_ID     = '00226201c117205a16327defe952f6f2'
CLIENT_SECRET = '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'
SHOP          = 'kiud1v-ua.myshopify.com'
SCOPES        = 'read_orders,read_customers,read_products,read_analytics'
PORT          = 19876
REDIRECT_URI  = f'http://localhost:{PORT}/callback'
STATE         = secrets.token_hex(16)
CREDS_FILE    = os.path.expanduser('~/.openclaw/credentials/shopify.env')

auth_url = (
    f'https://{SHOP}/admin/oauth/authorize'
    f'?client_id={CLIENT_ID}'
    f'&scope={SCOPES}'
    f'&redirect_uri={urllib.parse.quote(REDIRECT_URI)}'
    f'&state={STATE}'
)

print('\n' + '='*60)
print('SHOPIFY OAUTH — Ouvre cette URL dans ton navigateur :')
print('='*60)
print(f'\n{auth_url}\n')
print('='*60)
print(f'⏳ Serveur en attente sur http://localhost:{PORT}/callback\n')

class OAuthHandler(http.server.BaseHTTPRequestHandler):
    def log_message(self, *args): pass  # silence logs

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        if parsed.path != '/callback':
            self.send_response(404); self.end_headers(); return

        params = urllib.parse.parse_qs(parsed.query)
        code   = params.get('code', [None])[0]
        state  = params.get('state', [None])[0]

        if state != STATE:
            self._html(500, '❌ State invalide — sécurité compromise'); return
        if not code:
            self._html(500, '❌ Pas de code reçu'); return

        print('✅ Code reçu — échange contre le token...')

        # Échanger code → access token
        post_data = urllib.parse.urlencode({
            'client_id': CLIENT_ID, 'client_secret': CLIENT_SECRET, 'code': code
        }).encode()

        ctx = ssl.create_default_context()
        req = urllib.request.Request(
            f'https://{SHOP}/admin/oauth/access_token',
            data=post_data,
            headers={'Content-Type': 'application/x-www-form-urlencoded'}
        )
        try:
            with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
                result = json.loads(r.read())
        except Exception as e:
            self._html(500, f'❌ Erreur échange token : {e}'); return

        token = result.get('access_token')
        scope = result.get('scope', '')

        if not token:
            self._html(500, f'❌ Pas de token : {result}'); return

        # Sauvegarder
        os.makedirs(os.path.dirname(CREDS_FILE), exist_ok=True)
        with open(CREDS_FILE, 'w') as f:
            f.write(f'SHOPIFY_STORE={SHOP}\nSHOPIFY_ACCESS_TOKEN={token}\nSHOPIFY_SCOPES={scope}\n')
        os.chmod(CREDS_FILE, 0o600)

        print('\n' + '='*60)
        print('✅ TOKEN SHOPIFY OBTENU ET SAUVEGARDÉ')
        print(f'   Token : {token}')
        print(f'   Scopes : {scope}')
        print(f'   Fichier : {CREDS_FILE}')
        print('='*60 + '\n')

        self._html(200, '✅ Connecté ! Tu peux fermer cet onglet.')
        threading.Thread(target=self.server.shutdown).start()

    def _html(self, code, msg):
        body = f'<html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#09090f;color:#e8e8f0"><h1>{msg}</h1></body></html>'.encode()
        self.send_response(code)
        self.send_header('Content-Type', 'text/html; charset=utf-8')
        self.send_header('Content-Length', len(body))
        self.end_headers()
        self.wfile.write(body)

server = http.server.HTTPServer(('localhost', PORT), OAuthHandler)
try:
    server.serve_forever()
except KeyboardInterrupt:
    print('\nArrêté.')
