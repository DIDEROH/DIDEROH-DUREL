import { AnimatePresence, LayoutGroup, motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SKILLS, SKILL_FILTERS } from '../../data/site'
import { EASE_OUT, cn } from '../../lib/motion'
import SectionHeading from '../ui/SectionHeading'

const SPRING = { type: 'spring', stiffness: 320, damping: 32 }

function SkillTile({ skill }) {
  const { t } = useTranslation()
  const Icon = skill.icon
  const name = skill.key ? t(`skills.names.${skill.key}`) : skill.name

  return (
    <motion.li
      layout
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.94 },
        show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: EASE_OUT } },
      }}
      exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.25 } }}
      transition={SPRING}
      whileHover={{ y: -6 }}
      style={{ borderRadius: 24 }}
      className={cn(
        'group relative flex min-h-36 flex-col justify-between overflow-hidden p-5 sm:min-h-40 sm:p-6',
        skill.featured
          ? 'col-span-2 bg-linear-to-br from-primary to-[color-mix(in_oklab,var(--color-primary)_65%,var(--color-secondary))] text-primary-content shadow-xl shadow-primary/25'
          : 'border border-base-content/10 bg-base-100/60 backdrop-blur-sm transition-colors duration-500 hover:border-primary/40',
      )}
    >
      {skill.featured && (
        <Icon
          aria-hidden="true"
          className="absolute -right-6 -bottom-8 size-44 opacity-15 transition-transform duration-1000 ease-out-expo group-hover:scale-110 group-hover:rotate-45"
        />
      )}
      <span
        className={cn(
          'relative grid size-11 place-items-center rounded-xl transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-12',
          skill.featured ? 'bg-white/20 backdrop-blur' : 'bg-primary/10 text-primary',
        )}
      >
        <Icon className="size-5" aria-hidden="true" />
      </span>
      <span className="relative mt-6 block">
        <span className={cn('block font-display font-semibold', skill.featured ? 'text-3xl sm:text-4xl' : 'text-base sm:text-lg')}>
          {name}
        </span>
        <span
          className={cn(
            'mt-1 block text-xs font-medium tracking-wide uppercase',
            skill.featured ? 'opacity-75' : 'text-base-content/50',
          )}
        >
          {t(`skills.filters.${skill.cat}`)}
        </span>
      </span>
    </motion.li>
  )
}

export default function Skills() {
  const { t } = useTranslation()
  const [filter, setFilter] = useState('all')
  const gridRef = useRef(null)
  const gridInView = useInView(gridRef, { once: true, amount: 0.15 })
  const items = SKILLS.filter((skill) => filter === 'all' || skill.cat === filter)

  return (
    <section id="competences" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="03"
            label={t('skills.label')}
            title={t('skills.title')}
            sub={t('skills.sub')}
            className="mb-0 md:mb-0"
          />
          <LayoutGroup id="skill-filters">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.2 }}
              className="glass flex w-fit flex-wrap gap-1 rounded-full p-1.5"
            >
              {SKILL_FILTERS.map((id) => (
                <button
                  key={id}
                  type="button"
                  aria-pressed={filter === id}
                  onClick={() => setFilter(id)}
                  className={cn(
                    'relative rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300',
                    filter === id ? 'text-primary-content' : 'text-base-content/70 hover:text-base-content',
                  )}
                >
                  {filter === id && (
                    <motion.span
                      layoutId="skill-filter-pill"
                      transition={SPRING}
                      className="absolute inset-0 rounded-full bg-primary shadow-lg shadow-primary/30"
                    />
                  )}
                  <span className="relative">{t(`skills.filters.${id}`)}</span>
                </button>
              ))}
            </motion.div>
          </LayoutGroup>
        </div>

        {/* `animate` plutôt que `whileInView` : les tuiles réapparaissant après un filtre héritent de « show ». */}
        <motion.ul
          ref={gridRef}
          layout
          initial="hidden"
          animate={gridInView ? 'show' : 'hidden'}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }}
          className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4"
        >
          <AnimatePresence mode="popLayout">
            {items.map((skill) => (
              <SkillTile key={skill.key ?? skill.name} skill={skill} />
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>
    </section>
  )
}
