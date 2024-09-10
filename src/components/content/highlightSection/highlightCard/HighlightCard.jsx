import React from 'react';

function HighlightCard({ title, comments, taName }) {
  return (
    <div className="flex overflow-hidden flex-col items-start py-3 pr-16 pl-2.5 mx-auto w-[33%] text-xs text-white rounded-2xl border border-solid bg-neutral-800 hover:bg-general-highlight border-neutral-700 max-md:ml-0 max-md:w-full">
      <div className="text-xl">{title}</div>
      <div className="text-zinc-600">{comments} comments</div>
      <div className="flex gap-2">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/bfcc04201832c504506b9b209d0b79fcdfb3cec51ae5c8e109a79b8d084bffc4?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="TA Avatar" className="object-contain shrink-0 w-4 aspect-square rounded-[100px]" />
        <div>{taName}</div>
      </div>
    </div>
  );
}

export default HighlightCard;