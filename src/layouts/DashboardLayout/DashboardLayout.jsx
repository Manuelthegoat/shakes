import { useState } from "react";
import { NavLink, Outlet, Link } from "react-router-dom";
import { LayoutGrid, ArrowLeftRight, CreditCard, Send, Settings, Menu, X, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import "./DashboardLayout.css";

const navItems = [
  { to: "/dashboard", label: "Home", icon: LayoutGrid, end: true },
  {
    to: "/dashboard/transactions",
    label: "Transactions",
    icon: ArrowLeftRight,
  },
  { to: "/dashboard/cards", label: "Cards", icon: CreditCard },
  { to: "/dashboard/transfers", label: "Transfers", icon: Send },
  { to: "/dashboard/settings", label: "Settings", icon: Settings },
];

function DashboardLayout() {
  const { user, isAdmin, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="app-shell">
      <div className="mobile-topbar">
        <button
          className="mobile-topbar__toggle"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={22} />
        </button>
        <Link to="/" className="mobile-topbar__logo">
          Horizon
        </Link>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`sidebar ${isOpen ? "sidebar--open" : ""}`}>
        <div className="sidebar__top">
          <Link to="/" className="sidebar__logo">
            Horizon
          </Link>
          <button className="sidebar__close" onClick={closeSidebar}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar__nav">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <Icon size={18} strokeWidth={2} />
              <span>{label}</span>
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink
              to="/dashboard/admin"
              className={({ isActive }) =>
                `sidebar__link ${isActive ? "sidebar__link--active" : ""}`
              }
            >
              <ShieldCheck size={18} strokeWidth={2} />
              <span>Admin</span>
            </NavLink>
          )}
        </nav>

        <div className="sidebar__footer">
          <div className="sidebar__user">
            <div className="sidebar__avatar">{user?.name?.[0] || "?"}</div>
            <span className="sidebar__username">{user?.name || "Guest"}</span>
          </div>
          <button className="sidebar__logout" onClick={logout}>
            Sign out
          </button>
        </div>
      </aside>

      <main className="app-shell__content">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;
