import React, { useState } from 'react';
import axios from 'axios';

import Search from '../../components/administration/Search';
import ProfileDisplay from '../../components/administration/ProfileDisplay';
import AlertBox from '../../components/alertbox/AlertBox';



function AdminPage({ registeredCourses }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectCourse, setSelectCourse] = useState(registeredCourses);
  const [data, setData] = useState([]);

  function handleSelectYear(e) {
    setSelectedYear(e.target.value);
    if (e.target.value === 'everyYear') {
      setSelectCourse([]);
      return;
    }
    setSelectCourse(registeredCourses.filter((course) => course.year === parseInt(e.target.value)));
  }
  function handleSelectCourse(e) {
    setSelectedCourse(e.target.value);
  }

  function handleSearch() {
    if (selectedYear === '' || selectedCourse === '') {
      setIsAlertOpen(true);
      return;
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-all?year=${selectedYear}&course_id=${selectedCourse}`, {
        headers: {
          "x-token": localStorage.getItem("token")
        }
      }).then((res) => {
        setData(res.data);
      }).catch((err) => {
        console.log(err);
      })
    }
  }

  return (
    <div className='flex flex-col items-center'>
      <h1 className='text-white text-center text-4xl mx-auto mt-14'>Administration</h1>
      <Search registeredCourses={selectCourse} onSelectYear={handleSelectYear} onSelectCourse={handleSelectCourse} onSearch={handleSearch} />
      <ProfileDisplay studentInfo={data} />
        <AlertBox isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <p>Please select year and courses</p>
      </AlertBox>
    </div>
  )
}

export default AdminPage