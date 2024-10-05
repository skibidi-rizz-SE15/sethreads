import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const PostThreadBtn = ({ title, body, createdBy, courseId, isValid }) => {
    const navigate = useNavigate(); // For redirecting after successful post

    const formattedDateTime = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(new Date()).replace(',', '');

    function postToCourse(){
        return (
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/create-thread`,
                {
                    "title": title,
                    "body": body,
                    "is_highlight": false,
                    "create_at": formattedDateTime, // Automatically set current time
                    "course_id": courseId,
                    "create_by": createdBy, // Creator of the thread
                },
                {
                    headers: {
                        "x-token": localStorage.getItem("token")
                    }
                }
            )
        )
    }
    function postToHome(){
        return (
            axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/create-thread`,
                {
                    "title": title,
                    "body": body,
                    "is_highlight": false,
                    "create_at": formattedDateTime, // Automatically set current time
                    "create_by": createdBy, // Creator of the thread
                },
                {
                    headers: {
                        "x-token": localStorage.getItem("token")
                    }
                }
            )
        )
    }

    function handlePostThread() {
        if(isValid){
           (
                () => (courseId === "home") ? postToHome() : postToCourse()
            )()
            .then(response => {
                if (response.status === 201) {
                    navigate((courseId === "home") ? "/home" : `/course/${courseId}`);
                }
            })
            .catch(error => {
                console.error("Error posting thread:", error);
            }); 
        }
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
