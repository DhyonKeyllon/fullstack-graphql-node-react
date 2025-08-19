import { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      success
      message
      user {
        name
        email
        company
      }
    }
  }
`;

interface User {
  name: string;
  email: string;
  company?: string;
}

interface LoginPageProps {
  onLogin: (user: User) => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loginMutation, { loading }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Por favor, preencha todos os campos");
      return;
    }

    try {
      const { data } = await loginMutation({
        variables: { email, password },
      });

      if (data?.login?.success) {
        onLogin(data.login.user);
      } else {
        setError(data?.login?.message || "Erro ao fazer login");
      }
    } catch (error) {
      console.error("Erro no login:", error);
      setError(
        "Erro de conexão com o servidor. Verifique se o backend está executando.",
      );
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
          />
        </div>

        <button type="submit" className="login-button" disabled={loading}>
          {loading ? "Entrando..." : "Entrar"}
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
