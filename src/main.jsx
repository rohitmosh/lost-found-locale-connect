import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import { ThemeProvider } from './contexts/ThemeContext';

// Error boundary for development
if (import.meta.env.DEV) {
  window.addEventListener('error', (event) => {
    console.error('Global error caught:', event.error);
  });
}

const rootElement = document.getElementById("root");

if (!rootElement) {
  console.error("Failed to find the root element");
} else {
  const root = createRoot(rootElement);
  
  try {
    root.render(
      <React.StrictMode>
        <BrowserRouter>
          <ThemeProvider>
              <App />
          </ThemeProvider>
        </BrowserRouter>
      </React.StrictMode>
    );
  } catch (error) {
    console.error("Error rendering the app:", error);
  }
}
