import { AnimatePresence, MotionConfig } from 'framer-motion'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Background from './components/effects/Background'
import CursorFollower from './components/effects/CursorFollower'
import LanguageTransitionProvider from './components/effects/LanguageTransition'
import Preloader from './components/effects/Preloader'
import ScrollProgress from './components/effects/ScrollProgress'
import SmoothScroll from './components/effects/SmoothScroll'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import WhatsAppFloat from './components/layout/WhatsAppFloat'
import PwaStatus from './components/pwa/PwaStatus'
import About from './components/sections/About'
import Contact from './components/sections/Contact'
import Hero from './components/sections/Hero'
import Marquee from './components/sections/Marquee'
import Process from './components/sections/Process'
import Projects from './components/sections/Projects'
import Services from './components/sections/Services'
import Skills from './components/sections/Skills'
import Why from './components/sections/Why'
import { IntroContext } from './context/intro'

const INTRO_KEY = 'intro-seen'

/** L'intro se joue une fois par session, jamais si l'utilisateur préfère réduire les animations. */
function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false
  try {
    return sessionStorage.getItem(INTRO_KEY) !== '1'
  } catch {
    return true
  }
}

export default function App() {
  const { t } = useTranslation()
  const [introDone, setIntroDone] = useState(() => !shouldPlayIntro())

  const finishIntro = useCallback(() => {
    try {
      sessionStorage.setItem(INTRO_KEY, '1')
    } catch {
      /* stockage indisponible : l'intro sera simplement rejouée */
    }
    setIntroDone(true)
  }, [])

  return (
    <MotionConfig reducedMotion="user">
      <IntroContext value={introDone}>
        <SmoothScroll>
          <LanguageTransitionProvider>
            <a
              href="#main"
              className="fixed top-3 left-3 z-110 -translate-y-24 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-content transition-transform focus:translate-y-0"
            >
              {t('a11y.skip')}
            </a>

            <Background />
            <ScrollProgress />
            <Navbar />

            <main id="main" tabIndex={-1} className="overflow-x-clip outline-none">
              <Hero />
              <Marquee />
              <About />
              <Services />
              <Projects />
              <Skills />
              <Why />
              <Process />
              <Contact />
            </main>

            <Footer />
            <WhatsAppFloat />
            <PwaStatus />
            <CursorFollower />

            <AnimatePresence>{!introDone && <Preloader key="preloader" onDone={finishIntro} />}</AnimatePresence>
          </LanguageTransitionProvider>
        </SmoothScroll>
      </IntroContext>
    </MotionConfig>
  )
}
