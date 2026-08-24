import "./Stats.css";

const stats = [
  { value: "2.4M+", label: "Accounts opened" },
  { value: "$8.2B", label: "Moved through transfers" },
  { value: "99.98%", label: "Uptime" },
  { value: "24/7", label: "Fraud monitoring" },
];

function Stats() {
  return (
    <section className="stats">
      <div className="stats__inner">
        {stats.map((s) => (
          <div className="stats__item" key={s.label}>
            <span className="stats__value">{s.value}</span>
            <span className="stats__label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Stats;