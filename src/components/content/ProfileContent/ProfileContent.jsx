import React, { useEffect, useState } from "react";
import TextTitle from "../../card/textTitle/TextTitle";
import Separator from "../../separator/Separator";
import { Link } from "react-router-dom";
import { LoaderCircle } from 'lucide-react';

const MiniThreadCard = ({ data }) => {
  return (
    <Link
      to={
        data.course_id
          ? `/course/${data.course_id}/thread/${data.id}`
          : `/home/thread/${data.id}`
      }
      className="contents"
    >
      <article className="flex overflow-hidden flex-col self-center px-6 py-3 rounded-3xl bg-eerie-black hover:bg-general-highlight transition duration-200">
        <div className="text-software-orange">
          {data.course_id ? (
            <>
              <span className="text-gray-300">Course ID: </span>
              <span>{data.course_id}</span>
            </>
          ) : (
            <span>HOME</span>
          )}
        </div>
        <TextTitle title={data.title} className="line-clamp-3 text-ellipsis" />
        <div className="flex mt-2 items-center text-gray-400">
          {data.likes} Likes • {data.comments.length} Comments
        </div>
      </article>
    </Link>
  );
};

const MiniCommentCard = ({ data }) => {
  return (
    <Link
      to={
        data.course_id
          ? `/course/${data.course_id}/thread/${data.comment_from}`
          : `/home/thread/${data.id}`
      }
      className="contents"
    >
      <article className="flex overflow-hidden flex-col self-center px-6 py-3 rounded-3xl bg-eerie-black hover:bg-general-highlight transition duration-200">
        <TextTitle
          title={data.comment_data}
          className="line-clamp-3 text-ellipsis"
        />
        <div className="flex mt-2 items-center text-gray-400">
          {data.subcomments.length} Replies
        </div>
      </article>
    </Link>
  );
};

const ProfileContent = ({
  comments,
  comments_public,
  posted,
  posted_public,
  likedThreads,
  likedHomeThreads,
  contentType,
  className = "",
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentContentType, setCurrentContentType] = useState(contentType);

  useEffect(() => {
    setIsLoading(true);
    setCurrentContentType(contentType);

    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(loadingTimer);
  }, [contentType]);

  if (isLoading) {
    return (
      <section className={`${className}`}>
        <div className="flex justify-center items-center h-full">
          <LoaderCircle strokeWidth={1} size={56} className='mt-20 text-white animate-spin' /> 
        </div>
      </section>
    );
  }

  return (
    <section className="animate-[fadeIn_0.15s_ease-in]">
      {contentType === "threads" && (
        <>
          <h1 className="text-white text-2xl mb-4">
            <strong>Home</strong>
          </h1>
          {posted_public.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {posted_public.map((thread, index) => (
            <div>
              <MiniThreadCard data={thread} />
              {index < posted_public.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
          <h1 className="text-white text-2xl my-4">
            <strong>Courses</strong>
          </h1>
          {posted.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {posted.map((thread, index) => (
            <div>
              <MiniThreadCard data={thread} />
              {index < posted.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
      {contentType === "likedThreads" && (
        <>
          <h1 className="text-white text-2xl mb-4">
            <strong>Home</strong>
          </h1>
          {likedHomeThreads.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {likedHomeThreads.map((thread, index) => (
            <div>
              <MiniThreadCard data={thread} />
              {index < likedHomeThreads.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
          <h1 className="text-white text-2xl my-4">
            <strong>Courses</strong>
          </h1>
          {likedThreads.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {likedThreads.map((thread, index) => (
            <div>
              <MiniThreadCard data={thread} />
              {index < likedThreads.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
      {contentType === "comments" && (
        <>
          <h1 className="text-white text-2xl mb-4">
            <strong>Home</strong>
          </h1>
          {comments_public.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {comments_public.map((comment, index) => (
            <div>
              <MiniCommentCard data={comment} />
              {index < comments_public.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
          <h1 className="text-white text-2xl mb-4">
            <strong>Course</strong>
          </h1>
          {comments.length === 0 && (<h1 className="text-gray-400 text-lg mb-4 text-center">No Activity</h1>)}
          {comments.map((comment, index) => (
            <div>
              <MiniCommentCard data={comment} />
              {index < comments.length - 1 && (
                <Separator className="w-full my-4" />
              )}
            </div>
          ))}
        </>
      )}
    </section>
  );
};

export default ProfileContent;
