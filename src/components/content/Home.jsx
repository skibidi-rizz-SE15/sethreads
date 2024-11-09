import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "./header/Header";
import Separator from "../separator/Separator";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Loading from "../loading/Loading";

function Home({ studentId }) {
  const [threads, setThreads] = useState([]);
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [animationState, setAnimationState] = useState("entered");
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
    setIsLoading(true);
    setOffset(0);
    setLimit(10);
    
    fetchData(0);
  }, []);

  useEffect(() => {
    async function animation() {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }

      if (!isLoading && !firstEntered) {
        setAnimationState("exiting");
      }

      if (isLoading || firstEntered) {
        setAnimationState("entering");

        animationTimeoutRef.current = setTimeout(() => {
          setAnimationState("entered");
          setFirstEntered(false);
        }, slideTime);
        
        setIsLoading(false);
        return;
      }

      animationTimeoutRef.current = setTimeout(() => {
        setAnimationState("entering");

        animationTimeoutRef.current = setTimeout(() => {
          setAnimationState("entered");
        }, slideTime);
      }, slideTime);
    }

    animation();
  }, [isLoading, firstEntered]);

  const fetchData = async (currentOffset) => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/get-all?limit=${limit}&offset=${currentOffset}`,
        {
          headers: {
            "x-token": localStorage.getItem("token"),
          },
        }
      );
      setThreads(res.data);
      setIsLoading(false);
      setOffset(currentOffset + 10);
    } catch (err) {
      console.error(err); 
      setIsLoading(false);
    }
  };
  
  function handleScroll(e) {
    const bottom = e.target.scrollHeight - e.target.scrollTop == e.target.clientHeight;
    if (bottom) {
      axios.get(
        `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/get-all?limit=${limit}&offset=${offset}`,
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

  function handleSortThreads(by) {
    if (by === "date") {
      setThreads((prevThreads) => [...prevThreads].sort((a, b) => b.id - a.id));
    } else if (by === "like") {
      setThreads((prevThreads) => [...prevThreads].sort((a, b) => b.likes - a.likes));
    }
  }

  function updateLikes(threadId, numberOfLikes) {
    setThreads((prev) => 
      prev.map((thread) => 
        thread.id === threadId ? { ...thread, likes: numberOfLikes } : thread
      )
    );
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
      <Header courseName={"HomePage"} />
      <Separator className="my-6 w-full max-w-full" />
      {threads.length === 0 ? (
        <div className="flex items-center justify-center w-full h-96">
          <p className="text-lg text-neutral-200">No threads found</p>
        </div>
      ) : (
        <div>
          <HighlightSection
            highlightThreads={threads.filter(
              (thread) => thread.is_highlight === true
            )}
            isHomePage={true}
          />
          <Separator className="my-6 w-full max-w-full" />
          <ThreadSection
            threads={threads.filter((thread) => thread.is_highlight === false)}
            isHomePage={true}
            studentId={studentId}
            updateLikes={updateLikes}
            onSort={handleSortThreads}
          />
        </div>
      )}
    </main>
  );
};

export default Home;
