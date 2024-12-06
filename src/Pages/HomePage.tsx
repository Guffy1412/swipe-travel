import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config"; // Firebase configuration
import Card from "../Components/Card";
import Toast from "../Components/Toast";

interface Destination {
  id: string; // Firestore document ID
  title: string;
  description: string;
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedDestinations, setLikedDestinations] = useState<string[]>([]);
  const [toastVisible, setToastVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Destination[];
        setDestinations(locationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchDestinations();
  }, []);

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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-800">
        <p className="text-xl text-gray-800 dark:text-gray-200">Loading destinations...</p>
      </div>
    );
  }

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
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            You've seen all destinations!
          </h1>
          <p className="text-gray-700 dark:text-gray-400 mt-4">
            Visit your liked destinations on another page.
          </p>
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