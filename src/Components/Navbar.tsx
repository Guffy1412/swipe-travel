import React from "react";
import { Link } from "react-router-dom";
import searchIcon from "../Assets/search.svg";

const Navbar: React.FC = () => {
  return (
    <div className="top-bar bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-2">
        <div className="title text-lg font-bold text-black dark:text-white">
          Swipe Travel
        </div>
        <div className="textfield flex items-center border rounded-md px-3 py-1 dark:bg-gray-700 dark:border-gray-600 mx-auto w-1/3">
          <input
            type="text"
            placeholder="Search in site"
            className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none w-full"
          />
          <button
            type="button"
            className="ic-search w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            aria-label="Search"
            onClick={() => console.log("Search button clicked")}
          >
          <img
            className="w-5 h-5"
            src={searchIcon}
            alt="Search Icon"
          />
    </button>
        </div>
        <div className="navigation flex items-center space-x-6">
          <Link to="/" className="tab text-black dark:text-white hover:text-blue-500">
            Home
          </Link>
          <Link to="/locations" className="tab text-black dark:text-white hover:text-blue-500">
            Locations
          </Link>
          <Link to="/auth" className="tab text-black dark:text-white hover:text-blue-500">
            Login
          </Link>
          <Link to="/auth" className="tab text-black dark:text-white hover:text-blue-500">
            SignIn
          </Link>
        </div>
      </div>
    </div>
  );
};


export default Navbar;
