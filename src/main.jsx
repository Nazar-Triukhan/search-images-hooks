import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ImageProvider } from './ImageContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(

  <StrictMode>
        <ImageProvider>
          <App />
      </ImageProvider>
  </StrictMode>

  ,
)
