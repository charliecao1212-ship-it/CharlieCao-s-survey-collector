// src/contexts/LanguageContext.jsx
import React, { createContext, useState } from 'react';

// 创建语言上下文并导出（关键修改！）
// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();

// 语言上下文提供者组件
export const LanguageProvider = ({ children }) => {
  // 使用惰性初始化从localStorage读取保存的语言设置
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('app-language');
    return savedLanguage === 'en' ? 'en' : 'cn';
  });

  // 切换语言
  const toggleLanguage = () => {
    const newLanguage = language === 'cn' ? 'en' : 'cn';
    setLanguage(newLanguage);
    localStorage.setItem('app-language', newLanguage);
  };

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// 可选：导出默认，但我们已经有了命名导出
export default LanguageProvider;