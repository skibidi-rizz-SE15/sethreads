import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaHeart } from "react-icons/fa";

import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';
import TextBody from '../../../card/textBody/TextBody';
import TextTitle from '../../../card/textTitle/TextTitle';
import { getPreviewHTMLString } from '../../../../utilities/HtmlFilter';
import LikeBtn from '../../../button/like/LikeBtn';

const ThreadCard = ({ thread_id, name, year, time, title, body, comments, likes, studentId, updateLikes}) => {
  console.log(likes)
  const [isLiked, setIsLiked] = useState(likes.some((like) => like.student_id === studentId));
  const [numberOfLikes, setNumberOfLikes] = useState(likes.length);

  useEffect(() => {
    setIsLiked(likes.some((like) => like.student_id === studentId));
  }, [likes]);
  
  function handleLikeThread(e) {
    e.preventDefault();
    axios.put(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/update-likes`, {
      thread_id: thread_id,
      student_id: studentId,
      is_like: !isLiked
    }, {
      headers: {
        'x-token': localStorage.getItem('token')
      }
    }).then((res) => {
      setNumberOfLikes(res.data.length);
      updateLikes(thread_id, res.data);
      setIsLiked(!isLiked);
    }).catch((err) => {
      console.error("Error:", err);
    });
  }

  return (
    <article className="flex overflow-hidden flex-col self-center px-6 pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight transition duration-200">
      <div className="flex flex-col items-start w-fit">
        <Profile name={name} year={year} time={time}/>
        <TextTitle title={title} className='mt-3 line-clamp-6 text-ellipsis' />
        <TextBody body={getPreviewHTMLString(body)} className='mt-2 line-clamp-3 text-ellipsis' />
      </div>
      <div className='flex items-center mt-2 -ml-2.5 text-white'>
        <LikeBtn isLiked={isLiked} likeCount={numberOfLikes} handleLikeThread={handleLikeThread} />
        <CommentBtn number={comments.length} />
      </div>
    </article>
    );
}

export default ThreadCard;