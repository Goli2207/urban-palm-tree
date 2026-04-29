import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "300px"
};

const libraries = [];

function Map({ location }) {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey || "",
    libraries
  });

  if (!apiKey) {
    return (
      <div className="map-placeholder">
        Add `VITE_GOOGLE_MAPS_API_KEY` in `frontend/.env` to enable Google Maps.
      </div>
    );
  }

  if (loadError) {
    return <div className="map-placeholder">Unable to load Google Maps right now.</div>;
  }

  if (!isLoaded) {
    return <div className="map-placeholder">Loading map...</div>;
  }

  return (
    <GoogleMap zoom={14} center={location} mapContainerStyle={containerStyle}>
      <Marker position={location} />
    </GoogleMap>
  );
}

export default Map;
