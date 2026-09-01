import { useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient";
import "../Login/Login.css";
import logo from "../../logo.svg";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/login`,
      });
      if (resetError) throw resetError;
      setSent(true);
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-screen">
      <div className="auth-panel">
        <div className="auth-panel__glow" />
        <div className="auth-panel__content">
          <img className="auth-panel__logo" src={logo} alt="Chase" />
          <h1 className="auth-panel__headline">
            Forgot your
            <br />
            password?
          </h1>
          <p className="auth-panel__text">No worries — we'll send you a reset link.</p>
        </div>
      </div>

      <div className="auth-form-side">
        {sent ? (
          <div className="auth-form">
            <h2 className="auth-form__title">Check your inbox</h2>
            <p className="auth-form__subtitle">
              We've sent a password reset link to {email}.
            </p>
            <Link to="/login" className="auth-submit-btn" style={{ display: "block", textAlign: "center", textDecoration: "none" }}>
              Back to sign in
            </Link>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit}>
            <h2 className="auth-form__title">Reset password</h2>
            <p className="auth-form__subtitle">Enter the email linked to your account.</p>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
                required
              />
            </div>

            <button type="submit" className="auth-submit-btn" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </button>

            <p className="auth-form__footer">
              Remembered it? <Link to="/login">Sign in</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
