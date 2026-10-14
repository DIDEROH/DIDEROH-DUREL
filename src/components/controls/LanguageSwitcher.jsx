import { AnimatePresence, motion } from 'framer-motion'
import { Languages } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useChangeLanguage } from '../../context/language'
import { LANGUAGES } from '../../data/site'
import { useDismiss } from '../../hooks/useDismiss'
import { cn } from '../../lib/motion'

export default function LanguageSwitcher() {
  const { t, i18n } = useTranslation()
  const changeLanguage = useChangeLanguage()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(open, close, ref)
  const current = i18n.resolvedLanguage

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('a11y.language')}
        aria-expanded={open}
        className="btn h-8 min-h-8 gap-1.5 rounded-full border-0 px-2.5 btn-ghost btn-sm hover:bg-primary/10"
      >
        <Languages className="size-[18px]" aria-hidden="true" />
        <span className="relative h-4 w-5 overflow-hidden text-xs font-semibold uppercase">
          <AnimatePresence initial={false}>
            <motion.span
              key={current}
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.35 }}
              className="absolute inset-0 leading-4"
            >
              {current}
            </motion.span>
          </AnimatePresence>
        </span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass absolute top-full right-0 mt-3 w-56 origin-top-right rounded-2xl p-2 shadow-2xl shadow-base-content/10"
          >
            <p className="px-3 pt-2 pb-2 text-[11px] font-semibold tracking-[0.2em] text-base-content/50 uppercase">
              {t('language.label')}
            </p>
            <ul>
              {LANGUAGES.map((lang, i) => {
                const active = lang.code === current
                return (
                  <motion.li
                    key={lang.code}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.035 } }}
                  >
                    <button
                      type="button"
                      lang={lang.code}
                      aria-pressed={active}
                      onClick={() => {
                        setOpen(false)
                        changeLanguage(lang.code)
                      }}
                      className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition-colors hover:bg-base-content/5"
                    >
                      {active && (
                        <motion.span layoutId="lang-active" className="absolute inset-0 rounded-xl bg-primary/10" />
                      )}
                      <span
                        className={cn(
                          'relative grid size-7 place-items-center rounded-lg text-[11px] font-bold uppercase',
                          active ? 'bg-primary text-primary-content' : 'bg-base-content/5 text-base-content/70',
                        )}
                      >
                        {lang.code}
                      </span>
                      <span className="relative font-medium">{lang.label}</span>
                    </button>
                  </motion.li>
                )
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Version compacte (menu mobile). */
export function LanguagePills({ onSelect }) {
  const { i18n } = useTranslation()
  const changeLanguage = useChangeLanguage()
  return (
    <div className="flex flex-wrap gap-2">
      {LANGUAGES.map((lang) => {
        const active = lang.code === i18n.resolvedLanguage
        return (
          <button
            key={lang.code}
            type="button"
            lang={lang.code}
            aria-pressed={active}
            aria-label={lang.label}
            onClick={() => {
              onSelect?.()
              changeLanguage(lang.code)
            }}
            className={cn(
              'h-9 min-w-11 rounded-full px-3 text-xs font-bold uppercase transition-colors',
              active ? 'bg-primary text-primary-content' : 'bg-base-content/5 hover:bg-base-content/10',
            )}
          >
            {lang.code}
          </button>
        )
      })}
    </div>
  )
}
