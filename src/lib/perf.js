/**
 * Mode allégé : téléphones et tablettes (écran tactile, pas de souris).
 * Les effets coûteux pour le GPU (flous animés, backdrop-filter, défilement inertiel)
 * y sont remplacés par des versions plus simples. Même requête que la classe `lite`
 * posée sur <html> par le script d'index.html : la garder alignée.
 */
export const LITE =
  typeof window !== 'undefined' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches
