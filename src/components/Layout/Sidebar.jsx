import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentDuotone, PiChartLineUp } from "react-icons/pi";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";

const SidebarItem = ({ expanded, icon, text, to, onClick }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center py-3 px-4 my-2 font-medium rounded-lg cursor-pointer transition-colors group ${
          isActive
            ? "bg-gradient-to-tr from-purple-500 to-purple-400 text-white"
            : "hover:bg-purple-50 text-gray-700"
        }`
      }
      onClick={onClick}
    >
      <span className="text-lg">{icon}</span>
      {expanded && <span className="ml-4">{text}</span>}
    </NavLink>
  );
};

const SidebarItemList = ({ items, expanded, onItemClick }) => {
  return (
    <ul className="flex-1 px-2">
      {items.map((item, index) => (
        <SidebarItem
          expanded={expanded}
          key={index}
          icon={item.icon}
          text={item.text}
          to={item.to}
          onClick={() => onItemClick(item.text)}
        />
      ))}
    </ul>
  );
};

const Sidebar = ({ sidebarStyle }) => {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  const sidebarItems = [
    // { icon: <AiOutlineDashboard size={20} />, text: "Dashboard", to: "/" },
    { icon: <SiGoogleclassroom size={20} />, text: "Classes", to: "/classes" },
    {
      icon: <LiaChalkboardTeacherSolid size={20} />,
      text: "Teachers",
      to: "/teachers",
    },
    { icon: <PiStudentDuotone size={20} />, text: "Students", to: "/students" },
    {
      icon: <LiaMoneyBillWaveSolid size={20} />,
      text: "Financial Analytics",
      to: "/financial-analytics",
    },
  ];

  return (
    <aside
      className={`h-screen ${
        expanded ? "w-64" : "w-16"
      } flex-shrink-0 transition-all duration-300 overflow-hidden bg-gradient-to-br from-indigo-100 to-indigo-50 border-r shadow-md ${sidebarStyle}`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-3 pb-1 flex justify-between items-center gap-2">
          <h1
            className={`self-center whitespace-nowrap text-lg font-semibold transition-all ${
              expanded ? "opacity-100" : "opacity-0 hidden"
            }`}
          >
            <span className="px-2 py-1 rounded-md bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
              School
            </span>
            <span className="ml-1">Management</span>
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="rounded-md p-2 bg-purple-50 text-gray-700 hover:bg-purple-100"
          >
            {expanded ? (
              <FiChevronLeft size={16} />
            ) : (
              <FiChevronRight size={16} />
            )}
          </button>
        </div>
        <SidebarItemList
          items={sidebarItems}
          expanded={expanded}
          onItemClick={handleItemClick}
        />
      </nav>
    </aside>
  );
};

export default Sidebar;
