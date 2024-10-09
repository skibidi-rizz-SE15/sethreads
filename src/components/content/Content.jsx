import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./header/Header";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Separator from "../separator/Separator";
import Loading from "../loading/Loading";
import { useLocation } from "react-router-dom";

const Content = ({ courseId, courseName, threads, setThreads, location }) => {
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [animationState, setAnimationState] = useState("entered");
  const [displayedCourseName, setDisplayedCourseName] = useState(courseName);
  const animationTimeoutRef = useRef(null);
  const [firstEntered, setFirstEntered] = useState(true);
  const slideTime = 50;

  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);

  const getAnimationStyles = () => {
    switch (animationState) {
      case "entering":
        return "translate-x-full opacity-0"; 
      case "exiting":
        return firstEntered ? "translate-x-full opacity-0" : "translate-x-full opacity-0";
      case "entered":
        return "translate-x-0 opacity-100";
      default:
        return "translate-x-0 opacity-100";
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      if (!isLoading && !firstEntered) {
        setAnimationState("exiting");
      }

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/get-all?course_id=${courseId}&limit=${limit}&offset=${offset}`,
          {
            headers: {
              "x-token": localStorage.getItem("token"),
            },
          }
        );

        const newThreads = response.data || [];

        if (isLoading || firstEntered) {
          // first load or coming from another page
          setThreads(newThreads);
          setLimit(10);
          setOffset(10);
          setDisplayedCourseName(courseName);
          setAnimationState("entering");
          
          animationTimeoutRef.current = setTimeout(() => {
            setAnimationState("entered");
            setFirstEntered(false); // set firstEntered to false after initial animation
          }, slideTime);
          
          setIsLoading(false);
          return;
        }

        // Exit animation (content moves right)
        animationTimeoutRef.current = setTimeout(() => {
          setThreads(newThreads);
          setDisplayedCourseName(courseName);

          // Start entering animation
          setAnimationState("entering");

          // Enter animation (content moves to center)
          animationTimeoutRef.current = setTimeout(() => {
            setAnimationState("entered");
          }, slideTime);
        }, slideTime);

      } catch (err) {
        console.error(err);
        setThreads([]);
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    function resetState() {
      setLimit(10);
      setOffset(0);
    }
    resetState();
    fetchData();
  }, [courseId, courseName]);
  
  function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop < e.target.clientHeight;
    if (bottom) {
      axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/thread/get-all?course_id=${courseId}&limit=${limit}&offset=${offset}`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      ).then((res) => {
        if (res.data.length === 0) {
          return;
        }
        setThreads((prevThreads) => [...prevThreads, ...res.data]);
        setOffset((prevOffset) => prevOffset + 10);
      }).catch((err) => {
        console.error(err);
      });
    }
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main
      className={`
        flex flex-col 
        overflow-y-auto 
        px-9 pt-10 
        mx-auto 
        w-full 
        bg-neutral-800 
        transition-all 
        duration-300 
        ease-in-out
        ${getAnimationStyles()}
      `}
      onScroll={handleScroll}
    >
      <Header courseName={displayedCourseName} />
      <Separator className="my-6 w-full max-w-full" />
      {threads.length === 0 ? (
        <div className="flex items-center justify-center w-full h-96">
          <p className="text-lg text-neutral-200">No threads found</p>
        </div>
      ) : (
        <div>
          <HighlightSection highlightThreads={threads.filter((thread) => thread.is_highlight === true)} courseId={courseId} />
          <Separator className="my-6 w-full max-w-full" />
          <ThreadSection threads={threads.filter((thread) => thread.is_highlight === false)} courseId={courseId} isHomePage={false}/>
        </div>
      )}
    </main>
  );
};

export default Content;