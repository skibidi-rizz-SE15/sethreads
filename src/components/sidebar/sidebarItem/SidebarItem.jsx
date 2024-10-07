import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ subject, to, isActive }) => {
  return (
    <Link to={to} className="">
      <div className={`text-wrap px-2.5 py-3 mt-6 rounded-lg border border-general-highlight ${isActive ? 'bg-general-highlight' : 'hover:bg-general-highlight'}`}>
        {subject}
      </div>
    </Link>
  );
}

export default SidebarItem;