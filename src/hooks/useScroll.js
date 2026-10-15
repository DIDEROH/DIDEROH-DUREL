import { useLenis } from 'lenis/react'
import { useCallback, useEffect } from 'react'

/** Défilement fluide vers une ancre (#id) ou vers le haut de page (#top), avec ou sans Lenis. */
export function useScrollTo() {
  const lenis = useLenis()
  return useCallback(
    (hash) => {
      const target = hash === '#top' ? 0 : document.querySelector(hash)
      if (target == null) return
      if (lenis) {
        lenis.start()
        lenis.scrollTo(target, { duration: 1.6 })
      } else {
        // Sans Lenis (écran tactile) : défilement fluide natif, sauf si l'utilisateur réduit les animations.
        const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
        if (target === 0) window.scrollTo({ top: 0, behavior })
        else target.scrollIntoView({ behavior })
      }
      history.replaceState(null, '', hash === '#top' ? location.pathname : hash)
    },
    [lenis],
  )
}

/** Bloque le défilement de la page (menu mobile, modale). */
export function useScrollLock(locked) {
  const lenis = useLenis()
  useEffect(() => {
    if (!locked) return
    const root = document.documentElement
    const previous = root.style.overflow
    lenis?.stop()
    root.style.overflow = 'hidden'
    return () => {
      lenis?.start()
      root.style.overflow = previous
    }
  }, [locked, lenis])
}
