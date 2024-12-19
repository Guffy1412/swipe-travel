import React from "react";
import { useNavigate } from "react-router-dom";
import { Country } from "../Assets/CountryInterface";

const backendUrl = "http://localhost:5000";

const CountryCard: React.FC<Country> = ({ title, description, imageUrl }) => {
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
        src={`${backendUrl}/images/countries/${imageUrl}`}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <div>
        <h2 className="text-xl font-bold mt-4">{title}</h2>
      </div>
      <p className="text-gray-600 dark:text-gray-400 mt-2">
        {truncateText(description, 140)}
      </p>
    </div>
  );
};

export default CountryCard;
export type { Country };