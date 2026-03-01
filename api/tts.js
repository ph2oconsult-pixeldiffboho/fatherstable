// /api/tts.js — Vercel serverless proxy for ElevenLabs TTS
// CommonJS format works on all Vercel Node runtimes without extra config

module.exports = async function handler(req, res) {
  // Handle CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'ElevenLabs API key not configured on server',
      fix: 'Add ELEVENLABS_API_KEY to Vercel environment variables'
    });
  }

  const { text, voiceId = 'EXAVITQu4vr4xnSDxMaL' } = req.body || {};
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res.status(400).json({ error: 'Missing or empty text field' });
  }

  const safeText = text.slice(0, 2500).trim();

  try {
    const elRes = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`,
      {
        method: 'POST',
        headers: {
          'xi-api-key': apiKey,
          'Content-Type': 'application/json',
          'Accept': 'audio/mpeg',
        },
        body: JSON.stringify({
          text: safeText,
          model_id: 'eleven_turbo_v2_5',
          voice_settings: {
            stability: 0.50,
            similarity_boost: 0.80,
            style: 0.30,
            use_speaker_boost: true,
          },
        }),
      }
    );

    if (!elRes.ok) {
      const body = await elRes.text();
      console.error('ElevenLabs error:', elRes.status, body);
      return res.status(elRes.status).json({
        error: `ElevenLabs returned ${elRes.status}`,
        detail: body.slice(0, 300),
      });
    }

    const audioBuffer = await elRes.arrayBuffer();
    res.setHeader('Content-Type', 'audio/mpeg');
    res.setHeader('Cache-Control', 'public, max-age=3600');
    return res.status(200).send(Buffer.from(audioBuffer));

  } catch (err) {
    console.error('TTS proxy error:', err.message);
    return res.status(500).json({ error: 'Proxy fetch failed', detail: err.message });
  }
};
