// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const Navigation = () => {
  const location = useLocation();
  const { language, toggleLanguage } = useLanguage();
  const t = labels[language];
  
  const navItems = [
    { path: '/', label: t.navHome, icon: '🏠' }, // 确保这里是 '/'
    { path: '/history', label: t.navHistory, icon: '📋' },
    { path: '/evaluation', label: t.navEvaluation, icon: '⭐' },
  ];

  // 检查当前路径是否是首页
  const isActive = (path) => {
    // 对于首页，需要特殊处理：'/home' 和 '/' 都算首页
    if (path === '/') {
      return location.pathname === '/' || location.pathname === '/home';
    }
    return location.pathname === path;
  };

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
          <h1 style={{ margin: 0, fontSize: '1.5rem' }}>
            📊 {t.appName}
          </h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            {navItems.map(item => (
              <Link
                key={item.path}
                to={item.path}
                style={{
                  color: isActive(item.path) ? '#ffd700' : 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  background: isActive(item.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: isActive(item.path) ? '600' : '400'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* 语言切换按钮 */}
        <div style={{
          display: 'flex',
          gap: '0.5rem',
          background: 'rgba(255, 255, 255, 0.1)',
          padding: '0.25rem',
          borderRadius: '5px'
        }}>
          <button
            onClick={toggleLanguage}
            style={{
              padding: '0.5rem 1.5rem',
              border: 'none',
              borderRadius: '3px',
              background: language === 'cn' ? 'white' : 'transparent',
              color: language === 'cn' ? '#667eea' : 'white',
              cursor: 'pointer',
              fontWeight: language === 'cn' ? '600' : '400',
              transition: 'all 0.3s ease'
            }}
          >
            {language === 'cn' ? '中文' : 'English'}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;