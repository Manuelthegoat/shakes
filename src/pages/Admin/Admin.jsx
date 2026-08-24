import { useEffect, useState } from "react";
import { Check, X, ShieldCheck } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import "./Admin.css";

function Admin() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("pending");

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

        {filtered.map((app) => (
          <div className="admin-row" key={app.id}>
            <div className="admin-row__info">
              <span className="admin-row__name">{app.requested_name}</span>
              <span className="admin-row__meta">
                {app.card_type} • applied {new Date(app.created_at).toLocaleDateString()}
              </span>
            </div>

            <span className={`admin-badge admin-badge--${app.status}`}>{app.status}</span>

            {app.status === "pending" && (
              <div className="admin-row__actions">
                <button className="admin-approve" onClick={() => review(app.id, "approved")}>
                  <Check size={15} /> Approve
                </button>
                <button className="admin-reject" onClick={() => review(app.id, "rejected")}>
                  <X size={15} /> Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;