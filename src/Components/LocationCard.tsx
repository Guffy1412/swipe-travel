import React from "react";
import { useNavigate } from "react-router-dom";
import { Location } from "../Assets/LocationInterface";

const backendUrl = "http://localhost:5000";

const LocationCard: React.FC<Location> = ({ title, description, imageUrl, country }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/activities/${title.replace(/\s+/g, '-').toLowerCase()}`);
  };

  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div
      className="w-80 h-96 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between cursor-pointer hover:shadow-xl transition-shadow duration-300"
      onClick={handleCardClick}
    >
      <img
        src={`${backendUrl}/images/${imageUrl}`}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div>
        <h2 className="text-xl font-bold mt-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm">{country}</p>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {truncateText(description, 140)}
      </p>
    </div>
  );
};

export default LocationCard;
export type { Location };
