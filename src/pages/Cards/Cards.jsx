import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  Plus,
  Clock,
  X,
  Eye,
  EyeOff,
  Copy,
  Check,
  DollarSign,
  ShoppingBag,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import PinModal from "../../components/PinModal/PinModal";
import "./Cards.css";

const gradients = {
  debit: "linear-gradient(135deg, var(--navy-900) 0%, var(--brand-600) 130%)",
  credit: "linear-gradient(135deg, #1a1f2b 0%, #3c4552 130%)",
};

function formatCardNumber(number) {
  return number.match(/.{1,4}/g).join(" ");
}
function formatCurrency(amount) {
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return amount < 0 ? `-${formatted}` : formatted;
}

function CardDetailModal({ card, onClose, onActionComplete }) {
  const [revealed, setRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [account, setAccount] = useState(null);
  const [actionAmount, setActionAmount] = useState("");
  const [actionLoading, setActionLoading] = useState(false);
  const [actionError, setActionError] = useState("");
  const [pendingAction, setPendingAction] = useState(null);

  useEffect(() => {
    if (card.account_id) {
      supabase
        .from("accounts")
        .select("*")
        .eq("id", card.account_id)
        .single()
        .then(({ data }) => setAccount(data));
    }
  }, [card.account_id]);

  const copyNumber = () => {
    navigator.clipboard.writeText(card.card_number);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const runAction = (action) => {
    if (!actionAmount) return;
    setPendingAction(action);
  };

  const confirmAction = async () => {
    const action = pendingAction;
    setPendingAction(null);
    setActionLoading(true);
    setActionError("");
    const { error } = await supabase.rpc("credit_card_action", {
      p_account_id: card.account_id,
      p_amount: Number(actionAmount),
      p_action: action,
    });
    setActionLoading(false);
    if (error) {
      setActionError(error.message);
      return;
    }
    setActionAmount("");
    const { data } = await supabase
      .from("accounts")
      .select("*")
      .eq("id", card.account_id)
      .single();
    setAccount(data);
    onActionComplete();
  };

  return (
    <div className="card-modal-overlay" onClick={onClose}>
      <div className="card-modal" onClick={(e) => e.stopPropagation()}>
        <button className="card-modal__close" onClick={onClose}>
          <X size={18} />
        </button>

        <div
          className="bank-card bank-card--modal"
          style={{ background: gradients[card.card_type] }}
        >
          <div className="bank-card__top">
            <span className="bank-card__type">{card.card_type}</span>
            <Lock size={16} />
          </div>
          <span className="bank-card__number">
            {revealed
              ? formatCardNumber(card.card_number)
              : `•••• •••• •••• ${card.last4}`}
          </span>
          <div className="bank-card__bottom">
            <div>
              <span className="bank-card__label">Card holder</span>
              <span className="bank-card__value">{card.requested_name}</span>
            </div>
            <div>
              <span className="bank-card__label">Expires</span>
              <span className="bank-card__value">
                {revealed
                  ? `${card.expiry_month}/${card.expiry_year.slice(-2)}`
                  : "••/••"}
              </span>
            </div>
            <div>
              <span className="bank-card__label">CVV</span>
              <span className="bank-card__value">
                {revealed ? card.cvv : "•••"}
              </span>
            </div>
          </div>
        </div>

        <div className="card-modal__actions">
          <button
            className="card-modal__btn"
            onClick={() => setRevealed((r) => !r)}
          >
            {revealed ? <EyeOff size={15} /> : <Eye size={15} />}
            {revealed ? "Hide details" : "Reveal details"}
          </button>
          <button
            className="card-modal__btn"
            onClick={copyNumber}
            disabled={!revealed}
          >
            {copied ? <Check size={15} /> : <Copy size={15} />}
            {copied ? "Copied" : "Copy number"}
          </button>
        </div>

        {card.card_type === "credit" && account && (
          <div className="card-balance-section">
            <div className="card-balance-section__row">
              <span>Current balance</span>
              <span
                className={
                  account.balance < 0 ? "card-balance-section__negative" : ""
                }
              >
                {formatCurrency(account.balance)}
              </span>
            </div>

            <div className="card-action-input">
              <span className="transfer-amount-prefix">$</span>
              <input
                type="number"
                min="1"
                step="0.01"
                placeholder="0.00"
                value={actionAmount}
                onChange={(e) => setActionAmount(e.target.value)}
              />
            </div>

            {actionError && <p className="transfer-error">{actionError}</p>}

            <div className="card-action-buttons">
              <button
                type="button"
                className="card-action-buttons__btn"
                onClick={() => runAction("charge")}
                disabled={!actionAmount || actionLoading}
              >
                <ShoppingBag size={14} /> Make a purchase
              </button>
              <button
                type="button"
                className="card-action-buttons__btn card-action-buttons__btn--payment"
                onClick={() => runAction("payment")}
                disabled={!actionAmount || actionLoading}
              >
                <DollarSign size={14} /> Pay from checking
              </button>
            </div>
          </div>
        )}

        <p className="card-modal__note">
          Only share your full card number or CVV with Support.
        </p>
        {pendingAction && (
          <PinModal
            title={
              pendingAction === "charge"
                ? "Confirm purchase"
                : "Confirm payment"
            }
            onSuccess={confirmAction}
            onCancel={() => setPendingAction(null)}
          />
        )}
      </div>
    </div>
  );
}
function Cards() {
  const { user } = useAuth();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [cardType, setCardType] = useState("debit");
  const [cardName, setCardName] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSsn] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressCity, setAddressCity] = useState("");
  const [addressState, setAddressState] = useState("");
  const [addressZip, setAddressZip] = useState("");
  const [income, setIncome] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const load = async () => {
    const { data } = await supabase
      .from("card_applications")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    setApplications(data || []);
    setLoading(false);
  };

  useEffect(() => {
    if (user) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleApply = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    const ssnDigits = ssn.replace(/\D/g, "");

    await supabase.from("card_applications").insert({
      user_id: user.id,
      card_type: cardType,
      requested_name:
        cardName || (cardType === "debit" ? "Freedom Debit" : "Freedom Credit"),
      date_of_birth: dob,
      ssn_last4: ssnDigits.slice(-4),
      address_line1: addressLine1,
      address_city: addressCity,
      address_state: addressState,
      address_zip: addressZip,
      annual_income: income ? Number(income) : null,
    });

    setCardName("");
    setDob("");
    setSsn("");
    setAddressLine1("");
    setAddressCity("");
    setAddressState("");
    setAddressZip("");
    setIncome("");
    setShowForm(false);
    setSubmitting(false);
    load();
  };

  if (loading) return <div className="page-loading">Loading your cards...</div>;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Your cards</p>
          <h1 className="page__title">Cards</h1>
        </div>
        <Link to="/dashboard/cards/apply" className="page__action">
          <Plus size={16} strokeWidth={2.5} />
          Apply for a card
        </Link>
      </div>

      {showForm && (
        <form className="apply-card-form" onSubmit={handleApply}>
          <div className="apply-card-form__row">
            <label className="apply-card-form__type">
              <input
                type="radio"
                name="cardType"
                value="debit"
                checked={cardType === "debit"}
                onChange={() => setCardType("debit")}
              />
              Debit card
            </label>
            <label className="apply-card-form__type">
              <input
                type="radio"
                name="cardType"
                value="credit"
                checked={cardType === "credit"}
                onChange={() => setCardType("credit")}
              />
              Credit card
            </label>
          </div>

          <input
            className="apply-card-form__input"
            placeholder="Card nickname (optional)"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />

          <div className="apply-card-form__divider">Identity verification</div>

          <div className="apply-card-form__grid">
            <div>
              <label className="apply-card-form__label">Date of birth</label>
              <input
                type="date"
                className="apply-card-form__input"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="apply-card-form__label">
                Social Security Number
              </label>
              <input
                type="text"
                className="apply-card-form__input"
                placeholder="123-45-6789"
                value={ssn}
                onChange={(e) => setSsn(e.target.value)}
                maxLength={11}
                required
              />
            </div>
          </div>

          <p className="apply-card-form__note apply-card-form__note--warning">
            Do not Share your SSN with anyone except Chase Official Support.
          </p>

          <div className="apply-card-form__divider">Address</div>

          <input
            className="apply-card-form__input"
            placeholder="Street address"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            required
          />

          <div className="apply-card-form__grid apply-card-form__grid--three">
            <input
              className="apply-card-form__input"
              placeholder="City"
              value={addressCity}
              onChange={(e) => setAddressCity(e.target.value)}
              required
            />
            <input
              className="apply-card-form__input"
              placeholder="State"
              value={addressState}
              onChange={(e) => setAddressState(e.target.value)}
              required
            />
            <input
              className="apply-card-form__input"
              placeholder="ZIP"
              value={addressZip}
              onChange={(e) => setAddressZip(e.target.value)}
              required
            />
          </div>

          <div className="apply-card-form__divider">Income</div>

          <input
            type="number"
            className="apply-card-form__input"
            placeholder="Annual income (optional)"
            value={income}
            onChange={(e) => setIncome(e.target.value)}
          />

          <button
            type="submit"
            className="apply-card-form__submit"
            disabled={submitting}
          >
            {submitting ? "Submitting..." : "Submit application"}
          </button>
          <p className="apply-card-form__note">
            Applications are reviewed before a card is issued.
          </p>
        </form>
      )}

      <div className="cards-grid">
        {applications.length === 0 && !showForm && (
          <p className="page-empty">
            You don't have any cards yet. Apply for one above.
          </p>
        )}

        {applications.map((app) => {
          if (app.status === "approved") {
            return (
              <button
                className="bank-card bank-card--clickable"
                style={{ background: gradients[app.card_type] }}
                key={app.id}
                onClick={() => setSelectedCard(app)}
              >
                <div className="bank-card__top">
                  <span className="bank-card__type">{app.card_type}</span>
                  <Lock size={16} />
                </div>
                <span className="bank-card__number">
                  •••• •••• •••• {app.last4}
                </span>
                <div className="bank-card__bottom">
                  <div>
                    <span className="bank-card__label">Card holder</span>
                    <span className="bank-card__value">
                      {app.requested_name}
                    </span>
                  </div>
                  <div>
                    <span className="bank-card__label">Status</span>
                    <span className="bank-card__value">Active</span>
                  </div>
                </div>
              </button>
            );
          }

          if (app.status === "pending") {
            return (
              <div className="pending-card" key={app.id}>
                <Clock size={22} color="var(--ink-500)" />
                <span className="pending-card__title">
                  {app.requested_name}
                </span>
                <span className="pending-card__status">
                  Application pending review
                </span>
              </div>
            );
          }

          return (
            <div className="pending-card pending-card--rejected" key={app.id}>
              <X size={22} color="var(--negative-600)" />
              <span className="pending-card__title">{app.requested_name}</span>
              <span className="pending-card__status pending-card__status--rejected">
                Application declined
              </span>
            </div>
          );
        })}
      </div>

      {selectedCard && (
        <CardDetailModal
          card={selectedCard}
          onClose={() => setSelectedCard(null)}
          onActionComplete={load}
        />
      )}
    </div>
  );
}

export default Cards;
