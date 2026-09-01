import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff, Check } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import Loader from "../../components/shared/Loader/Loader";
import "./Signup.css";
import logo from "../../logo.svg";

const steps = ["Account", "About you", "Done"];

function Signup() {
  const [step, setStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const goNext = () => setStep((s) => Math.min(s + 1, steps.length - 1));
  const goBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleStep1 = (e) => {
    e.preventDefault();
    setError("");
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    goNext();
  };

  const handleStep2 = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            first_name: form.firstName,
            last_name: form.lastName,
            phone: form.phone,
          },
        },
      });
      if (signUpError) throw signUpError;
      goNext();
    } catch (err) {
      setError(err.message || "Something went wrong. Try again.");
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
            Open an account
            <br />
            in minutes.
          </h1>
          <p className="auth-panel__text">
            No branch visits, no paperwork. Just a few details and you're in.
          </p>

          <div className="onboard-steps">
            {steps.map((label, i) => (
              <div className="onboard-step" key={label}>
                <span className={`onboard-step__dot ${i <= step ? "onboard-step__dot--active" : ""}`}>
                  {i < step ? <Check size={12} /> : i + 1}
                </span>
                <span className={`onboard-step__label ${i <= step ? "onboard-step__label--active" : ""}`}>
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        {step === 0 && (
          <form className="auth-form" onSubmit={handleStep1}>
            <h2 className="auth-form__title">Create your account</h2>
            <p className="auth-form__subtitle">Let's start with your login details.</p>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="auth-input"
                value={form.email}
                onChange={update("email")}
                autoFocus
                required
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">Password</label>
              <div className="auth-password-wrap">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="auth-input"
                  value={form.password}
                  onChange={update("password")}
                  required
                />
                <button
                  type="button"
                  className="auth-password-toggle"
                  onClick={() => setShowPassword((s) => !s)}
                >
                  {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <span className="auth-hint">At least 6 characters.</span>
            </div>

            <button type="submit" className="auth-submit-btn">Continue</button>

            <p className="auth-form__footer">
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </form>
        )}

        {step === 1 && (
          <form className="auth-form" onSubmit={handleStep2}>
            <h2 className="auth-form__title">Tell us about you</h2>
            <p className="auth-form__subtitle">We'll use this to personalize your account.</p>

            {error && <p className="auth-error">{error}</p>}

            <div className="auth-field-row">
              <div className="auth-field">
                <label className="auth-label" htmlFor="firstName">First name</label>
                <input
                  id="firstName"
                  className="auth-input"
                  value={form.firstName}
                  onChange={update("firstName")}
                  autoFocus
                  required
                />
              </div>
              <div className="auth-field">
                <label className="auth-label" htmlFor="lastName">Last name</label>
                <input
                  id="lastName"
                  className="auth-input"
                  value={form.lastName}
                  onChange={update("lastName")}
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                className="auth-input"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={update("phone")}
                required
              />
            </div>

            <div className="auth-step-actions">
              <button type="button" className="auth-back-btn" onClick={goBack}>Back</button>
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? <Loader label="Creating account" inline /> : "Create account"}
              </button>
            </div>
          </form>
        )}

        {step === 2 && (
          <div className="auth-form onboard-success">
            <div className="onboard-success__illustration">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
                <circle cx="60" cy="60" r="60" fill="var(--brand-100)" />
                <rect x="28" y="42" width="64" height="42" rx="8" fill="var(--brand-600)" />
                <rect x="28" y="52" width="64" height="8" fill="var(--navy-900)" />
                <circle cx="40" cy="72" r="4" fill="#ffffff" />
                <path d="M50 30 L60 18 L70 30" stroke="var(--positive-600)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                <line x1="60" y1="18" x2="60" y2="42" stroke="var(--positive-600)" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </div>
            <h2 className="auth-form__title">You're all set, {form.firstName || "there"}!</h2>
            <p className="auth-form__subtitle">
              Your account has been created. Check your inbox to confirm your email, then sign in to
              get started.
            </p>
            <button className="auth-submit-btn" onClick={() => navigate("/login")}>
              Go to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Signup;
