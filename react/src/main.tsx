import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './projects/06-virtual-scroller/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
