const fs = require('fs');
const path = require('path');
const SETTINGS = path.join(__dirname, '../data/settings.json');
const settings = JSON.parse(fs.readFileSync(SETTINGS,'utf8'));

function extractClean(val) {
  if (!val) return null;
  const v1idx = val.indexOf('v1.eyJ');
  if (v1idx >= 0) return val.slice(v1idx);
  const eyJidx = val.indexOf('eyJ');
  if (eyJidx >= 0) return val.slice(eyJidx);
  return null;
}
function extractHeygenToken(b64val) {
  try {
    const clean = extractClean(b64val);
    if (!clean) return null;
    const decoded = Buffer.from(clean, 'base64').toString('utf8');
    const parsed = JSON.parse(decoded);
    return parsed.session_token || parsed.token || null;
  } catch { return null; }
}

const higgsfieldJWT  = extractClean(settings.higgsfield_clerk_session);
const heygenSession  = extractHeygenToken(settings.heygen_session_cookie);
const heygenHgUs     = extractClean(settings.heygen_hg_us);

console.log('Higgsfield JWT:', higgsfieldJWT ? 'OK ('+higgsfieldJWT.length+' chars)' : 'NULL');
console.log('HeyGen session:', heygenSession ? 'OK ('+heygenSession.length+' chars)' : 'NULL');
console.log('HeyGen hg_us:',  heygenHgUs    ? 'OK ('+heygenHgUs.length+' chars)' : 'NULL');

const toSave = {};
if (higgsfieldJWT) toSave.higgsfield_web_token = higgsfieldJWT;
if (heygenSession) toSave.heygen_web_token = heygenSession;
else if (heygenHgUs) toSave.heygen_web_token = heygenHgUs;

fs.writeFileSync(SETTINGS, JSON.stringify({...settings,...toSave}, null, 2));
console.log('Saved:', Object.keys(toSave).join(', '));
