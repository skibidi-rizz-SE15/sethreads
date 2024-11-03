import React, { useState, useRef } from "react";
import axios from "axios";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";
import ReplyEditor from "../../../textEditor/ReplyEditor";
import PostReplyBtn from "../../../button/createReply/PostReplyBtn";

const Comment = ({commentId, name, year, time, body, subcomments, fromHome, studentId, onPostReply}) => {
    const editorRef = useRef(null);
    const [isRepliesVisible, setIsRepliesVisible] = useState(false);
    const [isReplyEditorVisible, setIsReplyEditorVisible] = useState(false);
    const [replyBody, setReplyBody] = useState("");

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
            `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/${fromHome ? "home-comment" : "comment"
            }/create-subcomment`,
            {
              "reply_of": commentId,
              "posted_by": studentId,
              "reply_data": replyBody,
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
            <Profile name={name} year={year} time={time} />
            <div className="ml-[2.625rem]">
                <TextBody body={body} className="-mt-1" />
                <div className="flex gap-1 items-center -mt-[0.75rem]">
                    {(subcomments.length > 0) && <ToggleReplyBtn number={subcomments.length} handleOnClick={handleOnClick} />}
                    <ReplyBtn handleClick={() => setIsReplyEditorVisible((prev) => !prev)} className="" />
                </div>
                {isReplyEditorVisible && (<div className="flex gap-4 my-4 w-full items-center">
                    <ReplyEditor onChange={setReplyBody} ref={editorRef} />
                    <PostReplyBtn isValid={replyBody} handlePostReply={handlePostReply} className="flex text-white w-fit self-end mb-2" />
                </div>)}
                {isRepliesVisible && <ReplySection subcomments={subcomments} />}
            </div>
        </div>
    )
}

export default Comment