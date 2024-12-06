import React from "react";

interface DestinationProps {
  title: string;
  description: string;
  imageUrl: string;
  onLike: () => void;
  onPass: () => void;
}

const Card: React.FC<DestinationProps> = ({ title, description, imageUrl, onLike, onPass }) => {
  return (
    <div className="w-80 h-96 bg-white dark:bg-gray-900 dark:text-gray-100 rounded-lg shadow-lg p-4 flex flex-col justify-between">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover rounded-md"
      />
      <h2 className="text-xl font-bold mt-4">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
      <div className="flex justify-between mt-4">
        <button
          onClick={onPass}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Pass
        </button>
        <button
          onClick={onLike}
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default Card;
