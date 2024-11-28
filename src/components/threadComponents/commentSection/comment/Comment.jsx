import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";
import ReplyEditor from "../../../textEditor/ReplyEditor";
import PostReplyBtn from "../../../button/createReply/PostReplyBtn";
import { CiMenuKebab } from "react-icons/ci";
import AlertBox from "../../../alertbox/AlertBox";

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

const Comment = ({commentId, name, year, time, body, replies, fromHome, studentId, onPostReply, isLigit, onDelete}) => {
    const editorRef = useRef(null);
    const [isRepliesVisible, setIsRepliesVisible] = useState(false);
    const [isReplyEditorVisible, setIsReplyEditorVisible] = useState(false);
    const [replyBody, setReplyBody] = useState("");
    const [isDropdownVisible, setIsDropdownVisible] = useState(false);
    const [isAlertOpen, setIsAlertOpen] = useState(false);
    const [isAlertClose, setIsAlertClose] = useState(false);

    let domNode = useClickOutside(() => {
      setIsDropdownVisible(false);
    });

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

    function handleOnClick() {
        setIsRepliesVisible(!isRepliesVisible);
    }

    function handleClearReplyEditor() {
        if (editorRef.current) {
          editorRef.current.clearContent();
          setReplyBody("");
        }
      };

    function handlePostReply() {
        if (replyBody) {
          axios.post(
            `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/comment/create-subcomment`,
            {
              "comment_id": commentId,
              "replied_by": studentId,
              "body": replyBody,
              "create_at": formattedDateTime
            },
            {
              headers: {
                "x-token": localStorage.getItem("token"),
              },
            }
          )
            .then((res) => {
                onPostReply(res.data);
                handleClearReplyEditor();
                setIsReplyEditorVisible(false);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

    return (
        <div className="mt-4">
            <div ref={domNode}className="flex items-center">
              <Profile name={name} year={year} time={time} />
              {isLigit && (
                <div className="relative ml-auto" onClick={() => setIsDropdownVisible(!isDropdownVisible)}>
                <CiMenuKebab className="text-white cursor-pointer" />
                {isDropdownVisible && (
                  <div className="absolute right-0 mt-2 w-24 bg-eerie-black text-white text-sm rounded shadow-lg animate-[fadeIn_0.125s_ease-in]">
                    <ul>
                      <li className="px-4 py-2 text-gray-600">Edit</li>
                      <li className="px-4 py-2 hover:bg-general-highlight cursor-pointer transition duration-200" onClick={() => {
                        setIsAlertOpen(true);
                        setIsDropdownVisible(false);
                      }} >Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
            </div>
            <div className="ml-[2.625rem]">
                <TextBody body={body} className="-mt-1" />
                <div className="flex gap-1 items-center -mt-[0.75rem]">
                    {(replies.length > 0) && <ToggleReplyBtn number={replies.length} handleOnClick={handleOnClick} />}
                    <ReplyBtn handleClick={() => setIsReplyEditorVisible((prev) => !prev)} className="" />
                </div>
                {isReplyEditorVisible && (<div className="flex gap-4 my-4 w-full items-center">
                    <ReplyEditor onChange={setReplyBody} ref={editorRef} />
                    <PostReplyBtn isValid={replyBody} handlePostReply={handlePostReply} className="flex text-white w-fit self-end mb-2" />
                </div>)}
                {isRepliesVisible && <ReplySection replies={replies} />}
            </div>
            <AlertBox 
              isOpen={isAlertOpen}
              isClose={isAlertClose}
              onClose={() => {
                setIsAlertClose(true);
                setTimeout(() => {
                  setIsAlertOpen(false);
                  setIsAlertClose(false);
                }, 150);
              }}
            >
              <h2 className="text-xl font-bold mb-4">Confirmation Required</h2>
              <p>Are you sure you want to delete this comment?</p>
              <div className="mt-4 gap-2 flex justify-end">
                <button
                  onClick={() => onDelete(commentId)}
                  className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700 transition duration-150"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                  setIsAlertClose(true);
                  setTimeout(() => {
                    setIsAlertOpen(false);
                    setIsAlertClose(false);
                  }, 150);
                }}
                  className="px-4 py-2 bg-gray-300 text-black rounded hover:bg-gray-500 transition duration-150"
                >
                  Cancel
                </button>
              </div>
            </AlertBox>
        </div>
    )
}

export default Comment