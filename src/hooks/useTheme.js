import { useSyncExternalStore } from 'react'
import { getTheme, subscribeTheme } from '../lib/theme'

export function useTheme() {
  return useSyncExternalStore(subscribeTheme, getTheme)
}
