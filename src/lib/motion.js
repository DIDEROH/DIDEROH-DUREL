export const EASE_OUT = [0.16, 1, 0.3, 1]
export const EASE_IN_OUT = [0.76, 0, 0.24, 1]

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE_OUT } },
}

export const blurUp = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: EASE_OUT } },
}

export const staggerContainer = (stagger = 0.08, delayChildren = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren } },
})

export const inView = { initial: 'hidden', whileInView: 'show', viewport: { once: true, amount: 0.3 } }

export const cn = (...classes) => classes.filter(Boolean).join(' ')
