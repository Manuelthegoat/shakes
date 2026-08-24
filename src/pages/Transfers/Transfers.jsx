import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Wallet, PiggyBank, Search, Loader2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./Transfers.css";

const iconByType = { checking: Wallet, savings: PiggyBank };
const quickAmounts = [25, 50, 100, 250];

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Transfers() {
  const { user } = useAuth();
  const [myAccounts, setMyAccounts] = useState([]);
  const [fromId, setFromId] = useState(null);
  const [toNumber, setToNumber] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [lookupError, setLookupError] = useState("");
  const [lookupLoading, setLookupLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => {
        setMyAccounts(data || []);
        if (data?.length) setFromId(data[0].id);
      });
  }, [user]);

  const from = myAccounts.find((a) => a.id === fromId);

  const handleLookup = async () => {
    setRecipient(null);
    setLookupError("");
    if (toNumber.length < 4) return;
    setLookupLoading(true);
    const { data, error } = await supabase.rpc("lookup_account", { p_account_number: toNumber });
    setLookupLoading(false);
    if (error || !data || data.length === 0) {
      setLookupError("No account found with that number.");
      return;
    }
    if (from && toNumber === from.account_number) {
      setLookupError("You can't transfer to the same account.");
      return;
    }
    setRecipient(data[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipient || !amount || !from) return;
    setSubmitting(true);
    setSubmitError("");

    const { error } = await supabase.rpc("transfer_funds", {
      p_from_account_id: from.id,
      p_to_account_number: toNumber,
      p_amount: Number(amount),
    });

    setSubmitting(false);

    if (error) {
      setSubmitError(error.message);
      return;
    }

    setSuccess({ amount, recipientName: recipient.owner_name });
  };

  const reset = () => {
    setSuccess(null);
    setAmount("");
    setToNumber("");
    setRecipient(null);
    setLookupError("");
    // refresh balances
    supabase
      .from("accounts")
      .select("*")
      .eq("user_id", user.id)
      .then(({ data }) => setMyAccounts(data || []));
  };

  if (!from) return <div className="page-loading">Loading your accounts...</div>;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Move money</p>
          <h1 className="page__title">Transfers</h1>
        </div>
      </div>

      <div className="transfer-card">
        {success ? (
          <div className="transfer-success">
            <div className="transfer-success__icon">
              <CheckCircle2 size={32} color="var(--positive-600)" />
            </div>
            <h2 className="transfer-success__title">{formatCurrency(Number(success.amount))} sent</h2>
            <p className="transfer-success__text">Sent to {success.recipientName}.</p>
            <button className="transfer-btn" onClick={reset}>Make another transfer</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <span className="transfer-account-group__label">From</span>
            <div className="transfer-account-group" style={{ marginBottom: 20 }}>
              {myAccounts.map((acc) => {
                const Icon = iconByType[acc.type] || Wallet;
                const selected = acc.id === fromId;
                return (
                  <button
                    type="button"
                    key={acc.id}
                    className={`account-option ${selected ? "account-option--selected" : ""}`}
                    onClick={() => setFromId(acc.id)}
                  >
                    <span className="account-option__icon"><Icon size={16} strokeWidth={1.75} /></span>
                    <span className="account-option__info">
                      <span className="account-option__name">{acc.name}</span>
                      <span className="account-option__number">•••• {acc.number}</span>
                    </span>
                    <span className="account-option__balance">{formatCurrency(acc.balance)}</span>
                  </button>
                );
              })}
            </div>

            <span className="transfer-account-group__label">To</span>
            <div className="recipient-lookup">
              <div className="recipient-lookup__input-wrap">
                <input
                  className="recipient-lookup__input"
                  placeholder="Enter 10-digit account number"
                  value={toNumber}
                  onChange={(e) => {
                    setToNumber(e.target.value.replace(/\D/g, "").slice(0, 10));
                    setRecipient(null);
                    setLookupError("");
                  }}
                  onBlur={handleLookup}
                  maxLength={10}
                />
                <button type="button" className="recipient-lookup__btn" onClick={handleLookup}>
                  {lookupLoading ? <Loader2 size={16} className="spin" /> : <Search size={16} />}
                </button>
              </div>

              {lookupError && <p className="transfer-error">{lookupError}</p>}

              {recipient && (
                <div className="recipient-found">
                  <span className="recipient-found__name">{recipient.owner_name}</span>
                  <span className="recipient-found__meta">{recipient.account_name}</span>
                </div>
              )}
            </div>

            <div className="transfer-amount-section">
              <span className="transfer-account-group__label">Amount</span>
              <div className="transfer-amount-wrap">
                <span className="transfer-amount-prefix">$</span>
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="0.00"
                  className="transfer-amount-input"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </div>

              <div className="quick-amounts">
                {quickAmounts.map((val) => (
                  <button
                    type="button"
                    key={val}
                    className={`quick-amount ${Number(amount) === val ? "quick-amount--selected" : ""}`}
                    onClick={() => setAmount(String(val))}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>

            {submitError && <p className="transfer-error">{submitError}</p>}

            <button
              type="submit"
              className="transfer-btn"
              disabled={!recipient || !amount || submitting}
            >
              {submitting ? "Sending..." : "Send transfer"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Transfers;