import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import Sidebar from '../../components/Sidebar/Sidebar';
import Content from '../../components/Content/Content';

function HomePage() {
  return (
    <div className='grid grid-cols-main-page w-screen h-screen'>
      <Navbar />
      <Sidebar />
      <Content />
    </div>
  )
}

export default HomePage