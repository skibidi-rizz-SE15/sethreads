import React from 'react';

import ProfileCard from './ProfileCard';

function ProfileDisplay({ studentInfo }) {
  if (studentInfo.length === 0) {
    return (
      <div className='self-stretch grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] mt-14 mx-6 justify-items-center gap-5'>
        <h1 className='text-white text-center text-4xl mx-auto'>No students found</h1>
      </div>
    )
  }

  return (
    <div className='w-full grid grid-cols-3 mt-14 justify-items-center gap-5'>
      {studentInfo.map((student) => (
        <ProfileCard key={student._id} student={student} />
      ))}
    </div>
  )
}

export default ProfileDisplay