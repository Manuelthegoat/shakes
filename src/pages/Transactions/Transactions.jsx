import { useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import "./Transactions.css";

const allTransactions = [
  { id: 1, name: "Whole Foods Market", category: "Groceries", date: "Aug 15, 2026", amount: -84.32 },
  { id: 2, name: "Payroll Deposit", category: "Income", date: "Aug 14, 2026", amount: 3200.0 },
  { id: 3, name: "Netflix", category: "Subscriptions", date: "Aug 12, 2026", amount: -15.99 },
  { id: 4, name: "Shell Gas Station", category: "Transport", date: "Aug 11, 2026", amount: -42.1 },
  { id: 5, name: "Transfer from Savings", category: "Transfer", date: "Aug 10, 2026", amount: 500.0 },
  { id: 6, name: "Amazon", category: "Shopping", date: "Aug 9, 2026", amount: -128.47 },
  { id: 7, name: "Chipotle", category: "Dining", date: "Aug 8, 2026", amount: -13.75 },
];

function formatCurrency(amount) {
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return amount < 0 ? `-${formatted}` : formatted;
}

function Transactions() {
  const [search, setSearch] = useState("");

  const filtered = allTransactions.filter((t) =>
    t.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">History</p>
          <h1 className="page__title">Transactions</h1>
        </div>
        <input
          className="tx-search"
          type="text"
          placeholder="Search transactions"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="activity">
        {filtered.length === 0 && <p className="tx-empty">No transactions match your search.</p>}

        {filtered.map((t) => (
          <div className="activity__row activity__row--tx" key={t.id}>
            <div className="activity__row-icon">
              {t.amount < 0 ? (
                <ArrowUpRight size={15} color="var(--negative-600)" />
              ) : (
                <ArrowDownRight size={15} color="var(--positive-600)" />
              )}
            </div>
            <div className="tx-main">
              <span className="activity__row-name">{t.name}</span>
              <span className="tx-category">{t.category}</span>
            </div>
            <span className="activity__row-date">{t.date}</span>
            <span
              className={`activity__row-amount ${
                t.amount > 0 ? "activity__row-amount--positive" : ""
              }`}
            >
              {formatCurrency(t.amount)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Transactions;