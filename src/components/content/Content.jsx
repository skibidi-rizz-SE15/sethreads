import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./header/Header";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Separator from "../separator/Separator";

const Content = ({ courseId, courseName }) => {
  const [threads, setThreads] = useState(null);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);

  // useEffect(() => {
  //   setLimit((prev) => prev + 10);
  //   setOffset((prev) => prev + 10);
  // }, [scroll])

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
        console.log(response.data);
        setThreads(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(true);
      }
    };

    fetchData();
    console.log("Content changed!");

    // No need for cleanup function to reset limit and offset
  }, [courseId, courseName]);


  if (isLoading) {
    return <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800"></main>; // Bro you can set loading skeleton here
  }

  return (
    <main className="flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800">
      <Header courseName={courseName} />
      <Separator className="my-6 w-full max-w-full" />
      <HighlightSection
        highlightThreads={threads.filter(
          (thread) => thread.is_highlight === true
        )}
      />
      <Separator className="my-6 w-full max-w-full" />
      <ThreadSection
        threads={threads.filter((thread) => thread.is_highlight === false)}
      />
    </main>
  );
};

export default Content;
