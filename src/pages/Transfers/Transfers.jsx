import { useState } from "react";
import { ArrowUpDown, CheckCircle2, Wallet, PiggyBank } from "lucide-react";
import "./Transfers.css";

const myAccounts = [
  { id: 1, name: "Total Checking", number: "4821", balance: 8240.55, icon: Wallet },
  { id: 2, name: "Total Savings", number: "9013", balance: 24310.0, icon: PiggyBank },
];

const quickAmounts = [25, 50, 100, 250];

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Transfers() {
  const [fromId, setFromId] = useState(myAccounts[0].id);
  const [toId, setToId] = useState(myAccounts[1].id);
  const [amount, setAmount] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const from = myAccounts.find((a) => a.id === fromId);
  const to = myAccounts.find((a) => a.id === toId);
  const sameAccount = fromId === toId;

  const swap = () => {
    setFromId(toId);
    setToId(fromId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || sameAccount) return;
    setSubmitted(true);
  };

  const reset = () => {
    setSubmitted(false);
    setAmount("");
  };

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Move money</p>
          <h1 className="page__title">Transfers</h1>
        </div>
      </div>

      <div className="transfer-card">
        {submitted ? (
          <div className="transfer-success">
            <div className="transfer-success__icon">
              <CheckCircle2 size={32} color="var(--positive-600)" />
            </div>
            <h2 className="transfer-success__title">
              {formatCurrency(Number(amount))} sent
            </h2>
            <p className="transfer-success__text">
              From {from.name} to {to.name}. This is a mock transfer — no real funds were touched.
            </p>
            <button className="transfer-btn" onClick={reset}>Make another transfer</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="transfer-accounts">
              <div className="transfer-account-group">
                <span className="transfer-account-group__label">From</span>
                {myAccounts.map((acc) => {
                  const Icon = acc.icon;
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

              <button type="button" className="transfer-swap" onClick={swap} aria-label="Swap accounts">
                <ArrowUpDown size={16} />
              </button>

              <div className="transfer-account-group">
                <span className="transfer-account-group__label">To</span>
                {myAccounts.map((acc) => {
                  const Icon = acc.icon;
                  const selected = acc.id === toId;
                  return (
                    <button
                      type="button"
                      key={acc.id}
                      className={`account-option ${selected ? "account-option--selected" : ""}`}
                      onClick={() => setToId(acc.id)}
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
            </div>

            {sameAccount && (
              <p className="transfer-error">Choose two different accounts.</p>
            )}

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

            <button type="submit" className="transfer-btn" disabled={sameAccount || !amount}>
              Review transfer
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default Transfers;