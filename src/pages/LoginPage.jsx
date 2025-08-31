import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isLogin) {
      // Login
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(u => u.email === formData.email && u.senha === formData.senha);
      
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        navigate('/');
      } else {
        setError('Email ou senha incorretos');
      }
    } else {
      // Cadastro
      if (formData.senha !== formData.confirmarSenha) {
        setError('As senhas não coincidem');
        return;
      }

      if (formData.senha.length < 6) {
        setError('A senha deve ter pelo menos 6 caracteres');
        return;
      }

      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      if (users.some(u => u.email === formData.email)) {
        setError('Este email já está cadastrado');
        return;
      }

      const newUser = {
        id: Date.now(),
        nome: formData.nome,
        email: formData.email,
        senha: formData.senha,
        dataCadastro: new Date().toISOString()
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      navigate('/');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isLogin ? 'Login' : 'Cadastre-se'}</h2>
        
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
              <label>Nome Completo</label>
              <input
                type="text"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                required
                placeholder="Seu nome completo"
              />
            </div>
          )}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="seu@email.com"
            />
          </div>

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              required
              placeholder="Sua senha"
            />
          </div>

          {!isLogin && (
            <div className="input-group">
              <label>Confirmar Senha</label>
              <input
                type="password"
                name="confirmarSenha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                placeholder="Confirme sua senha"
              />
            </div>
          )}

          <button type="submit" className="login-btn">
            {isLogin ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>

        <p className="toggle-text">
          {isLogin ? 'Não tem uma conta? ' : 'Já tem uma conta? '}
          <span 
            className="toggle-link"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? 'Cadastre-se' : 'Fazer Login'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;