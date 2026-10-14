import { AnimatePresence, motion } from 'framer-motion'
import { Check, Palette } from 'lucide-react'
import { useCallback, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { THEMES } from '../../data/site'
import { useDismiss } from '../../hooks/useDismiss'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../lib/motion'
import { switchTheme } from '../../lib/theme'

/** Point de départ du dévoilement circulaire : le clic, ou le centre du bouton au clavier. */
function originOf(event) {
  if (event.detail > 0) return { x: event.clientX, y: event.clientY }
  const rect = event.currentTarget.getBoundingClientRect()
  return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 }
}

function Swatch({ id, className }) {
  return (
    <span
      data-theme={id}
      className={cn('flex shrink-0 items-center gap-0.5 rounded-lg bg-base-100 p-1.5 ring-1 ring-base-content/15', className)}
    >
      <span className="size-2.5 rounded-full bg-primary" />
      <span className="size-2.5 rounded-full bg-secondary" />
      <span className="size-2.5 rounded-full bg-accent" />
    </span>
  )
}

export default function ThemeSwitcher() {
  const { t } = useTranslation()
  const theme = useTheme()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const close = useCallback(() => setOpen(false), [])
  useDismiss(open, close, ref)

  const CurrentIcon = THEMES.find((item) => item.id === theme)?.icon ?? Palette

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={t('a11y.theme')}
        aria-expanded={open}
        className="btn btn-circle border-0 btn-ghost btn-sm hover:bg-primary/10"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ rotate: -120, scale: 0, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 1 }}
            exit={{ rotate: 120, scale: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="flex"
          >
            <CurrentIcon className="size-[18px]" aria-hidden="true" />
          </motion.span>
        </AnimatePresence>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="glass absolute top-full right-0 mt-3 w-60 origin-top-right rounded-2xl p-2 shadow-2xl shadow-base-content/10"
          >
            <p className="px-3 pt-2 pb-2 text-[11px] font-semibold tracking-[0.2em] text-base-content/50 uppercase">
              {t('theme.label')}
            </p>
            <ul>
              {THEMES.map((item, i) => {
                const active = item.id === theme
                const Icon = item.icon
                return (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0, transition: { delay: i * 0.04 } }}
                  >
                    <button
                      type="button"
                      aria-pressed={active}
                      onClick={(event) => {
                        switchTheme(item.id, originOf(event))
                        setOpen(false)
                      }}
                      className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors hover:bg-base-content/5"
                    >
                      {active && (
                        <motion.span layoutId="theme-active" className="absolute inset-0 rounded-xl bg-primary/10" />
                      )}
                      <Swatch id={item.id} className="relative" />
                      <span className="relative flex-1 text-left font-medium">{t(`theme.names.${item.id}`)}</span>
                      {active ? (
                        <Check className="relative size-4 text-primary" aria-hidden="true" />
                      ) : (
                        <Icon className="relative size-4 text-base-content/40" aria-hidden="true" />
                      )}
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

/** Version compacte (menu mobile) : une rangée de pastilles. */
export function ThemeSwatches() {
  const { t } = useTranslation()
  const theme = useTheme()
  return (
    <div className="flex flex-wrap gap-2">
      {THEMES.map((item) => (
        <button
          key={item.id}
          type="button"
          aria-pressed={item.id === theme}
          aria-label={t(`theme.names.${item.id}`)}
          onClick={(event) => switchTheme(item.id, originOf(event))}
          className={cn(
            'rounded-xl p-1 transition-all',
            item.id === theme ? 'ring-2 ring-primary' : 'ring-1 ring-base-content/10',
          )}
        >
          <Swatch id={item.id} />
        </button>
      ))}
    </div>
  )
}
