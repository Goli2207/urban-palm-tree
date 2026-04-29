import { Link, NavLink, Outlet } from "react-router-dom";
import { BrandLogo } from "./BrandLogo";

export const DashboardLayout = () => {
  return (
    <div className="app-shell">
      <header className="hero dashboard-hero-layout">
        <div className="hero-copy dashboard-hero">
          <span className="hero-kicker">
            <BrandLogo />
          </span>
          <h1>Book trusted help for every home issue.</h1>
          <p>
            Choose a service, share your live location, and track assigned workers from one
            organized dashboard.
          </p>
          <div className="dashboard-ribbon">
            <span>Verified workers</span>
            <span>Doorstep OTP verification</span>
            <span>Live booking history</span>
          </div>
        </div>
        <div className="dashboard-hero-visual">
          <img
            src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80"
            alt="Bright modern living room"
          />
          <div className="dashboard-hero-badge">
            <strong>One place for every visit</strong>
            <span>Booking, worker status, address, and confirmation stay in sync.</span>
          </div>
        </div>
      </header>

      <nav className="top-nav">
        <NavLink to="/services" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Services
        </NavLink>
        <NavLink to="/book" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Booking Form
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Booking History
        </NavLink>
        <NavLink to="/map" className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}>
          Map View
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
        >
          Profile
        </NavLink>
        <Link to="/book" className="nav-cta">
          New Booking
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};
