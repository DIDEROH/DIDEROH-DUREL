import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { WHY } from '../../data/site'
import { cn } from '../../lib/motion'
import { LITE } from '../../lib/perf'
import SectionHeading from '../ui/SectionHeading'

const PALETTES = [
  'bg-primary text-primary-content',
  'bg-secondary text-secondary-content',
  'bg-neutral text-neutral-content',
]

/** Carte collante : elle se fige puis rétrécit à mesure que la suivante vient la recouvrir. */
function StackCard({ item, index, total, progress }) {
  const { t } = useTranslation()
  const Icon = item.icon
  const targetScale = 1 - (total - 1 - index) * 0.06
  const scale = useTransform(progress, [index / total, 1], [1, targetScale])
  const rotate = useTransform(progress, [0, 1], [0, 90 + index * 30])

  return (
    <div className="sticky flex h-[70vh] items-start sm:h-[75vh]" style={{ top: `calc(6rem + ${index * 1.75}rem)` }}>
      <motion.article
        style={{ scale, transformOrigin: 'top center' }}
        className={cn(
          'relative flex min-h-[22rem] w-full flex-col justify-between overflow-hidden rounded-[2rem] p-7 shadow-2xl shadow-base-content/10 sm:min-h-[26rem] sm:p-12',
          PALETTES[index % PALETTES.length],
        )}
      >
        {/* Halo flou recalculé à chaque changement d'échelle : omis sur écran tactile. */}
        {!LITE && (
          <div aria-hidden="true" className="absolute -top-1/2 -left-1/4 size-[36rem] rounded-full bg-white/10 blur-3xl" />
        )}
        <div aria-hidden="true" className="bg-noise absolute inset-0 opacity-[0.07] mix-blend-overlay" />
        <motion.span aria-hidden="true" style={{ rotate }} className="absolute -right-12 -bottom-16 opacity-10">
          <Icon className="size-72 sm:size-96" strokeWidth={1.25} />
        </motion.span>

        <div className="relative flex items-start justify-between">
          <span className="font-mono text-sm opacity-70">
            0{index + 1} / 0{total}
          </span>
          <span className="grid size-14 place-items-center rounded-2xl bg-white/15 ring-1 ring-white/20 backdrop-blur">
            <Icon className="size-6" aria-hidden="true" />
          </span>
        </div>
        <div className="relative max-w-2xl pt-16">
          <h3 className="text-3xl font-semibold sm:text-5xl">{t(`why.items.${item.id}.title`)}</h3>
          <p className="mt-4 text-base leading-relaxed opacity-85 sm:text-xl">{t(`why.items.${item.id}.desc`)}</p>
        </div>
      </motion.article>
    </div>
  )
}

export default function Why() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <section className="relative pt-20 sm:pt-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading index="04" label={t('why.label')} title={t('why.title')} />
        <div ref={ref} className="relative">
          {WHY.map((item, i) => (
            <StackCard key={item.id} item={item} index={i} total={WHY.length} progress={scrollYProgress} />
          ))}
        </div>
      </div>
    </section>
  )
}
