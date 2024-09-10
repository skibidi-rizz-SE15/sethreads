import React from "react";
import SidebarItem from "./sidebarItem/SidebarItem";
import Separator from "../separator/Separator";

function Sidebar() {
  const subjects = [
    { name: "Subject1 your momo hehe haha lol kekw", id: "001" },
    { name: "Subject2", id: "002" },
    { name: "Subject3", id: "003" },
    { name: "Subject4", id: "004" },
    { name: "dummy subject", id: "005" },
    { name: "dummy subject", id: "006" },
    { name: "dummy subject", id: "007" },
    { name: "dummy subject", id: "008" },
  ];

  return (
    <nav className="flex z-10 flex-col items-start overflow-y-auto px-3 pt-10 max-w-full text-base tracking-wide text-white whitespace-nowrap rounded-none border-r border-r-yellow-600 bg-eerie-black h-full">
      <div className="flex gap-2 px-2.5 py-2.5 w-full font-bold rounded-lg bg-neutral-800 hover:bg-general-highlight max-md:px-1">
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48c4f85fabeec6d12399edb61563948596f63b0241a9ce3444c18958f6a5b0c2?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="" className="object-contain shrink-0 w-6 aspect-square" />
        <div className="my-auto basis-auto">Home</div>
      </div>
      <Separator className="self-stretch mt-11" />
      <h2 className="mt-4 text-2xl font-bold text-neutral-400">Courses</h2>
      <div>
        {subjects.map((subject) => (
          <SidebarItem key={subject.id} subject={subject.name} />
        ))}
      </div>
    </nav>
  );
}

export default Sidebar;