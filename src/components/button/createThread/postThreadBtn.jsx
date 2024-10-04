import axios from "axios";
import React from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostThreadBtn = ({ title, body, createBy }) => {
    const { courseId } = useParams();
    const navigate = useNavigate(); // For redirecting after successful post
    const toHome = () => {
        navigate('/home');
      };

    async function handlePostThread() {
        try {
            const response = await axios.post(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/create-thread`, {
                title: title,
                body: body,
                is_highlight: false,
                create_at: new Date().toISOString(), // Automatically set current time
                create_by: createBy, // Creator of the thread
            });

            if (response.status === 201) {  
                navigate(toHome ? "/home" : `/course/${courseId}`);
            }
        } catch (error) {
            console.error("Error posting thread:", error);
        }
    }

    return (
        <button
            className="bottom-0 p-2 text-sm tracking-normal leading-5 text-white bg-red-600 hover:bg-red-700 rounded-lg font-semibold"
            onClick={handlePostThread}
        >
            Post
        </button>
    );
};

export default PostThreadBtn;
