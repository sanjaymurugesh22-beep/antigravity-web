import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { CentralDataProvider } from './context/CentralDataContext';
import { ToastProvider } from './context/ToastContext';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CentralDataProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </CentralDataProvider>
  </StrictMode>,
);
