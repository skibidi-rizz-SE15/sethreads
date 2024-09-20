import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'

const MainPage = () => {
  return (
    <div className='grid grid-cols-main-page w-screen h-screen'>
      <Navbar />
      <Sidebar />
    </div>
  )
}

export default MainPage