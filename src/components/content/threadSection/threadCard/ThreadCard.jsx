import React from 'react';
import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';

function ThreadCard({ name, time, title, body, imageHeight }) {
  return (
    <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight min-w-96 w-4/5 max-md:mt-10">
      <div className="flex flex-col items-start mx-6 w-full max-md:px-5 max-md:max-w-full">
        <Profile name={name} time={time}/>
        <h2 className="mt-3 text-xl text-white max-md:max-w-full">{title}</h2>
        <p className="mt-2 text-sm text-stone-500 max-md:max-w-full">{body}</p>
      </div>
      <CommentBtn />
    </article>
    );
}

export default ThreadCard;