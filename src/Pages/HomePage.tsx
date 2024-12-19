import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase-config";
import { Country } from "../Assets/CountryInterface";
import CountryCard from "../Components/CountryCard";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState<string | null>("Loading...");
  const [countries, setCountries] = useState<Country[]>([]); // State for fetched locations
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const [loading, setLoading] = useState(true);

  const isLoggedIn = !!localStorage.getItem("authToken");

  // Fetch user name
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          setUserName(user.displayName || "User");
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

  // Fetch locations from Firestore
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "countries"));
        const countriesData = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        })) as Country[];
        console.log(countriesData)
        setCountries(countriesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

  // Filter locations based on the search query
  const filteredCountries = countries.filter(
    (country) =>
      country.title.toLowerCase().includes(searchQuery.toLowerCase()) // Include country in search
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 min-h-screen">
      {/* Personalized Welcome Banner */}
      <section className="bg-blue-500 text-white p-6 text-center">
        <h1 className="text-3xl font-bold">Welcome back, {userName}!</h1>
        <p className="mt-2">Complete your profile for personalized recommendations.</p>
      </section>

      {/* Plan Your Holiday and Search */}
      <section className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Plan your next holiday!</h2>
          <input
            type="text"
            placeholder="Search locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 border rounded-md w-1/3 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
          />
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredCountries.length > 0 ? (
            filteredCountries.map((country) => (
              <CountryCard
                key={country.key}
                title={country.title}
                description={country.description}
                imageUrl={country.imageUrl}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No locations found.</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
