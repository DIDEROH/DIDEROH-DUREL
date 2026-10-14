import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { waLink } from '../../data/site'
import { WhatsAppIcon } from '../ui/Icons'
import Magnetic from '../ui/Magnetic'

/** Bouton WhatsApp flottant, qui apparaît une fois le hero dépassé. */
export default function WhatsAppFloat() {
  const { t } = useTranslation()
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(false)
  useMotionValueEvent(scrollY, 'change', (y) => setVisible(y > 600))

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ scale: 0, rotate: -120 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 120 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className="fixed right-4 bottom-[max(1rem,env(safe-area-inset-bottom))] z-40 sm:right-6 sm:bottom-6"
        >
          <Magnetic strength={0.4}>
            <a
              href={waLink(t('wa_default'))}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('a11y.whatsapp')}
              className="group relative grid size-14 place-items-center rounded-full bg-[#16a34a] text-white shadow-xl shadow-[#16a34a]/40"
            >
              <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#16a34a] opacity-25 [animation-duration:2.4s]" />
              <WhatsAppIcon className="relative size-7 transition-transform duration-300 group-hover:scale-110" />
              <span className="pointer-events-none absolute right-full mr-3 hidden translate-x-2 rounded-full bg-base-content px-3 py-1.5 text-sm font-medium whitespace-nowrap text-base-100 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 sm:block">
                {t('a11y.whatsapp')}
              </span>
            </a>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
