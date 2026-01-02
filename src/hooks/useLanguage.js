// src/hooks/useLanguage.js
import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext'; // ✅ 改为导入 LanguageContext

export const useLanguage = () => {
  const context = useContext(LanguageContext); // ✅ 使用 LanguageContext
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};