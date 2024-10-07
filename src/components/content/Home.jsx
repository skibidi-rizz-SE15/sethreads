import React, { useState, useEffect } from "react";
import axios from "axios";

import Header from "./header/Header";
import Separator from "../separator/Separator";
import HighlightSection from "./highlightSection/HighlightSection";
import ThreadSection from "./threadSection/ThreadSection";
import Loading from "../loading/Loading";

const Home = () => {
  const [limit, setLimit] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [threads, setThreads] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false); 

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsAnimating(true); 

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_DOMAIN_NAME}/api/home/get-all?&limit=${limit}`,
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
        setTimeout(() => {
          setIsAnimating(false);
        }, 500); 
      }
    };

    fetchData();
  }, [limit]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <main
      className={`flex flex-col overflow-y-auto px-9 pt-10 mx-auto w-full bg-neutral-800 transition-transform duration-500 ${
        isAnimating ? "translate-x-full" : "translate-x-0"
      }`}
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
          />
        </div>
      )}
    </main>
  );
};

export default Home;
