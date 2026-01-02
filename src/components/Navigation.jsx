import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// 导入语言相关的自定义钩子和翻译文件
import { useLanguage } from '../hooks/useLanguage';
import { labels } from '../utils/translations';

const Navigation = () => {
  const location = useLocation();
  // 使用语言上下文
  const { language, toggleLanguage } = useLanguage();
  const t = labels[language];
  
  const navItems = [
    { path: '/', label: t.navHome, icon: '🏠' },
    { path: '/history', label: t.navHistory, icon: '📋' },
    { path: '/evaluation', label: t.navEvaluation, icon: '⭐' },
  ];

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
                  color: location.pathname === item.path ? '#ffd700' : 'white',
                  textDecoration: 'none',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  background: location.pathname === item.path ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontWeight: location.pathname === item.path ? '600' : '400'
                }}
              >
                <span>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        
        {/* 直接在导航栏中实现语言切换按钮 */}
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