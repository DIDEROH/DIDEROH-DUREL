import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { PROCESS } from '../../data/site'
import { EASE_OUT, cn } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

function Step({ step, index }) {
  const { t } = useTranslation()
  const Icon = step.icon
  const left = index % 2 === 0

  return (
    <li className="relative grid pb-12 pl-16 last:pb-0 md:grid-cols-2 md:pl-0">
      <motion.span
        initial={{ scale: 0.4, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: '0px 0px -35% 0px' }}
        transition={{ type: 'spring', stiffness: 260, damping: 18 }}
        className="absolute top-2 left-5 z-10 grid size-11 -translate-x-1/2 place-items-center rounded-full bg-primary text-primary-content shadow-lg ring-8 shadow-primary/30 ring-base-100 md:left-1/2"
      >
        <Icon className="size-5" aria-hidden="true" />
      </motion.span>

      <motion.div
        initial={{ opacity: 0, x: left ? -50 : 50, y: 20 }}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, margin: '0px 0px -25% 0px' }}
        transition={{ duration: 1, ease: EASE_OUT }}
        className={cn(left ? 'md:col-start-1 md:pr-16 md:text-right' : 'md:col-start-2 md:pl-16')}
      >
        <div className="group rounded-3xl border border-base-content/10 bg-base-100/60 p-6 backdrop-blur-sm transition-colors duration-500 hover:border-primary/40 sm:p-8">
          <span className="text-gradient animate-gradient-pan font-display text-5xl font-bold">0{index + 1}</span>
          <h3 className="mt-3 text-2xl font-semibold">{t(`process.steps.${step.id}.title`)}</h3>
          <p className="mt-2 leading-relaxed text-base-content/70">{t(`process.steps.${step.id}.desc`)}</p>
        </div>
      </motion.div>
    </li>
  )
}

/** Frise verticale : la ligne se dessine au fil du défilement et chaque étape s'allume. */
export default function Process() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.75', 'end 0.6'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <section className="relative overflow-x-clip py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="05" label={t('process.label')} title={t('process.title')} sub={t('process.sub')} />
        <div ref={ref} className="relative">
          <div aria-hidden="true" className="absolute top-0 bottom-0 left-5 w-px bg-base-content/10 md:left-1/2" />
          <motion.div
            aria-hidden="true"
            style={{ scaleY }}
            className="absolute top-0 bottom-0 left-5 w-0.75 -translate-x-px origin-top rounded-full bg-linear-to-b from-primary via-accent to-secondary md:left-1/2"
          />
          <ol>
            {PROCESS.map((step, i) => (
              <Step key={step.id} step={step} index={i} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
