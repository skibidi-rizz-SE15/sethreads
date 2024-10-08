import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const MainPage = ({ studentId, studentInfo, taCourse, isAdmin, resetState }) => {
  const location = useLocation();
  
  if (!studentInfo) {
    return <div>Loading student information...</div>;
  }
  
  return (
    <div className='grid grid-cols-main-page grid-rows-[min-content_1fr] w-screen min-h-screen h-fit'>
      <Navbar 
        studentName={`${studentInfo.name} ${studentInfo.surname}`}
        studentYear={studentInfo.year}
        resetState={resetState}
      />
      <Sidebar 
        registered_courses={studentInfo.registered_courses} 
        taCourse={taCourse}
        currentPath={location.pathname}
        isAdmin={isAdmin}
      />
      <Outlet location={location}/>
    </div>
  );
};

export default MainPage;