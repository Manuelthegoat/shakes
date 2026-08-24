import "./Testimonials.css";

const testimonials = [
  {
    quote: "Switching my direct deposit over took ten minutes. Everything just works, and support actually responds fast.",
    name: "Maria Chen",
    role: "Small business owner",
  },
  {
    quote: "The instant transfers alone were worth switching for. I split rent with my roommate in seconds now.",
    name: "Jordan Lee",
    role: "Graduate student",
  },
  {
    quote: "No hidden fees, finally. I can actually see where every dollar goes without digging through statements.",
    name: "Priya Patel",
    role: "Freelance designer",
  },
];

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function Testimonials() {
  return (
    <section className="testimonials">
      <div className="testimonials__inner">
        <p className="testimonials__eyebrow">What people are saying</p>
        <h2 className="testimonials__title">Trusted by people like you</h2>

        <div className="testimonials__grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <p className="testimonial-card__quote">"{t.quote}"</p>
              <div className="testimonial-card__author">
                <div className="testimonial-card__avatar">{initials(t.name)}</div>
                <div>
                  <span className="testimonial-card__name">{t.name}</span>
                  <span className="testimonial-card__role">{t.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;