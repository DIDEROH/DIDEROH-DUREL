import { motion } from 'framer-motion'
import { ArrowUp, Mail, MapPin, Phone } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { CONTACT, NAV_LINKS, waLink } from '../../data/site'
import { useScrollTo } from '../../hooks/useScroll'
import { EASE_OUT } from '../../lib/motion'
import { GitHubIcon, WhatsAppIcon } from '../ui/Icons'
import Magnetic from '../ui/Magnetic'
import RollText from '../ui/RollText'

const YEAR = new Date().getFullYear()
const WORDMARK = 'DIDEROH'.split('')

function SocialLink({ href, label, children }) {
  return (
    <Magnetic strength={0.4}>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        className="grid size-11 place-items-center rounded-full border border-base-content/10 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-content"
      >
        {children}
      </a>
    </Magnetic>
  )
}

export default function Footer() {
  const { t } = useTranslation()
  const scrollTo = useScrollTo()

  return (
    <footer className="relative overflow-hidden border-t border-base-content/10 bg-base-200/40 pt-16 backdrop-blur-sm sm:pt-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight">
              <img src="/logo.svg" alt="" width="36" height="36" className="size-9 rounded-xl" />
              <span>
                DIDEROH<span className="text-primary">.</span>
              </span>
            </p>
            <p className="mt-4 max-w-sm text-base-content/70">{t('footer.tagline')}</p>
            <div className="mt-6 flex gap-2">
              <SocialLink href={waLink(t('wa_default'))} label="WhatsApp">
                <WhatsAppIcon className="size-5" />
              </SocialLink>
              <SocialLink href={CONTACT.github} label="GitHub">
                <GitHubIcon className="size-5" />
              </SocialLink>
              <SocialLink href={`mailto:${CONTACT.email}`} label="E-mail">
                <Mail className="size-5" aria-hidden="true" />
              </SocialLink>
            </div>
          </div>

          <nav aria-label={t('footer.navigation')}>
            <p className="text-xs font-semibold tracking-[0.2em] text-base-content/50 uppercase">{t('footer.navigation')}</p>
            <ul className="mt-5 space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(event) => {
                      event.preventDefault()
                      scrollTo(`#${link.id}`)
                    }}
                    className="group inline-flex font-medium transition-colors hover:text-primary"
                  >
                    <RollText>{t(link.key)}</RollText>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-xs font-semibold tracking-[0.2em] text-base-content/50 uppercase">{t('footer.contact')}</p>
            <ul className="mt-5 space-y-3 text-base-content/80">
              <li>
                <a href={waLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 hover:text-primary">
                  <Phone className="size-4 text-primary" aria-hidden="true" />
                  {CONTACT.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${CONTACT.email}`} className="inline-flex items-center gap-2.5 break-all hover:text-primary">
                  <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {CONTACT.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2.5">
                <MapPin className="size-4 text-primary" aria-hidden="true" />
                {t('contact.location')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-base-content/10 py-6 text-sm text-base-content/60 sm:flex-row">
          <p className="text-center sm:text-left">
            © {YEAR} Dideroh Durel Ayile · {t('contact.location')}
          </p>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline">{t('footer.made')}</span>
            <Magnetic strength={0.4}>
              <button
                type="button"
                onClick={() => scrollTo('#top')}
                aria-label={t('a11y.back_top')}
                className="group relative grid size-11 place-items-center overflow-hidden rounded-full bg-primary text-primary-content shadow-lg shadow-primary/30"
              >
                <ArrowUp className="size-5 transition-transform duration-500 ease-out-expo group-hover:-translate-y-8" aria-hidden="true" />
                <ArrowUp className="absolute size-5 translate-y-8 transition-transform duration-500 ease-out-expo group-hover:translate-y-0" aria-hidden="true" />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* Logotype géant, lettres qui montent à l'apparition */}
      <motion.p
        aria-hidden="true"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
        className="mb-[-4.5vw] flex justify-center overflow-hidden font-display text-[21vw] leading-[0.85] font-bold tracking-[-0.06em] select-none"
      >
        {WORDMARK.map((letter, i) => (
          <motion.span
            key={i}
            variants={{
              hidden: { y: '100%' },
              show: { y: '0%', transition: { duration: 1.1, ease: EASE_OUT } },
            }}
            className="inline-block bg-linear-to-b from-base-content/25 to-base-content/0 bg-clip-text text-transparent transition-transform duration-500 ease-out-expo hover:translate-y-[-8%]"
          >
            {letter}
          </motion.span>
        ))}
      </motion.p>
    </footer>
  )
}
