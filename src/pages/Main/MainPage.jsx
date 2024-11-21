import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const MainPage = ({ studentInfo, taCourse, isAdmin, resetState }) => {
  const location = useLocation();
  
  if (!studentInfo) {
    return <div>Loading student information...</div>;
  }
  
  return (
    <div className='grid grid-cols-main-page grid-rows-[min-content_1fr] w-screen h-screen min-w-[775px]'>
      <Navbar 
        studentName={`${studentInfo.name} ${studentInfo.surname}`}
        studentYear={studentInfo.year}
        resetState={resetState}
        studentId={studentInfo.student_id}
      />
      <Sidebar 
        registered_courses={studentInfo.registered_courses} 
        taCourse={taCourse}
        currentPath={location.pathname}
        isAdmin={isAdmin}
      />
      <Outlet location={location} />
    </div>
  );
};

export default MainPage;