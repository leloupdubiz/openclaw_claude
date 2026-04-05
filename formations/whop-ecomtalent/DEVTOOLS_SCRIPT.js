/**
 * ECOMTALENT — Script DevTools Console
 * À coller dans la console Chrome DevTools sur la page de formation Whop EcomTalent
 * 
 * INSTRUCTIONS :
 * 1. Va sur : https://whop.com/hub/[ton-id-ecomtalent]/
 * 2. Ouvre DevTools (F12 ou Cmd+Option+I)
 * 3. Onglet "Console"
 * 4. Colle tout ce script et appuie sur Entrée
 * 5. Attends ~3 min que le script tourne
 * 6. Copie le JSON qui s'affiche à la fin
 * 7. Envoie-moi le JSON dans #ressources
 */

(async function extractEcomTalentLessons() {
  console.log("🚀 EcomTalent Extractor — démarrage...");
  
  const lessons = [];
  let currentModule = "";
  
  // Fonction pour extraire les vidéos Mux d'une page
  async function extractVideoFromPage() {
    return new Promise((resolve) => {
      let url = null;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name && entry.name.includes('stream.mux.com') && entry.name.includes('.m3u8')) {
            url = entry.name;
          }
        }
      });
      observer.observe({ entryTypes: ['resource'] });
      setTimeout(() => { observer.disconnect(); resolve(url); }, 3000);
    });
  }
  
  // Récupérer la liste des leçons depuis la sidebar
  const sidebarItems = document.querySelectorAll('[data-lesson-id], [href*="/lesson/"], .lesson-item, [class*="lesson"]');
  
  if (sidebarItems.length === 0) {
    // Fallback : chercher tous les liens de leçons
    const allLinks = Array.from(document.querySelectorAll('a[href]'))
      .filter(a => a.href.includes('/lesson/') || a.href.includes('/hub/'));
    
    console.log(`📋 ${allLinks.length} liens trouvés`);
    
    allLinks.forEach((link, i) => {
      const title = link.textContent.trim().replace(/\s+/g, ' ').slice(0, 100);
      if (title && title.length > 3) {
        lessons.push({
          index: i + 1,
          title: title,
          url: link.href,
          id: link.href.split('/').pop()
        });
      }
    });
  }
  
  // Alternative : récupérer via l'API Whop si disponible
  try {
    const response = await fetch('/api/v2/experiences', { credentials: 'include' });
    if (response.ok) {
      const data = await response.json();
      console.log("✅ API Whop accessible :", data);
    }
  } catch(e) {
    console.log("API directe non disponible — extraction DOM");
  }
  
  // Snapshot actuel du DOM pour les modules et leçons
  const modules = document.querySelectorAll('[class*="module"], [class*="chapter"], [class*="section"]');
  modules.forEach((mod, mi) => {
    const modTitle = mod.querySelector('h2, h3, strong, [class*="title"]');
    const modName = modTitle ? modTitle.textContent.trim() : `Module ${mi + 1}`;
    
    const lessonItems = mod.querySelectorAll('li, [class*="lesson"], [class*="item"]');
    lessonItems.forEach((item, li) => {
      const link = item.querySelector('a');
      const title = item.textContent.trim().replace(/\s+/g, ' ').slice(0, 100);
      if (title && title.length > 3) {
        lessons.push({
          module: modName,
          index: `${mi + 1}.${li + 1}`,
          title: title,
          url: link ? link.href : null,
          id: link ? link.href.split('/').pop() : null
        });
      }
    });
  });
  
  // Dédupliquer
  const unique = lessons.filter((v, i, a) => 
    a.findIndex(t => t.title === v.title) === i
  );
  
  console.log(`\n✅ ${unique.length} leçons extraites`);
  console.log("\n📋 COPIE CE JSON ET ENVOIE-LE EN MESSAGE :");
  console.log("=".repeat(60));
  
  const output = JSON.stringify(unique, null, 2);
  console.log(output);
  
  // Copier dans le presse-papier automatiquement
  try {
    await navigator.clipboard.writeText(output);
    console.log("\n✅ JSON copié dans le presse-papier !");
  } catch(e) {
    console.log("\n⚠️  Copie manuelle requise (sélectionne tout le JSON ci-dessus)");
  }
  
  return unique;
})();
