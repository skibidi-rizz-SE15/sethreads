import axios from "axios";
import React from "react";

const PostCommentBtn = ({ fromHome, threadId, body, studentId, isValid, className="" }) => {
    const formattedDateTime = new Intl.DateTimeFormat('en-GB', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    }).format(new Date()).replace(',', '');

    function postToCourse() {
        return axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/comment/create-comment`,
            {
                "comment_from": threadId,
                "comment_data": body,
                "posted_by": studentId,
                "create_at": formattedDateTime
            },
            {
                headers: {
                    "x-token": localStorage.getItem("token"),
                },
            }
        );
    }

    function postToHome() {
        return axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home-comment/create-comment`,
            {
                "comment_from": threadId,
                "comment_data": body,
                "posted_by": studentId,
                "create_at": formattedDateTime
            },
            {
                headers: {
                    "x-token": localStorage.getItem("token"),
                },
            }
        );
    }

    function handlePostComment() {
        if (isValid) {
            (fromHome ? postToHome() : postToCourse())
                .catch(error => {
                    console.error("Error posting comment:", error);
                });
        }
    }

    return (
        <button
            className={`flex self-end px-4 py-2 text-lg w-min tracking-normal leading-5 text-white rounded-lg font-semibold ${
                !isValid ? "opacity-50 cursor-not-allowed bg-neutral-500" : "bg-software-orange hover:bg-software-orange-hover"
            } ${className}`}
            onClick={handlePostComment}
            disabled={!isValid}
        >
            Comment
        </button>
    );
};

export default PostCommentBtn;
