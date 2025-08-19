interface User {
  name: string;
  email: string;
  company?: string;
}

interface WelcomePageProps {
  user: User;
  onLogout: () => void;
}

const WelcomePage: React.FC<WelcomePageProps> = ({ user, onLogout }) => {
  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <h1>Bem-vindo!</h1>
        <p>Login realizado com sucesso!</p>

        <div className="user-info">
          <h3>Informações do Usuário</h3>

          <div className="info-item">
            <span className="info-label">Nome:</span>
            <span className="info-value">{user.name}</span>
          </div>

          <div className="info-item">
            <span className="info-label">Email:</span>
            <span className="info-value">{user.email}</span>
          </div>

          {user.company && (
            <div className="info-item">
              <span className="info-label">Empresa:</span>
              <span className="info-value">{user.company}</span>
            </div>
          )}
        </div>

        <button className="logout-button" onClick={onLogout}>
          Fazer Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
