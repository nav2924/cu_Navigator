import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import osmProvider from "../config/osm-provider.js";
import locations from "../data/location.json";
import useGeoLocation from "../hooks/useGeoLocation";
import { useLocation } from "react-router-dom";

const userLocationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const RoutingMachine = ({ start, end }) => {
  const map = useMap();

  useEffect(() => {
    if (!start || !end) return;

    const routingControl = L.Routing.control({
      waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => {
      map.removeControl(routingControl);
    };
  }, [start, end, map]);

  return null;
};

const MapView = () => {
  const { state } = useLocation(); // Get state from navigation
  const [center, setCenter] = useState({ lat: 12.862992, lng: 77.437 });
  const [destination, setDestination] = useState(null);
  const zoom = 17;
  const mapRef = useRef(null);
  const { location, getLocation } = useGeoLocation();

  // Function to safely fly to a location
  const safeFlyTo = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.flyTo([lat, lng], zoom);
    }
  };

  // Trigger flying to destination if passed from Home
  useEffect(() => {
    if (state && state.position) {
      setDestination({
        lat: state.position[0],
        lng: state.position[1],
      });
      safeFlyTo(state.position[0], state.position[1]);
    }
  }, [state]);

  // Handle mobile map resizing and location fetching
  useEffect(() => {
    const updateLocation = () => {
      if (
        !location.loading &&
        location.coordinates.lat &&
        location.coordinates.lng
      ) {
        setCenter({
          lat: location.coordinates.lat,
          lng: location.coordinates.lng,
        });
        safeFlyTo(location.coordinates.lat, location.coordinates.lng);
      }
    };

    // Ensure map resizes properly on mobile devices
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }

    const interval = setInterval(() => {
      getLocation();
    }, 1000);

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, [location, getLocation]);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        whenCreated={(mapInstance) => {
          mapRef.current = mapInstance;
          mapInstance.invalidateSize(); // Ensure the map resizes on mobile devices
        }}
        style={{ height: "100%", width: "100%" }} // Fullscreen map for mobile
      >
        <TileLayer
          url={osmProvider.maptiler.url}
          attribution={osmProvider.maptiler.attribution}
        />
        {location.loading &&
          location.coordinates.lat &&
          location.coordinates.lng && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
              icon={userLocationIcon}
            >
              <Popup>
                <span>Your Location</span>
              </Popup>
            </Marker>
          )}
        {locations.map((location, index) => (
          <Marker key={index} position={location.position}>
            <Popup>
              <span>{location.popup}</span>
            </Popup>
          </Marker>
        ))}
        {destination &&
          location.coordinates.lat &&
          location.coordinates.lng && (
            <RoutingMachine start={location.coordinates} end={destination} />
          )}
      </MapContainer>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={getLocation}
          className="bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600 text-sm sm:text-base sm:p-3"
        >
          Get Location
        </button>
      </div>
    </div>
  );
};

export default MapView;
