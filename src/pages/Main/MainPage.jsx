import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const MainPage = ({ studentId, studentInfo, taCourse }) => {
  const location = useLocation();
  
  if (!studentInfo) {
    return <div>Loading student information...</div>;
  }
  
  return (
    <div className='grid grid-cols-main-page grid-rows-[min-content_1fr] w-screen h-screen'>
      <Navbar 
        studentName={studentInfo.name}
        studentYear={studentInfo.year}
      />
      <Sidebar 
        registered_courses={studentInfo.registered_courses} 
        taCourse={taCourse}
        currentPath={location.pathname}
      />
      <Outlet location={location}/>
    </div>
  );
};

export default MainPage;