import React from "react";
import { useNavigate } from "react-router-dom";
import locations from "../data/location.json";

const Home = () => {
  const navigate = useNavigate();

  const handleLocationClick = (position) => {
    navigate("/Map", { state: { position } });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <h1 className="text-2xl font-bold mb-4">Select a Location</h1>
      {locations.map((location, index) => (
        <button
          key={index}
          onClick={() => handleLocationClick(location.position)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          {location.popup}
        </button>
      ))}
    </div>
  );
};

export default Home;
