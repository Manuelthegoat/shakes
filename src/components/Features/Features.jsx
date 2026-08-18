import "./Features.css";

const features = [
  {
    title: "No monthly fees",
    description: "Keep more of your money with zero maintenance fees on checking and savings.",
  },
  {
    title: "Instant transfers",
    description: "Send and receive money in seconds, not business days.",
  },
  {
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
            <h3 className="features__title">{feature.title}</h3>
            <p className="features__description">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;