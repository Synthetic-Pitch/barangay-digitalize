import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { BarangayProvider } from './context/BarangayContext.tsx'
createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <StrictMode>
      <BarangayProvider>
        <App />
      </BarangayProvider>
    </StrictMode>
  </BrowserRouter>
)
