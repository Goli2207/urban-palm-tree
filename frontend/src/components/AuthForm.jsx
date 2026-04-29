import { useState } from "react";

const defaultForms = {
  login: {
    email: "",
    mobile: "",
    password: ""
  },
  register: {
    name: "",
    email: "",
    mobile: "",
    password: ""
  }
};

export const AuthForm = ({ mode, onSubmit, title, subtitle, alternateAction, className = "" }) => {
  const [form, setForm] = useState(defaultForms[mode]);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className={`auth-card ${className}`.trim()}>
      <div className="auth-header">
        <span className="badge">{mode === "login" ? "Welcome Back" : "Get Started"}</span>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit}>
        {mode === "register" && (
          <label>
            Full Name
            <input
              type="text"
              placeholder="Enter your full name"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              required
            />
          </label>
        )}

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
          Password
          <input
            type="password"
            placeholder="Minimum 6 characters"
            value={form.password}
            onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            required
          />
        </label>

        {error && <p className="error-text">{error}</p>}

        <button className="primary-button" type="submit" disabled={submitting}>
          {submitting
            ? "Please wait..."
            : mode === "login"
              ? "Login to Continue"
              : "Create Account"}
        </button>
      </form>

      {alternateAction}
    </section>
  );
};
