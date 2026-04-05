#!/usr/bin/env node
/**
 * Shopify OAuth — capture automatique du token
 * Lance un serveur local, génère l'URL d'auth, capture le code, échange contre le token
 */
const http = require('http');
const https = require('https');
const crypto = require('crypto');

const CLIENT_ID = '00226201c117205a16327defe952f6f2';
const CLIENT_SECRET = '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';
const SHOP = 'kiud1v-ua.myshopify.com';
const SCOPES = 'read_orders,read_customers,read_products,read_analytics';
const PORT = 19876;
const REDIRECT_URI = `http://localhost:${PORT}/callback`;

const state = crypto.randomBytes(16).toString('hex');

const authUrl = `https://${SHOP}/admin/oauth/authorize?client_id=${CLIENT_ID}&scope=${SCOPES}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&state=${state}`;

console.log('\n' + '='.repeat(60));
console.log('SHOPIFY OAUTH — En attente d\'autorisation');
console.log('='.repeat(60));
console.log('\n🔗 Ouvre cette URL dans ton navigateur :\n');
console.log(authUrl);
console.log('\n' + '='.repeat(60));

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  
  if (url.pathname !== '/callback') {
    res.end('Not found');
    return;
  }

  const code = url.searchParams.get('code');
  const returnedState = url.searchParams.get('state');

  if (returnedState !== state) {
    res.end('<h2>❌ State mismatch — sécurité compromise</h2>');
    server.close();
    return;
  }

  if (!code) {
    res.end('<h2>❌ Pas de code reçu</h2>');
    server.close();
    return;
  }

  console.log('\n✅ Code reçu — échange contre le token...');

  // Échanger le code contre un token
  const postData = JSON.stringify({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, code });
  
  const options = {
    hostname: SHOP,
    path: '/admin/oauth/access_token',
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(postData) }
  };

  const tokenReq = https.request(options, (tokenRes) => {
    let data = '';
    tokenRes.on('data', chunk => data += chunk);
    tokenRes.on('end', () => {
      try {
        const result = JSON.parse(data);
        if (result.access_token) {
          console.log('\n' + '='.repeat(60));
          console.log('✅ TOKEN SHOPIFY OBTENU');
          console.log('='.repeat(60));
          console.log('ACCESS TOKEN:', result.access_token);
          console.log('SCOPE:', result.scope);
          console.log('='.repeat(60));

          // Sauvegarder dans les credentials
          const fs = require('fs');
          const credsFile = '/Users/pc2/.openclaw/credentials/shopify.env';
          fs.writeFileSync(credsFile, 
            `SHOPIFY_STORE=${SHOP}\nSHOPIFY_ACCESS_TOKEN=${result.access_token}\nSHOPIFY_SCOPES=${result.scope}\n`,
            { mode: 0o600 }
          );
          console.log(`\n💾 Token sauvegardé → ${credsFile}`);

          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          res.end(`<html><body style="font-family:sans-serif;text-align:center;padding:60px;background:#09090f;color:#e8e8f0">
            <h1 style="color:#4ade80">✅ Token obtenu !</h1>
            <p>Shopify est connecté. Tu peux fermer cet onglet.</p>
            <p style="color:#6366f1;font-size:12px">Token sauvegardé en sécurité sur ton Mac.</p>
          </body></html>`);
        } else {
          console.log('❌ Erreur:', data);
          res.end(`<h2>Erreur: ${data}</h2>`);
        }
      } catch(e) {
        console.log('❌ Parse error:', e.message, data);
        res.end(`<h2>Erreur parsing: ${data}</h2>`);
      }
      server.close();
      process.exit(0);
    });
  });

  tokenReq.on('error', (e) => {
    console.error('❌ Erreur requête:', e);
    res.end(`<h2>Erreur: ${e.message}</h2>`);
    server.close();
  });

  tokenReq.write(postData);
  tokenReq.end();
});

server.listen(PORT, () => {
  console.log(`\n⏳ Serveur en attente sur http://localhost:${PORT}/callback`);
  console.log('   (expire dans 5 minutes)\n');
});

setTimeout(() => {
  console.log('\n⏰ Timeout — serveur arrêté');
  server.close();
  process.exit(1);
}, 5 * 60 * 1000);
