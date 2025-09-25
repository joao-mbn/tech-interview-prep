import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './projects/todo-list/AppSolution.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
