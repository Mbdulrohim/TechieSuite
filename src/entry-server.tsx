import { renderToString } from 'react-dom/server';
import App, { CATEGORY_IDS, categoryPath, parseRoute } from './App';
import { CATEGORY_COPY } from './components/CatalogView';
import { CATEGORY_LABELS } from './data/categoryLabels';
import { ARTICLES, articleBySlug } from './data/articles';
import { LEGAL_DOCUMENTS, legalBySlug, legalIndexDescription } from './data/legal';
import { JOURNAL_INDEX_DESCRIPTION } from './components/JournalView';
import { STOREFRONT_CONFIG } from './config/storefront';

/**
 * The Node-side half of prerendering: turn one URL into real markup and the
 * page-specific tags that go around it. `scripts/prerender.mjs` is the only
 * caller — it drives this once per route in `ROUTES` below and splices the
 * result into the built `dist/index.html` template.
 *
 * Nothing here reaches for `window`. There isn't one — this runs in Node, for
 * a URL that may never be the browser's real location.
 */

const SITE_TITLE = import.meta.env.VITE_SITE_TITLE ?? `${STOREFRONT_CONFIG.name} — Devices, made easy`;
const SITE_DESCRIPTION = import.meta.env.VITE_SITE_DESCRIPTION
  ?? `Shop devices from ${STOREFRONT_CONFIG.name}.`;

export interface RenderedPage {
  /** Full HTML for the app root — what was inside <div id="root"> at request time. */
  html: string;
  title: string;
  description: string;
  /** Path only, no origin — the prerender script owns the domain. */
  path: string;
}

export const render = (url: string): RenderedPage => {
  const { pathname, search } = new URL(url, 'http://localhost');
  const route = parseRoute(pathname, search);
  const html = renderToString(<App initialRoute={route} />);

  let title = SITE_TITLE;
  let description = SITE_DESCRIPTION;

  if (route.journalSlug !== null) {
    if (route.journalSlug === '') {
      title = `The ${STOREFRONT_CONFIG.name} Journal — ${STOREFRONT_CONFIG.name}`;
      description = JOURNAL_INDEX_DESCRIPTION;
    } else {
      const article = articleBySlug(route.journalSlug);
      if (article) {
        title = `${article.title} — ${STOREFRONT_CONFIG.name}`;
        description = article.dek;
      }
    }
  } else if (route.legalSlug !== null) {
    if (route.legalSlug === '') {
      title = `Legal — ${STOREFRONT_CONFIG.name}`;
      description = legalIndexDescription();
    } else {
      const document = legalBySlug(route.legalSlug);
      if (document) {
        title = `${document.title} — ${STOREFRONT_CONFIG.name}`;
        description = document.summary;
      }
    }
  } else if (route.category !== 'all') {
    const copy = CATEGORY_COPY[route.category];
    title = `${CATEGORY_LABELS[route.category] ?? route.category} — ${STOREFRONT_CONFIG.name}`;
    description = copy?.description ?? SITE_DESCRIPTION;
  }

  return { html, title, description, path: pathname };
};

/**
 * Every URL worth handing a crawler real markup for. One entry per category
 * (skipping 'all', which is the root itself), one per journal article, one
 * per legal document, plus the three index pages.
 *
 * Deliberately NOT one entry per category-times-condition combination —
 * `/mac?condition=pre-owned` is a filter on `/mac`, not a distinct page, and
 * `/pre-owned` already exists as the dedicated pre-owned listing. Doubling the
 * route count for a query-string variant would not add anything a crawler
 * needs that the base page and `/pre-owned` don't already cover between them.
 */
const TEMPLATE_ROUTES: string[] = [
  '/',
  ...CATEGORY_IDS.filter((id) => id !== 'all').map(categoryPath),
  '/legal',
  ...LEGAL_DOCUMENTS.map((document) => `/legal/${document.slug}`),
];
export const ROUTES: string[] = STOREFRONT_CONFIG.staticFallback
  ? [...TEMPLATE_ROUTES, ...(STOREFRONT_CONFIG.contentFallback
    ? ['/journal', ...ARTICLES.map((article) => `/journal/${article.slug}`)] : ['/journal'])]
  : ['/'];
