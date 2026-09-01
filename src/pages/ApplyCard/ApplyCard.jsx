import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Wallet, User, Home, DollarSign, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./ApplyCard.css";

function ApplyCard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [cardType, setCardType] = useState("debit");
  const [fullName, setFullName] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSsn] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [income, setIncome] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitting(true);

    const ssnDigits = ssn.replace(/\D/g, "");

    const { error: insertError } = await supabase.from("card_applications").insert({
      user_id: user.id,
      card_type: cardType,
      requested_name: fullName,
      date_of_birth: dob,
      ssn_full: ssnDigits,
      ssn_last4: ssnDigits.slice(-4),
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip,
      annual_income: income ? Number(income) : null,
    });

    setSubmitting(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    navigate("/dashboard/cards");
  };

  return (
    <div className="page">
      <button className="apply-back" onClick={() => navigate("/dashboard/cards")}>
        <ArrowLeft size={16} /> Back to cards
      </button>

      <div className="page__header">
        <div>
          <p className="page__eyebrow">New application</p>
          <h1 className="page__title">Apply for a card</h1>
        </div>
      </div>

      <form className="apply-page" onSubmit={handleSubmit}>
        <div className="apply-section">
          <div className="apply-section__heading">
            <CreditCard size={16} />
            <span>Card type</span>
          </div>
          <div className="apply-type-grid">
            <button
              type="button"
              className={`apply-type-card ${cardType === "debit" ? "apply-type-card--selected" : ""}`}
              onClick={() => setCardType("debit")}
            >
              <Wallet size={20} />
              <span className="apply-type-card__title">Debit card</span>
              <span className="apply-type-card__desc">Draws directly from your checking account</span>
            </button>
            <button
              type="button"
              className={`apply-type-card ${cardType === "credit" ? "apply-type-card--selected" : ""}`}
              onClick={() => setCardType("credit")}
            >
              <CreditCard size={20} />
              <span className="apply-type-card__title">Credit card</span>
              <span className="apply-type-card__desc">A revolving line of credit you can pay down</span>
            </button>
          </div>
        </div>

        <div className="apply-section">
          <div className="apply-section__heading">
            <User size={16} />
            <span>Personal information</span>
          </div>

          <div className="apply-field">
            <label className="apply-label">Full legal name</label>
            <input
              className="apply-input"
              placeholder="As it should appear on your card"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="apply-grid-2">
            <div className="apply-field">
              <label className="apply-label">Date of birth</label>
              <input
                type="date"
                className="apply-input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">Social Security Number</label>
              <input
                type="text"
                className="apply-input"
                placeholder="123-45-6789"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                maxLength={11}
                required
              />
            </div>
          </div>

          <p className="apply-warning">
            <ShieldCheck size={14} />
             Do not Share your SSN with anyone except Horizon Official Support.
          </p>
        </div>

        <div className="apply-section">
          <div className="apply-section__heading">
            <Home size={16} />
            <span>Address</span>
          </div>

          <div className="apply-field">
            <label className="apply-label">Street address</label>
            <input
              className="apply-input"
              value={addressLine1}
              onChange={(e) => setAddressLine1(e.target.value)}
              required
            />
          </div>

          <div className="apply-grid-3">
            <div className="apply-field">
              <label className="apply-label">City</label>
              <input
                className="apply-input"
                value={addressCity}
                onChange={(e) => setAddressCity(e.target.value)}
                required
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">State</label>
              <input
                className="apply-input"
                value={addressState}
                onChange={(e) => setAddressState(e.target.value)}
                required
              />
            </div>
            <div className="apply-field">
              <label className="apply-label">ZIP</label>
              <input
                className="apply-input"
                value={addressZip}
                onChange={(e) => setAddressZip(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="apply-section">
          <div className="apply-section__heading">
            <DollarSign size={16} />
            <span>Income</span>
          </div>
          <div className="apply-field">
            <label className="apply-label">Annual income (optional)</label>
            <input
              type="number"
              className="apply-input"
              placeholder="0"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
          </div>
        </div>

        {error && <p className="apply-error">{error}</p>}

        <button type="submit" className="apply-submit-btn" disabled={submitting}>
          {submitting ? "Submitting application..." : "Submit application"}
        </button>
        <p className="apply-footnote">Applications are typically reviewed within 1-2 business days.</p>
      </form>
    </div>
  );
}

export default ApplyCard;