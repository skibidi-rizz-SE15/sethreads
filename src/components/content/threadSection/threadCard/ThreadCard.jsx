import React from 'react';
import CommentBtn from '../../../button/post/CommentBtn';
import Profile from '../../../card/profile/Profile';
import TextBody from '../../../card/textBody/TextBody';
import TextTitle from '../../../card/textTitle/TextTitle';
import { getPreviewHTMLString } from '../../../../utilities/HtmlFilter';

const ThreadCard = ({ name, year, time, title, body, comments }) => {
  return (
    <article className="flex overflow-hidden flex-col self-center pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight min-w-96 w-4/5 max-md:mt-10">
      <div className="flex flex-col items-start mx-6 w-fit ">
        <Profile name={name} year={year} time={time}/>
        <TextTitle title={title} className='line-clamp-6 text-ellipsis' />
        {/* <TextBody body={getPreviewHTMLString(body)} className='line-clamp-3 text-ellipsis' /> */}
        <TextBody body={getPreviewHTMLString(body)} className='!line-clamp-3 !text-ellipsis' />
      </div>
      <CommentBtn number={comments.length} />
    </article>
    );
}

export default ThreadCard;