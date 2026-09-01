import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Wallet,
  PiggyBank,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Copy,
  Check,
  BarChart3,
  Repeat2,
  Sparkles as SparklesIcon,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import Loader from "../../components/shared/Loader/Loader";
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
    return <Loader label="Loading your accounts" />;

  const primary = accounts.find((a) => a.type === "checking") || accounts[0];
  const others = accounts.filter((a) => a.id !== primary?.id);
  const firstName = user?.user_metadata?.first_name;
  const totalBalance = accounts.reduce((sum, account) => sum + Number(account.balance || 0), 0);
  const recentIncome = recentActivity.filter((t) => Number(t.amount) > 0).reduce((sum, t) => sum + Number(t.amount), 0);
  const recentSpending = recentActivity.filter((t) => Number(t.amount) < 0).reduce((sum, t) => sum + Math.abs(Number(t.amount)), 0);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Overview</p>
          <h1 className="page__title">
            Good afternoon{firstName ? `, ${firstName}` : ""}
          </h1>
        </div>
        <Link to="/dashboard/transfers" className="page__action">
          <Plus size={16} strokeWidth={2.5} />
          Quick transfer
        </Link>
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

      <div className="dashboard-tools">
        <div className="dashboard-panel dashboard-panel--actions">
          <div className="dashboard-panel__heading">
            <div>
              <p className="dashboard-panel__eyebrow">Shortcuts</p>
              <h2 className="dashboard-panel__title">What would you like to do?</h2>
            </div>
            <span className="dashboard-panel__spark"><SparklesIcon /></span>
          </div>
          <div className="dashboard-actions">
            <Link to="/dashboard/transfers" className="dashboard-action-card">
              <span className="dashboard-action-card__icon"><Repeat2 size={18} /></span>
              <span><strong>Send money</strong><small>Move funds instantly</small></span>
              <ArrowUpRight size={15} />
            </Link>
            <Link to="/dashboard/cards" className="dashboard-action-card">
              <span className="dashboard-action-card__icon"><CreditCard size={18} /></span>
              <span><strong>Manage cards</strong><small>View or apply for a card</small></span>
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>

        <div className="dashboard-panel dashboard-panel--snapshot">
          <div className="dashboard-panel__heading">
            <div>
              <p className="dashboard-panel__eyebrow">Your snapshot</p>
              <h2 className="dashboard-panel__title">Money at a glance</h2>
            </div>
            <BarChart3 size={20} color="var(--brand-600)" />
          </div>
          <div className="snapshot-balance"><span>Total across accounts</span><strong>{formatCurrency(totalBalance)}</strong></div>
          <div className="snapshot-stats">
            <div><span className="snapshot-stats__dot snapshot-stats__dot--in" /><span>Recent in</span><strong>{formatCurrency(recentIncome)}</strong></div>
            <div><span className="snapshot-stats__dot snapshot-stats__dot--out" /><span>Recent out</span><strong>{formatCurrency(recentSpending)}</strong></div>
          </div>
        </div>
      </div>

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
