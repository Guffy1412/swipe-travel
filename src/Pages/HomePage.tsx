import React, { useState } from "react";
import Card from "../Components/Card";
import Toast from "../Components/Toast";

const destinations = [
  { id: 1, title: "Paris", description: "The city of lights.", imageUrl: "/paris.jpg" },
  { id: 2, title: "Tokyo", description: "The heart of Japan.", imageUrl: "/tokyo.jpg" },
  { id: 3, title: "New York", description: "The Big Apple.", imageUrl: "/nyc.jpg" },
];

const HomePage: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedDestinations, setLikedDestinations] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);

  const handleLike = () => {
    setLikedDestinations([...likedDestinations, destinations[currentIndex].title]);
    handleNext();
  };

  const handlePass = () => {
    handleNext();
  };

  const handleNext = () => {
    if (currentIndex < destinations.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setToastVisible(true); // Show toast when all destinations are viewed
    }
  };

  const closeToast = () => {
    setToastVisible(false);
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
      {currentIndex < destinations.length ? (
        <Card
          {...destinations[currentIndex]}
          onLike={handleLike}
          onPass={handlePass}
        />
      ) : (
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">You've seen all destinations!</h1>
          <p className="text-gray-700 dark:text-gray-400 mt-4">Visit your liked destinations on another page.</p>
        </div>
      )}
       <Toast
        message="No more destinations to view!"
        isVisible={toastVisible}
        onClose={closeToast}
      />
    </div>
  );
};

export default HomePage;