import React from "react";

function SidebarItem({ subject }) {
  return (
    <div className="overflow-hidden px-2.5 py-3 mt-6 w-full rounded-lg bg-neutral-800 max-md:pr-5">
      {subject}
    </div>
  );
}

export default SidebarItem;