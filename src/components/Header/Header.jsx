import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../shared/Button/Button";
import "./Header.css";

function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="header">
      <div className="header__inner">
        <Link to="/" className="header__logo">Horizon</Link>

        <nav className="header__nav">
          <Link to="/personal" className="header__link">Personal</Link>
          <Link to="/business" className="header__link">Business</Link>
          <Link to="/support" className="header__link">Support</Link>
        </nav>

        <div className="header__actions">
          {loading ? null : user ? (
            <Button as={Link} to="/dashboard" variant="primary">Dashboard</Button>
          ) : (
            <>
              <Button as={Link} to="/login" variant="ghost">Sign in</Button>
              <Button as={Link} to="/signup" variant="primary">Open an account</Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;