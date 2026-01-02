import React from 'react';
import Navigation from './Navigation';
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const Layout = ({ children }) => {
  const { language } = useLanguage();
  const t = labels[language];
  
  return (
    <div className="app-container">
      <Navigation />
      <main className="main-content">
        {children}
      </main>
      <footer style={{
        textAlign: 'center',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderTop: '1px solid #eee',
        marginTop: '2rem'
      }}>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
};

export default Layout;