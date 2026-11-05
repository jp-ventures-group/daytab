// Cloudflare Pages Function: POST /api/waitlist
// Needs a D1 binding named DB (Pages project → Settings → Bindings → D1 database).
const ALLOWED = new Set(['vitamin-d', 'vitamin-c', 'magnesium', 'zink', 'omega-3', 'b-komplex', 'andere']);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' } });

export async function onRequestPost({ request, env }) {
  let data;
  try { data = await request.json(); } catch { return json({ error: 'Ungültige Anfrage.' }, 400); }

  // Honeypot: bots fill the hidden "website" field
  if (data.website) return json({ ok: true });

  const email = String(data.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 254) return json({ error: 'Bitte gib eine gültige E-Mail-Adresse ein.' }, 400);
  if (data.consent !== true) return json({ error: 'Bitte bestätige die Einwilligung.' }, 400);

  const interests = Array.isArray(data.interests) ? data.interests.filter(i => ALLOWED.has(i)).join(',') : '';

  if (!env.DB) return json({ error: 'Die Warteliste ist gerade nicht erreichbar. Bitte versuch es später noch einmal.' }, 503);

  const res = await env.DB
    .prepare('INSERT INTO waitlist (email, interests, consent_at) VALUES (?1, ?2, ?3) ON CONFLICT(email) DO NOTHING')
    .bind(email, interests, new Date().toISOString())
    .run();

  return json({ ok: true, already: res.meta && res.meta.changes === 0 });
}

export function onRequest() {
  return json({ error: 'Nur POST erlaubt.' }, 405);
}
