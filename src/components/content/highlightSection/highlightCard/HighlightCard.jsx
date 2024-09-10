import React from 'react';
import Profile from '../../../card/profile/Profile';
import CommentDisplay from '../../../display/CommentDisplay';
import ThreadTitle from '../../../card/threadTitle/ThreadTitle';

function HighlightCard({ title, taName }) {
  return (
    <div className="flex overflow-hidden flex-col gap-2 items-start py-3 px-2.5 mx-auto w-[33%] text-xs text-white rounded-2xl border border-solid bg-neutral-800 hover:bg-general-highlight border-neutral-700 max-md:ml-0 max-md:w-full">
      <ThreadTitle title={title} />
      <div className='flex items-center w-full'>
        <Profile name={taName} className='mr-auto' />
        <CommentDisplay />
      </div>
    </div>
  );
}

export default HighlightCard;