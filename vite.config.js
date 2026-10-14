import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  build: {
    rolldownOptions: {
      output: {
        // Librairies séparées du code du site : elles restent en cache d'une mise à jour à l'autre.
        codeSplitting: {
          groups: [
            { name: 'react', test: /node_modules[\\/](react|react-dom|scheduler)[\\/]/ },
            { name: 'motion', test: /node_modules[\\/](framer-motion|motion-dom|motion-utils|lenis)[\\/]/ },
            { name: 'vendor', test: /node_modules/ },
          ],
        },
      },
    },
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      includeAssets: ['favicon.ico', 'logo.svg', 'apple-touch-icon-180x180.png', 'durel.jpg'],
      manifest: {
        id: '/',
        name: 'Dideroh Durel Ayile · Développeur web',
        short_name: 'DIDEROH',
        description:
          'Dideroh Durel Ayile, développeur web Laravel et React à Douala : sites vitrines, boutiques en ligne Mobile Money et applications de gestion scolaire.',
        lang: 'fr',
        start_url: '/',
        scope: '/',
        display: 'standalone',
        background_color: '#0f172a',
        theme_color: '#1d4ed8',
        categories: ['business', 'productivity'],
        icons: [
          { src: 'pwa-64x64.png', sizes: '64x64', type: 'image/png' },
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png' },
          { src: 'maskable-icon-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
        ],
      },
      workbox: {
        // Les polices ne sont précachées que pour les alphabets latins (FR, EN, ES, DE, PL, IT).
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,webp}', '**/*-latin-*.woff2'],
        navigateFallback: '/index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
