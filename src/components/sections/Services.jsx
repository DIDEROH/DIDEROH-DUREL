import { motion } from 'framer-motion'
import { ArrowUpRight, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { SERVICES, waLink } from '../../data/site'
import { EASE_OUT, cn } from '../../lib/motion'
import CountUp from '../ui/CountUp'
import SectionHeading from '../ui/SectionHeading'
import SpotlightCard from '../ui/SpotlightCard'

function ServiceCard({ service, index }) {
  const { t } = useTranslation()
  const Icon = service.icon
  const title = t(`services.items.${service.id}.title`)

  const card = (
    <SpotlightCard
      className={cn(
        'flex h-full flex-col rounded-[calc(1.75rem-1px)] p-6 sm:p-7',
        service.featured ? 'bg-base-100' : 'border border-base-content/10 bg-base-100/60 backdrop-blur-sm',
      )}
    >
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <span className="grid size-14 place-items-center rounded-2xl bg-linear-to-br from-primary/15 to-accent/15 text-primary ring-1 ring-primary/15 transition-transform duration-500 ease-out-expo group-hover:scale-110 group-hover:-rotate-6">
          <Icon className="size-6" aria-hidden="true" />
        </span>
        {service.featured && (
          <span className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-xs font-semibold whitespace-nowrap text-primary-content shadow-lg shadow-primary/30">
            <Star className="size-3 fill-current" aria-hidden="true" />
            {t('services.popular')}
          </span>
        )}
      </div>

      <h3 className="relative mt-6 text-xl font-semibold">{title}</h3>
      <p className="relative mt-3 text-[15px] leading-relaxed text-base-content/70">
        {t(`services.items.${service.id}.desc`)}
      </p>

      <div className="relative mt-auto pt-8">
        <p className="text-xs font-medium tracking-wide text-base-content/55 uppercase">{t('services.from')}</p>
        <p className="mt-1 flex flex-wrap items-baseline gap-x-1.5 font-display">
          <CountUp value={service.price} className="text-3xl font-bold tracking-tight text-primary" />
          <span className="text-sm font-semibold">FCFA</span>
          {service.monthly && <span className="text-sm text-base-content/60">{t('services.month')}</span>}
        </p>
        <a
          href={waLink(t('services.wa_message', { service: title }))}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-6 flex items-center justify-between gap-2 border-t border-base-content/10 pt-4 text-sm font-semibold transition-colors hover:text-primary"
        >
          {t('services.quote')}
          <span className="grid size-8 place-items-center rounded-full bg-base-content/5 transition-all duration-500 ease-out-expo group-hover/link:rotate-45 group-hover/link:bg-primary group-hover/link:text-primary-content">
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </span>
        </a>
      </div>
    </SpotlightCard>
  )

  return (
    <motion.li
      initial={{ opacity: 0, y: 60, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 1, ease: EASE_OUT, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      style={{ transformPerspective: 1000 }}
      className={cn(service.featured && 'lg:-translate-y-4')}
    >
      {service.featured ? (
        // Bordure « faisceau » : un dégradé conique tourne derrière la carte.
        <div className="relative h-full overflow-hidden rounded-[1.75rem] p-px shadow-2xl shadow-primary/20">
          <div
            aria-hidden="true"
            className="absolute -inset-full animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0_55%,var(--color-primary)_70%,var(--color-accent)_85%,transparent_100%)]"
          />
          <div className="absolute inset-0 rounded-[1.75rem] ring-1 ring-primary/30" aria-hidden="true" />
          <div className="relative h-full">{card}</div>
        </div>
      ) : (
        <div className="h-full rounded-[1.75rem]">{card}</div>
      )}
    </motion.li>
  )
}

export default function Services() {
  const { t } = useTranslation()
  return (
    <section id="services" className="relative scroll-mt-4 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          index="01"
          label={t('services.label')}
          title={t('services.title')}
          sub={t('services.sub')}
        />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </ul>
      </div>
    </section>
  )
}
