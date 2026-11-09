# DayTab Website

Landingpage für DayTab, ein Projekt von JP Ventures. Gehostet auf Cloudflare Pages (Git-Integration, kein Build-Schritt, Ausgabeverzeichnis `/`).

- `index.html`: Startseite mit Warteliste
- `impressum.html`, `datenschutz.html`: Platzhalter vor dem Start ausfüllen
- Warteliste: Formular schreibt direkt in die Tabelle `waitlist` im Supabase-Projekt „daytab“ (nur Einfügen erlaubt, Lesen nur im Supabase-Dashboard)

Vor dem öffentlichen Start: Impressum und Datenschutz ausfüllen, dann in `_headers` die Zeile `X-Robots-Tag: noindex` löschen und in `robots.txt` `Disallow: /` durch `Allow: /` ersetzen.

## Sperre (seit 09.11.2026)
Die ganze Seite ist per Passwort gesperrt (`functions/_middleware.js`, Entscheidung J-07). Passwort = Umgebungsvariable `SITE_PASSWORD` im Pages-Projekt (Production, als Secret). Ohne Variable ist die Seite für alle gesperrt. Aufheben: `functions/_middleware.js` löschen.
