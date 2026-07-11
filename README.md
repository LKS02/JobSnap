# JobSnap 👻

Job-Dating im Tinder-Stil — Snapchat-Look, Video-basiert. Ein React-Prototyp.

- **Zwei Rollen:** „Ich suche Job" (Jobs swipen) ↔ „Ich suche Talente" (Kandidat:innen swipen)
- **Zwei Ebenen pro Karte:** Vorstellungsvideo vorne → Flip zur Detailkarte (Arbeitgeber / CV)
- **Vorstellungsvideos:** asynchrone Video-Vorstellung entlang 2–3 Leitfragen (kein Live-Call)
- **Aufnahme-UI (Sample):** Video-Intro aufnehmen mit Teleprompter der Leitfragen
- **Matches & Profil**

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
```

## Build (für Deployment)

```bash
npm run build      # -> dist/  (statische Dateien)
npm run preview    # baut nicht, sondern serviert dist/ lokal
```

## Deployment

Reine statische SPA — Build-Command `npm run build`, Output-Ordner `dist`.
Läuft ohne Anpassung auf Vercel, Netlify, Cloudflare Pages o. Ä.

## Stack

Vite · React · TypeScript · framer-motion. Keine Backend-Abhängigkeit.
Video-Clips werden client-seitig von Pexels geladen.
