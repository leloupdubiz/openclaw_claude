/**
 * IMAGE AD FACTORY — Creative Factory
 * Génère des prompts Midjourney et specs pour les static ads Meta
 */

const express = require('express');
const router = express.Router();
const Anthropic = require('@anthropic-ai/sdk');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_OAUTH_TOKEN || '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';
const anthropic = new Anthropic({ apiKey: ANTHROPIC_API_KEY });

// ─── Config angles ────────────────────────────────────────────────────────────

const ANGLES = {
  teufelskreis: {
    label: 'Der Teufelskreis',
    avatar: 'Sonja — femme 35 ans, look naturel, fatiguée mais espoir',
    emotion: 'fatigue reconnue → soulagement',
    hook: 'Du schläfst schlecht WEIL du gestresst bist.',
    cta: 'Nellio UltraCalm → 45 Tage testen'
  },
  gedankenkarussell: {
    label: 'Das Gedankenkarussell',
    avatar: 'Markus — homme 38 ans, professionnel détendu',
    emotion: 'mental fatigue → calme retrouvé',
    hook: 'Das Gedankenkarussell nachts — kein Willensproblem.',
    cta: '45 Tage Geld-zurück. Risikofrei.'
  },
  cortisol: {
    label: 'Cortisol nachts',
    avatar: 'Markus ou Sonja — ton éducatif, crédible',
    emotion: 'révélation → confiance',
    hook: 'Dein Cortisol blockiert deinen Tiefschlaf.',
    cta: '20.000+ Bewertungen. 4,8 Sterne.'
  }
};

const FORMATS = {
  '1:1': { width: 1080, height: 1080, label: 'Carré (Feed)' },
  '4:5': { width: 1080, height: 1350, label: 'Portrait (Feed optimal)' },
  '9:16': { width: 1080, height: 1920, label: 'Story/Reel' }
};

// ─── ROUTE : Générer un prompt Midjourney ────────────────────────────────────

router.post('/generate', async (req, res) => {
  try {
    const { angle, format = '4:5', variant = 1 } = req.body;

    if (!ANGLES[angle]) {
      return res.status(400).json({ error: `angle invalide. Options: ${Object.keys(ANGLES).join(', ')}` });
    }

    const angleData = ANGLES[angle];
    const formatData = FORMATS[format] || FORMATS['4:5'];

    const prompt = `Tu es un expert en création de publicités Meta Ads photo-réalistes pour DTC.

Génère un prompt Midjourney v6 professionnel pour une static ad Nellio UltraCalm.

ANGLE: ${angleData.label}
AVATAR: ${angleData.avatar}
ÉMOTION: ${angleData.emotion}
HOOK TEXT OVERLAY: "${angleData.hook}"
CTA TEXT: "${angleData.cta}"
FORMAT: ${format} (${formatData.width}x${formatData.height}px) — ${formatData.label}
VARIANTE: ${variant} (si variante 2, approcher différemment le même angle)

PRODUIT NELLIO:
- Stick-pack tubulaire ~2.5cm × 15cm
- Film métallisé dégradé rose-bleu
- Logo "nellio" en blanc
- NE PAS écrire "canister" — c'est un sachet/stick-pack

RÈGLES PROMPT MIDJOURNEY:
- Style: photorealistic, natural lighting, professional ad photography
- Composition: règle des tiers, produit visible mais pas dominant
- Ambiance: calme, intime, rassurant (chambre/cuisine/bureau le soir ou matin)
- Pas de mise en scène forcée (pas de sourires marketing)
- Modèle: authentique, pas modèle professionnel évident

Retourne UNIQUEMENT ce JSON:
{
  "midjourneyPrompt": "<prompt complet en anglais, 80-120 mots>",
  "negativePrompt": "--no <liste: cartoon, anime, studio, fake smile, text, watermark, blurry>",
  "parameters": "--ar ${format.replace(':', ':')} --v 6 --style raw --q 2",
  "hookDE": "${angleData.hook}",
  "ctaDE": "${angleData.cta}",
  "overlaySpec": {
    "hookPosition": "top|center|bottom",
    "hookFontSize": "<taille recommandée>",
    "hookColor": "#FFFFFF",
    "ctaPosition": "bottom",
    "ctaBackground": "coral #FF6B6B pill button"
  },
  "copyVariant": {
    "headline": "<headline DE alternatif, max 6 mots>",
    "body": "<body copy DE, 1-2 phrases>",
    "cta": "${angleData.cta}"
  }
}`;

    const response = await anthropic.messages.create({
      model: 'claude-opus-4-5',
      max_tokens: 1500,
      messages: [{ role: 'user', content: prompt }]
    });

    let result;
    try {
      const rawText = response.content[0].text.trim();
      const jsonMatch = rawText.match(/\{[\s\S]+\}/);
      result = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);
    } catch(e) {
      result = { midjourneyPrompt: response.content[0].text, parseError: true };
    }

    res.json({
      angle,
      format,
      variant,
      specs: formatData,
      ...result
    });

  } catch(e) {
    console.error('[image-factory] Erreur generate:', e);
    res.status(500).json({ error: e.message });
  }
});

