import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import AuthPage from "./Pages/AuthPage";
import LikedDestinations from "./Components/Destinations";
import useTheme from "./hooks/useTheme";

const App: React.FC = () => {
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
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/liked" element={<LikedDestinations likedDestinations={[]} />} />
      </Routes>
    </Router>
  );
};

export default App;

