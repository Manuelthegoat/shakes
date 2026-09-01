import { ArrowLeftRight, LockKeyhole, WalletCards } from "lucide-react";
import "./Features.css";

const features = [
  {
    icon: WalletCards,
    title: "No monthly fees",
    description: "Keep more of your money with zero maintenance fees on checking and savings.",
  },
  {
    icon: ArrowLeftRight,
    title: "Instant transfers",
    description: "Send and receive money in seconds, not business days.",
  },
  {
    icon: LockKeyhole,
    title: "Bank-level security",
    description: "Your accounts are protected with encryption and real-time fraud monitoring.",
  },
];

function Features() {
  return (
    <section className="features">
      <div className="features__inner">
        {features.map((feature) => (
          <div className="features__card" key={feature.title}>
            <div className="features__icon"><feature.icon size={20} /></div>
            <h3 className="features__title">{feature.title}</h3>
            <p className="features__description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;
