import React from "react";

const PageLoader = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-50">
      <div
        className="animate-spin rounded-full h-12 w-12 border-t-4 border-purple-500 border-solid"
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
};

export default PageLoader;
