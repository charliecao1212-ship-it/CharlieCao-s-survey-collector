import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './contexts/LanguageContext'; // ✅ 导入提供者
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider> {/* ✅ 包裹整个应用 */}
      <App />
    </LanguageProvider>
  </React.StrictMode>
); 