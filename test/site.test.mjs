import assert from 'node:assert/strict';
import { readFile, stat } from 'node:fs/promises';
import { test } from 'node:test';

const dist = new URL('../dist/', import.meta.url);
const site = new URL('https://tulsaux.com');
const html = (await readFile(new URL('index.html', dist), 'utf8')).replace(/<!--[\s\S]*?-->/g, '');

test('the built homepage loads Tailwind CSS, a JavaScript module, and local assets', async () => {
  const paths = new Set();
  for (const [tag, element] of html.matchAll(/<(img|link|script)\b[^>]*>/gi)) {
    if (element.toLowerCase() === 'link' && !/\srel=["'](?:stylesheet|(?:shortcut )?icon)["']/i.test(tag)) {
      continue;
    }

    const reference = tag.match(/\s(?:src|href)\s*=\s*["']([^"']+)["']/i);
    if (!reference) continue;

    const url = new URL(reference[1], site);
    if (url.origin !== site.origin) continue;
    paths.add(url.pathname);
  }

  const stylesheet = [...paths].find((path) => path.endsWith('.css'));
  assert.ok(stylesheet, 'Expected the homepage to link to a local stylesheet');
  assert.match(
    await readFile(new URL(`.${stylesheet}`, dist), 'utf8'),
    /\.hidden\s*\{\s*display:\s*none\b/,
    'Expected Tailwind to generate the hidden utility used by the event script',
  );
  assert.match(
    html,
    /<script\b(?=[^>]*\stype=["']module["'])(?=[^>]*\ssrc=["']\/assets\/[^"']+\.js["'])/i,
    'Expected the homepage to load the bundled JavaScript module',
  );

  for (const path of paths) {
    const file = await stat(new URL(`.${path}`, dist));
    assert.ok(file.isFile() && file.size > 0, `Expected a nonempty file at ${path}`);
  }
});

test('the production build includes the event feed and deployment assets', async () => {
  const feed = JSON.parse(await readFile(new URL('assets/data/events.json', dist), 'utf8'));
  assert.ok(Array.isArray(feed.events), 'Expected an events array');
  for (const event of feed.events) {
    assert.match(event.date, /^\d{4}-\d{2}-\d{2}$/, 'Expected an event date in YYYY-MM-DD format');
  }

  for (const path of ['_redirects', 'CNAME', 'assets/images/map.svg', 'assets/images/map-gray.svg', 'assets/media/social.jpg']) {
    const file = await stat(new URL(path, dist));
    assert.ok(file.isFile() && file.size > 0, `Expected a nonempty file at ${path}`);
  }
});
