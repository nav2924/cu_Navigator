import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import osmProvider from "../config/osm-provider.js";
import "leaflet/dist/leaflet.css";
import locations from "../data/location.json";
import useGeoLocation from "../hooks/useGeoLocation";

const userLocationIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-red.png", // Red icon
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const MapView = () => {
  const [center, setCenter] = useState({ lat: 12.862992, lng: 77.437 });
  const zoom = 17;
  const mapRef = useRef();

  const { location, getLocation } = useGeoLocation();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  useEffect(() => {
    if (
      location.loading &&
      location.coordinates.lat &&
      location.coordinates.lng
    ) {
      setCenter({
        lat: location.coordinates.lat,
        lng: location.coordinates.lng,
      });
      mapRef.current.flyTo(
        [location.coordinates.lat, location.coordinates.lng],
        zoom
      );
    }
  }, [location]);

  return (
    <div className="h-screen w-full">
      <MapContainer center={center} zoom={zoom} ref={mapRef}>
        <TileLayer
          url={osmProvider.maptiler.url}
          attribution={osmProvider.maptiler.attribution}
        />
        {location.loading &&
          location.coordinates.lat &&
          location.coordinates.lng && (
            <Marker
              position={[location.coordinates.lat, location.coordinates.lng]}
              
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
      </MapContainer>
      <div className="absolute top-4 right-4 z-10">
        <button
          onClick={getLocation}
          className="bg-blue-500 text-white p-2 rounded-lg shadow-lg hover:bg-blue-600"
        >
          Get Location
        </button>
      </div>
    </div>
  );
};

export default MapView;
