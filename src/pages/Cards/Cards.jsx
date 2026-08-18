import { Lock, Settings2 } from "lucide-react";
import "./Cards.css";

const cards = [
  {
    id: 1,
    name: "Freedom Debit",
    type: "Debit",
    number: "4821",
    expiry: "08/29",
    frozen: false,
    gradient: "linear-gradient(135deg, var(--navy-900) 0%, var(--brand-600) 130%)",
  },
  {
    id: 2,
    name: "Freedom Credit",
    type: "Credit",
    number: "2277",
    expiry: "03/28",
    frozen: false,
    gradient: "linear-gradient(135deg, #1a1f2b 0%, #3c4552 130%)",
  },
];

function Cards() {
  return (
    <div className="page">
      <div className="page__header">
        <div>
          <p className="page__eyebrow">Your cards</p>
          <h1 className="page__title">Cards</h1>
        </div>
      </div>

      <div className="cards-grid">
        {cards.map((card) => (
          <div className="bank-card" style={{ background: card.gradient }} key={card.id}>
            <div className="bank-card__top">
              <span className="bank-card__type">{card.type}</span>
              <Lock size={16} />
            </div>
            <span className="bank-card__number">•••• •••• •••• {card.number}</span>
            <div className="bank-card__bottom">
              <div>
                <span className="bank-card__label">Card holder</span>
                <span className="bank-card__value">{card.name}</span>
              </div>
              <div>
                <span className="bank-card__label">Expires</span>
                <span className="bank-card__value">{card.expiry}</span>
              </div>
            </div>
          </div>
        ))}

        <div className="card-actions">
          <button className="card-actions__btn">
            <Settings2 size={16} />
            Manage card settings
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cards;