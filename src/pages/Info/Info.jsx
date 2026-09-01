import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, ShieldCheck } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Button from "../../components/shared/Button/Button";
import "./Info.css";

const pages = {
  checking: {
    eyebrow: "Everyday banking",
    title: "Checking that keeps up with you",
    intro: "A simple, flexible account for spending, saving, and everything in between.",
    points: ["No monthly maintenance fees", "Instant transfers between Horizon accounts", "Real-time activity alerts"],
    cta: "Open a checking account",
  },
  savings: {
    eyebrow: "Build your future",
    title: "Make more of every dollar",
    intro: "Put your money to work with a savings account designed for steady progress.",
    points: ["Competitive interest on your balance", "Automatic savings tools", "No minimum balance to get started"],
    cta: "Start saving",
  },
  credit: {
    eyebrow: "Spend with confidence",
    title: "Credit that gives you more control",
    intro: "A clear, modern credit experience with tools that help you stay in control.",
    points: ["No annual fee", "Real-time spending controls", "Simple, transparent account details"],
    cta: "Explore credit cards",
  },
  transfers: {
    eyebrow: "Move money",
    title: "Transfers made simple",
    intro: "Send money securely between Horizon accounts with a few taps.",
    points: ["Fast account-to-account transfers", "Clear confirmation at every step", "Built-in recipient verification"],
    cta: "Open an account",
  },
  rates: {
    eyebrow: "Clear by design",
    title: "Rates without the fine print",
    intro: "We keep our pricing straightforward so you can make informed decisions.",
    points: ["No monthly checking fee", "No minimum opening deposit", "See applicable rates in your account dashboard"],
    cta: "Open an account",
  },
  about: { eyebrow: "About Horizon", title: "Banking should feel human", intro: "Horizon is a  banking experience built around clarity, control, and thoughtful design.", points: ["Simple products", "Helpful tools", "A calmer way to manage money"], cta: "Explore personal banking" },
  careers: { eyebrow: "Join the team", title: "Build the future of better banking", intro: "We’re looking for thoughtful people who care about making financial products easier to use.", points: ["Design with empathy", "Solve meaningful problems", "Grow with a curious team"], cta: "Contact us" },
  press: { eyebrow: "Horizon press", title: "What we’re building", intro: "Find product updates, company news, and brand resources from Horizon.", points: ["Product announcements", "Company updates", "Media enquiries welcome"], cta: "Contact us" },
  blog: { eyebrow: "Horizon journal", title: "Practical ideas for your money", intro: "Helpful perspectives on everyday banking, saving, and building healthy financial habits.", points: ["Money made clearer", "Guides for everyday decisions", "New articles coming soon"], cta: "Get started" },
  security: { eyebrow: "Your security", title: "Protection is built in", intro: "Horizon uses layered controls and clear account activity so you can bank with confidence.", points: ["Secure sign-in", "Real-time account activity", "Easy-to-find support when you need it"], cta: "Visit support" },
  status: { eyebrow: "System status", title: "Horizon services are running", intro: "All services are currently operating normally.", points: ["Dashboard — Operational", "Transfers — Operational", "Card services — Operational"], cta: "Go to support" },
  privacy: { eyebrow: "Legal", title: "Privacy policy", intro: "This Bank respects your information and only uses data needed to provide the experience.", points: ["We explain what we collect", "We limit access to account data", "You can contact support with questions"], cta: "Contact support" },
  terms: { eyebrow: "Legal", title: "Terms of service", intro: "These terms describe the expectations for using the Horizon application.", points: ["Use the service responsibly", "Keep your sign-in details private", "Ask support if something looks wrong"], cta: "Visit support" },
  accessibility: { eyebrow: "Accessibility", title: "Designed for more people", intro: "We’re committed to making Horizon clear, usable, and comfortable across devices and abilities.", points: ["Responsive layouts", "Readable contrast and type", "Keyboard-friendly controls"], cta: "Contact us" },
};

function InfoPage() {
  const { slug } = useParams();
  const page = pages[slug] || pages.about;

  return (
    <div className="info-page">
      <Header />
      <main>
        <section className="info-hero">
          <div className="info-hero__inner">
            <p className="info-hero__eyebrow">{page.eyebrow}</p>
            <h1 className="info-hero__title">{page.title}</h1>
            <p className="info-hero__intro">{page.intro}</p>
            <Button as={Link} to={slug === "security" || slug === "status" || slug === "terms" ? "/support" : "/signup"} variant="primary">{page.cta}</Button>
          </div>
        </section>
        <section className="info-content">
          <div className="info-content__card">
            <div className="info-content__icon"><ShieldCheck size={22} /></div>
            <h2>Designed around clarity</h2>
            <p>Everything you need is easy to find, with helpful context at the moment you need it.</p>
            <div className="info-content__points">
              {page.points.map((point) => <div className="info-content__point" key={point}><CheckCircle2 size={17} />{point}</div>)}
            </div>
            <Link className="info-content__link" to="/support">Have questions? Visit support <ArrowRight size={15} /></Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default InfoPage;