// ─── ROUTE : Batch 3-2-2 (12 variantes) ─────────────────────────────────────

router.post('/batch', async (req, res) => {
  try {
    const combinations = [];

    // 3 angles × 2 formats × 2 variantes = 12 combinaisons
    for (const angle of Object.keys(ANGLES)) {
      for (const format of ['1:1', '4:5']) {
        for (const variant of [1, 2]) {
          combinations.push({ angle, format, variant });
        }
      }
    }

    // Générer en parallèle (max 3 à la fois pour éviter rate limit)
    const results = [];
    for (let i = 0; i < combinations.length; i += 3) {
      const batch = combinations.slice(i, i + 3);
      const batchResults = await Promise.all(batch.map(async ({ angle, format, variant }) => {
        try {
          const angleData = ANGLES[angle];
          const formatData = FORMATS[format];

          const response = await anthropic.messages.create({
            model: 'claude-opus-4-5',
            max_tokens: 800,
            messages: [{
              role: 'user',
              content: `Génère un prompt Midjourney v6 concis (60-80 mots, anglais) pour une static ad Meta Nellio UltraCalm.

Angle: ${angleData.label} | Avatar: ${angleData.avatar} | Format: ${format} | Variante ${variant}
Hook DE: "${angleData.hook}"
Style: photorealistic, natural, authentic UGC-style, ${format} composition
Produit: Nellio stick-pack (sachet tubulaire, film métallisé rose-bleu)

Retourne UNIQUEMENT:
{
  "midjourneyPrompt": "<prompt EN>",
  "hookDE": "<hook DE court>",
  "ctaDE": "<cta DE>",
  "parameters": "--ar ${format.replace(':', ':')} --v 6 --style raw"
}`
            }]
          });

          const rawText = response.content[0].text.trim();
          const jsonMatch = rawText.match(/\{[\s\S]+\}/);
          const data = JSON.parse(jsonMatch ? jsonMatch[0] : rawText);

          return { angle, format, variant, angleLabel: angleData.label, specs: formatData, ...data };
        } catch(e) {
          return { angle, format, variant, error: e.message };
        }
      }));

      results.push(...batchResults);

      // Petite pause entre les batchs pour éviter rate limit
      if (i + 3 < combinations.length) {
        await new Promise(r => setTimeout(r, 500));
      }
    }

    res.json({
      total: results.length,
      successful: results.filter(r => !r.error).length,
      prompts: results
    });

  } catch(e) {
    console.error('[image-factory] Erreur batch:', e);
    res.status(500).json({ error: e.message });
  }
});

// GET /api/image-factory/angles — Liste les angles disponibles
router.get('/angles', (req, res) => {
  res.json({ angles: ANGLES, formats: FORMATS });
});

module.exports = router;
