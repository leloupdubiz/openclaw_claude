// BOOKMARKLET : extraire le token Meta depuis n'importe quelle page FB
// Coller ce code dans la console Arc sur developers.facebook.com/tools/explorer/
(async function() {
  // Méthode 1: chercher dans localStorage
  const keys = Object.keys(localStorage);
  const tokenKey = keys.find(k => k.includes('token') || k.includes('access'));
  if (tokenKey) { console.log('Token localStorage:', localStorage[tokenKey]); }
  
  // Méthode 2: récupérer depuis l'input du Graph Explorer
  const input = document.querySelector('#accessToken, input[name="access_token"], .tokenInput');
  if (input) { console.log('Token input:', input.value); }
  
  // Méthode 3: depuis l'URL si présent
  const urlToken = new URLSearchParams(window.location.hash.slice(1)).get('access_token');
  if (urlToken) { console.log('Token URL:', urlToken); }
  
  console.log('Page:', window.location.href);
})();
