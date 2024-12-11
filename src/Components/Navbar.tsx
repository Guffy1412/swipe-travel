import React, { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import searchIcon from "../Assets/search.svg";

const Navbar: React.FC = () => {
  // Simulating the authentication state
  const auth = getAuth(); 
  const isLoggedIn = localStorage.getItem("authToken") !== null;

  const handleSignOut = async () => {
    try {
      await signOut(auth); // Sign out the user from Firebase
      localStorage.removeItem("authToken"); // Remove the auth token from localStorage
      window.location.reload(); // Reload the page to reflect the updated navbar
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="top-bar bg-white dark:bg-gray-900 shadow-md">
      <div className="container mx-auto flex items-center justify-between p-2">
        {/* Title as Button to Landing Page */}
        <Link
          to="/"
          className="title text-lg font-bold text-black dark:text-white hover:text-blue-500 focus:outline-none"
        >
          Swipe Travel
        </Link>

        {/* Search Field */}
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
            <img className="w-5 h-5" src={searchIcon} alt="Search Icon" />
          </button>
        </div>

        {/* Navigation */}
        <div className="navigation flex items-center space-x-6">
          <Link to="/home" className="tab text-black dark:text-white hover:text-blue-500">
            Home
          </Link>
          <Link to="/locations" className="tab text-black dark:text-white hover:text-blue-500">
            Locations
          </Link>
          {!isLoggedIn ? (
            <>
              <Link to="/auth" className="tab text-black dark:text-white hover:text-blue-500">
                Login
              </Link>
              <Link to="/auth" className="tab text-black dark:text-white hover:text-blue-500">
                SignUp
              </Link>
            </>
          ) : (
            <button
              onClick={handleSignOut}
              className="tab text-black dark:text-white hover:text-red-500 focus:outline-none"
            >
              SignOut
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

