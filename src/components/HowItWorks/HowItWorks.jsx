import { UserPlus, Landmark, Send } from "lucide-react";
import "./HowItWorks.css";

const steps = [
  {
    icon: UserPlus,
    title: "Open your account",
    description: "Sign up in minutes with just your email and a few personal details. No branch visit required.",
  },
  {
    icon: Landmark,
    title: "Get your account number",
    description: "Every account comes with a unique number, ready to send and receive money instantly.",
  },
  {
    icon: Send,
    title: "Bank freely",
    description: "Transfer funds, apply for cards, and track every transaction in real time from one dashboard.",
  },
];

function HowItWorks() {
  return (
    <section className="how-it-works">
      <div className="how-it-works__inner">
        <p className="how-it-works__eyebrow">How it works</p>
        <h2 className="how-it-works__title">Banking, simplified</h2>

        <div className="how-it-works__steps">
          {steps.map((step, i) => (
            <div className="how-it-works__step" key={step.title}>
              <div className="how-it-works__step-number">{i + 1}</div>
              <div className="how-it-works__step-icon">
                <step.icon size={20} strokeWidth={1.75} />
              </div>
              <h3 className="how-it-works__step-title">{step.title}</h3>
              <p className="how-it-works__step-description">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;