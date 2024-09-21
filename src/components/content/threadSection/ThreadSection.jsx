import React from 'react';
import ThreadCard from './threadCard/ThreadCard';
import Separator from '../../separator/Separator';

const ThreadSection = ({ threads }) => {

return (
  <section>
    {threads.map((thread, index) => (
      <React.Fragment key={thread.thread_id}>
        <ThreadCard name={thread.author.name} time={thread.create_at} title={thread.title} body={thread.body} className='min-w-96 w-4/5' />
        {index < threads.length - 1 && (<Separator className='mx-auto w-4/5 min-w-96' />)}
      </React.Fragment>
    ))}
  </section>
  );
}

export default ThreadSection;