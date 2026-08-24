import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp } from "lucide-react";
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
      <section className="static-hero">
        <div className="static-hero__inner">
          <h1 className="static-hero__title">Built for growing businesses</h1>
          <p className="static-hero__subtitle">
            Banking tools that scale with you — from your first invoice to your hundredth employee.
          </p>
          <Button as={Link} to="/signup" variant="primary">Open a business account</Button>
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

export default Business;