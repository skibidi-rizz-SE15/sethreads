import React, { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';

const MainPage = ({ studentId, studentInfo }) => {
  const location = useLocation();
  
  if (!studentInfo) {
    return <div>Loading student information...</div>;
  }
  
  return (
    <div className='grid grid-cols-main-page grid-rows-[min-content_1fr] w-screen h-screen'>
      <Navbar />
      <Sidebar 
        registered_courses={studentInfo.registered_courses} 
        currentPath={location.pathname}
      />
      <Outlet />
    </div>
  );
};

export default MainPage;