# DayTab Website

Landingpage für DayTab, ein Projekt von JP Ventures. Gehostet auf Cloudflare Pages (Git-Integration, kein Build-Schritt, Ausgabeverzeichnis `/`).

- `index.html`: Startseite mit Warteliste
- `impressum.html`, `datenschutz.html`: Platzhalter vor dem Start ausfüllen
- `functions/api/waitlist.js`: Pages Function für die Warteliste, braucht ein D1-Binding namens `DB`
- `schema.sql`: Tabelle `waitlist` für die D1-Datenbank

Vor dem öffentlichen Start: Impressum und Datenschutz ausfüllen, dann in `_headers` die Zeile `X-Robots-Tag: noindex` löschen und in `robots.txt` `Disallow: /` durch `Allow: /` ersetzen.
