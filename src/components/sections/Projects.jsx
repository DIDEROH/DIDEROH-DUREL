import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowUpRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { PROJECTS } from '../../data/site'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useScrollLock } from '../../hooks/useScroll'
import { EASE_OUT, cn } from '../../lib/motion'
import { GitHubIcon } from '../ui/Icons'
import SectionHeading from '../ui/SectionHeading'

const LAYOUT = { type: 'spring', stiffness: 210, damping: 30 }

function useTagLabel() {
  const { t, i18n } = useTranslation()
  return (tag) => (i18n.exists(`projects.tags.${tag}`) ? t(`projects.tags.${tag}`) : tag)
}

/** Visuel du projet : faux navigateur en dégradé, formes qui bougent au survol. */
function ProjectVisual({ project, large }) {
  const Icon = project.icon
  return (
    <motion.div
      layoutId={`visual-${project.id}`}
      transition={LAYOUT}
      style={{ background: project.gradient, borderRadius: 20 }}
      className={cn('relative overflow-hidden', large ? 'aspect-video' : 'aspect-16/10')}
    >
      <div className="absolute inset-x-0 top-0 flex items-center gap-1.5 bg-black/15 px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/45" />
        <span className="size-2.5 rounded-full bg-white/30" />
        <span className="size-2.5 rounded-full bg-white/20" />
        <span className="ml-3 truncate rounded-full bg-white/15 px-3 py-0.5 text-[11px] font-medium text-white/85">
          {project.domain}
        </span>
      </div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(rgb(255_255_255/0.12)_1px,transparent_1px),linear-gradient(90deg,rgb(255_255_255/0.12)_1px,transparent_1px)] bg-size-[28px_28px] mask-[radial-gradient(circle_at_75%_65%,black,transparent_70%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -right-12 -bottom-14 size-56 rounded-full border border-white/25 transition-transform duration-700 ease-out-expo group-hover:scale-125"
      />
      <div
        aria-hidden="true"
        className="absolute right-12 bottom-10 size-20 rounded-full bg-white/15 transition-transform duration-700 ease-out-expo group-hover:translate-x-3 group-hover:-translate-y-5"
      />
      <Icon
        aria-hidden="true"
        className="absolute top-14 right-6 size-24 text-white/20 transition-transform duration-700 ease-out-expo group-hover:scale-110 group-hover:rotate-12"
      />
      <div className="absolute right-24 bottom-6 left-6 space-y-2.5">
        <p className="font-display text-3xl font-bold tracking-tight text-white drop-shadow-md sm:text-4xl">
          {project.short}
        </p>
        <div className="h-2 w-2/3 rounded-full bg-white/35 transition-all duration-700 ease-out-expo group-hover:w-5/6" />
        <div className="h-2 w-1/2 rounded-full bg-white/20 transition-all delay-75 duration-700 ease-out-expo group-hover:w-2/3" />
      </div>
    </motion.div>
  )
}

function Tags({ project, className }) {
  const label = useTagLabel()
  return (
    <ul className={cn('flex flex-wrap gap-1.5', className)}>
      {project.tags.map((tag) => (
        <li key={tag} className="rounded-full border border-base-content/12 px-2.5 py-0.5 text-xs text-base-content/70">
          {label(tag)}
        </li>
      ))}
    </ul>
  )
}

function ProjectCard({ project, onOpen, className, ...motionProps }) {
  const { t } = useTranslation()
  return (
    <motion.li
      {...motionProps}
      layoutId={`card-${project.id}`}
      transition={LAYOUT}
      style={{ borderRadius: 28 }}
      data-cursor={t('projects.view')}
      className={cn(
        'group relative shrink-0 cursor-pointer border border-base-content/10 bg-base-100/70 p-2.5 shadow-xl shadow-base-content/5 backdrop-blur-sm transition-colors duration-500 hover:border-primary/40',
        className,
      )}
    >
      <ProjectVisual project={project} />
      <div className="px-3 pt-5 pb-3">
        <div className="flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
            {t(`projects.${project.kind}`)}
          </span>
          <span className="grid size-9 place-items-center rounded-full bg-base-content/5 transition-all duration-500 ease-out-expo group-hover:rotate-45 group-hover:bg-primary group-hover:text-primary-content">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </div>
        <motion.h3 layoutId={`title-${project.id}`} transition={LAYOUT} className="mt-2 text-2xl font-semibold">
          {project.name}
        </motion.h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-base-content/70">
          {t(`projects.items.${project.id}`)}
        </p>
        <Tags project={project} className="mt-4" />
      </div>
      <button
        type="button"
        onClick={() => onOpen(project.id)}
        aria-label={t('projects.open', { name: project.name })}
        className="absolute inset-0 z-10 cursor-pointer rounded-[28px]"
      />
    </motion.li>
  )
}

function ProjectModal({ project, onClose }) {
  const { t } = useTranslation()
  const closeRef = useRef(null)
  useScrollLock(true)

  useEffect(() => {
    const previous = document.activeElement
    closeRef.current?.focus({ preventScroll: true })
    const handleKey = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('keydown', handleKey)
      previous?.focus?.({ preventScroll: true })
    }
  }, [onClose])

  const external = project.url.includes('github.com')
  const reveal = {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT, delay: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.12 } },
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-70 bg-base-300/60 backdrop-blur-md"
      />
      <div className="pointer-events-none fixed inset-0 z-71 grid place-items-center p-3 sm:p-8">
        <motion.div
          layoutId={`card-${project.id}`}
          transition={LAYOUT}
          style={{ borderRadius: 28 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`project-title-${project.id}`}
          data-lenis-prevent
          className="pointer-events-auto relative max-h-[92svh] w-full max-w-3xl overflow-y-auto border border-base-content/10 bg-base-100 p-2.5 shadow-2xl"
        >
          <div className="relative">
            <ProjectVisual project={project} large />
            <motion.button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label={t('a11y.close')}
              initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
              animate={{ opacity: 1, scale: 1, rotate: 0, transition: { delay: 0.25 } }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="absolute top-12 right-4 grid size-11 place-items-center rounded-full bg-black/25 text-white backdrop-blur transition-colors hover:bg-black/40"
            >
              <X className="size-5" aria-hidden="true" />
            </motion.button>
          </div>
          <div className="px-4 pt-6 pb-5 sm:px-7 sm:pb-7">
            <motion.p {...reveal} className="text-xs font-semibold tracking-[0.15em] text-primary uppercase">
              {t(`projects.${project.kind}`)}
            </motion.p>
            <motion.h3
              layoutId={`title-${project.id}`}
              transition={LAYOUT}
              id={`project-title-${project.id}`}
              className="mt-2 text-3xl font-semibold sm:text-4xl"
            >
              {project.name}
            </motion.h3>
            <motion.div {...reveal}>
              <p className="mt-4 text-base leading-relaxed text-base-content/75 sm:text-lg">
                {t(`projects.items.${project.id}`)}
              </p>
              <Tags project={project} className="mt-5" />
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group btn mt-8 h-12 gap-2 rounded-full border-0 px-6 btn-primary shadow-lg shadow-primary/25"
              >
                {external && <GitHubIcon className="size-4" />}
                {external ? t('projects.github') : t('projects.visit')}
                <ArrowUpRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}

/** Desktop : la section est épinglée et le défilement vertical fait glisser les projets horizontalement. */
function HorizontalProjects({ heading, onOpen }) {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const distance = useMotionValue(0)
  const [height, setHeight] = useState(0)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const track = trackRef.current
    const observer = new ResizeObserver(() => {
      const value = Math.max(0, track.scrollWidth - document.documentElement.clientWidth)
      distance.set(value)
      setHeight(value)
    })
    observer.observe(track)
    observer.observe(document.documentElement)
    return () => observer.disconnect()
  }, [distance])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(() => -scrollYProgress.get() * distance.get())
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setCurrent(Math.min(PROJECTS.length - 1, Math.floor(v * PROJECTS.length)))
  })

  return (
    <div ref={sectionRef} className="relative" style={{ height: `calc(100vh + ${height}px)` }}>
      <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
        <motion.ul
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-center gap-6 pr-[10vw] pl-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
        >
          <li className="w-104 shrink-0 pr-6">
            {heading}
            <p className="flex items-center gap-4 font-mono text-sm text-base-content/50">
              <span className="text-2xl font-semibold text-base-content">
                {String(current + 1).padStart(2, '0')}
              </span>
              <span className="relative h-px w-24 overflow-hidden bg-base-content/15">
                <motion.span
                  style={{ scaleX: scrollYProgress }}
                  className="absolute inset-0 origin-left bg-primary"
                />
              </span>
              {String(PROJECTS.length).padStart(2, '0')}
            </p>
          </li>
          {PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={onOpen}
              className="w-[clamp(20rem,32vw,28rem)]"
            />
          ))}
        </motion.ul>
      </div>
    </div>
  )
}

export default function Projects() {
  const { t } = useTranslation()
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const [selected, setSelected] = useState(null)
  const close = useCallback(() => setSelected(null), [])
  const project = PROJECTS.find((p) => p.id === selected)

  const heading = (
    <SectionHeading
      index="02"
      label={t('projects.label')}
      title={t('projects.title')}
      sub={t('projects.sub')}
      className="md:mb-10"
    />
  )

  return (
    <LayoutGroup id="projects">
      <section id="projets" className="relative">
        {isDesktop ? (
          <HorizontalProjects heading={heading} onOpen={setSelected} />
        ) : (
          <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
            {heading}
            <ul className="grid gap-6 sm:grid-cols-2">
              {PROJECTS.map((p, i) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onOpen={setSelected}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: { duration: 0.9, ease: EASE_OUT, delay: (i % 2) * 0.1 },
                  }}
                  viewport={{ once: true, amount: 0.2 }}
                />
              ))}
            </ul>
          </div>
        )}
      </section>

      <AnimatePresence>
        {project && <ProjectModal key={project.id} project={project} onClose={close} />}
      </AnimatePresence>
    </LayoutGroup>
  )
}
