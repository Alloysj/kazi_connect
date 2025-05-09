import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import LoginPage from './pages/login/login-page.tsx'
import LayoutPage from './layout/default.tsx'
import { RegistrationForm } from './pages/register/register.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <Toaster />
      <BrowserRouter>
        <Routes>
          <Route element={<LayoutPage></LayoutPage>} path='/'>
          <Route element={<App />} path='/' />
          </Route>
          <Route element={<LoginPage />} path='/login' />
          <Route element={<RegistrationForm />} path='/register' />
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
