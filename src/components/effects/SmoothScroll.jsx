import { useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'
import { LITE } from '../../lib/perf'

/**
 * Défilement inertiel (Lenis), désactivé si l'utilisateur préfère réduire les animations
 * et sur écran tactile, où le défilement natif du téléphone est plus fluide.
 */
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()
  if (reduced || LITE) return children
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}
