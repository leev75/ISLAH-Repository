import React from "react";
import Profile from "./profile";
import Menu from "./menu";

function CustomLayout({ children }) {
  return (
    <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
      <Menu />
      {children}
    </div>
  );
}

export default CustomLayout;
