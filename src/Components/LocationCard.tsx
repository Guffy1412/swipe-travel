import React from "react";

interface DestinationProps {
  title: string;
  description: string;
  imageUrl: string;
}

const LocationCard: React.FC<DestinationProps> = ({ title, description, imageUrl}) => {
  return (
    <div className="w-80 h-96 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover rounded-md" />
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
};

export default LocationCard;
