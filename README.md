[![Netlify Status](https://api.netlify.com/api/v1/badges/c601cceb-8179-4a84-908c-f0526c50ca70/deploy-status)](https://app.netlify.com/sites/maxxcrawford/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Tulsa UX Website
Website for TulsaUX.com

> Tulsa UX meets once a month to discuss the latest UX/UI trends, hear from industry professionals in our community and discuss best HCD practices!

## Local development

With Node.js 20.19+ or 22.12+, run:

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Vite updates the page as you edit HTML, JavaScript, or Tailwind styles.

## Production build

```sh
npm run build
```

Vite writes the static site to `dist/`, which Netlify publishes. Edit event data in `public/assets/data/events.json`.
