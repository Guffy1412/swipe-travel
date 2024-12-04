import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";
import LandingPage from "./Pages/LandingPage"
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import LikedDestinations from "./Components/Destinations";
import useTheme from "./hooks/useTheme";

const App: React.FC = () => {
  const location = useLocation();
  // Pages where the Navbar should not be displayed
  const hideNavbarRoutes = ["/auth"];

  // Changes theme from white to dark or dark to white responsive to your windows theme
  const theme = useTheme();

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);
  return (
    <>
      {!hideNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/liked" element={<LikedDestinations likedDestinations={[]} />} />
      </Routes>
    </>
  );
};


const AppWrapper: React.FC = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;

