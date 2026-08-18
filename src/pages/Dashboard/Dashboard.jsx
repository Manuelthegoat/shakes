import { Wallet, PiggyBank, CreditCard, ArrowUpRight, ArrowDownRight, Plus } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Dashboard.css";

const accounts = [
  { id: 1, name: "Total Checking", number: "4821", balance: 8240.55, icon: Wallet, primary: true },
  { id: 2, name: "Total Savings", number: "9013", balance: 24310.0, icon: PiggyBank },
  { id: 3, name: "Freedom Credit Card", number: "2277", balance: -412.3, icon: CreditCard },
];

const recentActivity = [
  { id: 1, name: "Payroll Deposit", date: "Aug 14", amount: 3200.0 },
  { id: 2, name: "Whole Foods Market", date: "Aug 15", amount: -84.32 },
  { id: 3, name: "Netflix", date: "Aug 12", amount: -15.99 },
];

function formatCurrency(amount) {
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return amount < 0 ? `-${formatted}` : formatted;
}

function Dashboard() {
  const { user } = useAuth();
  const primary = accounts.find((a) => a.primary);
  const others = accounts.filter((a) => !a.primary);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Overview</p>
          <h1 className="page__title">Good afternoon, {user?.name?.split(" ")[0] || "there"}</h1>
        </div>
        <button className="page__action">
          <Plus size={16} strokeWidth={2.5} />
          Quick transfer
        </button>
      </div>

      <div className="dash-grid">
        <div className="primary-card">
          <div className="primary-card__top">
            <span className="primary-card__label">{primary.name}</span>
            <primary.icon size={20} strokeWidth={1.75} />
          </div>
          <span className="primary-card__balance">{formatCurrency(primary.balance)}</span>
          <span className="primary-card__number">Account •••• {primary.number}</span>
          <div className="primary-card__glow" />
        </div>

        <div className="mini-accounts">
          {others.map((account) => (
            <div className="mini-account" key={account.id}>
              <div className="mini-account__icon">
                <account.icon size={16} strokeWidth={1.75} />
              </div>
              <div className="mini-account__info">
                <span className="mini-account__name">{account.name}</span>
                <span className="mini-account__number">•••• {account.number}</span>
              </div>
              <span
                className={`mini-account__balance ${
                  account.balance < 0 ? "mini-account__balance--negative" : ""
                }`}
              >
                {formatCurrency(account.balance)}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="activity">
        <div className="activity__header">
          <h2 className="activity__title">Recent activity</h2>
          <a href="/dashboard/transactions" className="activity__link">View all</a>
        </div>

        <div className="activity__list">
          {recentActivity.map((t) => (
            <div className="activity__row" key={t.id}>
              <div className="activity__row-icon">
                {t.amount < 0 ? (
                  <ArrowUpRight size={15} color="var(--negative-600)" />
                ) : (
                  <ArrowDownRight size={15} color="var(--positive-600)" />
                )}
              </div>
              <span className="activity__row-name">{t.name}</span>
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
    </div>
  );
}

export default Dashboard;