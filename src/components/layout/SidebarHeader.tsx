
import React from "react";

const SidebarHeader = () => {
  return (
    <div className="flex items-center h-16 px-4 border-b border-gray-800">
      <div className="h-8 w-8 rounded-md bg-primary mr-2 flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-xl">O</span>
      </div>
      <h1 className="text-xl font-bold">OpenFix</h1>
    </div>
  );
};

export default SidebarHeader;
