[![Netlify Status](https://api.netlify.com/api/v1/badges/c601cceb-8179-4a84-908c-f0526c50ca70/deploy-status)](https://app.netlify.com/sites/maxxcrawford/deploys)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

# Tulsa UX Website
Website for TulsaUX.com

> Tulsa UX meets once a month to discuss the latest UX/UI trends, hear from industry professionals in our community and discuss best HCD practices!

## Local development

With Node.js 20.19 or 22.12 and newer, run:

```sh
npm ci
npm run dev
```

Open http://localhost:5173. Vite reloads the page when HTML changes and updates the stylesheet in the browser when the compiled CSS changes.

## Compile SASS

1. Make sure you have SASS installed.

        $ sass -v

2. If you don't, install it here: [http://sass-lang.com/install](http://sass-lang.com/install)

3. Once installed, navigate to the CSS directory:

        $ cd assets/css

4. Run the following command to compile/watch the SCSS directory for changes.

        $ sass --watch scss/style.scss:style.css

Run the Sass watcher alongside `npm run dev` when editing SCSS.
