import React from "react";
import { FaHeart } from "react-icons/fa";

const LikeBtn = ({ isLiked=false, likeCount=0, handleLikeThread, className="" }) => {
    return (
        <div className={`flex items-center gap-1 p-2.5 ${className}`}>
            <div
                className={`w-7 h-7 rounded-full flex justify-center items-center ${isLiked ? "hover:bg-white" : "hover:bg-cherry-red"} transition duration-100`}
                onClick={handleLikeThread}>
                <FaHeart className={`text-lg ${isLiked ? 'text-cherry-red' : 'text-white'}`} />
            </div>
            <p className='text-sm'>{likeCount}</p>
        </div>
    );
}

export default LikeBtn;