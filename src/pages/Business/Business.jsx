import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, ArrowUpRight, Check, BarChart3 } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/shared/Button/Button";
import "../Personal/Personal.css";

const products = [
  {
    icon: Building2,
    title: "Business checking",
    description: "Separate your business and personal finances with no monthly maintenance fees.",
  },
  {
    icon: Users,
    title: "Team accounts",
    description: "Add teammates with custom permissions so everyone has exactly the access they need.",
  },
  {
    icon: TrendingUp,
    title: "Growth tools",
    description: "Track cash flow, run reports, and integrate with the accounting tools you already use.",
  },
];

function Business() {
  return (
    <>
      <Header />
      <main className="business-page">
      <section className="static-hero business-hero">
        <div className="static-hero__inner business-hero__inner">
          <div className="business-hero__copy">
            <span className="marketing-eyebrow"><Building2 size={14} /> The smarter business account</span>
          <h1 className="static-hero__title">Make room<br /><em>to grow.</em></h1>
          <p className="static-hero__subtitle">
            Banking tools that scale with you — from your first invoice to your hundredth employee.
          </p>
          <div className="marketing-actions"><Button as={Link} to="/signup" variant="primary">Open a business account <ArrowUpRight size={16} /></Button><Link to="/support" className="marketing-text-link">Talk to our team <ArrowUpRight size={15} /></Link></div>
          </div>
          <div className="business-hero__visual" aria-label="Business banking dashboard preview">
            <div className="business-dashboard-card"><div className="business-dashboard-card__top"><span>Monthly overview</span><span className="business-status"><i /> On track</span></div><strong>$84,620</strong><small>Revenue this month <b>+18.6%</b></small><div className="business-bars"><i /><i /><i /><i /><i /><i /><i /></div><div className="business-dashboard-card__footer"><span><BarChart3 size={14} /> Cash flow</span><span>Updated just now</span></div></div>
            <div className="business-team-card"><span className="team-avatars"><i>JD</i><i>AM</i><i>+4</i></span><span><b>6 teammates</b><small>Collaborating securely</small></span><ArrowUpRight size={16} /></div>
          </div>
        </div>
      </section>

      <section className="product-grid business-products">
        <div className="product-grid__inner">
          <div className="marketing-section-heading"><span className="marketing-eyebrow marketing-eyebrow--light">Everything in sync</span><h2>Built for the way<br />you do business.</h2><p>Spend less time moving money around and more time building what comes next.</p></div>
          <div className="business-products__cards">
          {products.map((p) => (
            <div className="product-card" key={p.title}>
              <div className="product-card__icon">
                <p.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__description">{p.description}</p>
              <span className="product-card__link">See what’s included <ArrowUpRight size={15} /></span>
            </div>
          ))}
          </div>
        </div>
      </section>
      <section className="business-proof"><div><span className="marketing-eyebrow marketing-eyebrow--light">Less admin. More ambition.</span><h2>Give your business<br />a stronger foundation.</h2></div><ul><li><Check size={17} /> Flexible permissions for every role</li><li><Check size={17} /> Clear insights into every dollar</li><li><Check size={17} /> Support when your business needs it</li></ul></section>
      </main>
      <Footer />
    </>
  );
}

export default Business;
