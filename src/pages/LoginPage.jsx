import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock de sucesso - depois substitua pela chamada real ao backend
    alert(isLoginView ? 'Login mockado com sucesso!' : 'Cadastro mockado com sucesso!');
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLoginView ? 'Login' : 'Cadastre-se'}</h2>
        
        <form onSubmit={handleSubmit}>
          {!isLoginView && (
            <div className="form-group">
              <label>Nome completo</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          )}

          <div className="form-group">
            <label>E-mail</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Senha</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLoginView ? 'Entrar' : 'Cadastrar'}
          </button>
        </form>

        <div className="toggle-view">
          <p>
            {isLoginView ? 'Não tem uma conta?' : 'Já tem uma conta?'}
            <button 
              onClick={() => setIsLoginView(!isLoginView)}
              className="toggle-btn"
            >
              {isLoginView ? ' Cadastre-se' : ' Faça login'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;