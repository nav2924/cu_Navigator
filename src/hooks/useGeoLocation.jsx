// Sample useGeoLocation Hook
import { useState, useEffect } from "react";

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loading: true,
    coordinates: { lat: null, lng: null },
    error: null,
  });

  const getLocation = () => {
    if (!navigator.geolocation) {
      setLocation({
        loading: false,
        coordinates: { lat: null, lng: null },
        error: "Geolocation not supported",
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          loading: false,
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
        });
      },
      (error) => {
        setLocation({
          loading: false,
          coordinates: { lat: null, lng: null },
          error: error.message,
        });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  return { location, getLocation };
};

export default useGeoLocation;
