import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import { LANGUAGES } from '../data/site'
import de from './locales/de.json'
import en from './locales/en.json'
import es from './locales/es.json'
import fr from './locales/fr.json'
import it from './locales/it.json'
import pl from './locales/pl.json'

function syncDocument(lng) {
  const t = i18n.getFixedT(lng)
  document.documentElement.lang = lng
  document.title = t('meta.title')
  document.querySelector('meta[name="description"]')?.setAttribute('content', t('meta.description'))
}

i18n.on('languageChanged', () => syncDocument(i18n.resolvedLanguage ?? 'fr'))

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: fr },
      en: { translation: en },
      es: { translation: es },
      de: { translation: de },
      pl: { translation: pl },
      it: { translation: it },
    },
    supportedLngs: LANGUAGES.map((l) => l.code),
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    // Comme la version HTML d'origine : un visiteur non francophone voit l'anglais par défaut.
    fallbackLng: 'en',
    initAsync: false,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: 'lang',
      caches: ['localStorage'],
    },
  })

export default i18n
