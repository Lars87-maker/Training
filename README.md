
# AT Trainer (PWA)

Persoonlijke trainingsplanner + testmodule voor AT-sporteisen. Offline-first PWA met React, Vite, Tailwind en Workbox.

## 🔧 Tech
- React + TypeScript + Vite
- TailwindCSS
- Workbox (service worker, offline)
- IndexedDB (idb-keyval) voor testresultaten
- Recharts voor eenvoudige grafieken

## 🚀 Lokaal draaien
```bash
npm install
npm run dev
# open http://localhost:5173
```

## 🧱 Build
```bash
npm run build
npm run preview
```

## 📱 PWA
De service worker wordt tijdens `npm run build` met Workbox gegenereerd en offline-caching geactiveerd.

## 🌐 Deploy naar GitHub Pages
1. Maak een GitHub-repo en push de code.
2. (Optioneel) Stel een subpad in als je _Project Pages_ gebruikt:
   - Zet een repo secret **VITE_BASE_PATH** op `/<jouw-repo-naam>/`
3. Zet Pages aan op `Settings → Pages → Build and deployment → GitHub Actions`.
4. De meegeleverde workflow bouwt en publiceert automatisch.

## 🗂 Inhoud
- `src/data/testSpec.json` – sporteisen en teststappen
- `src/data/phases.json` – trainingsdagen per fase (gegenereerd uit je docx waar mogelijk)
- `src/data/phaseInfo.json` – volledige tekst per fase uit je docx

## ✍️ Data aanpassen
- Voeg/wiizig trainingsdagen in `src/data/phases.json`
- Pas testonderdelen aan in `src/data/testSpec.json`

## 🔒 Privacy
Alle notities en resultaten worden lokaal in de browser opgeslagen (IndexedDB).

---

_Tip_: Project Pages met subpad? Start build met:
```bash
VITE_BASE_PATH=/jouw-repo-naam/ npm run build
```


## 🚀 Deploy op Render (Docker)
1. Push deze repo naar GitHub.
2. Ga naar Render → **New +** → **Web Service** → **Build & Deploy from a Git repository**.
3. Kies deze repo. Render detecteert automatisch de `Dockerfile`.
4. Zet een env var **VITE_BASE_PATH** op `/` (of laat leeg voor `/`).  
5. Deploy. De container bouwt de app en serveert `dist/` met `serve` op poort `$PORT` (Render zet die automatisch).

**Lokale Docker test:**
```bash
docker build -t at-trainer-pwa .
docker run -p 5173:3000 -e PORT=3000 at-trainer-pwa
# open http://localhost:5173
```
