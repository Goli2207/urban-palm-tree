import Map from "../components/Map";
import { createFallbackImage, getServiceImage } from "../utils/serviceImages";

export const MapViewPage = ({ bookings }) => {
  const latestBookingWithLocation = bookings.find(
    (booking) => booking.location?.latitude != null && booking.location?.longitude != null
  );

  const location = latestBookingWithLocation
    ? {
        lat: latestBookingWithLocation.location.latitude,
        lng: latestBookingWithLocation.location.longitude
      }
    : null;
  const bookedServices = latestBookingWithLocation
    ? latestBookingWithLocation.services?.length
      ? latestBookingWithLocation.services
      : [latestBookingWithLocation.service].filter(Boolean)
    : [];
  const primaryService = bookedServices[0];

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <span className="badge">MapView</span>
          <h2>Booking location preview</h2>
          <p>
            See the latest stored booking location on the map. Create a booking first if no map data
            is available yet.
          </p>
        </div>
      </div>

      <section className="panel">
        {!location ? (
          <div className="map-placeholder">No booking with saved location is available yet.</div>
        ) : (
          <>
            <img
              className="map-service-image"
              src={getServiceImage(primaryService)}
              alt={primaryService?.name || "Booked service"}
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = createFallbackImage(primaryService?.name || "Service");
              }}
            />
            <div className="map-meta">
              <h3>
                {bookedServices.length === 1
                  ? bookedServices[0].name
                  : `${bookedServices.length} services`}
              </h3>
              <p>{bookedServices.map((service) => service.name).join(", ")}</p>
              <p>{latestBookingWithLocation.bookingId}</p>
              <p>
                Coordinates: {latestBookingWithLocation.location.latitude.toFixed(5)},{" "}
                {latestBookingWithLocation.location.longitude.toFixed(5)}
              </p>
            </div>
            <Map location={location} />
          </>
        )}
      </section>
    </section>
  );
};
