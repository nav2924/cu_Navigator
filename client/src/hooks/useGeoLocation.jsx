import React, { useEffect, useState } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loading: false,
    coordinates: { lat: "", lng: "" },
    error: null,
  });

  const onSuccess = (location) => {
    setLocation({
      loading: true,
      coordinates: {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loading: true,
      coordinates: { lat: "", lng: "" },
      error,
    });
  };

  const getLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
    } else {
      onError({
        code: 0,
        message: "Geolocation not supported",
      });
    }
  };

  useEffect(() => {
    getLocation(); // Optionally get location on component mount
  }, []);

  return { location, getLocation };
};

export default useGeoLocation;
