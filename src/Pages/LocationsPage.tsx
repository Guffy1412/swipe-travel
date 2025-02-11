import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import LocationCard from "../Components/LocationCard";
import { Location } from "../Assets/LocationInterface";

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search input
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsData = querySnapshot.docs.map((doc) => ({
          key: doc.id,
          ...doc.data(),
        })) as Location[];
        setLocations(locationsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations:", error);
      }
    };

    fetchLocations();
  }, []);

    // Filter locations based on the search query
    const filteredLocations = locations.filter(
      (location) =>
        location.title.toLowerCase().includes(searchQuery.toLowerCase()) // Include country in search
    );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <section className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-4xl font-bold text-black dark:text-white mb-8">
            Explore Locations
          </h1>
          <input
                type="text"
                placeholder="Search locations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="p-2 border rounded-md w-1/3 text-gray-800 dark:text-gray-200 dark:bg-gray-700"
              />
        </div>
        </section>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-center">
      {filteredLocations.length > 0 ? (
            filteredLocations.map((location) => (
              <LocationCard
                key={location.key}
                country = {location.country}
                title={location.title}
                description={location.description}
                imageUrl={location.imageUrl}
              />
            ))
          ) : (
            <p className="text-center col-span-full">No locations found.</p>
          )}
      </div>
    </div>
  );
};

export default LocationsPage;