import { motion, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { cn } from '../../lib/motion'

const SPRING = { stiffness: 220, damping: 16, mass: 0.4 }

/** Attire légèrement son contenu vers le curseur (souris uniquement). */
export default function Magnetic({ children, strength = 0.3, className }) {
  const ref = useRef(null)
  const x = useSpring(0, SPRING)
  const y = useSpring(0, SPRING)

  function handleMove(event) {
    if (event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left - rect.width / 2) * strength)
    y.set((event.clientY - rect.top - rect.height / 2) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className={cn('inline-flex', className)}
    >
      {children}
    </motion.div>
  )
}
