import React from "react";
import { Link } from "react-router-dom";

interface LikedDestinationsProps {
  likedDestinations: string[];
}

const LikedDestinations: React.FC<LikedDestinationsProps> = ({ likedDestinations }) => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Liked Destinations</h1>
      {likedDestinations.length > 0 ? (
        <ul className="mt-4">
          {likedDestinations.map((destination, index) => (
            <li key={index} className="text-gray-700 mb-2">
              {destination}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500 mt-4">You haven't liked any destinations yet.</p>
      )}
      <Link to="/" className="mt-4 inline-block text-blue-500">
        Back to Home
      </Link>
    </div>
  );
};

export default LikedDestinations;
