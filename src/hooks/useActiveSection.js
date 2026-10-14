import { useEffect, useState } from 'react'

/**
 * Renvoie l'id de la section qui traverse le milieu de l'écran (scroll spy),
 * ou `null` entre deux sections suivies (hero, manifeste…).
 */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)

  useEffect(() => {
    const visible = new Set()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id)
          else visible.delete(entry.target.id)
        })
        setActive(ids.find((id) => visible.has(id)) ?? null)
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids
      .map((id) => document.getElementById(id))
      .filter(Boolean)
      .forEach((element) => observer.observe(element))
    return () => observer.disconnect()
  }, [ids])

  return active
}
