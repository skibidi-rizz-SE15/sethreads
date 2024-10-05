import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostThreadBtn = ({ title, body, createBy }) => {
    const { courseId } = useParams();
    const navigate = useNavigate(); // For redirecting after successful post
    const toHome = () => {
        navigate('/home');
      };

      function handlePostThread() {
        axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/create-thread`, 
            {
                "title": title,
                "body": body,
                "is_highlight": false,
                "create_at": new Date().toISOString(), // Automatically set current time
                "create_by": createBy, // Creator of the thread
            }, 
            {
                headers: { 
                    "x-token": localStorage.getItem('token') 
                }
            }
        )
        .then(response => {
            if (response.status === 201) {
                navigate(toHome ? "/home" : `/course/${courseId}`);
            }
        })
        .catch(error => {
            console.error("Error posting thread:", error);
        });
    }

    return (
        <button
            className="flex self-end px-7 py-2 text-lg w-min tracking-normal leading-5 text-white bg-software-orange hover:bg-software-orange-hover rounded-lg font-semibold"
            onClick={handlePostThread}
        >
            Post
        </button>
    );
};

export default PostThreadBtn;
