import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowDown, Atom, GraduationCap, Layers, Smartphone, Wallet, WifiOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useIntroDone } from '../../context/intro'
import { waLink } from '../../data/site'
import { useScrollTo } from '../../hooks/useScroll'
import { EASE_OUT, blurUp, cn, fadeUp, staggerContainer } from '../../lib/motion'
import { LITE } from '../../lib/perf'
import { WhatsAppIcon } from '../ui/Icons'
import Magnetic from '../ui/Magnetic'
import RevealWords from '../ui/RevealWords'

// Sur écran tactile, animer un flou (filter: blur) coûte trop cher : simple fondu à la place.
const enter = LITE ? fadeUp : blurUp
const WORD_BLUR = LITE ? {} : { filter: 'blur(8px)' }
const WORD_SHARP = LITE ? {} : { filter: 'blur(0px)' }

const CHIPS = [
  { label: 'React', icon: Atom, className: '-left-6 top-[12%] sm:-left-12', float: 5 },
  { label: 'Laravel', icon: Layers, className: '-right-4 top-[6%] sm:-right-10', float: 6.5 },
  { label: 'Orange Money', icon: Smartphone, className: '-right-6 top-[46%] sm:-right-14', float: 5.5 },
  { label: 'MTN MoMo', icon: Wallet, className: '-left-8 top-[58%] sm:-left-16 hidden sm:block', float: 7 },
  { labelKey: 'projects.tags.offline', icon: WifiOff, className: 'right-6 -bottom-5 sm:-right-4', float: 6 },
]

function RotatingWords({ words, active }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!active) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600)
    return () => clearInterval(timer)
  }, [active, words.length])

  const word = words[index % words.length]
  return (
    <span className="relative block h-[1.12em] overflow-hidden whitespace-nowrap">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={{ y: '100%', opacity: 0, ...WORD_BLUR }}
          animate={{ y: '0%', opacity: 1, ...WORD_SHARP }}
          exit={{ y: '-100%', opacity: 0, ...WORD_BLUR }}
          transition={{ duration: 0.75, ease: EASE_OUT }}
          className="text-gradient absolute inset-x-0 top-0 animate-gradient-pan pb-[0.1em]"
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}

