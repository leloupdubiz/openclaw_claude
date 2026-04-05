#!/usr/bin/env node
const fs = require('fs');
const fetch = require('./node_modules/node-fetch');

const authFile = '/Users/pc2/.openclaw/agents/main/agent/auth-profiles.json';
const data = JSON.parse(fs.readFileSync(authFile, 'utf8'));
const token = data.profiles?.['anthropic:default']?.token;
console.log('Token:', token ? token.substring(0,50)+'...' : 'NULL');

const models = [
  'claude-haiku-4-5',
  'claude-sonnet-4-5',
  'claude-3-haiku-20240307',
  'claude-3-5-haiku-20241022',
  'claude-3-5-sonnet-20241022',
  'claude-3-7-sonnet-20250219'
];

(async () => {
  for (const model of models) {
    const r = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + token,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'oauth-2025-04-20',
        'content-type': 'application/json'
      },
      body: JSON.stringify({ model, max_tokens: 10, messages: [{ role: 'user', content: 'hi' }] })
    });
    const d = await r.json();
    const result = d.error ? 'FAIL: ' + d.error.message.substring(0, 100) : 'OK: ' + (d.content?.[0]?.text || '');
    console.log(model + ' → ' + result);
  }
  process.exit(0);
})().catch(e => { console.error(e.message); process.exit(1); });
