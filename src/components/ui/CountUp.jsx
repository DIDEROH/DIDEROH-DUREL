import { animate, useInView, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { EASE_OUT, cn } from '../../lib/motion'

/** Nombre qui défile jusqu'à sa valeur à l'entrée dans l'écran, formaté selon la langue. */
export default function CountUp({ value, className }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.8 })
  const reduced = useReducedMotion()
  const [current, setCurrent] = useState(0)
  const { i18n } = useTranslation()

  useEffect(() => {
    if (!isInView || reduced) return
    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE_OUT,
      onUpdate: (v) => setCurrent(Math.round(v)),
    })
    return () => controls.stop()
  }, [isInView, reduced, value])

  const shown = reduced ? value : current
  return (
    <span ref={ref} className={cn('tabular-nums', className)}>
      {new Intl.NumberFormat(i18n.resolvedLanguage).format(shown)}
    </span>
  )
}
