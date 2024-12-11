import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>("Loading...");
  const isLoggedIn = !!localStorage.getItem("authToken"); // Check if user is logged in

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const userRef = doc(db, "users", user.uid);
          const userSnap = await getDoc(userRef);
          if (userSnap.exists()) {
            const userData = userSnap.data();
            setUserName(userData.name || "User");
          } else {
            setUserName("User");
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
          setUserName("User");
        }
      } else {
        setUserName("Guest");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGetStarted = () => {
    if (isLoggedIn) {
      navigate("/home"); // Redirect to HomePage if logged in
    } else {
      navigate("/"); // Redirect to AuthPage if not logged in
    }
  };

  const upcomingTrips = [
    { destination: "Paris", date: "2024-12-25", daysLeft: 26 },
    { destination: "Tokyo", date: "2025-01-15", daysLeft: 47 },
  ];
  const recommendedDestinations = [
    { title: "Bali", description: "Best for winter escapes", imageUrl: "/images/bali.jpg" },
    { title: "New York", description: "Vibrant city life", imageUrl: "/images/ny.jpg" },
    { title: "Rome", description: "Historical wonders", imageUrl: "/images/rome.jpg" },
  ];
  const specialOffers = [
    { title: "20% off on Bali trips", validUntil: "2024-12-15" },
    { title: "Free upgrade for New York flights", validUntil: "2024-12-20" },
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Personalized Welcome Banner */}
      <section className="bg-blue-500 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="mt-2">Complete your profile for personalized recommendations.</p>
      </section>

      {/* Recommended Destinations */}
      <section className="p-6">
        <h2 className="text-2xl font-bold">Recommended Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {recommendedDestinations.map((dest, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
              <img src={dest.imageUrl} alt={dest.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{dest.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{dest.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Trips */}
      <section className="p-6 bg-gray-200 dark:bg-gray-700">
        <h2 className="text-2xl font-bold">Your Upcoming Trips</h2>
        <div className="mt-4 space-y-4">
          {upcomingTrips.map((trip, index) => (
            <div key={index} className="flex justify-between items-center bg-white dark:bg-gray-900 p-4 rounded-md shadow-md">
              <div>
                <h3 className="text-xl font-bold">{trip.destination}</h3>
                <p className="text-gray-600 dark:text-gray-400">Departure: {trip.date}</p>
              </div>
              <div className="text-lg font-semibold text-blue-500">{trip.daysLeft} days left</div>
            </div>
          ))}
        </div>
      </section>

      {/* Special Offers */}
      <section className="p-6">
        <h2 className="text-2xl font-bold">Special Offers</h2>
        <div className="mt-4 space-y-4">
          {specialOffers.map((offer, index) => (
            <div key={index} className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-md">
              <h3 className="text-lg font-bold">{offer.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">Valid until: {offer.validUntil}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel Inspiration */}
      <section className="p-6 bg-gray-200 dark:bg-gray-700">
        <h2 className="text-2xl font-bold">Travel Inspiration</h2>
        <p className="mt-2">Discover blogs, articles, and travel guides to spark your wanderlust.</p>
        <div className="mt-4 flex gap-4">
          <div className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-md flex-1">
            <h3 className="text-lg font-bold">Top Beaches of 2024</h3>
            <p className="text-gray-600 dark:text-gray-400">Find the best beaches to relax and unwind.</p>
          </div>
          <div className="bg-white dark:bg-gray-900 p-4 rounded-md shadow-md flex-1">
            <h3 className="text-lg font-bold">Hidden Gems in Europe</h3>
            <p className="text-gray-600 dark:text-gray-400">Explore lesser-known but breathtaking destinations.</p>
          </div>
        </div>
      </section>

      {/* Quick Access Buttons */}
      <section className="p-6">
        <h2 className="text-2xl font-bold">Quick Access</h2>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <button className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Book a Flight</button>
          <button className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Find Hotels</button>
          <button className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Plan a Trip</button>
          <button className="p-4 bg-blue-500 text-white rounded-md hover:bg-blue-600">Travel Support</button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
