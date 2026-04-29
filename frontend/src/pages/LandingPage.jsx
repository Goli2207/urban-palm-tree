import { Link } from "react-router-dom";
import { BrandLogo } from "../components/BrandLogo";
import { createFallbackImage, getServiceImage } from "../utils/serviceImages";

export const LandingPage = ({ services = [], loading }) => {
  const featuredServices = services.slice(0, 3);

  return (
    <div className="app-shell landing-shell">
      <section className="landing-hero">
        <div className="landing-copy">
          <span className="hero-kicker">
            <BrandLogo />
          </span>
          <h1>Bright, reliable home services without the usual chaos.</h1>
          <p>
            Book electricians, plumbers, cleaners, and more through one colorful dashboard
            built for fast scheduling, live worker tracking, and safer doorstep verification.
          </p>
          <div className="landing-actions">
            <Link to="/register" className="primary-link">
              Get Started
            </Link>
            <Link to="/login" className="secondary-link">
              Sign In
            </Link>
          </div>
          <div className="landing-stats">
            <article>
              <strong>Fast booking</strong>
              <span>Choose a service and confirm in minutes.</span>
            </article>
            <article>
              <strong>Live visibility</strong>
              <span>Track address, map, worker, and status in one place.</span>
            </article>
            <article>
              <strong>Safer arrivals</strong>
              <span>Verify every visit with a 4-digit service code.</span>
            </article>
          </div>
        </div>

        <div className="landing-visual">
          <div className="landing-visual-main">
            <img
              src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1400&q=80"
              alt="Technician helping inside a modern home"
            />
            <div className="landing-visual-card">
              <span className="badge">Trusted Visits</span>
              <strong>From emergency fixes to routine care</strong>
              <p>One calm booking flow for every room in the house.</p>
            </div>
          </div>
          <div className="landing-visual-stack">
            <article className="mini-panel warm">
              <strong>Same dashboard</strong>
              <span>Services, booking history, location, and profile stay connected.</span>
            </article>
            <article className="mini-panel cool">
              <strong>Cleaner experience</strong>
              <span>Clear color cues and rich service cards make the app easier to scan.</span>
            </article>
          </div>
        </div>
      </section>

      <section className="panel landing-services-panel">
        <div className="panel-head">
          <div>
            <span className="badge">Popular Services</span>
            <h2>Everything your home needs, from fixes to fresh starts</h2>
            <p>Explore the categories customers use most before signing in and booking.</p>
          </div>
          <Link to="/register" className="primary-link">
            Start Booking
          </Link>
        </div>

        {loading ? (
          <div className="screen-loader">Loading featured services...</div>
        ) : (
          <div className="landing-service-grid">
            {featuredServices.map((service) => (
              <article key={service._id} className="landing-service-card">
                <img
                  src={getServiceImage(service)}
                  alt={service.name}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = createFallbackImage(service.name);
                  }}
                />
                <div>
                  <span className="landing-service-tag">Home Care</span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <strong>Starting at Rs. {service.basePrice}</strong>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
