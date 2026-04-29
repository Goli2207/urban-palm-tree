import Map from "./Map";
import { createFallbackImage, getServiceImage } from "../utils/serviceImages";

const statusClassMap = {
  pending: "status-pill pending",
  completed: "status-pill completed",
  cancelled: "status-pill cancelled"
};

export const BookingHistory = ({ bookings, onUpdateStatus, updatingBookingId }) => {
  return (
    <section className="panel">
      <div className="panel-head">
        <span className="badge">History</span>
        <h2>Your bookings</h2>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <p>No bookings yet. Your confirmed services will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {bookings.map((booking) => {
            const bookedServices = booking.services?.length ? booking.services : [booking.service].filter(Boolean);
            const assignedWorkers = booking.workers?.length
              ? booking.workers
              : [booking.worker || booking.workerId].filter(Boolean);
            const primaryService = bookedServices[0];
            const location = {
              lat: booking.location.latitude,
              lng: booking.location.longitude
            };

            return (
              <article key={booking._id} className="history-card">
                <img
                  className="history-service-image"
                  src={getServiceImage(primaryService)}
                  alt={primaryService?.name || "Booked service"}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = createFallbackImage(primaryService?.name || "Service");
                  }}
                />
                <div className="history-top">
                  <div>
                    <h3>
                      {bookedServices.length === 1
                        ? bookedServices[0].name
                        : `${bookedServices.length} services`}
                    </h3>
                    <p>{bookedServices.map((service) => service.name).join(", ")}</p>
                    <p>{booking.bookingId}</p>
                  </div>
                  <div className="booking-status-actions">
                    <span className={statusClassMap[booking.status] || "status-pill"}>{booking.status}</span>
                    {booking.status === "pending" && (
                      <button
                        type="button"
                        className="secondary-button compact"
                        onClick={() => onUpdateStatus?.(booking._id, "completed")}
                        disabled={updatingBookingId === booking._id}
                      >
                        {updatingBookingId === booking._id ? "Updating..." : "Mark Completed"}
                      </button>
                    )}
                  </div>
                </div>

                <div className="history-grid">
                  <div>
                    <h4>Service Details</h4>
                    <p>{bookedServices.map((service) => service.description).join(" ")}</p>
                    <p>
                      Service Code: <strong>{booking.serviceOtp}</strong>
                    </p>
                    <p>
                      Preferred: {booking.preferredDate} at {booking.preferredTime}
                    </p>
                    <p>{booking.address}</p>
                    <p>{booking.issueDescription}</p>
                  </div>

                  <div>
                    <h4>Assigned Workers</h4>
                    {assignedWorkers.length ? (
                      assignedWorkers.map((worker) => (
                        <div key={worker._id || worker.phone} className="worker-summary">
                          <p>{worker.name || "Worker pending assignment"}</p>
                          <p>{worker.phone || "Phone unavailable"}</p>
                          <p>
                            {worker.experience != null
                              ? `${worker.experience} years experience`
                              : "Experience unavailable"}
                          </p>
                          <p>
                            {worker.rating != null
                              ? `${worker.rating} / 5 rating`
                              : "Rating unavailable"}
                          </p>
                        </div>
                      ))
                    ) : (
                      <p>Worker pending assignment</p>
                    )}
                  </div>
                </div>

                <Map location={location} />
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
};
