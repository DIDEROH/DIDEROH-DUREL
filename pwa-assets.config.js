import { defineConfig, minimal2023Preset } from '@vite-pwa/assets-generator/config'

// Génère les icônes PWA (favicon, apple-touch, maskable) à partir de public/logo.svg :
// npm run generate-pwa-assets
export default defineConfig({
  headLinkOptions: { preset: '2023' },
  preset: {
    ...minimal2023Preset,
    maskable: { ...minimal2023Preset.maskable, resizeOptions: { background: '#1d4ed8' } },
    apple: { ...minimal2023Preset.apple, resizeOptions: { background: '#1d4ed8' } },
  },
  images: ['public/logo.svg'],
})
