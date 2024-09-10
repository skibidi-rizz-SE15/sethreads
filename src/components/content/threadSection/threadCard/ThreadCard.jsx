import React from 'react';
import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';
import ThreadBody from '../../../card/threadBody/ThreadBody';
import ThreadTitle from '../../../card/threadTitle/ThreadTitle';

function ThreadCard({ name, time, title, body, imageHeight, className="" }) {
  const style = `flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight max-md:mt-10 ${className}`;
  return (
    <article className={style}>
      <div className="flex flex-col items-start mx-6 max-md:px-5 max-md:max-w-full">
        <Profile name={name} time={time} />
        <ThreadTitle title={title} />
        <ThreadBody body={body} />
      </div>
      <CommentBtn />
    </article>
    );
}

export default ThreadCard;