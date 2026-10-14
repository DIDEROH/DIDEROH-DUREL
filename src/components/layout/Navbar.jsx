import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntroDone } from '../../context/intro'
import { NAV_LINKS, waLink } from '../../data/site'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollTo } from '../../hooks/useScroll'
import { EASE_OUT, cn } from '../../lib/motion'
import LanguageSwitcher from '../controls/LanguageSwitcher'
import ThemeSwitcher from '../controls/ThemeSwitcher'
import Magnetic from '../ui/Magnetic'
import RollText from '../ui/RollText'
import MobileMenu from './MobileMenu'

const SECTION_IDS = NAV_LINKS.map((link) => link.id)

export default function Navbar() {
  const { t } = useTranslation()
  const introDone = useIntroDone()
  const scrollTo = useScrollTo()
  const active = useActiveSection(SECTION_IDS)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [hovered, setHovered] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Se cache en descendant, réapparaît dès qu'on remonte.
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setHidden(y > previous && y > 280)
    setScrolled(y > 24)
  })

  function navigate(event, hash) {
    event.preventDefault()
    setMenuOpen(false)
    scrollTo(hash)
  }

  const pill = hovered ?? active
  const showMenu = menuOpen && !isDesktop

  return (
    <>
      <motion.header
        initial={{ y: -120 }}
        animate={{ y: !introDone || (hidden && !showMenu) ? -120 : 0 }}
        transition={{ duration: 0.7, ease: EASE_OUT }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          className={cn(
            'mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border py-2 pr-2 pl-3 transition-[background-color,border-color,box-shadow] duration-500 sm:pl-4',
            scrolled || showMenu ? 'glass shadow-lg shadow-base-content/5' : 'border-transparent',
          )}
        >
          <a
            href="#top"
            onClick={(event) => navigate(event, '#top')}
            aria-label={t('a11y.home')}
            className="group flex items-center gap-2.5 rounded-full font-display text-lg font-bold tracking-tight"
          >
            <img
              src="/logo.svg"
              alt=""
              width="32"
              height="32"
              className="size-8 rounded-[10px] shadow-md shadow-primary/30 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-12"
            />
            <span>
              DIDEROH<span className="text-gradient animate-gradient-pan">.</span>
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHovered(null)}>
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  onClick={(event) => navigate(event, `#${link.id}`)}
                  onMouseEnter={() => setHovered(link.id)}
                  aria-current={active === link.id ? 'true' : undefined}
                  className={cn(
                    'group relative block rounded-full px-4 py-2 text-sm font-medium transition-colors',
                    active === link.id ? 'text-primary' : 'text-base-content/75 hover:text-base-content',
                  )}
                >
                  {pill === link.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-primary/10"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <RollText className="relative">{t(link.key)}</RollText>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1">
            <LanguageSwitcher />
            <ThemeSwitcher />
            <div className="ml-1 hidden md:block">
              <Magnetic strength={0.25}>
                <a
                  href={waLink(t('wa_default'))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group btn h-10 min-h-10 gap-1.5 rounded-full border-0 px-4 btn-sm btn-primary shadow-lg shadow-primary/25"
                >
                  <RollText>{t('nav.cta')}</RollText>
                  <ArrowUpRight
                    className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              </Magnetic>
            </div>
            <button
              type="button"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={showMenu ? t('a11y.menu_close') : t('a11y.menu_open')}
              aria-expanded={showMenu}
              aria-controls="mobile-menu"
              className="btn btn-circle border-0 btn-ghost btn-sm hover:bg-primary/10 md:hidden"
            >
              <span className="relative block h-3 w-5" aria-hidden="true">
                <motion.span
                  className="absolute top-0 left-0 h-0.5 w-5 rounded-full bg-current"
                  animate={showMenu ? { top: 5, rotate: 45 } : { top: 0, rotate: 0 }}
                />
                <motion.span
                  className="absolute bottom-0 left-0 h-0.5 rounded-full bg-current"
                  animate={showMenu ? { bottom: 5, rotate: -45, width: 20 } : { bottom: 0, rotate: 0, width: 13 }}
                />
              </span>
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {showMenu && <MobileMenu active={active} onNavigate={navigate} onClose={() => setMenuOpen(false)} />}
      </AnimatePresence>
    </>
  )
}
