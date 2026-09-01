import { useState, useRef } from "react";
import { X, Lock } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import "./PinModal.css";

function PinModal({ onSuccess, onCancel, title = "Confirm with your PIN", description = "Enter your 4-digit transaction PIN to continue." }) {
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [checking, setChecking] = useState(false);
  const inputRefs = [useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    setError("");

    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    if (value && index === 3) {
      const pin = next.join("");
      if (pin.length === 4) verify(pin);
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (!pasted) return;
    const next = pasted.split("").concat(["", "", "", ""]).slice(0, 4);
    setDigits(next);
    setError("");
    if (pasted.length === 4) verify(pasted);
    else inputRefs[pasted.length].current?.focus();
  };

  const verify = async (pin) => {
    setChecking(true);
    const { data, error: rpcError } = await supabase.rpc("verify_transaction_pin", { p_pin: pin });
    setChecking(false);

    if (rpcError || !data) {
      setError("Incorrect PIN. Try again.");
      setDigits(["", "", "", ""]);
      inputRefs[0].current?.focus();
      return;
    }

    onSuccess(pin);
  };

  return (
    <div className="pin-modal-overlay" onClick={onCancel}>
      <div className="pin-modal" role="dialog" aria-modal="true" aria-labelledby="pin-modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="pin-modal__close" onClick={onCancel} aria-label="Cancel PIN confirmation">
          <X size={18} />
        </button>

        <div className="pin-modal__icon">
          <Lock size={20} />
        </div>

        <h2 className="pin-modal__title" id="pin-modal-title">{title}</h2>
        <p className="pin-modal__subtitle">{description}</p>

        <div className="pin-modal__digits">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="password"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              onPaste={handlePaste}
              className="pin-modal__digit"
              autoFocus={i === 0}
              disabled={checking}
            />
          ))}
        </div>

        {error && <p className="pin-modal__error">{error}</p>}
        {checking && <p className="pin-modal__checking">Verifying...</p>}
      </div>
    </div>
  );
}

export default PinModal;
