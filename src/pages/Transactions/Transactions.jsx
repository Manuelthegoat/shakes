import { useEffect, useState } from "react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./Transactions.css";

function formatCurrency(amount) {
  const formatted = Math.abs(amount).toLocaleString("en-US", { style: "currency", currency: "USD" });
  return amount < 0 ? `-${formatted}` : formatted;
}

function Transactions() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function load() {
      const { data } = await supabase
        .from("transactions")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      setTransactions(data || []);
      setLoading(false);
    }

    load();
  }, [user]);

  const filtered = transactions.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()));

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
        {loading && <p className="tx-empty">Loading transactions...</p>}
        {!loading && filtered.length === 0 && (
          <p className="tx-empty">No transactions match your search.</p>
        )}

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
            <span className="activity__row-date">
              {new Date(t.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
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
  );
}

export default Transactions;