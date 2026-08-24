import { Link } from "react-router-dom";
import "./Footer.css";

const columns = [
  {
    title: "Banking",
    links: ["Checking", "Savings", "Credit cards", "Transfers"],
  },
  {
    title: "Company",
    links: ["About us", "Careers", "Press", "Blog"],
  },
  {
    title: "Support",
    links: ["Help center", "Contact us", "Security", "Status"],
  },
  {
    title: "Legal",
    links: ["Privacy policy", "Terms of service", "Accessibility"],
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
                {col.links.map((link) => (
                  <a href="#" className="footer__link" key={link}>{link}</a>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} Horizon. All rights reserved.</span>
          <span>Member FDIC-style deposit protection (demo project)</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;