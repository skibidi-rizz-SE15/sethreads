import React from "react";
import { Link } from "react-router-dom";
import SidebarItem from "./sidebarItem/SidebarItem";
import Separator from "../separator/Separator";

const Sidebar = ({ registered_courses, currentPath, taCourse, isAdmin }) => {
  return (
    <nav className="flex flex-col items-start overflow-y-auto px-5 pt-10 max-w-full text-base tracking-wide text-white whitespace-nowrap rounded-none border-r border-r-yellow-600 bg-eerie-black h-full">
      <Link to="/home" className={`flex gap-2 px-2.5 py-2.5 w-full font-bold rounded-lg ${currentPath === '/home' ? 'bg-general-highlight' : 'bg-eerie-black hover:bg-general-highlight'}`}>
        <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/48c4f85fabeec6d12399edb61563948596f63b0241a9ce3444c18958f6a5b0c2?placeholderIfAbsent=true&apiKey=55e9f8a1f064422990695f1eab1a40f5" alt="" className="object-contain shrink-0 w-6 aspect-square" />
        <div className="my-auto basis-auto">Home</div>
      </Link>
      {taCourse && (
        <div>
          <Separator className="self-stretch mt-11" />
          <h2 className="mt-4 text-2xl font-bold text-neutral-400">TA</h2>
          <SidebarItem 
            subject={taCourse.name} 
            to={`/course/${taCourse.course_id}`}
            isActive={currentPath === `/course/${taCourse.course_id}`}
          />
        </div>
      )}
      { isAdmin && (
        <div>
          <Separator className="self-stretch mt-11" />
          <h2 className="mt-4 text-2xl font-bold text-neutral-400">Admin</h2>
          <SidebarItem 
            subject="Admin" 
            to="/admin" 
            isActive={currentPath === '/admin'}
          />
        </div>
      )}
      <Separator className="self-stretch mt-11" />
      <h2 className="mt-4 text-2xl font-bold text-neutral-400">Courses</h2>
      <div>
        {registered_courses.map((course) => (
          <SidebarItem 
            key={course.course_id} 
            subject={course.name} 
            to={`/course/${course.course_id}`}
            isActive={currentPath === `/course/${course.course_id}`}
          />
        ))}
      </div>
    </nav>
  );
};

export default Sidebar;