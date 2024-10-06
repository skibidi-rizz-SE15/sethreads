import React, { useEffect, useState } from "react";
import axios from "axios";

import Details from "./Details";
import Edit from "./Edit";
import TableCourses from "./TableCourses";
import Separator from "../../separator/Separator";

const ProfileAlert = ({ isOpen, onClose, children, setStudent, EditCourse }) => {
  const [inputTACourse, setInputTACourse] = useState("");
  const [inputCourse, setInputCourse] = useState("");
  const [isEditCourses, setIsEditCourses] = useState(false);

  useEffect(() => {
    if (children) {
      setInputTACourse(children.is_ta ? children.ta_course_id : "N/A");
    }
    if (EditCourse) {
      setIsEditCourses(true);
    } else {
      setIsEditCourses(false);
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
        alert(res.data.error);
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
        alert(res.data.error);
      } else {
        setStudent(res.data, "Course");
      }
    })
    .catch((err) => {
      console.log(err);
    });
    setInputCourse("");
  }

  function handleRemoveCourse(course_id) {
    axios.delete(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/withdraw-course?student_id=${children.student_id}&course_id=${course_id}`, {
      headers: {
        "x-token": localStorage.getItem("token"),
      }
    }).then((res) => {
      if (res.data.error) {
        alert(res.data.error);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative z-10 bg-eerie-black text-white p-6 rounded-lg shadow-xl w-[70rem]">
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
        <div className="grid grid-cols-[repeat(2,1fr)]">
          <Details student={children} />
          <Edit
            student={children}
            inputTACourse={inputTACourse}
            handleInputTACourse={handleInputTACourse}
            isEditCourses={isEditCourses}
            toggleEditCourses={toggleEditCourses}
            handleSetTA={handleSetTA}
          />
          <Separator className="col-span-2 mt-10" />
          <h1 className="text-gray-300 text-2xl text-center mt-5 col-span-2">
            Registered Courses
          </h1>
          <TableCourses student={children} isEditCourses={isEditCourses} onDelete={handleRemoveCourse} />
        </div>
        {!isEditCourses ? null : (
          <div className="flex justify-center mt-5 gap-5">
            <input
              type="text"
              className="w-1/5 bg-eerie-black text-white rounded-lg p-2 border border-white outline-none focus:border-software-orange focus:text-white focus:bg-steadfast transition duration-300"
              placeholder="Course ID"
              value={inputCourse}
              onChange={(e) => setInputCourse(e.target.value)}
            />
            <button className="bg-software-orange hover:bg-software-orange-hover text-white text-lg font-bold py-2 px-4 rounded-lg" onClick={handleRegCourse}>
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileAlert;
