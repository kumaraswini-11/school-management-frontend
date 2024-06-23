import React from "react";
import { FiMoon, FiSun } from "react-icons/fi";

const Header = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header
      className="bg-white dark:bg-gray-800 shadow w-full flex items-center justify-between 
    p-2 h-16"
    >
      <div className="text-xl font-semibold text-gray-800 dark:text-white">
        Dashboard
      </div>
      <div className="flex items-center space-x-4"></div>
    </header>
  );
};

export default Header;
