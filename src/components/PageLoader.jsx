import React from "react";

function PageLoader({ size = 12, color = "gray" }) {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className={`animate-spin rounded-full h-${size} w-${size} border-b-4 border-${color}-900`}
        role="status"
        aria-label="Loading"
      ></div>
    </div>
  );
}

export default PageLoader;
