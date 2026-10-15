import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LANGUAGES } from '../../data/site'
import { useScrollLock } from '../../hooks/useScroll'
import { EASE_IN_OUT } from '../../lib/motion'

const CURVE = 280

/** Intro : « Bonjour, Hello, Hola… » dans les 6 langues du site, puis le rideau se lève en se courbant. */
export default function Preloader({ onDone }) {
  const { i18n } = useTranslation()
  const [words] = useState(() => {
    const start = Math.max(0, LANGUAGES.findIndex((l) => l.code === i18n.resolvedLanguage))
    const ordered = [...LANGUAGES.slice(start), ...LANGUAGES.slice(0, start)]
    return ordered.map((l) => l.greeting)
  })
  const [{ w, h }] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  const [index, setIndex] = useState(0)
  useScrollLock(true)

  useEffect(() => {
    const last = index === words.length - 1
    // Court : sur un téléphone lent, chaque seconde d'intro retarde l'arrivée du contenu.
    const delay = index === 0 ? 600 : last ? 400 : 150
    const timer = setTimeout(last ? onDone : () => setIndex((i) => i + 1), delay)
    return () => clearTimeout(timer)
  }, [index, words.length, onDone])

  const curved = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h + CURVE} 0 ${h} L0 0`
  const flat = `M0 0 L${w} 0 L${w} ${h} Q${w / 2} ${h} 0 ${h} L0 0`
  const exit = { duration: 0.8, ease: EASE_IN_OUT, delay: 0.05 }

  return (
    <motion.div
      className="fixed inset-0 z-100 flex items-center justify-center text-neutral-content"
      exit={{ y: -(h + CURVE), transition: exit }}
    >
      <svg aria-hidden="true" className="absolute top-0 left-0 w-full" style={{ height: h + CURVE }}>
        <motion.path d={curved} exit={{ d: flat, transition: exit }} className="fill-neutral" />
      </svg>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: -40, transition: { duration: 0.4 } }}
        className="relative flex items-center gap-4 font-display text-4xl font-medium tracking-tight sm:text-6xl"
      >
        <motion.span
          className="size-3 rounded-full bg-primary sm:size-4"
          animate={{ scale: [1, 1.4, 1] }}
          transition={{ duration: 1.2, repeat: Infinity }}
        />
        <motion.span key={index} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          {words[index]}
        </motion.span>
      </motion.p>
    </motion.div>
  )
}
