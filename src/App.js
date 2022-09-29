import React, { useEffect, useState, useRef } from "react";
import mapboxGl from "mapbox-gl";
import MapboxAutocomplete from "react-mapbox-autocomplete";

const App = () => {
  mapboxGl.accessToken =
    "pk.eyJ1IjoiYmFnYXNkaGl0eWEiLCJhIjoiY2w4bGYzZGRoMDh4ejNvcXdlcmxoeTlmbiJ9.ZCMnCXPWn15MMro24v0LOA";
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [longitude, setLongitude] = useState(106.774124);
  const [latitude, setLatitude] = useState(-6.121435);
  const [location, setLocation] = useState();
  const [zoom, setZoom] = useState(9);

  function _suggestionSelect(result, lat, long, text) {
    console.log(result, lat, long, text);
    setLongitude(long);
    setLatitude(lat);
    setLocation(text);
  }

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxGl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [longitude, latitude],
      zoom: zoom,
    });
    map.current.on("click", () => {
      setLongitude(map.current.getCenter().lng);
      setLatitude(map.current.getCenter().lat);
      setZoom(map.current.getZoom());
    });
  }, []);

  return (
    <div>
      <div className="map-information">
        <p className="map-content"> Longitude: {longitude}</p>
        <p className="map-content"> Latitude: {latitude}</p>
        <p className="map-content"> Location: {location}</p>
      </div>
      <MapboxAutocomplete
        className="mapbox-search"
        publicKey={mapboxGl.accessToken}
        inputClass="form-control search"
        onSuggestionSelect={_suggestionSelect}
        country="id"
        resetSearch={false}
        placeholder="Search Address..."
      />
      <div ref={mapContainer} className="map-container" />
    </div>
  );
};

export default App;
