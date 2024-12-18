import React from "react";

interface DestinationProps {
  title: string;
  description: string;
  imageUrl: string;
  country: string; 
}
const backendUrl = "http://localhost:5000";

const LocationCard: React.FC<DestinationProps> = ({ title, description, imageUrl, country }) => {
  console.log(`${backendUrl}/images/${imageUrl}`);
  const truncateText = (text: string, maxLength: number) => {
    if (text.length > maxLength) {
      return `${text.slice(0, maxLength)}...`;
    }
    return text;
  };

  return (
    <div className="w-80 h-96 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between">
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