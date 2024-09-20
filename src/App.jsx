import React from 'react';
import LoginPage from './pages/LogIn/LoginPage';
import MainPage from './pages/Main/MainPage'
import AuthGuard from './components/auth/AuthGuard';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path='/home' element={<MainPage />} />
          <Route path='/' element={<MainPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </Router>
  )
}

export default App;