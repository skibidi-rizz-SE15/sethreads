import React, { useEffect, useState } from 'react';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { Outlet } from 'react-router-dom';

import axios from 'axios';

const MainPage = ({ studentId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [studentInfo, setStudentInfo] = useState({});
  
  useEffect(() => {
    if (studentId) {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-info?student_id=${studentId}`, {
        headers: {
          'x-token': localStorage.getItem('token')
        }
      }).then(res => {
          setStudentInfo(res.data);
          setIsLoading(false);
        }).catch(err => {
          console.log(err)
        }).finally(() => {
          setIsLoading(false);
        });
    }
  }, [studentId]);

  if (isLoading) {
    return (
      <div>Loading</div> // Bro can add loading or make a loading component to true.
    )
  }
  
  return (
    <div className='grid grid-cols-main-page w-screen h-screen'>
      <Navbar />
      <Sidebar registered_courses={studentInfo.registered_courses} />
      <Outlet />
    </div>
  )
}

export default MainPage