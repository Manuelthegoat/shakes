import { Link } from "react-router-dom";
import { Wallet, PiggyBank, CreditCard, ArrowUpRight, ShieldCheck, Sparkles } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/shared/Button/Button";
import "./Personal.css";

const products = [
  {
    icon: Wallet,
    title: "Checking",
    description: "No monthly fees, no minimum balance. Get paid up to two days early with direct deposit.",
  },
  {
    icon: PiggyBank,
    title: "Savings",
    description: "Earn a competitive rate on every dollar you save, with instant transfers between accounts.",
  },
  {
    icon: CreditCard,
    title: "Credit cards",
    description: "Build credit with no annual fee and real-time spending controls right from your dashboard.",
  },
];

function Personal() {
  return (
    <>
      <Header />
      <main className="personal-page">
      <section className="static-hero personal-hero">
        <div className="static-hero__inner personal-hero__inner">
          <div className="personal-hero__copy">
            <span className="marketing-eyebrow"><Sparkles size={14} /> Banking that feels personal</span>
            <h1 className="static-hero__title">Your money.<br /><em>Your momentum.</em></h1>
            <p className="static-hero__subtitle">
            Checking, savings, and credit — everything you need to manage your money in one place.
            </p>
            <div className="marketing-actions">
              <Button as={Link} to="/signup" variant="primary">Open an account <ArrowUpRight size={16} /></Button>
              <Link to="/support" className="marketing-text-link">Explore how it works <ArrowUpRight size={15} /></Link>
            </div>
            <div className="marketing-trust"><ShieldCheck size={15} /> FDIC-insured banking experience <span>•</span> No monthly fees</div>
          </div>
          <div className="personal-hero__visual" aria-label="Personal banking dashboard preview">
            <div className="preview-glow" />
            <div className="balance-card">
              <div className="balance-card__top"><span>Total balance</span><span className="balance-card__dots">•••</span></div>
              <strong>$12,480.80</strong>
              <span className="balance-card__change">↗ 8.4% this month</span>
              <div className="balance-card__chart"><i /><i /><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="preview-activity"><span className="preview-activity__icon"><Wallet size={15} /></span><span><b>Everyday checking</b><small>Available balance</small></span><strong>$8,240.20</strong></div>
            <div className="preview-activity"><span className="preview-activity__icon preview-activity__icon--green"><PiggyBank size={15} /></span><span><b>Rainy day savings</b><small>Growing steadily</small></span><strong>$4,240.60</strong></div>
          </div>
        </div>
      </section>

      <section className="product-grid personal-products">
        <div className="product-grid__inner">
          <div className="marketing-section-heading"><span className="marketing-eyebrow marketing-eyebrow--light">Built around you</span><h2>One simple home<br />for your financial life.</h2><p>Powerful tools, thoughtfully designed to help you spend confidently and save intentionally.</p></div>
          <div className="personal-products__cards">
          {products.map((p) => (
            <div className="product-card" key={p.title}>
              <div className="product-card__icon">
                <p.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__description">{p.description}</p>
              <Link to="/signup" className="product-card__link">Learn more <ArrowUpRight size={15} /></Link>
            </div>
          ))}
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}

export default Personal;
