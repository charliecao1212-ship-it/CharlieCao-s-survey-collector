// src/main.jsx
import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext';
import './index.css';

// 自动检测基础路径
const getBaseName = () => {
  // 如果是GitHub Pages等子路径部署
  const pathname = window.location.pathname;
  if (pathname.includes('/CharlieCao-s-survey-collector/')) {
    return '/CharlieCao-s-survey-collector';
  }
  return '/';
};

// eslint-disable-next-line react-refresh/only-export-components
const ForceRedirect = () => {
  useEffect(() => {
    const currentPath = window.location.pathname;
    const base = getBaseName();
    
    // 如果访问的是根路径或index.html，重定向到/home
    if (currentPath === base + '/' || currentPath === base + '/index.html') {
      window.history.replaceState(null, '', base + '/');
    }
  }, []);
  return null;
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <LanguageProvider>
      <ForceRedirect />
      <App />
    </LanguageProvider>
  </React.StrictMode>
)