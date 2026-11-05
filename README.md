# DayTab Website

Landingpage für DayTab, ein Projekt von JP Ventures. Gehostet auf Cloudflare Pages (Git-Integration, kein Build-Schritt, Ausgabeverzeichnis `/`).

- `index.html`: Startseite mit Warteliste
- `impressum.html`, `datenschutz.html`: Platzhalter vor dem Start ausfüllen
- Warteliste: Formular schreibt direkt in die Tabelle `waitlist` im Supabase-Projekt „daytab“ (nur Einfügen erlaubt, Lesen nur im Supabase-Dashboard)

Vor dem öffentlichen Start: Impressum und Datenschutz ausfüllen, dann in `_headers` die Zeile `X-Robots-Tag: noindex` löschen und in `robots.txt` `Disallow: /` durch `Allow: /` ersetzen.
