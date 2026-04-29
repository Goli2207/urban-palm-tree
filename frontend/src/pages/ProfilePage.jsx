import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export const ProfilePage = ({ bookings }) => {
  const { user, logout } = useAuth();

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter((booking) => booking.status === "pending").length;
  const completedBookings = bookings.filter((booking) => booking.status === "completed").length;

  return (
    <section className="page-stack">
      <div className="page-header">
        <div>
          <span className="badge">Profile</span>
          <h2>Manage your account details</h2>
          <p>View your contact details, booking activity, and jump back into service requests.</p>
        </div>
        <Link to="/history" className="secondary-link">
          Open Booking History
        </Link>
      </div>

      <section className="profile-page-grid">
        <article className="profile-card">
          <div className="profile-avatar" aria-hidden="true">
            👤
          </div>
          <span className="badge">Urban Palm Tree Profile</span>
          <h2>{user?.name}</h2>
          <p>{user?.email}</p>
          <p>{user?.mobile}</p>
          <button className="secondary-button" type="button" onClick={logout}>
            Logout
          </button>
        </article>

        <article className="panel profile-summary-panel">
          <div className="panel-head">
            <div>
              <span className="badge">Activity</span>
              <h2>Booking summary</h2>
              <p>Your recent service activity appears here at a glance.</p>
            </div>
            <Link to="/services" className="primary-link">
              Browse Services
            </Link>
          </div>

          <div className="summary-grid">
            <div className="summary-card">
              <strong>{totalBookings}</strong>
              <span>Total bookings</span>
            </div>
            <div className="summary-card">
              <strong>{pendingBookings}</strong>
              <span>Pending services</span>
            </div>
            <div className="summary-card">
              <strong>{completedBookings}</strong>
              <span>Completed visits</span>
            </div>
          </div>
        </article>
      </section>
    </section>
  );
};
