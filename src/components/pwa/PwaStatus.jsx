import { AnimatePresence, motion } from 'framer-motion'
import { CircleCheck, CloudOff, RefreshCw, Wifi, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useRegisterSW } from 'virtual:pwa-register/react'
import { useOnlineStatus } from '../../hooks/useOnlineStatus'

const HOUR = 60 * 60 * 1000

/** Notifications PWA : prêt hors ligne, mise à jour disponible, perte et retour du réseau. */
export default function PwaStatus() {
  const { t } = useTranslation()
  const online = useOnlineStatus()
  const [backOnline, setBackOnline] = useState(false)
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_url, registration) {
      // Vérifie régulièrement si une nouvelle version a été publiée.
      if (registration) setInterval(() => registration.update(), HOUR)
    },
  })

  useEffect(() => {
    if (!offlineReady) return
    const timer = setTimeout(() => setOfflineReady(false), 6000)
    return () => clearTimeout(timer)
  }, [offlineReady, setOfflineReady])

  useEffect(() => {
    let timer
    function handleOnline() {
      setBackOnline(true)
      clearTimeout(timer)
      timer = setTimeout(() => setBackOnline(false), 3500)
    }
    window.addEventListener('online', handleOnline)
    return () => {
      window.removeEventListener('online', handleOnline)
      clearTimeout(timer)
    }
  }, [])

  let toast = null
  if (needRefresh) {
    toast = {
      id: 'update',
      icon: RefreshCw,
      text: t('pwa.update'),
      action: { label: t('pwa.reload'), run: () => updateServiceWorker(true) },
      close: () => setNeedRefresh(false),
    }
  } else if (!online) {
    toast = { id: 'offline', icon: CloudOff, text: t('pwa.offline') }
  } else if (backOnline) {
    toast = { id: 'online', icon: Wifi, text: t('pwa.online') }
  } else if (offlineReady) {
    toast = { id: 'ready', icon: CircleCheck, text: t('pwa.offline_ready'), close: () => setOfflineReady(false) }
  }

  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          key={toast.id}
          role="status"
          initial={{ y: 100, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 100, opacity: 0, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 26 }}
          className="glass fixed bottom-4 left-4 z-65 flex max-w-[calc(100vw-6rem)] items-center gap-3 rounded-2xl py-2.5 pr-2.5 pl-3 shadow-2xl sm:bottom-6 sm:left-6"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary">
            <toast.icon className="size-[18px]" aria-hidden="true" />
          </span>
          <p className="text-sm font-medium">{toast.text}</p>
          {toast.action && (
            <button type="button" onClick={toast.action.run} className="btn shrink-0 rounded-full btn-sm btn-primary">
              {toast.action.label}
            </button>
          )}
          {toast.close && (
            <button
              type="button"
              onClick={toast.close}
              aria-label={t('a11y.close')}
              className="btn btn-circle shrink-0 btn-ghost btn-sm"
            >
              <X className="size-4" aria-hidden="true" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
