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

    fetchData();

  }, [courseId, courseName]);


  if (isLoading) {
    return (
        <main className="flex flex-col items-center justify-center overflow-y-auto w-full h-screen bg-neutral-800">
            <img
                loading="lazy"
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/7d8da78db1ff40849a641d3086462423e911d33579caaab958d340cde9701cf2?placeholderIfAbsent=true&apiKey=6c97697ae0354418a18c66f6f8aad447"
                alt=""
                className="object-contain aspect-[1.87] w-[120px] animate-pulse"
            />
            {/* <p className="pt-3 mt-4 text-lg text-gray-300 typing-animation">Loading</p> */}
        </main>
    );
}



  return (
    <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
      <Header courseName={courseName} />
      <Separator className="my-6 w-full max-w-full" />
      {threads.length === 0 ? (<div className="flex items-center justify-center w-full h-96">
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
            isHomePage={false}
          />
        </div>
      )}
    </main>
  );
};

export default Content;
