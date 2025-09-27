import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './projects/04-weather-app/AppSolution';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
