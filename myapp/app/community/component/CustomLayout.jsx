"use client";

import Tap from "./Tap";

function CustomLayout({ children }) {
  return (
    <>
      <div className="bg-gray-100 flex-[8] p-4 rounded min-h-[300px]">
        <Tap />
        {children}
      </div>
    </>
  );
}

export default CustomLayout;
