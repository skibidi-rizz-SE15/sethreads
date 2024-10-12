import React, { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { GiPin } from "react-icons/gi";
import axios from "axios";
import hljs from "highlight.js";

import Profile from "../card/profile/Profile";
import TextTitle from "../card/textTitle/TextTitle";
import TextBody from "../card/textBody/TextBody";
import CommentDisplay from "../display/CommentDisplay";
import Separator from "../separator/Separator";
import CommentEditor from "../textEditor/CommentEditor";
import CommentSection from "./commentSection/CommentSection";
import BackToCourseBtn from "../button/back/BackToCourseBtn";
import PostCommentBtn from "../button/createComment/PostCommentBtn"
import AlertBox from "../alertbox/AlertBox";
import Loading from "../loading/Loading";

import { useParams } from "react-router-dom";

let useClickOutside = (handler) => {
  let domNode = useRef();

  useEffect(() => {
    let maybeHandler = (event) => {
      if (!domNode.current.contains(event.target)) {
        handler();
      }
    };

    document.addEventListener("mousedown", maybeHandler);

    return () => {
      document.removeEventListener("mousedown", maybeHandler);
    };
  });

  return domNode;
};

const Thread = ({ fromHome, studentId, isTA, TACourseID, isAdmin }) => {
  const editorRef = useRef(null);
  const { courseId, threadId } = useParams();
  const [threadData, setThreadData] = useState({});
  const [numComment, setNumComment] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [isPin, setIsPin] = useState(false);
  const [commentBody, setCommentBody] = useState("");
  const [isPostComment, setIsPostComment] = useState(false);
  const [isBottom, setIsBottom] = useState(false);
  const [onPost, setOnPost] = useState(false);
  const [onBottom, setOnBottom] = useState(false);

  hljs.highlightAll();

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${fromHome
          ? `home/get-thread?thread_id=${threadId}`
          : `thread/get-thread?thread_id=${threadId}&course_id=${courseId}`
        }`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setThreadData(res.data);
        setNumComment(res.data.comments.length)
        if (res.data.is_highlight) {
          setIsPin(true);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [courseId, threadId, fromHome, isPostComment]);

  const formattedDateTime = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(new Date())
    .replace(",", "");

  function deleteThread() {
    axios
      .delete(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/delete-thread?thread_id=${threadId}`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        window.location.href = fromHome ? "/home" : `/course/${courseId}`;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function PinThread() {
    axios
      .put(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${fromHome ? "home" : "thread"}/update-is-highlight?thread_id=${threadId}`,
        {},
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
      .then((res) => {
        setIsPin((prev) => !prev);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleClearCommentEditor() {
    if (editorRef.current) {
      editorRef.current.clearContent();
      setCommentBody("");
    }
  };

  function handlePostComment() {
    if (commentBody) {
      axios.post(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${fromHome ? "home-comment" : "comment"
        }/create-comment`,
        {
          comment_from: threadId,
          comment_data: commentBody,
          posted_by: studentId,
          create_at: formattedDateTime,
        },
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      )
        .then((res) => {
          handleClearCommentEditor();
          setNumComment((prev) => prev + 1);
          setIsPostComment(true);
          setOnPost(!onPost);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  function handlePostCleanup() {
    setIsPostComment(false);
    setOnPost(null);
  }

  function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight;
    if (bottom) {
      setIsBottom(true);
      setOnBottom(!onBottom);
    }
  }
  function handleBottomCleanup() {
    setIsBottom(false);
    setOnBottom(null);
  }

  let domNode = useClickOutside(() => {
    setIsOpen(false);
  });

  if (isLoading) {
    return (
      <Loading />
    );
  }

  return (
    <div className="relative flex overflow-y-auto w-full" onScroll={handleScroll}>
      <BackToCourseBtn toHome={fromHome} />
      <div className="flex flex-col px-9 py-10 mx-auto w-4/5 min-h-full h-max bg-neutral-800">
        <div className="w-full">
          <div className="flex">
            <Profile
              name={`${threadData.author.name} ${threadData.author.surname}`}
              year={threadData.author.year}
              time={threadData.create_at}
            />
            <div ref={domNode} className="flex-1 flex justify-end">
              {((studentId === threadData.author.student_id || isTA === true) || (isAdmin)) && (
                  <div>
                    <div className="flex">
                      {((isTA === true && courseId === TACourseID) || (isAdmin)) && (
                        <GiPin
                          className={`text-xl ${isPin ? "text-software-orange" : "text-white"
                            } cursor-pointer mr-4`}
                          onClick={PinThread}
                        />
                      )}
                      {((studentId === threadData.author.student_id) || (isAdmin)) && (
                        <CiMenuKebab
                          className="text-xl text-white cursor-pointer"
                          onClick={() => setIsOpen((prev) => !prev)}
                        />
                      )}
                    </div>
                    {isOpen && (
                      <div
                        className="absolute right-20 z-10 w-48 mt-2 origin-top-right bg-eerie-black rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="options-menu"
                      >
                        <div className="py-1" role="none">
                          <button
                            className="block w-full px-4 py-2 text-sm text-gray-600 text-left"
                            role="menuitem"
                            disabled={true}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setIsAlertOpen(true)}
                            className="block w-full px-4 py-2 text-sm text-white text-left hover:bg-general-highlight"
                            role="menuitem"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
            </div>
          </div>
          <TextTitle title={threadData.title} className="mt-3" />
          <TextBody body={threadData.body} className="mt-2" />
        </div>
        <CommentDisplay number={numComment} />
        <Separator className="w-full my-6" />
        <div className="flex flex-col w-full">
            <CommentEditor onChange={setCommentBody} ref={editorRef} />
            <PostCommentBtn handlePostComment={handlePostComment} isValid={commentBody !== ""} className="mt-2 mr-2" />
        </div>
        <CommentSection
          thread_id={threadId}
          isHome={fromHome}
          isPostComment={isPostComment}
          studentId={studentId}
          triggerFetch={onBottom}
          isBottom={isBottom}
          onBottomCleanup={handleBottomCleanup}
          onPost={onPost}
          onPostCleanup={handlePostCleanup}
        />
      </div>
      <AlertBox isOpen={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <h2 className="text-xl font-bold mb-4">Confirm Deletion</h2>
        <p>Are you sure you want to delete this thread?</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={() => setIsAlertOpen(false)}
            className="mr-2 px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={deleteThread}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </AlertBox>
    </div>
  );
};

export default Thread;
