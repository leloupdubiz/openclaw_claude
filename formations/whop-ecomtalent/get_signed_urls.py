#!/usr/bin/env python3
"""Read signed URLs from Chrome localStorage via CDP WebSocket"""
import json, urllib.request, sys

# Try to get CDP targets via gateway
try:
    # Try direct CDP
    r = urllib.request.urlopen("http://127.0.0.1:18792/json/list", timeout=3)
    data = json.loads(r.read())
    print(json.dumps(data[:2]))
except Exception as e:
    print(f"Direct CDP failed: {e}")
    # Try with different auth
    try:
        req = urllib.request.Request("http://127.0.0.1:18792/json/list")
        req.add_header("X-Gateway-Token", "local")
        r = urllib.request.urlopen(req, timeout=3)
        print(r.read().decode())
    except Exception as e2:
        print(f"Auth CDP failed: {e2}")
