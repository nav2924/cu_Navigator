import React from "react";
import { MapView } from "../components/index.js";

const Map = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center mb-6">Map View</h1>
        <div className="shadow-lg rounded-lg overflow-hidden">
          <MapView />
        </div>
      </div>
    </div>
  );
};

export default Map;