import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Header from "./header/Header";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Separator from "../separator/Separator";
import Loading from "../loading/Loading";
import { useLocation } from "react-router-dom";

const Content = ({ isHome, courseId, courseName, threads, setThreads }) => {
  const [limit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [offset] = useState(0);
  const [animationState, setAnimationState] = useState("entered");
  const [localThreads, setLocalThreads] = useState([]);
  const [displayedCourseName, setDisplayedCourseName] = useState(courseName);
  const animationTimeoutRef = useRef(null);
  const [firstEntered, setFirstEntered] = useState(true);

  const location = useLocation();

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
          setLocalThreads(newThreads);
          setThreads(newThreads);
          setDisplayedCourseName(courseName);
          setAnimationState("entering");
          
          animationTimeoutRef.current = setTimeout(() => {
            setAnimationState("entered");
            setFirstEntered(false); // set firstEntered to false after initial animation
          }, 200);
          
          setIsLoading(false);
          return;
        }

        // Exit animation (content moves right)
        animationTimeoutRef.current = setTimeout(() => {
          setLocalThreads(newThreads);
          setThreads(newThreads);
          setDisplayedCourseName(courseName);

          // Start entering animation
          setAnimationState("entering");

          // Enter animation (content moves to center)
          animationTimeoutRef.current = setTimeout(() => {
            setAnimationState("entered");
          }, 200);
        }, 200);

      } catch (err) {
        console.error(err);
        setLocalThreads([]);
        setThreads([]);
      } finally {
        if (isLoading) {
          setIsLoading(false);
        }
      }
    };

    fetchData();
  }, [courseId, limit, offset, setThreads, isLoading, courseName, firstEntered]);

  if (isLoading) {
    return <Loading />;
  }

  const threadsToShow = localThreads || [];

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
    >
      <Header courseName={displayedCourseName} />
      <Separator className="my-6 w-full max-w-full" />
      {threadsToShow.length === 0 ? (
        <div className="flex items-center justify-center w-full h-96">
          <p className="text-lg text-neutral-200">No threads found</p>
        </div>
      ) : (
        <div>
          <HighlightSection highlightThreads={threadsToShow.filter((thread) => thread.is_highlight === true)} courseId={courseId} />
          <Separator className="my-6 w-full max-w-full" />
          <ThreadSection threads={threadsToShow.filter((thread) => thread.is_highlight === false)} courseId={courseId} isHomePage={false}/>
        </div>
      )}
    </main>
  );
};

export default Content;