import { Link } from "react-router-dom";
import { BookingForm } from "../components/BookingForm";

export const BookingFormPage = ({ services, onBook, bookingResult, loading, servicesLoading }) => {
  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <span className="badge">BookingForm</span>
          <h2>Schedule a service visit</h2>
          <p>Provide your address, preferred time, issue details, and live location for assignment.</p>
        </div>
        <Link to="/history" className="secondary-link">
          View BookingHistory
        </Link>
      </div>

      {servicesLoading ? (
        <div className="screen-loader">Loading services...</div>
      ) : (
        <BookingForm
          services={services}
          onBook={onBook}
          bookingResult={bookingResult}
          loading={loading}
        />
      )}
    </section>
  );
};
