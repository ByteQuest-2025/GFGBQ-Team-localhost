import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Language, Translations, translations, languages, LanguageInfo } from '@/data/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languages: LanguageInfo[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load from localStorage if available
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('app-language');
      if (saved && ['en', 'hi', 'es', 'fr'].includes(saved)) {
        return saved as Language;
      }
      // Try to detect browser language
      const browserLang = navigator.language.split('-')[0];
      if (['en', 'hi', 'es', 'fr'].includes(browserLang)) {
        return browserLang as Language;
      }
    }
    return 'en';
  });

  // Persist language to localStorage
  useEffect(() => {
    localStorage.setItem('app-language', language);
    // Update document lang attribute for screen readers
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
  }, []);

  const t = translations[language];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        languages,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};
