import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight, Check, Copy, Mail, MapPin } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { CONTACT, waLink } from '../../data/site'
import { EASE_OUT } from '../../lib/motion'
import { GitHubIcon, WhatsAppIcon } from '../ui/Icons'
import Magnetic from '../ui/Magnetic'
import RevealWords from '../ui/RevealWords'

const RADIUS = 78
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/** Badge circulaire : un texte qui tourne autour d'une flèche. */
function RotatingBadge() {
  const { t } = useTranslation()
  const id = useId()
  return (
    <Magnetic strength={0.4}>
      <a
        href={waLink(t('wa_default'))}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('a11y.whatsapp')}
        className="group relative grid size-44 place-items-center rounded-full"
      >
        <svg viewBox="0 0 200 200" aria-hidden="true" className="absolute inset-0 animate-spin-slower">
          <defs>
            <path
              id={id}
              d={`M100,100 m-${RADIUS},0 a${RADIUS},${RADIUS} 0 1,1 ${RADIUS * 2},0 a${RADIUS},${RADIUS} 0 1,1 -${RADIUS * 2},0`}
            />
          </defs>
          <text className="fill-current font-display text-[15px] font-semibold uppercase">
            <textPath href={`#${id}`} textLength={CIRCUMFERENCE - 4} lengthAdjust="spacing">
              {t('contact.circle')}
            </textPath>
          </text>
        </svg>
        <span className="grid size-20 place-items-center rounded-full bg-base-100 text-primary shadow-2xl transition-transform duration-500 ease-out-expo group-hover:scale-110">
          <ArrowUpRight className="size-8 transition-transform duration-500 group-hover:rotate-45" aria-hidden="true" />
        </span>
      </a>
    </Magnetic>
  )
}

export default function Contact() {
  const { t } = useTranslation()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2200)
    return () => clearTimeout(timer)
  }, [copied])

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      setCopied(true)
    } catch {
      window.location.href = `mailto:${CONTACT.email}`
    }
  }

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-3 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 1.2, ease: EASE_OUT }}
          className="relative isolate overflow-hidden rounded-[2.5rem] bg-primary px-6 py-14 text-primary-content shadow-2xl shadow-primary/30 sm:px-12 sm:py-20 lg:px-16"
        >
          <div aria-hidden="true" className="absolute inset-0 -z-10">
            <div className="absolute -top-1/2 -left-1/4 size-152 animate-blob-a rounded-full bg-[var(--glow-a,var(--color-accent))]/60 blur-[100px]" />
            <div className="absolute -right-1/4 -bottom-1/2 size-136 animate-blob-b rounded-full bg-[var(--glow-b,var(--color-secondary))]/80 blur-[100px]" />
            <div className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.1)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.1)_1px,transparent_1px)] bg-size-[48px_48px] mask-[radial-gradient(ellipse_at_top_right,black,transparent_65%)]" />
            <div className="bg-noise absolute inset-0 opacity-10 mix-blend-overlay" />
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <p className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] uppercase opacity-80">
                <span className="font-mono tracking-normal opacity-60">06</span>
                <span className="h-px w-10 bg-current opacity-50" />
                {t('contact.label')}
              </p>
              <RevealWords
                as="h2"
                text={t('contact.title')}
                className="text-4xl leading-[1.02] font-semibold sm:text-6xl lg:text-7xl"
              />
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 0.85, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.3 }}
                className="mt-6 max-w-xl text-lg"
              >
                {t('contact.sub')}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.45 }}
                className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
              >
                <Magnetic className="w-full sm:w-auto">
                  <a
                    href={waLink(t('wa_default'))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group btn h-14 w-full gap-3 rounded-full border-0 bg-base-100 px-6 text-base text-base-content shadow-xl hover:bg-base-100 sm:w-auto"
                  >
                    <WhatsAppIcon className="size-5 text-[#16a34a] transition-transform duration-500 group-hover:scale-125" />
                    <span>
                      <span className="sr-only">WhatsApp : </span>
                      {CONTACT.phone}
                    </span>
                  </a>
                </Magnetic>

                <div className="flex items-center gap-2">
                  <a
                    href={`mailto:${CONTACT.email}`}
                    className="btn h-14 min-w-0 flex-1 gap-2.5 rounded-full border border-primary-content/25 bg-primary-content/10 px-5 text-sm text-primary-content backdrop-blur hover:bg-primary-content/20 sm:flex-none sm:gap-3 sm:px-6 sm:text-base"
                  >
                    <Mail className="size-5 shrink-0" aria-hidden="true" />
                    <span className="truncate">{CONTACT.email}</span>
                  </a>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={copyEmail}
                      aria-label={t('contact.copy')}
                      className="btn btn-circle size-14 border border-primary-content/25 bg-primary-content/10 text-primary-content backdrop-blur hover:bg-primary-content/20"
                    >
                      <AnimatePresence mode="wait" initial={false}>
                        <motion.span
                          key={copied ? 'check' : 'copy'}
                          initial={{ scale: 0, rotate: -90 }}
                          animate={{ scale: 1, rotate: 0 }}
                          exit={{ scale: 0, rotate: 90 }}
                          transition={{ duration: 0.2 }}
                          className="flex"
                        >
                          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
                        </motion.span>
                      </AnimatePresence>
                    </button>
                    <AnimatePresence>
                      {copied && (
                        <motion.span
                          initial={{ opacity: 0, y: 8, scale: 0.9 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8 }}
                          className="absolute right-0 bottom-full mb-2 rounded-full bg-base-100 px-3 py-1.5 text-xs font-semibold whitespace-nowrap text-base-content shadow-xl"
                        >
                          {t('contact.copied')}
                        </motion.span>
                      )}
                    </AnimatePresence>
                    <span className="sr-only" aria-live="polite">
                      {copied ? t('contact.copied') : ''}
                    </span>
                  </div>
                </div>
              </motion.div>

              <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm opacity-85">
                <span className="inline-flex items-center gap-2">
                  <MapPin className="size-4" aria-hidden="true" />
                  {t('contact.location')}
                </span>
                <a
                  href={CONTACT.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 underline-offset-4 hover:underline"
                >
                  <GitHubIcon className="size-4" />
                  github.com/DIDEROH
                </a>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 120, damping: 14, delay: 0.4 }}
              className="hidden justify-self-center lg:block"
            >
              <RotatingBadge />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
