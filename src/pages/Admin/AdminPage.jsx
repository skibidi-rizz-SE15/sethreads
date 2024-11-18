import React, { useEffect, useState } from 'react';
import { LoaderCircle } from 'lucide-react';
import axios from 'axios';

import Search from '../../components/administration/Search';
import ProfileDisplay from '../../components/administration/ProfileDisplay';
import AlertBox from '../../components/alertbox/AlertBox';

function AdminPage({ registeredCourses }) {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isClose, setIsClose] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectCourse, setSelectCourse] = useState(registeredCourses);
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (update) {
      handleSearch();
    }
    setUpdate(false);
  }, [update])

  function handleSelectYear(e) {
    setSelectedYear(e.target.value);
    if (e.target.value === 'all') {
      setSelectCourse(registeredCourses.filter((course) => course.year === 0));
      return;
    }
    setSelectCourse(registeredCourses.filter((course) => course.year === parseInt(e.target.value)));
  }
  function handleSelectCourse(e) {
    setSelectedCourse(e.target.value);
  }

  function handleSearch() {
    if (selectedYear === '' || selectedCourse === '') {
      setErrorMessage('Please select year and course');
      setIsAlertOpen(true);
      setIsClose(false);
      return;
    } else {
      axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-all?year=${selectedYear}&course_id=${selectedCourse}`, {
        headers: {
          "x-token": localStorage.getItem("token")
        }
      }).then((res) => {
        setIsLoading(true);
        setTimeout(() => {
          setData(res.data);
          setIsLoading(false);
        }, 1000);
      }).catch((err) => {
        setIsLoading(true);
        setErrorMessage(err.response.data.detail);
        setTimeout(() => {
          setIsAlertOpen(true);
          setIsClose(false);
          setIsLoading(false);
        }, 1000);
        setIsAlertOpen(true);
      })
    }
  }

  function handleOnUpdate() {
    setUpdate(true);
  }

  return (
    <div className='flex flex-col items-center py-6 overflow-y-auto'>
      <h1 className='text-white text-center text-4xl mx-auto mt-8'>Administration</h1>
      <Search registeredCourses={selectCourse} onSelectYear={handleSelectYear} onSelectCourse={handleSelectCourse} onSearch={handleSearch} />
      { isLoading 
        ? <LoaderCircle strokeWidth={1} size={56} className='mt-20 text-white animate-spin' /> 
        : <ProfileDisplay studentInfo={data} handleOnUpdate={handleOnUpdate} />
      }
      <AlertBox 
        isOpen={isAlertOpen}
        isClose={isClose}
        onClose={() => {
          setIsClose(true);
          setTimeout(() => setIsAlertOpen(false), 150);
        }}
      >
        <p>{errorMessage}</p>
      </AlertBox>
    </div>
  )
}

export default AdminPage