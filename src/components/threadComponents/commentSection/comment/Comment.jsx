import React, { useState } from "react";
import axios from "axios";
import ReplySection from "./replySection/ReplySection";
import Profile from "../../../card/profile/Profile";
import TextBody from "../../../card/textBody/TextBody";
import ReplyBtn from "../../../button/post/ReplyBtn";
import ToggleReplyBtn from "../../../button/toggle/ToggleReplyBtn";
import ReplyEditor from "../../../textEditor/ReplyEditor";
import PostReplyBtn from "../../../button/createReply/PostReplyBtn";

const Comment = ({commentId, name, year, time, body, subcomments, fromHome, studentId}) => {
    const [isVisible, setIsVisible] = useState(false);
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
        setIsVisible(!isVisible);
    }

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
            //   handleClearCommentEditor();
            //   setIsPostComment(true);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      }

    return (
        <div className="mt-2">
            <Profile name={name} year={year} time={time} />
            <div className="ml-[2.625rem]">
                <TextBody body={body} />
                <div className="flex gap-1">
                    {(subcomments.length > 0) && <ToggleReplyBtn number={subcomments.length} handleOnClick={handleOnClick} />}
                    <ReplyBtn />
                </div>
                <div className="flex gap-4 w-full items-center">
                    <ReplyEditor onChange={setReplyBody} />
                    <PostReplyBtn isValid={replyBody} handlePostReply={handlePostReply} className="flex text-white w-fit self-end mb-2" />
                </div>
                {isVisible && <ReplySection subcomments={subcomments} />}
            </div>
        </div>
    )
}

export default Comment