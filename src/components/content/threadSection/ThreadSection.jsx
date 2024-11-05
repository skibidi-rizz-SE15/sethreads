import React from 'react';
import ThreadCard from './threadCard/ThreadCard';
import Separator from '../../separator/Separator';

import { Link } from 'react-router-dom';

const ThreadSection = ({ threads, courseId, isHomePage, studentId }) => {
  return (
    <section>
      {threads.map((thread, index) => (
        <Link to={isHomePage ? `thread/${thread.id}` : `/course/${courseId}/thread/${thread.id}`} key={thread.id} className='contents'>
          <ThreadCard 
            name={`${thread.author.name} ${thread.author.surname}`} 
            year={thread.author.year} time={thread.create_at}
            title={thread.title} body={thread.body}
            comments={thread.comments}
            likes={thread.likes}
            liked_by={thread.liked_by}
            studentId={studentId}
            className='min-w-96 w-4/5' />
          {index < threads.length - 1 && (<Separator className='mx-auto w-4/5 min-w-96' />)}
        </Link>
      ))}
    </section>
  );
}

export default ThreadSection;