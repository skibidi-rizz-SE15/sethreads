import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./header/Header";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Separator from "../separator/Separator";
import { useLocation, useParams } from "react-router-dom";

const Content = ({ isHome, courseId, courseName, threads, setThreads }) => {
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  const location = useLocation();
  console.log(location);

  useEffect(() => {

    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/get-all?course_id=${courseId}&limit=${limit}&offset=${offset}`,
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );
        setThreads(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    if (location.pathname === "/home") {
      setIsLoading(true);
    } else {
      fetchData();
    }

  }, [courseId, courseName]);


  if (isLoading) {
    return <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800"></main>; // Bro you can set loading skeleton here
  }

  return (
    <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
      <Header courseName={courseName} />
      <Separator className="my-6 w-full max-w-full" />
    {  threads.length === 0 ? (<div className="flex items-center justify-center w-full h-96">
        <p className="text-lg text-neutral-200">No threads found</p>
      </div>) : (
          <div>
            <HighlightSection
              highlightThreads={threads.filter(
                (thread) => thread.is_highlight === true
              )}
              courseId={courseId}
            />
            <Separator className="my-6 w-full max-w-full" />
            <ThreadSection
              threads={threads.filter((thread) => thread.is_highlight === false)}
              courseId={courseId}
            />
          </div>
    )}
    </main>
  );
};

export default Content;
