import React from "react";
import SidebarContainer from "./sideBar";

function CustomLayout({ children }) {
  return (
    <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
      <SidebarContainer />
      {children}
    </div>
  );
}

export default CustomLayout;