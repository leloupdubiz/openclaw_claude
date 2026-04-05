// NELLIO STUDIO - API Backend
// Génération de scripts et prompts pour Drinknellio
// Modèle : Claude (Anthropic)

const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Sert les fichiers statiques du frontend
app.use(express.static(path.join(__dirname, '../../public')));

// CONFIG
const PORT = process.env.PORT || 3001;

// CHARGER CONFIG DRINKNELLIO
const brandConfig = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../config/drinknellio.json'), 'utf8')
);

// Helper : créer le client Anthropic (clé depuis header ou .env)
function getClient(req) {
  const apiKey = req.headers['x-api-key'] || process.env.ANTHROPIC_API_KEY;
  if (!apiKey) throw new Error('Clé API Anthropic manquante. Configurez-la dans le panneau API.');
  return new Anthropic({ apiKey });
}

// ==========================================
// ENDPOINTS API
// ==========================================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', brand: brandConfig.brand.name, model: 'claude-opus-4-5' });
});

// Générer script UGC
app.post('/api/generate/script', async (req, res) => {
  try {
    const {
      hookType = 'problem_agitation',
      audience = 'stressed_professionals',
      tone = 'authentic',
      duration = '30',
      language = 'de'
    } = req.body;

    const client = getClient(req);
    const prompt = buildScriptPrompt(hookType, audience, tone, duration, language);

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 900,
      system: `Du bist ein erfahrener UGC-Creator und Copywriter für Wellness-Produkte. 
Du schreibst authentische, überzeugende Video-Scripts für TikTok und Instagram.
Sprache: ${language === 'de' ? 'Deutsch' : 'English'}
Marke: ${brandConfig.brand.name}
Produkt: ${brandConfig.product_details.name}
Ziel: Conversion-optimierte Scripts, die echt und nicht verkaufsorientiert wirken.`,
      messages: [{ role: 'user', content: prompt }]
    });

    const script = message.content[0].text;

    res.json({
      success: true,
      script,
      model: message.model,
      metadata: { hookType, audience, tone, duration, language, timestamp: new Date().toISOString() }
    });

  } catch (error) {
    console.error('Erreur génération script:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Générer prompt image (Claude enrichit le prompt Midjourney)
app.post('/api/generate/image-prompt', async (req, res) => {
  try {
    const {
      imageType = 'product_hero',
      platform = 'instagram',
      style = 'minimalist'
    } = req.body;

    const client = getClient(req);
    const aspectRatio = getAspectRatio(platform);

    const message = await client.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 500,
      system: `Tu es un expert en direction artistique et en génération de prompts Midjourney pour des marques wellness premium.
Tu crées des prompts ultra-détaillés, visuellement précis, optimisés pour Midjourney v6.
Marque : Nellio UltraCalm — couleurs : coral (#FF6B6B), mint (#4ECDC4), cream (#FFF5F5)
Produit : poudre boisson anti-stress, arôme Framboise-Citron`,
      messages: [{
        role: 'user',
        content: `Génère un prompt Midjourney pour :
- Type d'image : ${imageType}
- Style visuel : ${style}
- Format : ${aspectRatio} (${platform})

Le prompt doit être en anglais, ultra-précis sur l'ambiance, la lumière, la composition, les couleurs.
Termine toujours par : --ar ${aspectRatio} --v 6 --style raw

Réponds UNIQUEMENT avec le prompt, sans explication.`
      }]
    });

    const prompt = message.content[0].text.trim();

    res.json({
      success: true,
      prompt,
      platform,
      aspectRatio,
      tips: getImageTips(imageType),
      metadata: { timestamp: new Date().toISOString() }
    });

  } catch (error) {
    console.error('Erreur génération image prompt:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Générer batch 3-2-2 (3 hooks × 2 body × 2 CTAs = 12 variantes)
app.post('/api/generate/batch', async (req, res) => {
  try {
    const {
      audience = 'stressed_professionals',
      campaignGoal = 'conversion'
    } = req.body;

    const client = getClient(req);
    const hookTypes = ['problem_agitation', 'curiosity', 'transformation'];
    const scripts = [];

    for (const hookType of hookTypes) {
      const prompt = buildScriptPrompt(hookType, audience, 'authentic', '30', 'de');
      const message = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 700,
        system: 'UGC Script Generator für Nellio UltraCalm. Deutsch. Authentisch.',
        messages: [{ role: 'user', content: prompt }]
      });
      scripts.push({
        hookType,
        script: message.content[0].text
      });
    }

    // 3-2-2 : 3 scripts × 2 body copies × 2 CTAs
    const ctaVariants = [
      'Link in Bio. 45 Tage Geld-zurück-Garantie.',
      'Code NELLIO20 für 20% Rabatt. Nur heute!'
    ];
    const bodyVariants = [
      'UltraCalm mit Ashwagandha 300mg, L-Theanin 400mg und Magnesium. Natürlich, ohne Zucker.',
      'Ein Glas jeden Morgen. Schmeckt fruchtig nach Himbeere-Zitrone. Keine Kapseln mehr.'
    ];

    const batch = [];
    scripts.forEach((s, i) => {
      ctaVariants.forEach((cta, j) => {
        bodyVariants.forEach((body, k) => {
          batch.push({
            id: batch.length + 1,
            hookType: s.hookType,
            script: s.script,
            bodyCopy: body,
            cta,
            variant: `${i + 1}-${j + 1}-${k + 1}`
          });
        });
      });
    });

    res.json({
      success: true,
      batch,
      total: batch.length,
      method: '3-2-2',
      campaignGoal,
      metadata: { timestamp: new Date().toISOString() }
    });

  } catch (error) {
    console.error('Erreur génération batch:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Obtenir les angles marketing
app.get('/api/angles', (req, res) => {
  res.json({ angles: brandConfig.marketing_angles, audiences: brandConfig.target_audiences });
});

// Obtenir la config de la marque
app.get('/api/brand', (req, res) => {
  res.json(brandConfig);
});

// ==========================================
// FONCTIONS HELPER
// ==========================================

function buildScriptPrompt(hookType, audience, tone, duration, language) {
  const audienceData = brandConfig.target_audiences.find(a => a.id === audience);
  const product = brandConfig.product_details;
  const ingredients = product.key_ingredients.map(i => `${i.name} (${i.amount})`).join(', ');

  return `Erstelle ein UGC-Video-Script für ${brandConfig.brand.name} ${product.name}.

PRODUKT-INFO:
- Name: ${product.name}
- Geschmack: ${product.flavor}
- Inhaltsstoffe: ${ingredients}
- Garantie: ${product.guarantee}
- Bewertung: ${brandConfig.social_proof.rating}/5 (${brandConfig.social_proof.review_count} Bewertungen)

ZIELGRUPPE:
- Name: ${audienceData ? audienceData.name : audience}
- Pain Points: ${audienceData ? audienceData.pain_points.join(', ') : ''}
- Desires: ${audienceData ? audienceData.desires.join(', ') : ''}

SCRIPT-ANFORDERUNGEN:
- Hook Typ: ${hookType}
- Tonality: ${tone}
- Dauer: ${duration} Sekunden
- Struktur: Hook (0-3s) → Problem → Lösung → Proof → CTA

Format:
🎬 SCRIPT (${duration}s)

📍 HOOK (0-3s):
[Text]

😰 PROBLEM (3-8s):
[Text]

💡 SOLUTION (8-13s):
[Text]

✅ PROOF (13-17s):
[Text]

🎯 CTA (17-${duration}s):
[Text]

📝 PRODUCTION NOTES:
- Visual: [Beschreibung]
- Music: [Stil]`;
}

function getAspectRatio(platform) {
  const ratios = { instagram: '4:5', facebook: '1:1', tiktok: '9:16', stories: '9:16', youtube: '16:9' };
  return ratios[platform] || '4:5';
}

function getImageTips(imageType) {
  const tips = {
    product_hero: 'Verwende einen klaren, einfarbigen Hintergrund. Achte auf scharfe Fokussierung.',
    lifestyle_flatlay: 'Arbeite mit natürlichem Licht. Verwende Requisiten, die zur Zielgruppe passen.',
    ugc_unboxing: 'Die Hände sollten natürlich aussehen. Echte Nägel wirken authentischer.',
    testimonial: 'Das Gesicht sollte echt lächeln. Natürliche Hauttextur beibehalten.',
    transformation: 'Ausreichend Kontrast zwischen den Hälften. Produkt zentral positionieren.',
    morning_routine: 'Weiches Morgenlicht bevorzugen. Stimmung ist wichtiger als Perfektion.'
  };
  return tips[imageType] || '';
}

// ==========================================
// DÉMARRAGE SERVEUR
// ==========================================

app.listen(PORT, () => {
  console.log(`🚀 Nellio Studio API (Claude) — port ${PORT}`);
  console.log(`📝 Brand: ${brandConfig.brand.name}`);
  console.log(`🤖 Modèle : claude-opus-4-5`);
  console.log(`🌐 Frontend : http://localhost:${PORT}/`);
});

module.exports = app;
