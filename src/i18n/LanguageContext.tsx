import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { translations } from './translations'
import type { Language, Translations } from './translations'

const SUPPORTED_LANGUAGES: Language[] = ['en', 'es', 'it']

function getInitialLanguage(): Language {
  const param = new URLSearchParams(window.location.search).get('lang')
  return SUPPORTED_LANGUAGES.includes(param as Language) ? (param as Language) : 'en'
}

interface LanguageContextValue {
  language: Language
  setLanguage: (l: Language) => void
  t: (key: keyof Translations) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage)

  const setLanguage = (l: Language) => {
    const url = new URL(window.location.href)
    url.searchParams.set('lang', l)
    history.replaceState(null, '', url)
    setLanguageState(l)
  }

  const t = (key: keyof Translations) => translations[language][key]

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider')
  return ctx
}
