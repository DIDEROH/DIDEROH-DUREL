import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageTransitionContext } from '../../context/language'
import { LANGUAGES } from '../../data/site'
import { EASE_IN_OUT, EASE_OUT } from '../../lib/motion'

const curtain = {
  initial: { clipPath: 'inset(100% 0% 0% 0%)' },
  covered: { clipPath: 'inset(0% 0% 0% 0%)', transition: { duration: 0.65, ease: EASE_IN_OUT } },
  exit: { clipPath: 'inset(0% 0% 100% 0%)', transition: { duration: 0.75, ease: EASE_IN_OUT } },
}

/**
 * Transition de page au changement de langue : un rideau monte en saluant dans
 * la nouvelle langue, le contenu est traduit pendant qu'il couvre l'écran, puis il se retire.
 */
export default function LanguageTransitionProvider({ children }) {
  const { i18n } = useTranslation()
  const reduced = useReducedMotion()
  const [target, setTarget] = useState(null)

  const changeLanguage = useCallback(
    (code) => {
      if (code === i18n.resolvedLanguage) return
      if (reduced) {
        i18n.changeLanguage(code)
        return
      }
      setTarget(LANGUAGES.find((l) => l.code === code) ?? null)
    },
    [i18n, reduced],
  )

  async function handleAnimationComplete(definition) {
    if (definition !== 'covered' || !target) return
    await i18n.changeLanguage(target.code)
    setTimeout(() => setTarget(null), 420)
  }

  return (
    <LanguageTransitionContext value={changeLanguage}>
      {children}
      <AnimatePresence>
        {target && (
          <motion.div
            key="curtain"
            role="status"
            aria-live="polite"
            variants={curtain}
            initial="initial"
            animate="covered"
            exit="exit"
            onAnimationComplete={handleAnimationComplete}
            className="fixed inset-0 z-95 flex flex-col items-center justify-center gap-6 bg-primary text-primary-content"
          >
            <div className="overflow-hidden">
              <motion.p
                initial={{ y: '110%' }}
                animate={{ y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.25 } }}
                className="font-serif text-7xl italic sm:text-9xl"
              >
                {target.greeting}
              </motion.p>
            </div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.8, y: 0, transition: { delay: 0.4 } }}
              className="flex items-center gap-2 text-sm font-semibold tracking-[0.3em] uppercase"
            >
              <Languages className="size-4" aria-hidden="true" />
              {target.label}
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageTransitionContext>
  )
}
