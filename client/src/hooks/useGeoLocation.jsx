import React, { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loading: true,  
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (position) => {
    setLocation({
      loading: false,
      coordinates: {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      },
      error: null,
    });
  };

  const onError = (error) => {
    setLocation({
      loading: false,
      coordinates: { lat: "", lng: "" },
      error: error.message, 
    });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      setLocation((prevState) => ({ ...prevState, loading: true })); // Set loading to true before fetching location
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      onError({
        message: "Geolocation not supported by your browser",
      });
    }
  };

  useEffect(() => {
    getLocation(); // Optionally get location on component mount
  }, []);

  return { location, getLocation };
};

export default useGeoLocation;
