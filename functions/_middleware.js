// Sperre der gesamten Website (DT-14, Entscheidung Jubal J-07 vom 09.11.2026: „sperren“, bis die Firma steht).
// Zugang nur mit Passwort (HTTP Basic Auth). Benutzername egal, Passwort = Umgebungsvariable SITE_PASSWORD
// im Cloudflare-Pages-Projekt. Ist keine Variable gesetzt, bleibt die Seite für alle gesperrt.
// Aufheben: diese Datei löschen (oder den Commit rückgängig machen) – sonst ändert sich nichts an der Website.

const encoder = new TextEncoder();

function gleich(a, b) {
  const x = encoder.encode(a);
  const y = encoder.encode(b);
  if (x.byteLength !== y.byteLength) return false;
  return crypto.subtle.timingSafeEqual(x, y);
}

function gesperrt() {
  return new Response(
    '<!doctype html><html lang="de"><meta charset="utf-8"><meta name="robots" content="noindex">' +
      '<title>DayTab</title><body style="font-family:system-ui,sans-serif;margin:20vh auto;max-width:28rem;text-align:center;color:#222">' +
      '<h1 style="font-weight:600">DayTab</h1><p>Diese Seite ist noch nicht öffentlich.</p></body></html>',
    {
      status: 401,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'WWW-Authenticate': 'Basic realm="DayTab", charset="UTF-8"',
        'Cache-Control': 'no-store',
        'X-Robots-Tag': 'noindex, nofollow',
      },
    }
  );
}

export async function onRequest(context) {
  const passwort = context.env.SITE_PASSWORD;
  if (!passwort) return gesperrt();

  const auth = context.request.headers.get('Authorization') || '';
  if (!auth.startsWith('Basic ')) return gesperrt();

  let eingabe = '';
  try {
    const dekodiert = atob(auth.slice(6));
    eingabe = dekodiert.slice(dekodiert.indexOf(':') + 1);
  } catch {
    return gesperrt();
  }
  if (!gleich(eingabe, passwort)) return gesperrt();

  const antwort = await context.next();
  const neu = new Response(antwort.body, antwort);
  neu.headers.set('Cache-Control', 'no-store');
  return neu;
}
