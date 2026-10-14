import { motion, useMotionTemplate, useMotionValue } from 'framer-motion'
import { cn } from '../../lib/motion'

/** Carte avec un halo lumineux qui suit le curseur. */
export default function SpotlightCard({ children, className, ...props }) {
  const mx = useMotionValue(-500)
  const my = useMotionValue(-500)
  const background = useMotionTemplate`radial-gradient(380px circle at ${mx}px ${my}px, color-mix(in oklab, var(--color-primary) 16%, transparent), transparent 70%)`

  function handleMove(event) {
    const rect = event.currentTarget.getBoundingClientRect()
    mx.set(event.clientX - rect.left)
    my.set(event.clientY - rect.top)
  }

  return (
    <motion.div onPointerMove={handleMove} className={cn('group relative overflow-hidden', className)} {...props}>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  )
}
