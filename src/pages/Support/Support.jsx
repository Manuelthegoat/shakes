import { useState } from "react";
import { ChevronDown, Mail, MessageCircle, Phone } from "lucide-react";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "../Personal/Personal.css";
import "./Support.css";

const faqs = [
  {
    q: "How do I open an account?",
    a: "Click 'Open an account' at the top of the page and follow the guided signup — it takes about two minutes.",
  },
  {
    q: "How do I send money to someone?",
    a: "Go to Transfers in your dashboard, enter their 10-digit account number, confirm their name, and choose an amount.",
  },
  {
    q: "How long does a card application take to review?",
    a: "Applications are typically reviewed within 1-2 business days. You'll see the status update live on your Cards page.",
  },
  {
    q: "Is my money insured?",
    a: "This is a project built for learning purposes and does not hold or move real funds.",
  },
];

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button className="faq-item__question" onClick={() => setOpen((o) => !o)}>
        {faq.q}
        <ChevronDown size={18} className={`faq-item__chevron ${open ? "faq-item__chevron--open" : ""}`} />
      </button>
      {open && <p className="faq-item__answer">{faq.a}</p>}
    </div>
  );
}

function Support() {
  return (
    <>
      <Header />
      <section className="static-hero">
        <div className="static-hero__inner">
          <h1 className="static-hero__title">How can we help?</h1>
          <p className="static-hero__subtitle">
            Find answers to common questions, or reach out to our team directly.
          </p>
        </div>
      </section>

      <section className="support-contact" id="contact">
        <div className="support-contact__inner">
          <div className="support-contact__card">
            <MessageCircle size={20} color="var(--brand-600)" />
            <span className="support-contact__title">Live chat</span>
            <span className="support-contact__text">Available 24/7 for account holders</span>
          </div>
          <div className="support-contact__card">
            <Mail size={20} color="var(--brand-600)" />
            <span className="support-contact__title">Email us</span>
            <span className="support-contact__text">support@chase.example</span>
          </div>
          <div className="support-contact__card">
            <Phone size={20} color="var(--brand-600)" />
            <span className="support-contact__title">Call us</span>
            <span className="support-contact__text">1-800-555-0199</span>
          </div>
        </div>
      </section>

      <section className="faq-section">
        <div className="faq-section__inner">
          <h2 className="faq-section__title">Frequently asked questions</h2>
          {faqs.map((faq) => (
            <FaqItem faq={faq} key={faq.q} />
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Support;
