const env = import.meta.env;

/**
 * Build-time identity for one client deployment. The live name, description
 * and contact details are replaced by the published Suite storefront after
 * the first API response; these values keep the initial HTML and failure state
 * honest for the tenant being deployed.
 */
export const STOREFRONT_CONFIG = {
  slug: env.VITE_SUITE_STOREFRONT ?? 'techiebase',
  name: env.VITE_SITE_NAME ?? 'TechieBase',
  origin: (env.VITE_SITE_ORIGIN ?? 'https://techiebaseng.com').replace(/\/+$/, ''),
  supportWhatsApp: (env.VITE_SUPPORT_WHATSAPP ?? '2348143270982').replace(/\D/g, ''),
  staticFallback: env.VITE_STATIC_FALLBACK !== 'false',
  catalogueFallback: env.VITE_CATALOGUE_FALLBACK === 'true',
  contentFallback: env.VITE_CONTENT_FALLBACK === 'true',
} as const;

export const storageKey = (key: string) => `storefront.${STOREFRONT_CONFIG.slug}.${key}`;
