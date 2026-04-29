import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { BrandLogo } from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

export const RegisterPage = () => {
  const { register, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/services" replace />;
  }

  const handleRegister = async (values) => {
    await register(values);
    navigate("/services");
  };

  return (
    <div className="app-shell auth-shell">
      <section className="hero auth-hero register-hero-alt">
        <div className="hero-copy auth-brand-panel register-alt-panel">
          <span className="hero-kicker">
            <BrandLogo />
          </span>
          <h1>Register once. Run your home smarter.</h1>
          <p>
            Create your Urban Palm Tree account to access a refined home-services experience with faster
            booking, verified workers, and clean service tracking.
          </p>
          <div className="register-editorial-card">
            <img
              src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
              alt="Modern home service support"
            />
            <div className="register-editorial-copy">
              <strong>Designed for busy homes</strong>
              <span>From emergencies to routine fixes, book every visit through one calm dashboard.</span>
            </div>
          </div>
          <div className="register-points">
            <article className="register-point">
              <strong>Verified worker matching</strong>
              <span>Every booking is assigned to available workers with better ratings first.</span>
            </article>
            <article className="register-point">
              <strong>Live-location bookings</strong>
              <span>Use current location to fill address and keep the service route visible on maps.</span>
            </article>
            <article className="register-point">
              <strong>4-digit service code</strong>
              <span>Share your booking code with the worker when they arrive to start the job safely.</span>
            </article>
          </div>
        </div>

        <AuthForm
          mode="register"
          className="register-form-card register-form-alt"
          title="Create your Urban Palm Tree account"
          subtitle="Set up your profile to start booking services, tracking workers, and managing every visit in one place."
          onSubmit={handleRegister}
          alternateAction={
            <p className="auth-switch">
              Already a member? <Link to="/login">Sign in here</Link>
            </p>
          }
        />
      </section>
    </div>
  );
};
