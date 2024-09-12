import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Sidebar from '../../components/sidebar/Sidebar'
import Content from '../../components/content/Content'
import Thread from '../../components/threadComponents/Thread'

const HomePage = () => {
  return (
    <div className='grid grid-cols-main-page w-screen h-screen'>
      <Navbar />
      <Sidebar />
      <Thread />
    </div>
  )
}

export default HomePage