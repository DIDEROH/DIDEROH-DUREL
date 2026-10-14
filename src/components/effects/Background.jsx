import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect } from 'react'

const SPRING = { stiffness: 30, damping: 20, mass: 1 }

/** Fond fixe : grille, halos « aurora » animés qui suivent doucement la souris, et grain. */
export default function Background() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)

  useEffect(() => {
    function handleMove(event) {
      mx.set((event.clientX / window.innerWidth - 0.5) * 80)
      my.set((event.clientY / window.innerHeight - 0.5) * 80)
    }
    window.addEventListener('pointermove', handleMove, { passive: true })
    return () => window.removeEventListener('pointermove', handleMove)
  }, [mx, my])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="bg-grid absolute inset-0 mask-[radial-gradient(ellipse_80%_60%_at_50%_0%,black_10%,transparent_75%)]" />

      <motion.div style={{ x, y }} className="absolute inset-0">
        <div className="absolute -top-[18vh] left-[8vw] size-[46vmax] animate-blob-a rounded-full bg-primary/25 blur-[110px]" />
        <div className="absolute top-[10vh] -right-[12vw] size-[40vmax] animate-blob-b rounded-full bg-accent/20 blur-[110px]" />
        <div className="absolute top-[55vh] left-[30vw] size-[36vmax] animate-blob-c rounded-full bg-secondary/20 blur-[120px]" />
      </motion.div>

      <div className="bg-noise absolute inset-0 opacity-[0.05] mix-blend-overlay" />
    </div>
  )
}
