import React from "react";
import ThreadCard from "../threadSection/threadCard/ThreadCard";
import TextTitle from "../../card/textTitle/TextTitle";
import TextBody from "../../card/textBody/TextBody";
import LikeBtn from "../../button/like/LikeBtn";
import CommentBtn from "../../button/post/CommentBtn";
import { getPreviewHTMLString } from "../../../utilities/HtmlFilter";


const MiniThreadCard = ({ data }) => {
    return (
        <article className="flex overflow-hidden flex-col self-center px-6 pt-6 pb-3.5 mx-auto my-1 rounded-3xl bg-neutral-800 hover:bg-general-highlight transition duration-200">
            <div className="flex flex-col items-start w-fit">
                <TextTitle title={data.title} className='mt-3 line-clamp-6 text-ellipsis' />
                <TextBody body={getPreviewHTMLString(data.body)} className='mt-2 line-clamp-3 text-ellipsis' />
            </div>
            <div className='flex items-center mt-2 -ml-2.5 text-white'>
                <LikeBtn isLiked={data.isLiked} likeCount={data.numberOfLikes} handleLikeThread={handleLikeThread} />
                <CommentBtn number={data.comments.length} />
            </div>
        </article>
    );
}
const MiniCommentCard = ({ data }) => {
    return (
        <div>CC</div>
    );
}

const ProfileContent = ({ comments, posted, likedThreads, likedHomeThreads, contentType, className = "" }) => {
    return (
        <section className={`${className}`}>
            {(contentType === "threads") && (
                posted.map((thread) => {
                    <MiniThreadCard data={thread} />
                })
            )}
            {(contentType === "likedThreads") && (
                (likedHomeThreads.map((thread) => {
                    <MiniThreadCard data={thread} />
                }))
                (likedThreads.map((thread) => {
                    <MiniThreadCard data={thread} />
                }))
            )}
            {(contentType === "comments") && (
                comments.map((comment) => {
                    <MiniCommentCard data={comment} />
                })
            )}
        </section>
    );
}

export default ProfileContent