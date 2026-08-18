import { Link } from "react-router-dom";
import Button from "../shared/Button/Button";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <div className="header__inner">
        <div className="header__logo">Horizon</div>

        <nav className="header__nav">
          <a href="#" className="header__link">Personal</a>
          <a href="#" className="header__link">Business</a>
          <a href="#" className="header__link">Support</a>
        </nav>

        <div className="header__actions">
          <Button as={Link} to="/login" variant="ghost">Sign in</Button>
          <Button as="a" href="#" variant="primary">Open an account</Button>
        </div>
      </div>
    </header>
  );
}

export default Header;