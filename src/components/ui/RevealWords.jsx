import { motion, useInView } from 'framer-motion'
import { Fragment, useRef } from 'react'
import { EASE_OUT, cn } from '../../lib/motion'

const word = {
  hidden: { y: '115%', rotate: 5 },
  show: { y: '0%', rotate: 0, transition: { duration: 1.05, ease: EASE_OUT } },
}

/**
 * Révèle un texte mot par mot, chaque mot sortant d'un masque.
 * `standalone` : se déclenche seul à l'entrée dans l'écran ; sinon hérite des variantes du parent.
 * Le bloc de mots change de clé avec le texte pour rejouer l'animation au changement de langue.
 * On passe par `animate` (et non `whileInView`) : les mots remontés après un changement
 * de langue héritent ainsi de l'état « show » et s'animent à nouveau.
 */
export default function RevealWords({
  text,
  as = 'span',
  className,
  wordClassName,
  delay = 0,
  stagger = 0.045,
  standalone = true,
}) {
  const Tag = motion[as]
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const words = text.split(' ')
  const trigger = standalone ? { initial: 'hidden', animate: inView ? 'show' : 'hidden' } : {}

  return (
    <Tag
      ref={ref}
      className={className}
      variants={{ hidden: {}, show: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      {...trigger}
    >
      <span className="sr-only">{text}</span>
      <motion.span
        key={text}
        aria-hidden="true"
        variants={{ hidden: {}, show: { transition: { staggerChildren: stagger } } }}
      >
        {words.map((w, i) => (
          <Fragment key={i}>
            <span className="mx-[-0.06em] mb-[-0.14em] inline-block overflow-hidden px-[0.06em] pb-[0.14em] align-top">
              <motion.span className={cn('inline-block will-change-transform', wordClassName)} variants={word}>
                {w}
              </motion.span>
            </span>
            {i < words.length - 1 && ' '}
          </Fragment>
        ))}
      </motion.span>
    </Tag>
  )
}
