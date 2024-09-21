import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoginPage from './pages/LogIn/LoginPage';
import MainPage from './pages/Main/MainPage'
import AuthGuard from './components/auth/AuthGuard';
import Content from './components/content/Content';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  // uncomment this below line to clear the local storage
  // localStorage.clear();
  // and comment for development

  const [mode, setMode] = useState("sign-in")
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('token')){
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then((res) => {
        setStudentId(res.data.student_id);
      });
    }
  }, [])


  function handleLinkClick(e){
    e.preventDefault()
    setMode((prevMode) => (prevMode === "sign-in" ? "sign-up" : "sign-in"));
  }

  function handleStudentIdChange(e) {
      setStudentId(e.target.value);
  }
  function handlePasswordChange(e) {
      setPassword(e.target.value);
  }
  return (
    <Router>
      <Routes>
        <Route element={<AuthGuard />}>
        <Route path='/' element={<MainPage studentId={studentId} />}>
          <Route index element={<Navigate to="/home" />} />
          <Route path='home' element={<Content />} />
        </Route>
        </Route>
        <Route path='/login' element={<LoginPage mode={mode} handleLinkClick={handleLinkClick} handleStudentIdChange={handleStudentIdChange} handlePasswordChange={handlePasswordChange} isSuccess={isSuccess} studentId={studentId} password={password} setIsSuccess={setIsSuccess} />} />
      </Routes>
    </Router>
  )
}

export default App;