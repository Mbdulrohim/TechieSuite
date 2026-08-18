// Runs after `vite build`, as the second half of `pnpm run build`.
//
// Builds src/entry-server.tsx into a throwaway Node-loadable bundle, calls its
// render() once per route in ROUTES, and splices each result into the already-
// built dist/index.html — a real, populated <div id="root"> plus a page-
// specific <title>/<meta description>/canonical/OG, written to dist/<path>/
// index.html. Cloudflare Pages then serves that file directly for that path;
// no edge function or server is involved at request time.
//
// Deliberately plain Vite SSR (renderToString in Node), not a headless
// browser: no Chromium download in the CI build container, seconds instead of
// minutes, and it is the same mechanism vite-react-ssg uses internally.

import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const DIST = join(ROOT, 'dist');
const SSR_OUT = join(ROOT, 'dist-ssr');
const SITE_ORIGIN = 'https://techiebaseng.com';

const escapeHtml = (value) =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const replaceOne = (html, pattern, replacement, label) => {
  if (!pattern.test(html)) throw new Error(`prerender: template is missing ${label} — check index.html`);
  return html.replace(pattern, replacement);
};

async function main() {
  console.log('[prerender] building SSR bundle from src/entry-server.tsx...');
  await build({
    build: {
      ssr: 'src/entry-server.tsx',
      outDir: 'dist-ssr',
      emptyOutDir: true,
      ssrManifest: false,
      // A library-style single entry — nothing else needs bundling with it.
      rollupOptions: { output: { entryFileNames: 'entry-server.js' } },
    },
    logLevel: 'warn',
  });

  const { render, ROUTES } = await import(join(SSR_OUT, 'entry-server.js'));

  const template = await readFile(join(DIST, 'index.html'), 'utf-8');

  let written = 0;
  for (const route of ROUTES) {
    const { html, title, description, path } = render(`${SITE_ORIGIN}${route}`);
    const canonical = `${SITE_ORIGIN}${path === '/' ? '/' : path}`;

    let page = template;
    page = replaceOne(page, /<div id="root"><\/div>/, `<div id="root">${html}</div>`, '<div id="root">');
    page = replaceOne(page, /<title>[^<]*<\/title>/, `<title>${escapeHtml(title)}</title>`, '<title>');
    page = replaceOne(
      page,
      /<meta name="description" content="[^"]*" \/>/,
      `<meta name="description" content="${escapeHtml(description)}" />`,
      'meta description'
    );
    page = replaceOne(
      page,
      /<link rel="canonical" href="[^"]*" \/>/,
      `<link rel="canonical" href="${escapeHtml(canonical)}" />`,
      'canonical link'
    );
    page = replaceOne(
      page,
      /<meta property="og:title" content="[^"]*" \/>/,
      `<meta property="og:title" content="${escapeHtml(title)}" />`,
      'og:title'
    );
    page = replaceOne(
      page,
      /<meta property="og:description" content="[^"]*" \/>/,
      `<meta property="og:description" content="${escapeHtml(description)}" />`,
      'og:description'
    );
    page = replaceOne(
      page,
      /<meta property="og:url" content="[^"]*" \/>/,
      `<meta property="og:url" content="${escapeHtml(canonical)}" />`,
      'og:url'
    );
    page = replaceOne(
      page,
      /<meta name="twitter:title" content="[^"]*" \/>/,
      `<meta name="twitter:title" content="${escapeHtml(title)}" />`,
      'twitter:title'
    );
    page = replaceOne(
      page,
      /<meta name="twitter:description" content="[^"]*" \/>/,
      `<meta name="twitter:description" content="${escapeHtml(description)}" />`,
      'twitter:description'
    );

    const outFile = path === '/' ? join(DIST, 'index.html') : join(DIST, path.slice(1), 'index.html');
    await mkdir(dirname(outFile), { recursive: true });
    await writeFile(outFile, page, 'utf-8');
    written += 1;
  }

  // Regenerated from the same ROUTES the pages were just built from, so the
  // sitemap can never list a URL that isn't actually on disk, or omit one that is.
  const priorityFor = (path) => {
    if (path === '/') return '1.0';
    if (path.startsWith('/journal/') || path.startsWith('/legal/')) return '0.6';
    if (path === '/journal' || path === '/legal') return '0.5';
    return '0.8';
  };
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...ROUTES.map(
      (path) => `  <url><loc>${SITE_ORIGIN}${path}</loc><priority>${priorityFor(path)}</priority></url>`
    ),
    '</urlset>',
    '',
  ].join('\n');
  await writeFile(join(DIST, 'sitemap.xml'), sitemap, 'utf-8');

  await rm(SSR_OUT, { recursive: true, force: true });

  console.log(`[prerender] wrote ${written} static pages and dist/sitemap.xml`);
}

main().catch((error) => {
  console.error('[prerender] failed:', error);
  process.exitCode = 1;
});
