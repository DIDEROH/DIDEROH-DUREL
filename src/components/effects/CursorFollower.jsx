import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '../../hooks/useMediaQuery'

/**
 * Anneau qui suit le curseur avec inertie. Il grossit sur les éléments cliquables
 * et affiche un libellé sur les éléments marqués `data-cursor="…"`.
 */
export default function CursorFollower() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduced = useReducedMotion()
  if (!finePointer || reduced) return null
  return <Follower />
}

function Follower() {
  const mx = useMotionValue(-100)
  const my = useMotionValue(-100)
  const x = useSpring(mx, { stiffness: 380, damping: 32, mass: 0.6 })
  const y = useSpring(my, { stiffness: 380, damping: 32, mass: 0.6 })
  const [state, setState] = useState({ visible: false, hover: false, label: '' })

  useEffect(() => {
    function handleMove(event) {
      mx.set(event.clientX)
      my.set(event.clientY)
      const target = event.target instanceof Element ? event.target : null
      const labelled = target?.closest('[data-cursor]')
      const interactive = target?.closest('a, button, [role="button"], input, label')
      const label = labelled?.getAttribute('data-cursor') ?? ''
      const hover = Boolean(interactive || labelled)
      setState((s) => (s.visible && s.hover === hover && s.label === label ? s : { visible: true, hover, label }))
    }
    function handleLeave() {
      setState((s) => ({ ...s, visible: false }))
    }
    // Un clic ouvre souvent une modale ou un menu : on oublie le libellé jusqu'au prochain mouvement.
    function handleClick() {
      setState((s) => ({ ...s, hover: false, label: '' }))
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    window.addEventListener('click', handleClick)
    document.documentElement.addEventListener('pointerleave', handleLeave)
    return () => {
      window.removeEventListener('pointermove', handleMove)
      window.removeEventListener('click', handleClick)
      document.documentElement.removeEventListener('pointerleave', handleLeave)
    }
  }, [mx, my])

  const size = state.label ? 92 : state.hover ? 56 : 30

  return (
    <motion.div aria-hidden="true" style={{ x, y }} className="pointer-events-none fixed top-0 left-0 z-80">
      <motion.div
        animate={{ width: size, height: size, opacity: state.visible ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
        className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border transition-colors duration-300 ${
          state.label
            ? 'border-transparent bg-primary text-primary-content shadow-xl shadow-primary/30'
            : state.hover
              ? 'border-primary/50 bg-primary/5'
              : 'border-base-content/30'
        }`}
      >
        <AnimatePresence>
          {state.label && (
            <motion.span
              key={state.label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="text-xs font-semibold tracking-wide uppercase"
            >
              {state.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  )
}
