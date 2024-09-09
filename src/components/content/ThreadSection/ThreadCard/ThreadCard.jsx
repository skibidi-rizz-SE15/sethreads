import React from 'react';

function ThreadCard({ name, time, title, body, imageHeight }) {
  return (
    <article className="flex overflow-hidden flex-col self-center py-4 mt-14 max-w-full rounded-3xl bg-neutral-800 w-[1071px] max-md:mt-10">
      <div className="flex flex-col items-start px-6 w-full max-md:px-5 max-md:max-w-full">
        <div className="flex gap-2.5 text-sm">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="User Avatar" className="object-contain shrink-0 aspect-square rounded-[100px] w-[25px]" />
          <div className="flex my-auto">
            <div className="grow text-white">{name}</div>
            <div className="text-neutral-400">{time}</div>
          </div>
        </div>
        <h2 className="mt-9 text-xl text-white max-md:max-w-full">{title}</h2>
        <p className="mt-6 text-sm text-stone-500 max-md:max-w-full">{body}</p>
        <div className="flex shrink-0 self-stretch mt-14 w-full rounded-3xl bg-neutral-700" style={{ height: imageHeight }} />
      </div>
      <button className="flex overflow-hidden gap-1 self-end px-2.5 py-2.5 mt-5 mr-7 text-sm font-medium tracking-normal leading-5 text-center text-white whitespace-nowrap rounded-lg bg-neutral-800 max-md:mr-2.5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/f13bec1b6188e12080f057de56f7d5d9096a37c2cb5e66272cc3a877ff656a97?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="Comment Icon" className="object-contain shrink-0 self-start w-5 aspect-square" />
        <span>Comments</span>
      </button>
    </article>
    );
}

export default ThreadCard;