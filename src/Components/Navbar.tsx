import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <div className="top-bar bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-4">
        <div className="title text-2xl font-bold text-black dark:text-white">Swipe Travel</div>
        <div className="navigation flex items-center space-x-8">
          <Link to="/" className="tab text-black dark:text-white hover:text-blue-500">
            Home
          </Link>
          <Link to="/auth" className="tab text-black dark:text-white hover:text-blue-500">
            SignIn
          </Link>
          <Link to="/packages" className="tab text-black dark:text-white hover:text-blue-500">
            Packages
          </Link>
          <Link to="/about" className="tab text-black dark:text-white hover:text-blue-500">
            About Us
          </Link>
          <div className="textfield flex items-center border rounded-md px-3 py-1 dark:bg-gray-700 dark:border-gray-600">
            <input
              type="text"
              placeholder="Search in site"
              className="bg-transparent text-gray-700 dark:text-gray-300 focus:outline-none"
            />
            <img
              className="ic-search w-5 h-5 ml-2"
              src="ic-search0.svg"
              alt="Search Icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
