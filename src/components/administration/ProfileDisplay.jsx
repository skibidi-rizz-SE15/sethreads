import React, { useState } from 'react';

import ProfileCard from './ProfileCard';
import ProfileAlert from './alert/ProfileAlert';

function ProfileDisplay({ studentInfo }) {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
  if (studentInfo.length === 0) {
    return (
      <div className='w-full mt-14'>
        <h1 className='text-white text-center text-xl mx-auto'>No students found</h1>
      </div>
      )
  }

  function handleCardClick(student) {
    setIsAlertOpen(true);
    setSelectedStudent(student);
  }

  return (
    <div className='self-stretch grid grid-cols-[repeat(auto-fill,minmax(20rem,1fr))] mt-14 mx-6 justify-items-center gap-5'>
      {studentInfo.map((student) => (
          <ProfileCard key={student._id} student={student} onclick={() => handleCardClick(student)} />
      ))}
      <ProfileAlert isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        {selectedStudent && (selectedStudent)}
      </ProfileAlert>
    </div>
  )
}

export default ProfileDisplay