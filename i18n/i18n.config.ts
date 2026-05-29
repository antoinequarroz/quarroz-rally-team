import de from './locales/de.json'
import en from './locales/en.json'
import fr from './locales/fr.json'

export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'fr',
  messages: {
    fr,
    en,
    de,
  },
}))
