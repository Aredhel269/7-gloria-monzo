import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './style.css';
declare module 'react/jsx-runtime';

const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) si utilitzes TypeScript

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>

);

