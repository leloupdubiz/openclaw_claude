#!/usr/bin/env python3
"""
Extrait les tokens HeyGen et Higgsfield depuis les cookies Arc chiffrés.
Requiert une approbation Keychain macOS (dialog système → cliquer "Allow").
"""
import subprocess, sqlite3, shutil, os, json, hmac, hashlib
from pathlib import Path

def get_arc_key():
    """Récupère la clé de déchiffrement depuis le Keychain macOS."""
    result = subprocess.run(
        ['security', 'find-generic-password', '-s', 'Arc Safe Storage', '-a', 'Arc', '-w'],
        capture_output=True, text=True, timeout=30
    )
    if result.returncode != 0:
        raise Exception(f"Keychain error: {result.stderr.strip()}")
    return result.stdout.strip()

def decrypt_cookie(encrypted_value, key):
    """Déchiffre un cookie Arc (AES-128-CBC, PBKDF2 key)."""
    try:
        from Crypto.Cipher import AES
    except ImportError:
        subprocess.run(['pip3', 'install', 'pycryptodome', '-q'])
        from Crypto.Cipher import AES
    
    if not encrypted_value or len(encrypted_value) < 3:
        return ''
    
    # Arc/Chrome cookie encryption: prefix "v10" + AES-128-CBC
    raw = bytes(encrypted_value)
    if raw[:3] == b'v10':
        raw = raw[3:]
    
    # PBKDF2 key derivation (same as Chrome on macOS)
    import hashlib
    derived_key = hashlib.pbkdf2_hmac('sha1', key.encode('utf-8'), b'saltysalt', 1003, dklen=16)
    iv = b' ' * 16  # 16 spaces
    cipher = AES.new(derived_key, AES.MODE_CBC, iv)
    decrypted = cipher.decrypt(raw)
    # Remove PKCS7 padding
    pad = decrypted[-1]
    if pad < 16:
        decrypted = decrypted[:-pad]
    return decrypted.decode('utf-8', errors='ignore')

def main():
    cookies_path = Path.home() / 'Library/Application Support/Arc/User Data/Default/Cookies'
    tmp_path = '/tmp/arc_cookies_extract.db'
    
    print("📖 Copie du fichier cookies Arc...")
    shutil.copy2(str(cookies_path), tmp_path)
    
    print("🔑 Récupération clé Keychain (approuve le dialog si nécessaire)...")
    try:
        key = get_arc_key()
        print("✅ Clé Keychain récupérée")
    except Exception as e:
        print(f"❌ Keychain: {e}")
        os.unlink(tmp_path)
        return
    
    conn = sqlite3.connect(tmp_path)
    cur = conn.cursor()
    
    # Chercher cookies HeyGen et Higgsfield
    cur.execute("""
        SELECT host_key, name, value, encrypted_value 
        FROM cookies 
        WHERE host_key LIKE '%heygen%' OR host_key LIKE '%higgsfield%' OR host_key LIKE '%clerk%'
    """)
    rows = cur.fetchall()
    conn.close()
    os.unlink(tmp_path)
    
    print(f"\n📋 {len(rows)} cookies trouvés")
    
    tokens = {}
    for host, name, value, enc_val in rows:
        # Décrypter si chiffré
        if enc_val and len(enc_val) > 3:
            try:
                value = decrypt_cookie(enc_val, key)
            except Exception as e:
                value = f'[decrypt error: {e}]'
        
        print(f"  {host} | {name} | {value[:60] if value else '[empty]'}...")
        
        # Identifier les tokens importants
        if name == 'heygen_sid' and value:
            tokens['heygen_sid'] = value
        if name == '__session' and 'higgsfield' in host and value:
            tokens['higgsfield_session'] = value
        if value and value.startswith('eyJ') and len(value) > 100:
            if 'heygen' in host:
                tokens['heygen_jwt'] = value
            elif 'higgsfield' in host or 'clerk' in host:
                tokens['higgsfield_jwt'] = value
    
    print(f"\n🎯 Tokens identifiés: {list(tokens.keys())}")
    
    # Sauvegarder dans OMNIA settings
    settings = {}
    if 'heygen_jwt' in tokens:
        settings['heygen_web_token'] = tokens['heygen_jwt']
        print(f"✅ HeyGen JWT: {tokens['heygen_jwt'][:50]}...")
    elif 'heygen_sid' in tokens:
        settings['heygen_sid'] = tokens['heygen_sid']
        print(f"📌 HeyGen SID: {tokens['heygen_sid'][:50]}...")
    
    if 'higgsfield_jwt' in tokens:
        settings['higgsfield_web_token'] = tokens['higgsfield_jwt']
        print(f"✅ Higgsfield JWT: {tokens['higgsfield_jwt'][:50]}...")
    elif 'higgsfield_session' in tokens:
        settings['higgsfield_session'] = tokens['higgsfield_session']
        print(f"📌 Higgsfield session: {tokens['higgsfield_session'][:50]}...")
    
    if settings:
        import urllib.request
        data = json.dumps(settings).encode()
        req = urllib.request.Request('http://localhost:3002/api/settings', data=data, 
                                      headers={'Content-Type': 'application/json'}, method='POST')
        try:
            with urllib.request.urlopen(req, timeout=5) as r:
                print(f"\n✅ Sauvegardé dans OMNIA: {r.read().decode()}")
        except Exception as e:
            print(f"❌ Erreur sauvegarde OMNIA: {e}")
            print(f"Settings à sauvegarder manuellement: {json.dumps(settings, indent=2)}")
    else:
        print("\n⚠️ Aucun token JWT trouvé dans les cookies Arc")
        print("Essaie d'ouvrir heygen.com et higgsfield.ai dans Arc, puis relance ce script")

if __name__ == '__main__':
    main()
