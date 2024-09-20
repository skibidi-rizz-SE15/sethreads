import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import { RouterProvider } from 'react-router-dom';
import { mainPageRouter } from '../../routes/routes';

const MainPage = () => {
  return (
    <div className='grid grid-cols-main-page w-screen h-screen'>
      <Navbar />
      <Sidebar />
      <RouterProvider router={mainPageRouter} />
    </div>
  )
}

export default MainPage