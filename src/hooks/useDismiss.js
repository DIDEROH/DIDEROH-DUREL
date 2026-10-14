import { useEffect } from 'react'

/** Ferme un menu flottant au clic extérieur ou avec la touche Échap. */
export function useDismiss(open, close, ref) {
  useEffect(() => {
    if (!open) return
    function handlePointer(event) {
      if (!ref.current?.contains(event.target)) close()
    }
    function handleKey(event) {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', handlePointer)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('pointerdown', handlePointer)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open, close, ref])
}
