import React from "react";
import { Link, useLocation } from "react-router-dom";
import Menu from "./Menu/Menu";
import logo from "../../assets/mais_logo_light.png";
import { IconContext } from "react-icons";
import { IoSearch } from "react-icons/io5";

const Navbar: React.FC = () => {
  const location = useLocation();
  
  // Check if we're on the admin/publish page
  const isAdminPublish = location.pathname.includes('/admin') && location.pathname.includes('/publish');
  
  // Conditionally add shadow based on current route
  const shadowClass = isAdminPublish ? '' : 'shadow-md';

  return (
    <div className={`flex flex-row justify-between items-center w-full h-20 border bg-white dark:bg-gray-100 p-1 py-1 ${shadowClass} z-20 fixed top-0`}>
      <button className="flex flex-row items-center hover:cursor-pointer">
        <div className="w-16 h-16 ml-10">
          <img src={logo} alt="logo" className="w-16"/>
        </div>
        <Link to="/" className="text-3xl ml-2">
          Mongol Aspiration
        </Link>
      </button>

      <div className="flex flex-row ml-auto mr-4 space-x-4">
        <div className="flex flex-row items-center">
          <div className="h-8 border-l p-1 hover:bg-gray-100 border-t border-b border-gray-500 rounded-l-md flex items-center justify-center">
            <IconContext.Provider value={{ size: "1.5em" }}>
              <IoSearch />
            </IconContext.Provider>
          </div>
          <input
            type="text"
            placeholder="Search"
            className="w-48 h-8 border border-gray-500 rounded-r-md pl-2 focus:outline-none"
          />
        </div>

        <Menu />
      </div>
    </div>
  );
};

export default Navbar;
