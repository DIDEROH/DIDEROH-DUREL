import { createContext, useContext } from 'react'

/** `true` une fois l'animation d'introduction terminée : le hero peut alors s'animer. */
export const IntroContext = createContext(true)

export const useIntroDone = () => useContext(IntroContext)
