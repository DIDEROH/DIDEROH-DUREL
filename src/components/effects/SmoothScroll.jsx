import { useReducedMotion } from 'framer-motion'
import { ReactLenis } from 'lenis/react'

/** Défilement inertiel (Lenis), désactivé si l'utilisateur préfère réduire les animations. */
export default function SmoothScroll({ children }) {
  const reduced = useReducedMotion()
  if (reduced) return children
  return (
    <ReactLenis root options={{ lerp: 0.09, wheelMultiplier: 1, autoRaf: true }}>
      {children}
    </ReactLenis>
  )
}
