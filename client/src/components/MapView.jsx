import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import osmProvider from "../config/osm-provider";
import "leaflet/dist/leaflet.css";

const MapView = () => {
  const [center, setCenter] = useState({ lat: 12.862992, lng: 77.437 });
  const zoom = 17;
  const mapRef = useRef();

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.invalidateSize();
    }
  }, []);

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={zoom}
        // className="w-full h-full"
        ref={mapRef}
      >
        <TileLayer
          url={osmProvider.maptiler.url}
          attribution={osmProvider.maptiler.attribution}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;
