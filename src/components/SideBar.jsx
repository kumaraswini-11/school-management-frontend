import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { SiGoogleclassroom } from "react-icons/si";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { PiStudentDuotone } from "react-icons/pi";

function SidebarItem({ expanded, icon, text, isActive, to, onClick }) {
  const handleClick = () => {
    onClick(text);
  };

  return (
    <NavLink
      to={to}
      className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
        isActive
          ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          : "hover:bg-indigo-50 text-gray-600"
      }`}
      onClick={handleClick}
      activeClassName="font-semibold"
      aria-pressed={isActive}
    >
      {icon}
      {expanded && <span className={`overflow-hidden ml-3`}>{text}</span>}
    </NavLink>
  );
}

function SidebarItemList({ items, expanded, onItemClick }) {
  return (
    <ul className="flex-1 px-3">
      {items.map((item, index) => (
        <SidebarItem
          expanded={expanded}
          key={index}
          icon={item.icon}
          text={item.text}
          isActive={item.isActive}
          to={item.to}
          onClick={() => onItemClick(item.text)}
        />
      ))}
    </ul>
  );
}

function Sidebar({ sidebarStyle }) {
  const [expanded, setExpanded] = useState(true);
  const [activeItem, setActiveItem] = useState(null);

  const handleItemClick = (text) => {
    setActiveItem(text);
  };

  const sidebarItems = [
    {
      icon: <SiGoogleclassroom size={20} />,
      text: "Class",
      isActive: activeItem === "Class",
      to: "/class",
    },
    {
      icon: <LiaChalkboardTeacherSolid size={20} />,
      text: "Teacher",
      isActive: activeItem === "Teacher",
      to: "/teacher",
    },
    {
      icon: <PiStudentDuotone size={20} />,
      text: "Student",
      isActive: activeItem === "Student",
      to: "/student",
    },
  ];

  return (
    <aside
      className={`h-screen ${expanded ? "w-64" : "w-16"} flex-shrink-0 transition-all overflow-hidden bg-white border-r shadow-sm ${sidebarStyle}`}
    >
      <nav className="h-full flex flex-col">
        <div className="p-4 pb-2 flex justify-between items-center">
          <h1
            className={`self-center whitespace-nowrap text-sm sm:text-lg font-semibold  p-1 overflow-hidden transition-all ${expanded ? "w-42" : "w-0 hidden"}`}
          >
            <span className="px-2 py-1 rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 text-white">
              School
            </span>
            <span>Management</span>
          </h1>
          <button
            onClick={() => setExpanded((curr) => !curr)}
            className="p-1.5 rounded-lg bg-gray-50 hover:bg-gray-100"
            aria-label={expanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            {expanded ? (
              <FiChevronLeft size={20} />
            ) : (
              <FiChevronRight size={20} />
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
}

export default Sidebar;
