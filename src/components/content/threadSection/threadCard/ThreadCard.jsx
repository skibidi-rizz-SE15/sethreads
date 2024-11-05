import React, { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";

import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';
import TextBody from '../../../card/textBody/TextBody';
import TextTitle from '../../../card/textTitle/TextTitle';
import { getPreviewHTMLString } from '../../../../utilities/HtmlFilter';

const ThreadCard = ({ name, year, time, title, body, comments, likes, liked_by, studentId }) => {
  const [isLiked, setIsLiked] = useState(null)

  useEffect(() => {
    setIsLiked(liked_by.some((like) => like.student_id === studentId));
  }, [liked_by]);

  return (
    <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight min-w-96 w-4/5 max-md:mt-10 transition duration-200">
      <div className="flex flex-col items-start mx-6 w-fit ">
        <Profile name={name} year={year} time={time}/>
        <TextTitle title={title} className='mt-3 line-clamp-6 text-ellipsis' />
        <TextBody body={getPreviewHTMLString(body)} className='mt-2 line-clamp-3 text-ellipsis' />
      </div>
      <div className='flex w-full justify-end items-center text-white'>
        <div className={`w-7 h-7 mt-1 mr-1 rounded-full flex justify-center items-center hover:${isLiked ? "bg-white" : "bg-software-orange-hover"} transition duration-100`}>
          <FaHeart className={`text-lg ${ isLiked ? 'text-software-orange' : 'text-white'}`}/>
        </div>
        <p className='mr-4 mt-1 text-sm'>{likes}</p>
        <CommentBtn number={comments.length} />
      </div>
    </article>
    );
}

export default ThreadCard;