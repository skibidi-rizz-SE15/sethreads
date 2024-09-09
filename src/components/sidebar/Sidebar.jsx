import React from "react";
import SidebarItem from "./SidebarItem/SidebarItem";

function Sidebar() {
  const subjects = ["Subject1", "Subject2", "Subject3", "Subject4"];

  return (
    <nav className="flex overflow-hidden z-10 flex-col items-start px-3 pt-10 max-w-full text-base tracking-wide text-white whitespace-nowrap rounded-none border-r border-r-yellow-600 bg-neutral-800 pb-[608px] w-[303px] max-md:pb-24">
      <div className="flex overflow-hidden gap-2 px-9 py-1.5 font-bold rounded-lg bg-zinc-600 max-md:px-5">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48c4f85fabeec6d12399edb61563948596f63b0241a9ce3444c18958f6a5b0c2?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="" className="object-contain shrink-0 w-6 aspect-square" />
        <div className="my-auto basis-auto">Home</div>
      </div>
      <div className="shrink-0 self-stretch mt-11 h-px border border-solid border-neutral-700 max-md:mt-10" />
      <h2 className="mt-4 text-2xl font-bold text-neutral-400">Courses</h2>
      {subjects.map((subject, index) => (
        <SidebarItem key={index} subject={subject} />
      ))}
    </nav>
  );
}

export default Sidebar;