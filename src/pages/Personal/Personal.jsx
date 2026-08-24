import { Link } from "react-router-dom";
import { Wallet, PiggyBank, CreditCard } from "lucide-react";
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
      <section className="static-hero">
        <div className="static-hero__inner">
          <h1 className="static-hero__title">Personal banking, done right</h1>
          <p className="static-hero__subtitle">
            Checking, savings, and credit — everything you need to manage your money in one place.
          </p>
          <Button as={Link} to="/signup" variant="primary">Open an account</Button>
        </div>
      </section>

      <section className="product-grid">
        <div className="product-grid__inner">
          {products.map((p) => (
            <div className="product-card" key={p.title}>
              <div className="product-card__icon">
                <p.icon size={22} strokeWidth={1.75} />
              </div>
              <h3 className="product-card__title">{p.title}</h3>
              <p className="product-card__description">{p.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Personal;