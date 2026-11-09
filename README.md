# DayTab Website

Landingpage für DayTab, ein Projekt von JP Ventures. Gehostet auf Cloudflare Pages (Git-Integration, kein Build-Schritt, Ausgabeverzeichnis `/`).

- `index.html`: Startseite mit Warteliste
- `impressum.html`, `datenschutz.html`: Platzhalter vor dem Start ausfüllen
- Gestaltung nach dem DayTab-Design-System v1 (Tokens in `assets/site.css`, Schrift Inter selbst gehostet in `assets/fonts/`, Logo `assets/daytab-logo.svg`)
- Texte 1:1 aus claude/website-texte.md (von Recht geprüft) – keine eigenen Texte
- Warteliste: Formular sendet an `/api/warteliste` (Pages Function mit Double-Opt-in, folgt nach Entscheidung J-05); bis dahin zeigt es die Fehlermeldung

Vor dem öffentlichen Start: Impressum und Datenschutz ausfüllen, dann in `_headers` die Zeile `X-Robots-Tag: noindex` löschen und in `robots.txt` `Disallow: /` durch `Allow: /` ersetzen.

## Sperre (seit 09.11.2026)
Die ganze Seite ist per Passwort gesperrt (`functions/_middleware.js`, Entscheidung J-07). Passwort = Umgebungsvariable `SITE_PASSWORD` im Pages-Projekt (Production, als Secret). Ohne Variable ist die Seite für alle gesperrt. Aufheben: `functions/_middleware.js` löschen.
