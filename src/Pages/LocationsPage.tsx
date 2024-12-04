import React, { useState } from "react";
import Card from "../Components/Card";
import parisImg from "../Assets/paris.jpg";
import tokyoImg from "../Assets/tokyo.jpg";
import newYorkImg from "../Assets/new-york.jpg";
import LocationCard from "../Components/LocationCard";

const locations = [
  {
    id: 1,
    title: "Paris",
    description: "The city of lights, known for its iconic Eiffel Tower.",
    imageUrl: parisImg,
  },
  {
    id: 2,
    title: "Tokyo",
    description: "A bustling city blending modern and traditional cultures.",
    imageUrl: tokyoImg,
  },
  {
    id: 3,
    title: "New York",
    description: "The city that never sleeps, famous for Times Square.",
    imageUrl: newYorkImg,
  },
];

const LocationsPage: React.FC = () => {
  const [likedLocations, setLikedLocations] = useState<string[]>([]);

  const handleLike = (title: string) => {
    setLikedLocations([...likedLocations, title]);
    alert(`${title} added to your favorites!`);
  };

  const handlePass = (title: string) => {
    alert(`You passed on ${title}.`);
  };

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
