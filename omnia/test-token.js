#!/usr/bin/env node
// Test rapide du token OAuth actif
const fs = require('fs');
const fetch = require('./node_modules/node-fetch');

const authFile = '/Users/pc2/.openclaw/agents/main/agent/auth-profiles.json';
const data = JSON.parse(fs.readFileSync(authFile, 'utf8'));
const tok = data.profiles?.['anthropic:default']?.token;
console.log('Token:', tok ? tok.substring(0,40)+'...' : 'NULL');

(async () => {
  const r = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + tok,
      'anthropic-version': '2023-06-01',
      'anthropic-beta': 'oauth-2025-04-20',
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      model: 'claude-haiku-4-5',
      max_tokens: 20,
      messages: [{ role: 'user', content: 'Say OK' }]
    })
  });
  const d = await r.json();
  console.log('Résultat:', JSON.stringify(d.error || d.content?.[0]?.text));
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
