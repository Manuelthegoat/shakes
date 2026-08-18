import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import Button from "../../components/shared/Button/Button";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email);
    navigate("/dashboard");
  };

  return (
    <div className="login">
      <form className="login__card" onSubmit={handleSubmit}>
        <h1 className="login__title">Sign in</h1>
        <p className="login__subtitle">Access your accounts securely.</p>

        <label className="login__label" htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          className="login__input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="login__label" htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          className="login__input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" variant="primary">Sign in</Button>
      </form>
    </div>
  );
}

export default Login;