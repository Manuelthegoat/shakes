import { useEffect, useState } from "react";
import { Check, X, ShieldCheck, ChevronDown, ChevronUp } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import "./Admin.css";

function formatSsn(ssn) {
  if (!ssn || ssn.length < 9) return ssn || "—";
  return `${ssn.slice(0, 3)}-${ssn.slice(3, 5)}-${ssn.slice(5)}`;
}

function formatCurrency(amount) {
  if (amount === null || amount === undefined) return "—";
  return Number(amount).toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function Admin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");
  const [expandedId, setExpandedId] = useState(null);

  const load = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("card_applications")
      .select("*")
      .order("created_at", { ascending: false });
    setApplications(data || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const review = async (id, status) => {
    await supabase.from("card_applications").update({ status }).eq("id", id);
    load();
  };

  const filtered = applications.filter((a) => (filter === "all" ? true : a.status === filter));

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">
            <ShieldCheck size={13} style={{ verticalAlign: "-2px", marginRight: 4 }} />
            Admin
          </p>
          <h1 className="page__title">Card applications</h1>
        </div>
      </div>

      <div className="admin-filters">
        {["pending", "approved", "rejected", "all"].map((f) => (
          <button
            key={f}
            className={`admin-filter ${filter === f ? "admin-filter--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <div className="activity">
        {loading && <p className="page-empty">Loading applications...</p>}
        {!loading && filtered.length === 0 && <p className="page-empty">No applications here.</p>}

        {filtered.map((app) => {
          const expanded = expandedId === app.id;
          return (
            <div className="admin-app" key={app.id}>
              <button className="admin-row admin-row--clickable" onClick={() => setExpandedId(expanded ? null : app.id)}>
                <div className="admin-row__info">
                  <span className="admin-row__name">{app.requested_name}</span>
                  <span className="admin-row__meta">
                    {app.card_type} • applied {new Date(app.created_at).toLocaleDateString()}
                  </span>
                </div>
                <span className={`admin-badge admin-badge--${app.status}`}>{app.status}</span>
                {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {expanded && (
                <div className="admin-detail">
                  <div className="admin-detail__grid">
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">Full name</span>
                      <span className="admin-detail__value">{app.requested_name || "—"}</span>
                    </div>
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">Card type</span>
                      <span className="admin-detail__value">{app.card_type}</span>
                    </div>
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">Date of birth</span>
                      <span className="admin-detail__value">{app.date_of_birth || "—"}</span>
                    </div>
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">SSN</span>
                      <span className="admin-detail__value admin-detail__value--sensitive">
                        {formatSsn(app.ssn_full)}
                      </span>
                    </div>
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">Annual income</span>
                      <span className="admin-detail__value">{formatCurrency(app.annual_income)}</span>
                    </div>
                    <div className="admin-detail__field">
                      <span className="admin-detail__label">User ID</span>
                      <span className="admin-detail__value admin-detail__value--mono">{app.user_id}</span>
                    </div>
                    <div className="admin-detail__field admin-detail__field--wide">
                      <span className="admin-detail__label">Address</span>
                      <span className="admin-detail__value">
                        {app.address_line1 ? `${app.address_line1}, ${app.address_city}, ${app.address_state} ${app.address_zip}` : "—"}
                      </span>
                    </div>
                    {app.status === "approved" && (
                      <>
                        <div className="admin-detail__field">
                          <span className="admin-detail__label">Card number</span>
                          <span className="admin-detail__value admin-detail__value--mono admin-detail__value--sensitive">
                            {app.card_number}
                          </span>
                        </div>
                        <div className="admin-detail__field">
                          <span className="admin-detail__label">Expiry / CVV</span>
                          <span className="admin-detail__value admin-detail__value--sensitive">
                            {app.expiry_month}/{app.expiry_year} • {app.cvv}
                          </span>
                        </div>
                      </>
                    )}
                  </div>

                  {app.status === "pending" && (
                    <div className="admin-detail__actions">
                      <button className="admin-approve" onClick={() => review(app.id, "approved")}>
                        <Check size={15} /> Approve
                      </button>
                      <button className="admin-reject" onClick={() => review(app.id, "rejected")}>
                        <X size={15} /> Reject
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Admin;