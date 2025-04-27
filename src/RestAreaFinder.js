

import React, { useState, useCallback } from 'react';
import { LoadScript, GoogleMap, Marker, StandaloneSearchBox } from '@react-google-maps/api';

const containerStyle = {
  width: '400px',
  height: '400px'
};

const libraries = ['places']; //load API

const RestAreaFinder = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  const onLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);
  React.useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.error("Error getting user location: ", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);
  
  const [userLocation, setUserLocation] = useState(null);


  const handleFindRestAreas = () => {
    if (map) {
      const service = new window.google.maps.places.PlacesService(map);

      const request = {
        location: map.getCenter(),
        radius: '8000',
        keyword: 'rest area'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          setMarkers(results.map(place => ({
            position: place.geometry.location,
            name: place.name
          })));
        }
      });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} 
      
      libraries={libraries}
    >
      <div style={{ marginBottom: '10px' }}>
        <button onClick={handleFindRestAreas}>Find Nearby Rest Areas</button>
      </div>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || { lat: 47.7605381, lng: -122.1970606}} // Default to UW Bothell coordinates
        zoom={10}
        onLoad={onLoad}
      >
        {markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </LoadScript>
  );
};

export default RestAreaFinder;
