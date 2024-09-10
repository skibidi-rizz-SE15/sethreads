import React from "react";

function SidebarItem({ subject }) {
  return (
    <div className="text-wrap px-2.5 py-3 mt-6 rounded-lg bg-neutral-800 hover:bg-general-highlight max-md:pr-5">
      {subject}
    </div>
  );
}

export default SidebarItem;