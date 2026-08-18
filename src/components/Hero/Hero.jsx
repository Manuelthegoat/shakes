import Button from "../shared/Button/Button";
import "./Hero.css";

function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__content">
          <h1 className="hero__title">
            Banking that works as hard as you do
          </h1>
          <p className="hero__subtitle">
            Checking, savings, and credit cards with no hidden fees —
            manage it all from one place.
          </p>
          <div className="hero__actions">
            <Button as="a" href="#" variant="primary">Open an account</Button>
            <Button as="a" href="#" variant="outline">See our rates</Button>
          </div>
        </div>

        <div className="hero__visual">
          <div className="hero__card">
            <span className="hero__card-label">Available balance</span>
            <span className="hero__card-amount">$12,480.32</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;