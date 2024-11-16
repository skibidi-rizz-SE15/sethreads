import React, { useState, useRef, useEffect } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import ThreadCard from './threadCard/ThreadCard';
import Separator from '../../separator/Separator';

import { Link } from 'react-router-dom';

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener('mousedown', maybeHandler);

    return () => {
      document.removeEventListener('mousedown', maybeHandler);
    };
  });

  return domNode;
};

const ThreadSection = ({ threads, courseId, isHomePage, studentId, onSort, updateLikes }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [SortPlaceholder, setSortPlaceholder] = useState('Newest');

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  function handleSortThreads(by) {
    setSortPlaceholder(by);
    onSort(by);
    setIsOpen(false);
  }

  return (
    <section className='flex flex-col w-4/5 mx-auto min-w-96'>
      <div ref={domNode} className='w-fit'>
        <button className={`${isOpen ? 'bg-steadfast' : 'bg-neutral-800'} hover:bg-steadfast text-white text-sm font-bold p-2 pl-3 w-fit rounded-full mb-2`} onClick={() => setIsOpen(!isOpen)} >
          {SortPlaceholder}
          <IoIosArrowDown className='inline-block ml-1' />
        </button>
        {isOpen && (
          <div className='absolute top-[25.2rem] mt-10 bg-natural-800 w-32 h-fit bg-steadfast rounded-md animate-[fadeIn_0.125s_ease-in]'>
            <button className='hover:bg-general-selected text-white text-sm font-bold w-full p-2 pl-3 text-left rounded-md' onClick={() => handleSortThreads("Newest")}>
              Newest
            </button>
            <button className='hover:bg-general-selected text-white text-sm font-bold w-full p-2 pl-3 text-left rounded-md' onClick={() => handleSortThreads("Oldest")}>
              Oldest
            </button>
            <button className='hover:bg-general-selected text-white text-sm font-bold w-full p-2 pl-3 text-left rounded-md' onClick={() => handleSortThreads("Like")}>
              Like
            </button>
          </div>
        )}
      </div>
      <Separator className='w-full' />
      <section>
        {threads.map((thread, index) => (
          <Link to={isHomePage ? `thread/${thread.id}` : `/course/${courseId}/thread/${thread.id}`} key={thread.id} className='contents'>
            <ThreadCard
              thread_id={thread.id}
              name={`${thread.author.name} ${thread.author.surname}`}
              year={thread.author.year} time={thread.create_at}
              title={thread.title} body={thread.body}
              comments={thread.comments}
              likes={thread.likes}
              liked_by={thread.liked_by}
              studentId={studentId}
              fromHome={isHomePage}
              updateLikes={updateLikes}
              className='min-w-96 w-full' />
            {index < threads.length - 1 && (<Separator className='w-full' />)}
          </Link>
        ))}
      </section>
    </section>
  );
}

export default ThreadSection;