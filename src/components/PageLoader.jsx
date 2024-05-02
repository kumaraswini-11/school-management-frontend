import React from "react";

function PageLoader() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-b-4 border-gray-900"></div>
    </div>
  );
}

export default PageLoader;
