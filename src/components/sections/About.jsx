import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE_OUT } from '../../lib/motion'

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="inline-block">
      {children}
    </motion.span>
  )
}

/** Manifeste dont les mots s'allument un à un au rythme du défilement. */
export default function About() {
  const { t } = useTranslation()
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.45'] })
  const text = t('about.text')
  const words = text.split(' ')

  return (
    <section className="relative py-20 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="mb-8 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-primary uppercase"
        >
          <span className="size-1.5 rounded-full bg-primary" />
          {t('about.label')}
        </motion.p>
        <p
          ref={ref}
          className="font-display text-[1.75rem] leading-[1.25] font-medium tracking-tight sm:text-4xl md:text-5xl"
        >
          <span className="sr-only">{text}</span>
          <span aria-hidden="true">
            {words.map((word, i) => {
              const start = i / words.length
              return (
                <span key={`${text}-${i}`}>
                  <Word progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                    {word}
                  </Word>{' '}
                </span>
              )
            })}
          </span>
        </p>
      </div>
    </section>
  )
}
