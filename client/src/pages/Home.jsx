import React from "react";
import { useNavigate } from "react-router-dom";
import locations from "../data/location.json";
import { Card } from "../components/index";

const Home = () => {
  const navigate = useNavigate();

  const handleLocationClick = (position) => {
    navigate("/Map", { state: { position } });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-8 md:flex-row md:flex-wrap bg-gray-400md:space-y-8 md:space-x-4 p-4">
      <h1 className="text-2xl font-bold mb-4 text-center w-full">
        Select a Location
      </h1>
      {locations.map((location, index) => (
        <div
          key={index}
          className="bg-white border border-gray-400 shadow-md rounded-lg py-4 w-full sm:w-64 md:w-72 lg:w-80"
        >
          <div className="pb-0 pt-2 px-4 flex flex-col items-start">
            <h4 className="font-bold text-lg">{location.popup}</h4>
          </div>
          <div className="py-2 overflow-visible">
            <img
              alt="Location Image"
              className="object-cover rounded-xl w-3/4 max-w-[200px] mx-auto"
              src={location.imageUrl || "https://via.placeholder.com/270"}
            />
          </div>
          <button
            onClick={() => handleLocationClick(location.position)}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-600 w-full mt-4"
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default Home;