function Portrait({ ready }) {
  const { t } = useTranslation()
  const ref = useRef(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-12, 12]), { stiffness: 150, damping: 18 })
  const imageX = useTransform(rotateY, [-12, 12], [10, -10])
  const imageY = useTransform(rotateX, [-10, 10], [-10, 10])
  const glareX = useTransform(px, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(py, [-0.5, 0.5], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgb(255 255 255 / 0.28), transparent 55%)`

  function handleMove(event) {
    if (event.pointerType !== 'mouse') return
    const rect = ref.current.getBoundingClientRect()
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  function reset() {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: 6, y: 60 }}
      animate={ready ? { opacity: 1, scale: 1, rotate: 0, y: 0 } : undefined}
      transition={{ duration: 1.4, ease: EASE_OUT, delay: 0.35 }}
      className="relative mx-auto w-full max-w-76 perspective-[1100px] sm:max-w-88 lg:mr-0"
    >
      {/* Orbite décorative */}
      <div
        aria-hidden="true"
        className="absolute -inset-10 animate-spin-slower rounded-full border border-dashed border-primary/25 sm:-inset-16"
      />
      <div aria-hidden="true" className="absolute inset-6 rounded-[3rem] bg-primary/40 blur-3xl" />

      <motion.div
        ref={ref}
        onPointerMove={handleMove}
        onPointerLeave={reset}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative"
      >
        {/* Bordure lumineuse en rotation */}
        <div className="relative overflow-hidden rounded-[2.2rem] p-0.5 shadow-2xl shadow-primary/30">
          <div
            aria-hidden="true"
            className="absolute inset-[-60%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0deg,var(--color-primary)_70deg,var(--color-accent)_140deg,transparent_200deg,var(--color-secondary)_290deg,transparent_360deg)]"
          />
          <div className="relative aspect-4/5 overflow-hidden rounded-[calc(2.2rem-2px)] bg-base-200">
            <motion.img
              src="/durel.jpg"
              alt={t('hero.photo_alt')}
              width="640"
              height="800"
              fetchPriority="high"
              style={{ x: imageX, y: imageY, scale: 1.1 }}
              className="h-full w-full object-cover"
            />
            <motion.div aria-hidden="true" style={{ background: glare }} className="absolute inset-0 mix-blend-soft-light" />
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/45 to-transparent" />
          </div>
        </div>

        {/* Badge diplôme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 1.1 }}
          style={{ translateZ: 60 }}
          className="glass absolute -bottom-6 -left-4 flex items-center gap-3 rounded-2xl px-4 py-3 shadow-xl sm:-left-10"
        >
          <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-content">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span className="leading-tight">
            <b className="block font-display text-sm">Laravel · React</b>
            <span className="text-xs text-base-content/70">{t('hero.badge')}</span>
          </span>
        </motion.div>
      </motion.div>

      {/* Pastilles flottantes */}
      {CHIPS.map((chip, i) => {
        const Icon = chip.icon
        return (
          <motion.div
            key={chip.labelKey ?? chip.label}
            initial={{ opacity: 0, scale: 0.4 }}
            animate={ready ? { opacity: 1, scale: 1 } : undefined}
            transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 1 + i * 0.12 }}
            className={cn('absolute z-10', chip.className)}
          >
            <motion.span
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: chip.float, repeat: Infinity, ease: 'easeInOut' }}
              className="glass flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold whitespace-nowrap shadow-lg"
            >
              <Icon className="size-3.5 text-primary" aria-hidden="true" />
              {chip.labelKey ? t(chip.labelKey) : chip.label}
            </motion.span>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

export default function Hero() {
  const { t } = useTranslation()
  const ready = useIntroDone()
  const scrollTo = useScrollTo()
  const sectionRef = useRef(null)

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const photoY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const fade = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const blur = useTransform(scrollYProgress, [0, 0.75], [0, 10])
  const filter = useMotionTemplate`blur(${blur}px)`

  const rotating = t('hero.title_rotating', { returnObjects: true })
  const state = ready ? 'show' : 'hidden'

  return (
    <section
      id="top"
      ref={sectionRef}
      className="relative flex min-h-svh items-center overflow-x-clip pt-28 pb-24 lg:pt-32"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
        <motion.div
          style={{ y: textY, opacity: fade, filter: LITE ? undefined : filter }}
          initial="hidden"
          animate={state}
          variants={staggerContainer(0.12, 0.15)}
          className="relative z-10"
        >
          <motion.span
            variants={enter}
            className="inline-flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/10 px-3.5 py-1.5 text-sm font-medium text-primary"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            {t('hero.eyebrow')}
          </motion.span>

          <h1 className="mt-6 text-[clamp(2.1rem,8.4vw,3.6rem)] leading-[1.04] font-semibold lg:text-[clamp(3rem,4.6vw,4.6rem)]">
            <span className="sr-only">
              {t('hero.title_before')} {rotating[0]} {t('hero.title_after')}
            </span>
            <span aria-hidden="true">
              <RevealWords text={t('hero.title_before')} standalone={false} className="block" />
              <motion.span
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  show: { opacity: 1, y: 0, transition: { duration: 1, ease: EASE_OUT } },
                }}
                className="block"
              >
                <RotatingWords words={rotating} active={ready} />
              </motion.span>
              <RevealWords
                text={t('hero.title_after')}
                standalone={false}
                className="block font-serif font-normal tracking-normal italic"
              />
            </span>
          </h1>

          <motion.p variants={enter} className="mt-6 max-w-xl text-base text-base-content/75 sm:text-lg">
            {t('hero.lead')}
          </motion.p>

          <motion.div variants={enter} className="mt-9 flex flex-wrap items-center gap-3 sm:gap-4">
            <Magnetic>
              <a
                href={waLink(t('wa_default'))}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn relative h-14 overflow-hidden rounded-full border-0 px-7 text-base btn-primary shadow-xl shadow-primary/30"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-y-0 left-0 w-1/3 animate-shine bg-linear-to-r from-transparent via-white/35 to-transparent"
                />
                <WhatsAppIcon className="relative size-5 transition-transform duration-500 group-hover:rotate-360" />
                <span className="relative">{t('hero.cta_wa')}</span>
              </a>
            </Magnetic>
            <Magnetic strength={0.2}>
              <a
                href="#projets"
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo('#projets')
                }}
                className="group btn h-14 gap-3 rounded-full border-base-content/15 bg-base-100/40 px-6 text-base backdrop-blur btn-outline hover:border-primary hover:bg-primary/10 hover:text-primary"
              >
                {t('hero.cta_work')}
                <span className="relative grid size-7 place-items-center overflow-hidden rounded-full bg-base-content/10 group-hover:bg-primary group-hover:text-primary-content">
                  <ArrowDown
                    className="size-4 transition-transform duration-500 ease-out-expo group-hover:translate-y-7"
                    aria-hidden="true"
                  />
                  <ArrowDown
                    className="absolute size-4 -translate-y-7 transition-transform duration-500 ease-out-expo group-hover:translate-y-0"
                    aria-hidden="true"
                  />
                </span>
              </a>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div style={{ y: photoY }} className="relative px-8 sm:px-12 lg:px-0">
          <Portrait ready={ready} />
        </motion.div>
      </div>

      <motion.div
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 [@media(min-height:700px)]:block"
      >
        <motion.button
          type="button"
          onClick={() => scrollTo('#services')}
          initial={{ opacity: 0, y: -10 }}
          animate={ready ? { opacity: 1, y: 0 } : undefined}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-[11px] font-semibold tracking-[0.25em] text-base-content/50 uppercase transition-colors hover:text-primary"
        >
          <span className="flex h-9 w-5.5 justify-center rounded-full border-2 border-current pt-1.5 opacity-60">
            <motion.span
              className="h-2 w-1 rounded-full bg-primary"
              animate={{ y: [0, 10, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
          {t('hero.scroll')}
        </motion.button>
      </motion.div>
    </section>
  )
}
