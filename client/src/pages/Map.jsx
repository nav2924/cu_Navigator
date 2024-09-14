import React from "react";
import { MapView } from "../components/index.js";
import { useNavigate } from "react-router-dom";

const Map = () => {
  const navigate = useNavigate(); // Hook to navigate

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="absolute top-4 left-4 z-10">
        <button
          onClick={() => navigate("/")}
          className="bg-gray-500 text-white p-2 rounded-lg shadow-lg hover:bg-gray-600 text-sm sm:text-base sm:p-3"
        >
          Back
        </button>
      </div>
      <div className="w-full max-w-4xl mt-16">
        <h1 className="text-3xl font-bold text-center mb-6">Map View</h1>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default Map;
