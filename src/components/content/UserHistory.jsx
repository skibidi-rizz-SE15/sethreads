import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import BackToCourseBtn from "../button/back/BackToCourseBtn";
import ProfileContent from "./ProfileContent/ProfileContent";

const UserHistory = () => {
    const [selectedTab, setSelectedTab] = useState("threads");
    const [studentData, setStudentData] = useState(null);
    const [threadsLiked, setThreadsLiked] = useState([]);
    const [threadsLikedHome, setThreadsLikedHome] = useState([]);
    const { studentID } = useParams();
    const [yearBackground, setYearBackground] = useState("");
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/student/get-info?student_id=${studentID}`, {
            headers: {
                "x-token": localStorage.getItem("token")
            }
        }).then((res) => {
            setStudentData(res.data);
            switch (res.data.year) {
                case -1:
                    setYearBackground("bg-red-500");
                    break;
                case 1:
                    setYearBackground("bg-purple-500");
                    break;
                case 2:
                    setYearBackground("bg-blue-500");
                    break;
                case 3:
                    setYearBackground("bg-yellow-500");
                    break;
                case 4:
                    setYearBackground("bg-green-500");
                    break;
                default:
                    setYearBackground("bg-teal-500");
            }
            const threads = res.data.registered_courses.flatMap(course =>
                course.forums.filter(thread =>
                    thread.liked_by.some(like => like.student_id === studentID)
                )
            );
            setThreadsLiked(threads);
            axios.get(`${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/get`, {
                headers: {
                    "x-token": localStorage.getItem("token")
                }
            })
            .then((res) => {
                const likedThreads = res.data.filter(thread => 
                    thread.liked_by.some(like => like.student_id === studentID)
                );
                setThreadsLikedHome(likedThreads);
            })
            .catch((err) => {
                console.log(err);
            });
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    return (
        <main className="relative flex overflow-y-auto w-full">
            <BackToCourseBtn toHome={true} />
            <div className="flex flex-col px-9 py-10 gap-10 mx-auto w-4/5 min-h-full h-max bg-neutral-800">
                <div className="grid grid-cols-[auto,auto] gap-x-8 w-fit text-sm text-white">
                    <img
                        loading="lazy"
                        src="https://cdn.builder.io/api/v1/image/assets/TEMP/da1e4bf63962c141c8657868b117ac6c66f46017effdd8b677ebbc75f8cd98fd?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5"
                        alt="User Avatar"
                        className={`self-center row-start-1 row-end-${(studentData && studentData.year) ? "3" : "2"} object-contain shrink-0 aspect-square rounded-[100px] w-[10rem]`}
                    />
                    <div className="flex my-auto gap-2 text-4xl">
                        {studentData ? studentData.name : "loading"} {studentData ? studentData.surname : "loading"}
                    </div>
                    {(studentData) && (
                        <div className="flex gap-3 w-fit h-fit text-lg">
                            <div className={`h-fit w-fit rounded-lg px-3 ${yearBackground}`}>{(studentData.year === -1) ? `ADMIN` : `Year ${studentData.year}`}</div>
                            {studentData.is_ta ? (<div className="w-7 h-7 px-3 rounded-lg flex justify-center items-center bg-green-500">TA</div>) : ""}
                        </div>
                    )}
                </div>
                <div className="flex gap-4 justify-center w-fit text-white text-lg">
                    <button
                        onClick={() => setSelectedTab("threads")}
                        className={`px-4 py-2 rounded-md ${selectedTab === "threads" ? "bg-software-orange" : "bg-neutral-700 hover:bg-software-orange-hover"}`}
                    >
                        My Threads
                    </button>
                    <button
                        onClick={() => setSelectedTab("likedThreads")}
                        className={`px-4 py-2 rounded-md ${selectedTab === "likedThreads" ? "bg-software-orange" : "bg-neutral-700 hover:bg-software-orange-hover"}`}
                    >
                        Liked Threads
                    </button>
                    <button
                        onClick={() => setSelectedTab("comments")}
                        className={`px-4 py-2 rounded-md ${selectedTab === "comments" ? "bg-software-orange" : "bg-neutral-700 hover:bg-software-orange-hover"}`}
                    >
                        My Comments
                    </button>
                </div>
                {(studentData) && (
                    <ProfileContent 
                      comments={studentData.comment} 
                      comments_public={studentData.comment_public}
                      posted={studentData.posted} 
                      posted_public={studentData.posted_public}
                      likedThreads={threadsLiked} 
                      likedHomeThreads={threadsLikedHome}
                      contentType={selectedTab} 
                    />
                )}
            </div>
        </main>
    );
}

export default UserHistory