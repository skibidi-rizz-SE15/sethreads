import React from "react";

const SidebarItem = ({ subject }) => {
  return (
    <div className="text-wrap px-2.5 py-3 mt-6 rounded-lg bg-neutral-800 hover:bg-general-highlight">
      {subject}
    </div>
  );
}

export default SidebarItem;