import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './style.css';
declare module 'react/jsx-runtime';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) si utilitzes TypeScript

root.render(
  <React.StrictMode>
      <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>

);
