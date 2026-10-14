import { THEMES } from '../data/site'

const listeners = new Set()

export const getTheme = () => document.documentElement.dataset.theme ?? 'light'

export function subscribeTheme(listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function applyTheme(id) {
  document.documentElement.dataset.theme = id
  const meta = THEMES.find((theme) => theme.id === id)?.meta
  if (meta) document.querySelector('meta[name="theme-color"]')?.setAttribute('content', meta)
  try {
    localStorage.setItem('theme', id)
  } catch {
    /* stockage indisponible (navigation privée) : le thème ne sera simplement pas mémorisé */
  }
  listeners.forEach((listener) => listener())
}

/**
 * Change de thème avec un dévoilement circulaire depuis le point cliqué
 * (View Transitions API), ou instantanément si le navigateur ne le permet pas.
 */
export function switchTheme(id, origin) {
  if (id === getTheme()) return
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!document.startViewTransition || reduced || !origin) {
    applyTheme(id)
    return
  }

  const { x, y } = origin
  const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y))
  const transition = document.startViewTransition(() => applyTheme(id))
  transition.ready.then(() => {
    document.documentElement.animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
      { duration: 800, easing: 'cubic-bezier(0.76, 0, 0.24, 1)', pseudoElement: '::view-transition-new(root)' },
    )
  })
}
