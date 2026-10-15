import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useInView,
  useVelocity,
  wrap,
} from 'framer-motion'
import { Asterisk } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { cn } from '../../lib/motion'
import { LITE } from '../../lib/perf'

const TECH = ['React', 'Next.js', 'Laravel', 'Django', 'JavaScript', 'PHP', 'MySQL', 'HTML5', 'CSS3', 'PWA', 'Git & GitHub', 'Mobile Money']

/** Bandeau infini dont la vitesse, le sens et l'inclinaison suivent la vitesse de défilement. */
function VelocityRow({ items, baseVelocity, className }) {
  const reduced = useReducedMotion()
  const baseX = useMotionValue(0)
  const { scrollY } = useScroll()
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 })
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false })
  const skewX = useTransform(velocity, [-2500, 2500], [12, -12])
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`)
  const direction = useRef(1)
  const rowRef = useRef(null)
  // Hors de l'écran, inutile de recalculer la position à chaque image.
  const visible = useInView(rowRef)

  useAnimationFrame((_, delta) => {
    if (reduced || !visible) return
    const f = factor.get()
    if (f < 0) direction.current = -1
    else if (f > 0) direction.current = 1
    let move = direction.current * baseVelocity * (delta / 1000)
    move += move * Math.abs(f)
    baseX.set(baseX.get() + move)
  })

  return (
    <div ref={rowRef} className="flex overflow-hidden whitespace-nowrap">
      <motion.div style={{ x, skewX }} className={cn('flex shrink-0', className)}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} aria-hidden={copy > 0} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-5 sm:px-8">{item}</span>
                {/* Une centaine d'étoiles en rotation : figées sur écran tactile. */}
                <Asterisk className={cn('size-[0.6em] opacity-70', !LITE && 'animate-spin-slow')} aria-hidden="true" />
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  )
}

export default function Marquee() {
  const { t } = useTranslation()
  const offers = [
    t('services.items.showcase.title'),
    t('services.items.store.title'),
    t('skills.names.mm'),
    t('skills.names.pwa'),
    t('services.items.maintenance.title'),
  ]

  return (
    <section aria-label="Stack" className="relative overflow-x-clip py-16 sm:py-24">
      <div className="relative -mx-4 -rotate-2 bg-base-content py-4 text-base-100 shadow-2xl sm:py-5">
        <VelocityRow
          items={offers}
          baseVelocity={-2}
          className="font-display text-2xl font-medium tracking-tight sm:text-4xl"
        />
      </div>
      <div className="relative -mx-4 -mt-3 rotate-[1.5deg] bg-primary py-4 text-primary-content shadow-2xl shadow-primary/30 sm:py-6">
        <VelocityRow
          items={TECH}
          baseVelocity={2.5}
          className="font-display text-3xl font-semibold tracking-tight sm:text-6xl"
        />
      </div>
    </section>
  )
}
