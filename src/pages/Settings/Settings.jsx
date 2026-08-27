import { useEffect, useState } from "react";
import { User, Lock, Bell, Mail, Phone as PhoneIcon } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { supabase } from "../../lib/supabaseClient";
import "./Settings.css";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function initials(name) {
  if (!name) return "?";
  return name.split(" ").filter(Boolean).map((n) => n[0]).join("").slice(0, 2).toUpperCase();
}

function ProfileTab() {
  const { user } = useAuth();
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name, phone")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setFullName(data?.full_name || "");
        setPhone(data?.phone || "");
        setLoading(false);
      });
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ full_name: fullName, phone })
      .eq("id", user.id);
    setSaving(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="settings-loading">Loading...</p>;

  return (
    <form onSubmit={handleSave}>
      <h2 className="settings-section-title">Personal information</h2>
      {error && <p className="settings-error">{error}</p>}

      <div className="settings-field">
        <label className="settings-label">Full name</label>
        <input className="settings-input" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      </div>

      <div className="settings-field">
        <label className="settings-label">Email</label>
        <div className="settings-input-icon">
          <Mail size={15} />
          <input className="settings-input settings-input--plain" value={user?.email || ""} disabled />
        </div>
        <span className="settings-hint">Contact support to change your email.</span>
      </div>

      <div className="settings-field">
        <label className="settings-label">Phone number</label>
        <div className="settings-input-icon">
          <PhoneIcon size={15} />
          <input
            className="settings-input settings-input--plain"
            type="tel"
            placeholder="(555) 000-0000"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="settings-save-btn" disabled={saving}>
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save changes"}
      </button>
    </form>
  );
}

function SecurityTab() {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("two_factor_enabled")
      .eq("id", user.id)
      .single()
      .then(({ data }) => {
        setTwoFactor(data?.two_factor_enabled || false);
        setLoading(false);
      });
  }, [user]);

  const handleSave = async (e) => {
    e.preventDefault();
    setError("");

    if (newPassword && newPassword !== confirmPassword) {
      setError("New passwords don't match.");
      return;
    }
    if (newPassword && newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    setSaving(true);

    if (newPassword) {
      const { error: reAuthError } = await supabase.auth.signInWithPassword({
        email: user.email,
        password: currentPassword,
      });
      if (reAuthError) {
        setSaving(false);
        setError("Current password is incorrect.");
        return;
      }

      const { error: pwError } = await supabase.auth.updateUser({ password: newPassword });
      if (pwError) {
        setSaving(false);
        setError(pwError.message);
        return;
      }
    }

    const { error: prefError } = await supabase
      .from("profiles")
      .update({ two_factor_enabled: twoFactor })
      .eq("id", user.id);

    setSaving(false);

    if (prefError) {
      setError(prefError.message);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="settings-loading">Loading...</p>;

  return (
    <form onSubmit={handleSave}>
      <h2 className="settings-section-title">Password</h2>
      {error && <p className="settings-error">{error}</p>}

      <div className="settings-field">
        <label className="settings-label">Current password</label>
        <input
          className="settings-input"
          type="password"
          placeholder="Required to change password"
          value={currentPassword}
          onChange={(e) => setCurrentPassword(e.target.value)}
        />
      </div>

      <div className="settings-field-row">
        <div className="settings-field">
          <label className="settings-label">New password</label>
          <input
            className="settings-input"
            type="password"
            placeholder="Leave blank to keep current"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div className="settings-field">
          <label className="settings-label">Confirm password</label>
          <input
            className="settings-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </div>

      <div className="settings-divider" />

      <h2 className="settings-section-title">Two-factor authentication</h2>
      <label className="settings-switch-row">
        <span className="settings-switch-row__text">
          <span className="settings-switch-row__label">Require a second step at sign in</span>
          <span className="settings-switch-row__hint">Adds an extra layer of protection to your account</span>
        </span>
        <span className="settings-switch">
          <input type="checkbox" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
          <span className="settings-switch__track" />
        </span>
      </label>

      <button type="submit" className="settings-save-btn" disabled={saving}>
        {saving ? "Updating..." : saved ? "Saved ✓" : "Update security settings"}
      </button>
    </form>
  );
}

function NotificationsTab() {
  const { user } = useAuth();
  const [prefs, setPrefs] = useState({ email: true, push: true, sms: false, low_balance: true });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("notification_preferences")
      .select("*")
      .eq("user_id", user.id)
      .single()
      .then(({ data }) => {
        if (data) setPrefs(data);
        setLoading(false);
      });
  }, [user]);

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const { error: upsertError } = await supabase
      .from("notification_preferences")
      .upsert({ user_id: user.id, ...prefs });

    setSaving(false);

    if (upsertError) {
      setError(upsertError.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  if (loading) return <p className="settings-loading">Loading...</p>;

  const rows = [
    { key: "email", label: "Email notifications", hint: "Receipts, statements, and account updates" },
    { key: "push", label: "Push notifications", hint: "Real-time alerts on your device" },
    { key: "sms", label: "SMS alerts", hint: "Text messages for critical account activity" },
    { key: "low_balance", label: "Low balance alerts", hint: "Notify me when an account drops below $100" },
  ];

  return (
    <form onSubmit={handleSave}>
      <h2 className="settings-section-title">Notification preferences</h2>
      {error && <p className="settings-error">{error}</p>}

      {rows.map((row) => (
        <label className="settings-switch-row" key={row.key}>
          <span className="settings-switch-row__text">
            <span className="settings-switch-row__label">{row.label}</span>
            <span className="settings-switch-row__hint">{row.hint}</span>
          </span>
          <span className="settings-switch">
            <input type="checkbox" checked={prefs[row.key]} onChange={() => toggle(row.key)} />
            <span className="settings-switch__track" />
          </span>
        </label>
      ))}

      <button type="submit" className="settings-save-btn" disabled={saving}>
        {saving ? "Saving..." : saved ? "Saved ✓" : "Save preferences"}
      </button>
    </form>
  );
}

function Settings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");
  const [headerName, setHeaderName] = useState("");

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single()
      .then(({ data }) => setHeaderName(data?.full_name || ""));
  }, [user]);

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Account</p>
          <h1 className="page__title">Settings</h1>
        </div>
      </div>

      <div className="settings-profile-header">
        <div className="settings-profile-header__avatar">{initials(headerName)}</div>
        <div>
          <span className="settings-profile-header__name">{headerName || "Your account"}</span>
          <span className="settings-profile-header__email">{user?.email}</span>
        </div>
      </div>

      <div className="settings-layout">
        <div className="settings-tabs">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={`settings-tab ${activeTab === id ? "settings-tab--active" : ""}`}
              onClick={() => setActiveTab(id)}
              type="button"
            >
              <Icon size={16} strokeWidth={2} />
              {label}
            </button>
          ))}
        </div>

        <div className="settings-card">
          {activeTab === "profile" && <ProfileTab />}
          {activeTab === "security" && <SecurityTab />}
          {activeTab === "notifications" && <NotificationsTab />}
        </div>
      </div>
    </div>
  );
}

export default Settings;