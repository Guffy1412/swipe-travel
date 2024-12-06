import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase-config";
import LocationCard from "../Components/LocationCard";

interface Location {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const LocationsPage: React.FC = () => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "locations"));
        const locationsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
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

  if (loading) {
    return <div className="text-center text-xl text-gray-700">Loading...</div>;
  }

  return (
    <div className="p-8 bg-gray-100 dark:bg-gray-800 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-black dark:text-white mb-8">
        Explore Locations
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {locations.map((location) => (
          <LocationCard
            key={location.id}
            title={location.title}
            description={location.description}
            imageUrl={location.imageUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default LocationsPage;