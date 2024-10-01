import React, { useState } from 'react'

import Search from '../../components/administration/Search'


function AdminPage({ registeredCourses }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');

  function handleSelectYear(e) {
    setSelectedYear(e.target.value);
  }
  function handleSelectCourse(e) {
    setSelectedCourse(e.target.value);
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-white text-center text-4xl mx-auto mt-14'>Administration</h1>
      <Search registeredCourses={registeredCourses} onSelectYear={handleSelectYear} onSelectCourse={handleSelectCourse} />
    </div>
  )
}

export default AdminPage