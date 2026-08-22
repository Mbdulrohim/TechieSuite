import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  const siteName = process.env.VITE_SITE_NAME || 'TechieBase';
  const siteOrigin = (process.env.VITE_SITE_ORIGIN || 'https://techiebaseng.com').replace(/\/+$/, '');
  const siteDescription = process.env.VITE_SITE_DESCRIPTION
    || (siteName === 'TechieBase'
      ? 'Shop genuine Apple devices in Nigeria with expert support, nationwide delivery, trade-in, and flexible payment options.'
      : `Shop devices from ${siteName}.`);
  return {
    plugins: [react(), tailwindcss(), {
      name: 'tenant-storefront-metadata',
      transformIndexHtml(html) {
        if (siteName === 'TechieBase') return html;
        const structuredData = JSON.stringify({
          '@context': 'https://schema.org', '@type': 'Store', name: siteName,
          url: `${siteOrigin}/`, description: siteDescription,
          areaServed: 'NG', currenciesAccepted: 'NGN',
        }, null, 2);
        return html
          .replaceAll('TechieBase — Apple devices, made easy in Nigeria', `${siteName} — Devices, made easy`)
          .replaceAll('Shop genuine Apple devices in Nigeria with expert support, nationwide delivery, trade-in, and flexible payment options.', siteDescription)
          .replaceAll('https://techiebaseng.com', siteOrigin)
          .replaceAll('content="TechieBase"', `content="${siteName}"`)
          .replace(/<meta property="og:image"[\s\S]*?<meta property="og:image:alt"[^>]*>\s*/, '')
          .replace(/<meta name="twitter:image"[^>]*>\s*/, '')
          .replace(/<link rel="apple-touch-icon"[^>]*>\s*/, '')
          .replace('href="/favicon.svg"', 'href="/client-favicon.svg"')
          .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/,
            `<script type="application/ld+json">${structuredData}</script>`);
      },
    }],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
