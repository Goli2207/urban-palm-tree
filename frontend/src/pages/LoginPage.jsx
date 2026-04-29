import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthForm } from "../components/AuthForm";
import { BrandLogo } from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

export const LoginPage = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  if (user) {
    return <Navigate to="/services" replace />;
  }

  const handleLogin = async (values) => {
    await login(values);
    navigate("/services");
  };

  return (
    <div className="app-shell auth-shell">
      <section className="hero auth-hero register-hero-alt">
        <div className="hero-copy auth-brand-panel login-alt-panel">
          <span className="hero-kicker">
            <BrandLogo />
          </span>
          <h1>Come back to a calmer service routine.</h1>
          <p>
            Sign in to schedule trusted professionals, manage active jobs, and confirm service at
            your doorstep with a secure 4-digit code.
          </p>
          <div className="login-editorial-card">
            <img
              src="https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1200&q=80"
              alt="Home service support"
            />
            <div className="login-editorial-copy">
              <strong>Everything in one place</strong>
              <span>Track workers, booking history, live location, and confirmations from a single workspace.</span>
            </div>
          </div>
          <div className="register-points">
            <article className="register-point">
              <strong>Priority worker assignment</strong>
              <span>Available workers are chosen by rating and experience for faster, better service.</span>
            </article>
            <article className="register-point">
              <strong>Location-aware booking flow</strong>
              <span>Your current location helps fill address details and stays connected to the service map.</span>
            </article>
            <article className="register-point">
              <strong>Secure booking verification</strong>
              <span>Use your 4-digit service code to verify the worker before the job begins.</span>
            </article>
          </div>
        </div>

        <AuthForm
          mode="login"
          className="register-form-card login-form-alt"
          title="Welcome back to Urban Palm Tree"
          subtitle="Login to manage bookings, contact workers, and verify every visit with your secure service code."
          onSubmit={handleLogin}
          alternateAction={
            <>
              <p className="auth-switch auth-switch-row">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>
              <p className="auth-switch">
                New to Urban Palm Tree? <Link to="/register">Create your account</Link>
              </p>
            </>
          }
        />
      </section>
    </div>
  );
};
