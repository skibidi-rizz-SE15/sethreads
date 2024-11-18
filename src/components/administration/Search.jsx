import React from 'react'

import { FaSearch } from "react-icons/fa";

function Search({ registeredCourses, onSelectYear, onSelectCourse, onSearch }) {
  return (
    <div className='flex flex-wrap justify-center mt-10 gap-4 mx-8 w-fit'>
      <select className='flex grow w-[15rem] h-10 text-white text-center bg-steadfast rounded-md focus:outline-none focus:ring-1 focus:ring-software-orange transition duration-200'>
          <option value='' onClick={onSelectYear} className='hidden'>Select Year</option>
          <option value='1' onClick={onSelectYear}>Year 1</option>
          <option value='2' onClick={onSelectYear}>Year 2</option>
          <option value='3' onClick={onSelectYear}>Year 3</option>
          <option value='4' onClick={onSelectYear}>Year 4</option>
          <option value='all' onClick={onSelectYear}>All Years</option>
      </select>
      <select className='flex grow w-[30rem] h-10 text-white text-center bg-steadfast rounded-md focus:outline-none focus:ring-1 focus:ring-software-orange transition duration-200'>
            <option value='' onClick={onSelectCourse} className='hidden'>Select Course</option>
            {registeredCourses.map((course) => (
                <option key={course.course_id} value={course.course_id} onClick={onSelectCourse}>{course.name}</option>
            ))}
            <option value='all' onClick={onSelectCourse}>All Courses</option>
      </select>
      <button className='flex justify-center items-center grow bg-software-orange hover:bg-software-orange-hover text-white font-bold py-2 px-4 rounded transition duration-200' onClick={onSearch}><FaSearch /></button>
    </div>
  )
}

export default Search