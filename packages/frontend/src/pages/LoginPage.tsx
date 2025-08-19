import { useState } from "react";

import { useAuth } from "../hooks/useAuth";

import "../styles/LoginPage.css";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");

      return;
    }

    try {
      const result = await login(email, password);

      if (!result.success) setError(result.message);
    } catch (error) {
      console.error("Erro no login:", error);

      setError("Erro inesperado. Tente novamente.");
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h1>Login</h1>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
            disabled={isLoading}
          />
        </div>

        <button type="submit" className="login-button" disabled={isLoading}>
          {isLoading ? "Entrando..." : "Entrar"}
        </button>

        {error && <div className="error-message">{error}</div>}

        <div
          style={{
            marginTop: "20px",
            padding: "15px",
            backgroundColor: "#e3f2fd",
            borderRadius: "5px",
            fontSize: "14px",
          }}
        >
          <strong>Dados para teste:</strong>
          <br />
          Email: desafio@bondy.com.br
          <br />
          Senha: 123456
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
