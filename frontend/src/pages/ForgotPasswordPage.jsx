import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { api } from "../api";
import { BrandLogo } from "../components/BrandLogo";
import { useAuth } from "../context/AuthContext";

export const ForgotPasswordPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    mobile: "",
    password: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  if (user) {
    return <Navigate to="/services" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");
    setSubmitting(true);

    try {
      const response = await api.forgotPassword(form);
      setMessage(response.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell auth-shell">
      <section className="hero auth-hero register-hero-alt">
        <div className="hero-copy auth-brand-panel login-alt-panel">
          <span className="hero-kicker">
            <BrandLogo />
          </span>
          <h1>Reset access without losing your bookings.</h1>
          <p>
            Verify your email and mobile number, then set a new password to get back into your
            Urban Palm Tree account.
          </p>
          <div className="register-points">
            <article className="register-point">
              <strong>Account verification</strong>
              <span>Your email and mobile number are checked before the password is changed.</span>
            </article>
            <article className="register-point">
              <strong>Quick recovery</strong>
              <span>Reset your password and head straight back to booking and history tracking.</span>
            </article>
          </div>
        </div>

        <section className="auth-card register-form-card login-form-alt">
          <div className="auth-header">
            <span className="badge">Recover Access</span>
            <h2>Forgot password</h2>
            <p>Enter your registered email, mobile number, and a new password.</p>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label>
              Email
              <input
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
                required
              />
            </label>

            <label>
              Mobile Number
              <input
                type="tel"
                placeholder="Enter your mobile number"
                value={form.mobile}
                onChange={(event) => setForm((current) => ({ ...current, mobile: event.target.value }))}
                required
              />
            </label>

            <label>
              New Password
              <input
                type="password"
                placeholder="Minimum 6 characters"
                value={form.password}
                onChange={(event) =>
                  setForm((current) => ({ ...current, password: event.target.value }))
                }
                required
              />
            </label>

            {message && <p className="success-text">{message}</p>}
            {error && <p className="error-text">{error}</p>}

            <button className="primary-button" type="submit" disabled={submitting}>
              {submitting ? "Updating..." : "Reset Password"}
            </button>
          </form>

          <p className="auth-switch">
            Remembered it? <Link to="/login">Back to login</Link>
          </p>
        </section>
      </section>
    </div>
  );
};
