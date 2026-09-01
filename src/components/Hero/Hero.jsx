import { Link } from "react-router-dom";
import { ArrowUpRight, Check, CreditCard, Sparkles, TrendingUp } from "lucide-react";
import Button from "../shared/Button/Button";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <div className="hero__eyebrow"><Sparkles size={14} /> The smarter way to bank</div>
          <h1 className="hero__title">
            Make your money feel <em>more possible.</em>
          </h1>
          <p className="hero__subtitle">
            Checking, savings, and credit cards with no hidden fees — all in one beautifully simple place.
          </p>
          <div className="hero__actions">
            <Button as={Link} to="/signup" variant="primary">Open an account</Button>
            <Button as={Link} to="/rates" variant="outline">See our rates</Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card">
            <div className="hero__card-top"><span className="hero__card-label">Total balance</span><span className="hero__card-status"><Check size={12} /> Healthy</span></div>
            <span className="hero__card-amount">$12,480.32</span>
            <div className="hero__card-account"><span>Everyday account</span><span>•••• 2841</span></div>
            <div className="hero__card-chart"><span /><span /><span /><span /><span /><span /><span /></div>
          </div>
          <div className="hero__float hero__float--growth"><TrendingUp size={16} /><div><strong>+12.8%</strong><small>This month</small></div></div>
          <div className="hero__float hero__float--payment"><span className="hero__float-icon"><CreditCard size={15} /></span><div><strong>Payment received</strong><small>+$240.00 · Just now</small></div><ArrowUpRight size={15} /></div>
          <p className="hero__caption">Your finances, finally in focus.</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
