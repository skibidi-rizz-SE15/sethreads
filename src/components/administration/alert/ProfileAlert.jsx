import React, { useEffect, useState } from "react";
import axios from "axios";

import Details from "./Details";
import Edit from "./Edit";
import TableCourses from "./TableCourses";
import Separator from "../../separator/Separator";
import AlertBox from "../../alertbox/AlertBox";

const ProfileAlert = ({ isOpen, isClose, onClose, children, setStudent, EditCourse }) => {
  const [inputTACourse, setInputTACourse] = useState("");
  const [inputCourse, setInputCourse] = useState("");
  const [isEditCourses, setIsEditCourses] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [isAlertClose, setIsAlertClose] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);
  const [isErrorClose, setIsErrorClose] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (EditCourse) {
      setIsEditCourses(true);
    } else {
      setIsEditCourses(false);
      (children && setInputTACourse(`${children.is_ta ? children.courseTAInfo.course_id : ""}`))
    }
  }, [children, isOpen, onClose]);

  function handleInputTACourse(e) {
    setInputTACourse(e.target.value);
  }

  function handleSetTA() {
    axios.put(
      `${
        process.env.REACT_APP_SERVER_DOMAIN_NAME
      }/api/student/update-ta?student_id=${children.student_id}&is_ta=${
        inputTACourse ? "true" : "false"
      }&ta_course_id=${inputTACourse ? inputTACourse : "null"}`,
      {},
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    ).then((res) => {
      if (res.data.is_ta) {
        return axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-courses?course_id=${res.data.ta_course_id}`, {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        })
      }
      return res;
    })
    .then((res) => {
      if (res.data.error) {
        setErrorMessage(res.data.error);
        setIsErrorAlert(true);
        setInputTACourse("");
        return;
      }
      setStudent(res.data, "TA");
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function handleRegCourse() {
    axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/register-course`, {
      "course_id": inputCourse,
      "student_id": children.student_id,
      "year": children.year
    }, {
      headers: {
        "x-token": localStorage.getItem("token"),
      }
    })
    .then((res) => {
      if (res.data.error) {
        setErrorMessage(res.data.error);
        setIsErrorAlert(true);
      } else {
        setStudent(res.data, "Course");
      }
    })
    .catch((err) => {
      console.log(err);
    });
    setInputCourse("");
  }

  function onConfirm(course_id, course_name) {
    setIsAlertClose(false);
    setIsAlertOpen(true);
    setSelectedCourse({ course_id, course_name });
  }

  function handleRemoveCourse(course_id) {
    axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/withdraw-course?student_id=${children.student_id}&course_id=${course_id}`, {
      headers: {
        "x-token": localStorage.getItem("token"),
      }
    }).then((res) => {
      if (res.data.error) {
        setErrorMessage(res.data.error);
        setIsErrorAlert(true);
      } else {
        setStudent(res.data, "Course");
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  function toggleEditCourses() {
    setIsEditCourses(!isEditCourses);
  }

  if (!isOpen) {
    return null;
  }

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${isClose ? "animate-[fadeOut_0.15s_ease-in]" : "animate-[fadeIn_0.15s_ease-in]"}`}>
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 overflow-hidden h-[80%] bg-eerie-black text-white py-10 px-8 m-4 rounded-lg shadow-xl w-[50rem]">
        <button
          className="absolute top-2 right-2 text-software-orange hover:text-software-orange-hover"
          onClick={onClose}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
          <div className="overflow-y-auto h-full px-2">
            <div className="grid grid-cols-[repeat(2,1fr)] gap-x-4">
              <Details student={children} />
              <Edit
                student={children}
                inputTACourse={inputTACourse}
                handleInputTACourse={handleInputTACourse}
                isEditCourses={isEditCourses}
                toggleEditCourses={toggleEditCourses}
                handleSetTA={handleSetTA}
              />
            </div>
            <Separator className="col-span-2 mt-10" />
            <h1 className="text-gray-300 text-2xl text-center mt-5 col-span-2">
              Registered Courses
            </h1>
            <TableCourses student={children} isEditCourses={isEditCourses} onDelete={onConfirm} />
            {!isEditCourses ? null : (
            <div className="col-span-2 flex justify-center mt-5 gap-5 h-fit">
              <input
                type="text"
                className="w-1/5 bg-eerie-black text-white rounded-lg p-2 border border-white outline-none focus:border-software-orange focus:text-white focus:bg-steadfast transition duration-300"
                placeholder="Course ID"
                value={inputCourse}
                onChange={(e) => setInputCourse(e.target.value)}
              />
              <button className="bg-software-orange hover:bg-software-orange-hover text-white text-lg font-bold py-2 px-4 rounded-lg transition duration-200" onClick={handleRegCourse}>
                Add
              </button>
            </div>
            )}
          </div>
      </div>
      <AlertBox
        isOpen={isErrorAlert}
        isClose={isErrorClose}
        onClose={() => {
          setIsErrorClose(true);
          setTimeout(() => {
            setIsErrorAlert(false)
            setIsErrorClose(false);
          }, 150);
        }}
      >
        <p>{errorMessage}</p>
      </AlertBox>
      <AlertBox 
        isOpen={isAlertOpen} 
        isClose={isAlertClose}
        onClose={() => {
          setIsAlertClose(true);
          setTimeout(() => setIsAlertOpen(false), 150);
        }}
      >
        <h2 className="text-xl font-bold mb-4">Confirm Required</h2>
        <p className="text-gray-300">
          Are you sure you want to approve the withdrawal for the following course?
        </p>
        <ul>
          <li className="text-gray-300 mt-2">
            <span className="font-bold">Student ID:</span> {children.student_id}
          </li>
          <li className="text-gray-300 mt-2">
            <span className="font-bold">Student Name:</span> {children.name} {children.surname}
          </li>
          <li className="text-gray-300 mt-2">
            <span className="font-bold">Course ID:</span> {selectedCourse ? selectedCourse.course_id : ""}
          </li>
          <li className="text-gray-300 mt-2">
            <span className="font-bold">Course Name:</span> {selectedCourse ? selectedCourse.course_name : ""}
          </li>
        </ul>
        <div className="mt-4 gap-2 flex justify-end">
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150"
            onClick={() => {
              handleRemoveCourse(selectedCourse.course_id);
              setIsAlertClose(true);
              setTimeout(() => setIsAlertOpen(false), 150);
            }}
          >
            Delete
          </button>
          <button
            onClick={() => {
              setIsAlertClose(true);
              setTimeout(() => setIsAlertOpen(false), 150)
            }}
            className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 transition duration-150"
          >
            Cancel
          </button>
        </div>
      </AlertBox>
    </div>
  );
};

export default ProfileAlert;
