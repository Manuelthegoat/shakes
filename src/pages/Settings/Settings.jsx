import { useState } from "react";
import { User, Lock, Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./Settings.css";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

function ProfileTab() {
  const { user } = useAuth();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave}>
      <label className="settings-label">Full name</label>
      <input className="settings-input" value={name} onChange={(e) => setName(e.target.value)} />

      <label className="settings-label">Email</label>
      <input
        className="settings-input"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
      />

      <label className="settings-label">Phone number</label>
      <input className="settings-input" type="tel" placeholder="(555) 000-0000" />

      <button type="submit" className="settings-save-btn">
        {saved ? "Saved ✓" : "Save changes"}
      </button>
    </form>
  );
}

function SecurityTab() {
  const [saved, setSaved] = useState(false);
  const [twoFactor, setTwoFactor] = useState(true);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave}>
      <label className="settings-label">Current password</label>
      <input className="settings-input" type="password" placeholder="••••••••" />

      <label className="settings-label">New password</label>
      <input className="settings-input" type="password" placeholder="••••••••" />

      <label className="settings-label">Confirm new password</label>
      <input className="settings-input" type="password" placeholder="••••••••" />

      <div className="settings-divider" />

      <label className="settings-toggle-row">
        <span>
          Two-factor authentication
          <span className="settings-toggle-row__hint">Adds an extra step when signing in</span>
        </span>
        <input type="checkbox" checked={twoFactor} onChange={(e) => setTwoFactor(e.target.checked)} />
      </label>

      <button type="submit" className="settings-save-btn">
        {saved ? "Saved ✓" : "Update security settings"}
      </button>
    </form>
  );
}

function NotificationsTab() {
  const [prefs, setPrefs] = useState({
    email: true,
    push: true,
    sms: false,
    lowBalance: true,
  });
  const [saved, setSaved] = useState(false);

  const toggle = (key) => setPrefs((p) => ({ ...p, [key]: !p[key] }));

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <form onSubmit={handleSave}>
      <label className="settings-toggle-row">
        <span>Email notifications</span>
        <input type="checkbox" checked={prefs.email} onChange={() => toggle("email")} />
      </label>
      <label className="settings-toggle-row">
        <span>Push notifications</span>
        <input type="checkbox" checked={prefs.push} onChange={() => toggle("push")} />
      </label>
      <label className="settings-toggle-row">
        <span>SMS alerts</span>
        <input type="checkbox" checked={prefs.sms} onChange={() => toggle("sms")} />
      </label>
      <label className="settings-toggle-row">
        <span>
          Low balance alerts
          <span className="settings-toggle-row__hint">Notify me when an account drops below $100</span>
        </span>
        <input type="checkbox" checked={prefs.lowBalance} onChange={() => toggle("lowBalance")} />
      </label>

      <button type="submit" className="settings-save-btn">
        {saved ? "Saved ✓" : "Save preferences"}
      </button>
    </form>
  );
}

function Settings() {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Account</p>
          <h1 className="page__title">Settings</h1>
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