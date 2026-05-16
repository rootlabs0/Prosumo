import { createContext, useContext, useState, type ReactNode } from 'react'

export type Lang = 'cs' | 'en'

interface LangContextValue {
  lang: Lang
  toggleLang: () => void
}

const LangContext = createContext<LangContextValue>({ lang: 'cs', toggleLang: () => {} })

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('cs')
  const toggleLang = () => setLang(l => (l === 'cs' ? 'en' : 'cs'))
  return <LangContext.Provider value={{ lang, toggleLang }}>{children}</LangContext.Provider>
}

export function useLang() {
  return useContext(LangContext)
}
