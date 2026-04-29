import { Link } from "react-router-dom";
import { BookingHistory } from "../components/BookingHistory";

export const BookingHistoryPage = ({ bookings, loading, onUpdateStatus, updatingBookingId }) => {
  const uniqueServices = new Set(
    bookings.flatMap((booking) =>
      (booking.services?.length ? booking.services : [booking.service])
        .filter(Boolean)
        .map((service) => service.name)
    )
  ).size;

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <span className="badge">BookingHistory</span>
          <h2>Track current and past service requests</h2>
          <p>Review booked services, worker assignment, OTP details, and location updates in one place.</p>
        </div>
        <div className="page-actions">
          <Link to="/services" className="primary-link">
            Explore Services
          </Link>
          <Link to="/map" className="secondary-link">
            Open MapView
          </Link>
        </div>
      </div>

      {!loading && (
        <section className="summary-grid">
          <article className="summary-card">
            <strong>{bookings.length}</strong>
            <span>Total service bookings</span>
          </article>
          <article className="summary-card">
            <strong>{uniqueServices}</strong>
            <span>Service types used</span>
          </article>
          <article className="summary-card">
            <strong>{bookings.filter((booking) => booking.status === "pending").length}</strong>
            <span>Pending visits</span>
          </article>
        </section>
      )}

      {loading ? (
        <section className="panel">
          <div className="screen-loader small">Loading your bookings...</div>
        </section>
      ) : (
        <BookingHistory
          bookings={bookings}
          onUpdateStatus={onUpdateStatus}
          updatingBookingId={updatingBookingId}
        />
      )}
    </section>
  );
};
