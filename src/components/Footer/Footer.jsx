import { Link } from "react-router-dom";
import "./Footer.css";

const columns = [
  {
    title: "Banking",
    links: [["Checking", "/checking"], ["Savings", "/savings"], ["Credit cards", "/credit"], ["Transfers", "/transfers"]],
  },
  {
    title: "Company",
    links: [["About us", "/about"], ["Careers", "/careers"], ["Press", "/press"], ["Blog", "/blog"]],
  },
  {
    title: "Support",
    links: [["Help center", "/support"], ["Contact us", "/support#contact"], ["Security", "/security"], ["Status", "/status"]],
  },
  {
    title: "Legal",
    links: [["Privacy policy", "/privacy"], ["Terms of service", "/terms"], ["Accessibility", "/accessibility"]],
  },
];

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__top">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">Horizon</Link>
            <p className="footer__tagline">Banking that works as hard as you do.</p>
          </div>

          <div className="footer__columns">
            {columns.map((col) => (
              <div className="footer__column" key={col.title}>
                <span className="footer__column-title">{col.title}</span>
                {col.links.map(([label, to]) => (
                  <Link to={to} className="footer__link" key={label}>{label}</Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Horizon. All rights reserved.</span>
          <span>Member FDIC-style deposit protection</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
