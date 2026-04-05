import urllib.request, urllib.parse, json, ssl, os

CLIENT_ID     = '00226201c117205a16327defe952f6f2'
CLIENT_SECRET = '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'
SHOP          = 'kiud1v-ua.myshopify.com'
CODE          = '7390690491708065e545348b6dadccd3'
CREDS_FILE    = '/Users/pc2/.openclaw/credentials/shopify.env'

post_data = urllib.parse.urlencode({
    'client_id': CLIENT_ID,
    'client_secret': CLIENT_SECRET,
    'code': CODE
}).encode()

req = urllib.request.Request(
    f'https://{SHOP}/admin/oauth/access_token',
    data=post_data,
    headers={'Content-Type': 'application/x-www-form-urlencoded'}
)

ctx = ssl.create_default_context()
with urllib.request.urlopen(req, context=ctx, timeout=15) as r:
    result = json.loads(r.read())

token = result.get('access_token')
scope = result.get('scope', '')

if not token:
    print(f'ERREUR: {result}')
else:
    os.makedirs(os.path.dirname(CREDS_FILE), exist_ok=True)
    with open(CREDS_FILE, 'w') as f:
        f.write(f'SHOPIFY_STORE={SHOP}\nSHOPIFY_ACCESS_TOKEN={token}\nSHOPIFY_SCOPES={scope}\n')
    os.chmod(CREDS_FILE, 0o600)
    print(f'TOKEN: {token}')
    print(f'SCOPES: {scope}')
    print('SAVED OK')
