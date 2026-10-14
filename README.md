# DIDEROH · Portfolio de Dideroh Durel Ayile

Portfolio de développeur web (Douala, Cameroun), publié sur https://dideroh.github.io.

## Stack

- **React 19** + **Vite 8**
- **Tailwind CSS 4** + **daisyUI 5** : 5 thèmes (light, night, lemonade, cyberpunk, luxury) ; light et night gardent la dominante bleue
- **framer-motion** pour les animations, **Lenis** pour le défilement fluide
- **i18next** : français, anglais, espagnol, allemand, polonais et italien
- **vite-plugin-pwa** : site installable et consultable hors ligne
- Icônes **lucide-react**, polices Sora, Inter et Instrument Serif (auto-hébergées)

## Scripts

```bash
npm run dev                  # serveur de développement
npm run build                # build de production dans dist/
npm run preview              # aperçu du build (service worker compris)
npm run lint                 # ESLint
npm run generate-pwa-assets  # régénère les icônes depuis public/logo.svg
```

## Où modifier quoi

| Contenu | Fichier |
| --- | --- |
| Textes (6 langues) | `src/i18n/locales/*.json` |
| Contact, prix, projets, compétences | `src/data/site.js` |
| Couleurs des thèmes, polices, animations CSS | `src/index.css` |
| Sections de la page | `src/components/sections/` |

Pour ajouter un projet : une entrée dans `PROJECTS` (`src/data/site.js`) et sa description
dans `projects.items` de chaque fichier de langue.

## Déploiement

Chaque push sur `main` déclenche `.github/workflows/deploy.yml`, qui construit le site et le
publie sur GitHub Pages.
