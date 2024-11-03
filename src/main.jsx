import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <BrowserRouter>
    <App />
    <Toaster position='bottom-right' containerStyle={{ borderRadius: 16, fontSize: 15, }} />
  </BrowserRouter>
  // </StrictMode>,
)
