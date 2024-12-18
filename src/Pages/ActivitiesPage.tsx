import React from "react";
import { useParams } from "react-router-dom";

const ActivitiesPage: React.FC = () => {
  const { locationTitle } = useParams<{ locationTitle: string }>();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Activities in {locationTitle?.replace(/-/g, ' ')}</h1>
      <p>Here is a list of activities you can enjoy in this location:</p>
      <ul className="list-disc list-inside mt-4">
        <li>Hiking trails</li>
        <li>Local food tours</li>
        <li>Museum visits</li>
        <li>Beach activities</li>
      </ul>
    </div>
  );
};

export default ActivitiesPage;