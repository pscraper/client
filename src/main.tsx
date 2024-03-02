import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import { RecoilRoot } from 'recoil';
import App from './App';
import './main.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <RecoilRoot>
          <App />
        </RecoilRoot>
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>
)
