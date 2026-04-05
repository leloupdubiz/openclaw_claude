import urllib.parse, secrets
CLIENT_ID = '00226201c117205a16327defe952f6f2'
SHOP = 'kiud1v-ua.myshopify.com'
SCOPES = 'read_orders,read_customers,read_products,read_analytics'
PORT = 19876
REDIRECT_URI = f'http://localhost:{PORT}/callback'
STATE = 'nelliodashboard2026'
url = (f'https://{SHOP}/admin/oauth/authorize'
       f'?client_id={CLIENT_ID}'
       f'&scope={SCOPES}'
       f'&redirect_uri={urllib.parse.quote(REDIRECT_URI)}'
       f'&state={STATE}')
print(url)
