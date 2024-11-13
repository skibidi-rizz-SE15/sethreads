import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PostThreadBtn = ({ title, body, createdBy, courseId, isValid, files, className="" }) => {
  const navigate = useNavigate();

  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(",", "");

  function setLanguage(htmlString, lang) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const codeElements = doc.querySelectorAll("code");

    codeElements.forEach((code) => {
      code.setAttribute("classname",`language-${lang ? lang : "javascript"}`);
    });

    return doc.body.innerHTML;
  }

  function postToCourse() {
    return axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/create-thread`,
      {
        title: title,
        body: setLanguage(body),
        is_highlight: false,
        create_at: formattedDateTime,
        course_id: courseId,
        create_by: createdBy,
      },
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    );
  }

  function postToHome() {
    const files_name = files.map((file) => file.name);
    const formData = new FormData();
    Array.from(files).forEach((file) => {
      formData.append("files", file);
    });

    axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/upload-files`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "x-token": localStorage.getItem("token"),
        },
      }
    ).catch((error) => {
      console.error("Error uploading files:", error);
    });

    return axios.post(
      `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/create-thread`,
      {
        title: title,
        body: body,
        is_highlight: false,
        create_at: formattedDateTime,
        create_by: createdBy,
        files_name: files_name,
      },
      {
        headers: {
          "x-token": localStorage.getItem("token"),
        },
      }
    );
  }

  function handlePostThread() {
    if (isValid) {
      (courseId === "home" ? postToHome() : postToCourse())
        .then((response) => {
          if (response.status === 201) {
            navigate(courseId === "home" ? "/home" : `/course/${courseId}`);
          }
        })
        .catch((error) => {
          console.error("Error posting thread:", error);
        });
    }
  }

  return (
    <button
      className={`right-0 flex self-end px-7 py-2 text-lg w-min tracking-normal leading-5 text-white rounded-lg font-semibold ${
        !isValid
          ? "opacity-50 cursor-not-allowed bg-neutral-500"
          : "bg-software-orange hover:bg-software-orange-hover"
      } ${className}`}
      onClick={handlePostThread}
      disabled={!isValid}
    >
      Post
    </button>
  );
};

export default PostThreadBtn;
