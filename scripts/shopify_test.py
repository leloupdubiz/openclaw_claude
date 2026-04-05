import urllib.request, json, ssl

SHOP  = 'kiud1v-ua.myshopify.com'
TOKEN = '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'

ctx = ssl.create_default_context()

def call(path):
    req = urllib.request.Request(
        f'https://{SHOP}/admin/api/2024-10/{path}',
        headers={'X-Shopify-Access-Token': TOKEN}
    )
    with urllib.request.urlopen(req, context=ctx, timeout=10) as r:
        return json.loads(r.read())

# Test shop info
shop = call('shop.json')['shop']
print(f"✅ Boutique : {shop['name']} ({shop['currency']})")

# Test orders
orders = call('orders.json?limit=5&status=any')['orders']
print(f"✅ Commandes récupérées : {len(orders)}")
if orders:
    print(f"   Dernière commande : #{orders[0]['order_number']} — {orders[0]['total_price']} {shop['currency']}")

# Test customers
customers = call('customers.json?limit=3')['customers']
print(f"✅ Clients récupérés : {len(customers)}")

print("\n🎉 Shopify API opérationnelle — prêt à builder le dashboard !")
