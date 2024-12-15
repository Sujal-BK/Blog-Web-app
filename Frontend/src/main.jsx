import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import { AuthProvider } from './Context/auth.jsx'
createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <BrowserRouter>
    <StrictMode>
      <App />
      <Toaster/>
    </StrictMode>
  </BrowserRouter>
  </AuthProvider>,
)