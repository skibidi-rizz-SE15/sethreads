import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';

import LoginPage from './pages/LogIn/LoginPage';
import AdminPage from './pages/Admin/AdminPage';
import MainPage from './pages/Main/MainPage'
import AuthGuard from './components/auth/AuthGuard';
import Content from './components/content/Content';
import Thread from './components/threadComponents/Thread';
import Home from './components/content/Home';
import CreateThread from './components/content/CreateThread';
import Loading from './components/loading/Loading';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import './App.css';

function App() {

  // uncomment this below line to clear the local storage
  // localStorage.clear();
  // localStorage.removeItem('token');
  // and comment for development

  const [mode, setMode] = useState("sign-in")
  const [studentId, setStudentId] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState(null);
  const [studentInfo, setStudentInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const [taCourse, setTACourse] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);


  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/verify`, {
        headers: {
          "x-token": localStorage.getItem('token')
        }
      }).then((res) => {
        setStudentId(res.data.student_id);
        if (res.data.student_id === "admin") {
          setIsAdmin(true);
        }
        return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-info?student_id=${res.data.student_id}`, {
          headers: {
            'x-token': localStorage.getItem('token')
          }
        });
      }).then((res) => {
        setStudentInfo(res.data);
        if (res.data.is_ta) {
          return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-courses?course_id=${res.data.ta_course_id}`, {
            headers: {
              'x-token': localStorage.getItem('token')
            }
          });
        }
        return null;
      }).then((res) => {
        if (res === null) {
          return;
        }
        setTACourse(res.data);
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
    setStudentId("");
    setPassword("");
    setIsSuccess(null);
  }

  function handleStudentIdChange(e) { 
    setStudentId(e.target.value);
  }
  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function resetState() {
    setStudentId("");
    setStudentInfo(null);
    setPassword("");
    setIsSuccess(null);
    setTACourse(null);
    setIsAdmin(false);
  }

  if (isLoading) {
    return (
       <Loading/>
    );
  }

  return (
    <Router>
      <Routes>
        <Route element={<AuthGuard />}>
          <Route path='/' element={<MainPage studentInfo={studentInfo} taCourse={taCourse} isAdmin={isAdmin} resetState={resetState} />}>
            <Route index element={<Navigate to="/home" />} />
            <Route path='home' element={<Home studentId={studentId}/>} />
            {studentInfo && (<Route path='admin' element={<AdminPage registeredCourses={studentInfo.registered_courses}/>} />)}
            {studentInfo && studentInfo.registered_courses.map((course) => (
              <Route key={course.course_id} path={`course/${course.course_id}`} element={<Content courseId={course.course_id} courseName={course.name} studentId={studentId} />} />
            ))}
            {taCourse && (
              <Route path={`course/${taCourse.course_id}`} element={<Content courseId={taCourse.course_id} courseName={taCourse.name} studentId={studentId} />} />
            )}
            { studentId && (<Route path='home/thread/:threadId' element={<Thread fromHome={true} studentId={studentId} isAdmin={isAdmin} />} />)}
            { (studentInfo) && (<Route path='course/:courseId/thread/:threadId' element={<Thread fromHome={false} studentId={studentId} isTA={studentInfo.is_ta} TACourseID={taCourse ? taCourse.course_id : ""} isAdmin={isAdmin} />} />)}
            {studentInfo && (<Route path='/create-thread' element={<CreateThread registeredCourses={studentInfo.registered_courses} ta_course={taCourse} studentId={studentId} />} />)}
          </Route>
        </Route>
        <Route path='/login' element={<LoginPage mode={mode} handleLinkClick={handleLinkClick} handleStudentIdChange={handleStudentIdChange} handlePasswordChange={handlePasswordChange} isSuccess={isSuccess} studentId={studentId} password={password} setIsSuccess={setIsSuccess} />} />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;