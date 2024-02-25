import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from "./utils/Router";
import { BrowserRouter } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie'
import './index.css'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CookiesProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </CookiesProvider>
  </React.StrictMode>,
)
