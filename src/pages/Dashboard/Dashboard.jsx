import { useEffect, useState } from "react";
import {
  Wallet,
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Copy,
  Check,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./Dashboard.css";

const iconByType = { checking: Wallet, savings: PiggyBank, credit: CreditCard };

function formatCurrency(amount) {
  const formatted = Math.abs(amount).toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  return amount < 0 ? `-${formatted}` : formatted;
}
function AccountNumberRow({ accountNumber }) {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(accountNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button className="primary-card__account-number" onClick={copy}>
      Acct # {accountNumber}
      {copied ? <Check size={13} /> : <Copy size={13} />}
    </button>
  );
}

function Dashboard() {
  const { user } = useAuth();
  const [accounts, setAccounts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const { data: accountsData } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id);

      const { data: txData } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(3);

      setAccounts(accountsData || []);
      setRecentActivity(txData || []);
      setLoading(false);
    }

    load();
  }, [user]);

  if (loading)
    return <div className="page-loading">Loading your accounts...</div>;

  const primary = accounts.find((a) => a.type === "checking") || accounts[0];
  const others = accounts.filter((a) => a.id !== primary?.id);
  const firstName = user?.user_metadata?.first_name;

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Overview</p>
          <h1 className="page__title">
            Good afternoon{firstName ? `, ${firstName}` : ""}
          </h1>
        </div>
        <button className="page__action">
          <Plus size={16} strokeWidth={2.5} />
          Quick transfer
        </button>
      </div>

      {!primary ? (
        <p className="page-empty">No accounts found yet.</p>
      ) : (
        <div className="dash-grid">
          <div className="primary-card">
            <div className="primary-card__top">
              <span className="primary-card__label">{primary.name}</span>
              {(() => {
                const Icon = iconByType[primary.type] || Wallet;
                return <Icon size={20} strokeWidth={1.75} />;
              })()}
            </div>
            <span className="primary-card__balance">
              {formatCurrency(primary.balance)}
            </span>
            <AccountNumberRow accountNumber={primary.account_number} />
            <div className="primary-card__glow" />
          </div>

          <div className="mini-accounts">
            {others.map((account) => {
              const Icon = iconByType[account.type] || Wallet;
              return (
                <div className="mini-account" key={account.id}>
                  <div className="mini-account__icon">
                    <Icon size={16} strokeWidth={1.75} />
                  </div>
                  <div className="mini-account__info">
                    <span className="mini-account__name">{account.name}</span>
                    <span className="mini-account__number">
                      •••• {account.number}
                    </span>
                  </div>
                  <span
                    className={`mini-account__balance ${
                      account.balance < 0
                        ? "mini-account__balance--negative"
                        : ""
                    }`}
                  >
                    {formatCurrency(account.balance)}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="activity">
        <div className="activity__header">
          <h2 className="activity__title">Recent activity</h2>
          <a href="/dashboard/transactions" className="activity__link">
            View all
          </a>
        </div>

        <div className="activity__list">
          {recentActivity.length === 0 && (
            <p className="page-empty">No recent transactions.</p>
          )}
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
              <span className="activity__row-date">
                {new Date(t.created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
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
