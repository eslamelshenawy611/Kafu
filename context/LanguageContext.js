'use client'

import { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '@/data/translations';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');
  const [isRTL, setIsRTL] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem('language') || 'en';
    setLanguage(savedLang);
    setIsRTL(savedLang === 'ar');
    
    document.documentElement.dir = savedLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLang;
  }, []);

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
    setIsRTL(newLang === 'ar');
    localStorage.setItem('language', newLang);
    
    document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLang;
  };

  const t = (key) => {
    if (!key) return '';
    
    const keys = key.split('.');
    let value = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        break;
      }
    }
    
    // إذا كانت القيمة object، ارجع string فارغ أو رسالة خطأ
    if (typeof value === 'object' && value !== null) {
      console.error(`Translation key '${key}' returned an object instead of string`);
      return key; // أو return '' 
    }
    
    return value || key;
  };

  if (!mounted) return null;

  return (
    <LanguageContext.Provider value={{ language, isRTL, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};