import { motion } from 'framer-motion'
import { ArrowUpRight, Mail } from 'lucide-react'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT, NAV_LINKS, waLink } from '../../data/site'
import { useScrollLock } from '../../hooks/useScroll'
import { EASE_IN_OUT, EASE_OUT, cn } from '../../lib/motion'
import { LanguagePills } from '../controls/LanguageSwitcher'
import { ThemeSwatches } from '../controls/ThemeSwitcher'
import { WhatsAppIcon } from '../ui/Icons'

const ORIGIN = 'at calc(100% - 2.4rem) 2.2rem'

export default function MobileMenu({ active, onNavigate, onClose }) {
  const { t } = useTranslation()
  useScrollLock(true)

  useEffect(() => {
    const handleKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    return () => document.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <motion.div
      id="mobile-menu"
      initial={{ clipPath: `circle(0% ${ORIGIN})` }}
      animate={{ clipPath: `circle(150% ${ORIGIN})` }}
      exit={{ clipPath: `circle(0% ${ORIGIN})`, transition: { duration: 0.6, ease: EASE_IN_OUT, delay: 0.1 } }}
      transition={{ duration: 0.8, ease: EASE_IN_OUT }}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-base-100 px-6 pt-28 pb-[max(2rem,env(safe-area-inset-bottom))] md:hidden"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-primary/20 blur-3xl" />

      <nav>
        <ul className="space-y-1">
          {NAV_LINKS.map((link, i) => (
            <li key={link.id} className="overflow-hidden">
              <motion.a
                href={`#${link.id}`}
                onClick={(event) => onNavigate(event, `#${link.id}`)}
                initial={{ y: '100%' }}
                animate={{ y: 0, transition: { duration: 0.8, ease: EASE_OUT, delay: 0.25 + i * 0.07 } }}
                exit={{ y: '100%', transition: { duration: 0.3 } }}
                className={cn(
                  'flex items-baseline gap-4 py-2 font-display text-[clamp(2rem,10vw,3rem)] font-semibold tracking-tight',
                  active === link.id ? 'text-primary' : 'text-base-content',
                )}
              >
                <span className="font-mono text-sm font-normal text-base-content/40">0{i + 1}</span>
                {t(link.key)}
              </motion.a>
            </li>
          ))}
        </ul>
      </nav>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { delay: 0.55, duration: 0.6, ease: EASE_OUT } }}
        exit={{ opacity: 0, transition: { duration: 0.2 } }}
        className="mt-auto space-y-6 pt-10"
      >
        <div className="space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-base-content/50 uppercase">{t('language.label')}</p>
          <LanguagePills onSelect={onClose} />
        </div>
        <div className="space-y-3">
          <p className="text-[11px] font-semibold tracking-[0.2em] text-base-content/50 uppercase">{t('theme.label')}</p>
          <ThemeSwatches />
        </div>
        <div className="flex flex-col gap-3 pt-2">
          <a
            href={waLink(t('wa_default'))}
            target="_blank"
            rel="noopener noreferrer"
            className="btn rounded-full btn-lg btn-primary"
          >
            <WhatsAppIcon className="size-5" />
            {t('hero.cta_wa')}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </a>
          <a href={`mailto:${CONTACT.email}`} className="btn rounded-full btn-ghost">
            <Mail className="size-4" aria-hidden="true" />
            {CONTACT.email}
          </a>
        </div>
      </motion.div>
    </motion.div>
  )
}
