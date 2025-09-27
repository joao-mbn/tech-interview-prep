import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './projects/05-suspense/AppSolution';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
