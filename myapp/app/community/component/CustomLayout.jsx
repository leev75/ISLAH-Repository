"use client";

import Tap from "./Tap";

function CustomLayout({ children }) {
  return (
    
      <div className="background">
        <Tap />
        {children}
      </div>
    
  );
}

export default CustomLayout;
