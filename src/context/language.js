import { createContext, useContext } from 'react'

/** Fournit `changeLanguage(code)`, qui joue la transition de page avant de changer de langue. */
export const LanguageTransitionContext = createContext(() => {})

export const useChangeLanguage = () => useContext(LanguageTransitionContext)
