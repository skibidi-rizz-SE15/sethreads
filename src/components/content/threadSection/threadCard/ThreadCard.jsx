import React from 'react';
import CommentBtn from '../../../button/post/CommentBtn';

function ThreadCard({ name, time, title, body, imageHeight }) {
  return (
    <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto rounded-3xl bg-neutral-800 min-w-96 w-4/5 max-md:mt-10">
      <div className="flex flex-col items-start mx-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2.5 text-sm">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="User Avatar" className="object-contain shrink-0 aspect-square rounded-[100px] w-[25px]" />
          <div className="flex my-auto gap-2">
            <div className="grow text-white">{name}</div>
            <div className="text-neutral-400">{time}</div>
          </div>
        </div>
        <h2 className="mt-3 text-xl text-white max-md:max-w-full">{title}</h2>
        <p className="mt-2 text-sm text-stone-500 max-md:max-w-full">{body}</p>
      </div>
      <CommentBtn />
    </article>
    );
}

export default ThreadCard;