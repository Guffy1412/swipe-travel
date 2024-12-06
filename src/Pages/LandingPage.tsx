import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  // Check if the user is logged in by verifying the token
  const isLoggedIn = !!localStorage.getItem("authToken");

  const handleGetStarted = () => {
    if (isLoggedIn) {
      console.log(isLoggedIn)
      navigate("/home"); // Redirect to home page if logged in
    } else {
      navigate("/auth"); // Redirect to auth page if not logged in
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-100">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
        <h1 className="text-5xl font-bold text-center mb-4">Welcome to TravelSwipe</h1>
        <p className="text-lg text-center mb-8">
          Discover and save your dream travel destinations with a swipe!
        </p>
        <button
          onClick={() => handleGetStarted()}
          className="px-6 py-3 bg-white text-blue-600 rounded-md text-lg font-semibold hover:bg-gray-200"
        >
          Get Started
        </button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-8">Why Use TravelSwipe?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Swipe to Explore</h3>
            <p>
              Effortlessly browse through stunning travel destinations and choose
              your favorites with a simple swipe.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Save Your Favorites</h3>
            <p>
              Keep track of the destinations you love and build your dream travel
              list.
            </p>
          </div>
          <div className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
            <h3 className="text-2xl font-bold mb-4">Personalized Experience</h3>
            <p>
              Tailored travel suggestions based on your preferences and likes.
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-16 px-6 bg-gray-200 dark:bg-gray-700">
        <h2 className="text-4xl font-bold text-center mb-8">How It Works</h2>
        <div className="flex flex-wrap justify-center items-center gap-8">
          <img
            src="/mockup1.png"
            alt="App Screenshot 1"
            className="w-80 h-auto rounded-lg shadow-lg"
          />
          <img
            src="/mockup2.png"
            alt="App Screenshot 2"
            className="w-80 h-auto rounded-lg shadow-lg"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-100 py-8">
        <div className="text-center">
          <p>&copy; 2024 TravelSwipe. All rights reserved.</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Privacy Policy
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Terms of Service
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-500">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
