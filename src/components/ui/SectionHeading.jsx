import { motion } from 'framer-motion'
import { EASE_OUT, cn } from '../../lib/motion'
import RevealWords from './RevealWords'

export default function SectionHeading({ index, label, title, sub, className }) {
  return (
    <div className={cn('mb-12 max-w-3xl md:mb-16', className)}>
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        className="mb-5 flex items-center gap-3 text-xs font-semibold tracking-[0.22em] text-primary uppercase"
      >
        <span className="font-mono tracking-normal text-base-content/40">{index}</span>
        <motion.span
          className="h-px w-10 origin-left bg-primary/50"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: EASE_OUT, delay: 0.2 }}
        />
        {label}
      </motion.div>
      <RevealWords
        as="h2"
        text={title}
        className="text-4xl leading-[1.05] font-semibold sm:text-5xl md:text-6xl"
      />
      {sub && (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: EASE_OUT, delay: 0.25 }}
          className="mt-5 max-w-2xl text-lg text-base-content/70"
        >
          {sub}
        </motion.p>
      )}
    </div>
  )
}
