import { useAuth } from "../hooks/useAuth";

const WelcomePage: React.FC = () => {
  const { user, logout, getDisplayName, getUserInitials } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="welcome-container">
      <div className="welcome-card">
        <div className="user-avatar">{getUserInitials()}</div>

        <h1>Bem-vindo, {getDisplayName()}!</h1>
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

        <button className="logout-button" onClick={handleLogout}>
          Fazer Logout
        </button>
      </div>
    </div>
  );
};

export default WelcomePage;
