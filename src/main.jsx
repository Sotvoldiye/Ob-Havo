import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { ToastContainer } from 'react-toastify'
import WeatherWidget from './pages/WeatherWidget/WeatherWidget.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WeatherWidget />
    <ToastContainer />
  </StrictMode>,
)
