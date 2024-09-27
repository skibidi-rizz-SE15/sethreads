import React, { useState, useEffect } from 'react';
import axios from 'axios';

import LoginPage from './pages/LogIn/LoginPage';
import MainPage from './pages/Main/MainPage'
import AuthGuard from './components/auth/AuthGuard';
import Content from './components/content/Content';
import Thread from './components/threadComponents/Thread';
import Home from './components/content/Home';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'

function App() {

  // uncomment this below line to clear the local storage
  // localStorage.clear();
  // and comment for development

  const [mode, setMode] = useState("sign-in")
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [threads, setThreads] = useState(null);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then((res) => {
        setStudentId(res.data.student_id);
        return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-info?student_id=${res.data.student_id}`, {
          headers: {
            'x-token': localStorage.getItem('token')
          }
        });
      }).then((res) => {
        setStudentInfo(res.data);
      }).catch((err) => {
        console.error("Error:", err);
        localStorage.removeItem('token');
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [isSuccess]);


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

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path='/' element={<MainPage studentId={studentId} studentInfo={studentInfo} />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path='home' element={<Home />} />
            {studentInfo && studentInfo.registered_courses.map((course) => (
              <Route key={course.course_id} path={`course/${course.course_id}`} element={<Content courseId={course.course_id} courseName={course.name} threads={threads} setThreads={setThreads} />} />
            ))}
            <Route path='home/thread/:threadId' element={<Thread fromHome={true} />} />
            <Route path='course/:courseId/thread/:threadId' element={<Thread fromHome={false} />} />
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage mode={mode} handleLinkClick={handleLinkClick} handleStudentIdChange={handleStudentIdChange} handlePasswordChange={handlePasswordChange} isSuccess={isSuccess} studentId={studentId} password={password} setIsSuccess={setIsSuccess} />} />
      </Routes>
    </Router>
  );
}

export default App;