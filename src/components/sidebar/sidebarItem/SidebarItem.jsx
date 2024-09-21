import React from "react";
import { Link } from "react-router-dom";

const SidebarItem = ({ subject, to, isActive }) => {
  return (
    <Link to={to}>
      <div className={`text-wrap px-2.5 py-3 mt-6 rounded-lg ${isActive ? 'bg-general-highlight' : 'hover:bg-general-highlight'}`}>
        {subject}
      </div>
    </Link>
  );
}

export default SidebarItem;