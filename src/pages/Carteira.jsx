import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPlus, 
  FaTrash, 
  FaChartLine, 
  FaWallet, 
  FaUserTie,
  FaCheckCircle,
  FaExclamationTriangle,
  FaLightbulb
} from 'react-icons/fa';
import '../styles/Carteira.css';

const Carteira = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [investimentos, setInvestimentos] = useState([]);
  const [novoInvestimento, setNovoInvestimento] = useState({
    tipo: '',
    valor: '',
    instituicao: ''
  });

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const savedInvestimentos = JSON.parse(localStorage.getItem('investimentos')) || [];
    
    if (currentUser) {
      setUser(currentUser);
      setInvestimentos(savedInvestimentos);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleAddInvestimento = () => {
    if (!novoInvestimento.tipo || !novoInvestimento.valor || !novoInvestimento.instituicao) {
      alert('Preencha todos os campos!');
      return;
    }

    const novoItem = {
      id: Date.now(),
      ...novoInvestimento,
      valor: parseFloat(novoInvestimento.valor),
      data: new Date().toLocaleDateString('pt-BR'),
      timestamp: new Date().getTime()
    };

    const updatedInvestimentos = [...investimentos, novoItem];
    setInvestimentos(updatedInvestimentos);
    localStorage.setItem('investimentos', JSON.stringify(updatedInvestimentos));
    
    setNovoInvestimento({ tipo: '', valor: '', instituicao: '' });
  };

  const handleRemoveInvestimento = (id) => {
    if (window.confirm('Tem certeza que deseja remover este investimento?')) {
      const updatedInvestimentos = investimentos.filter(item => item.id !== id);
      setInvestimentos(updatedInvestimentos);
      localStorage.setItem('investimentos', JSON.stringify(updatedInvestimentos));
    }
  };

  const calcularTotalInvestido = () => {
    return investimentos.reduce((total, item) => total + item.valor, 0);
  };

  const verificarCompatibilidade = () => {
    if (!user?.perfilInvestidor) {
      return { 
        message: 'Perfil não definido', 
        icon: FaExclamationTriangle, 
        type: 'warning' 
      };
    }

    const total = calcularTotalInvestido();
    const perfil = user.perfilInvestidor.id;

    if (perfil === 'conservador' && total > 50000) {
      return { 
        message: 'Atenção: Valor alto para perfil conservador', 
        icon: FaExclamationTriangle, 
        type: 'warning' 
      };
    } else if (perfil === 'arrojado' && total < 10000) {
      return { 
        message: 'Dica: Considere aumentar os investimentos', 
        icon: FaLightbulb, 
        type: 'info' 
      };
    }

    return { 
      message: 'Compatível com seu perfil', 
      icon: FaCheckCircle, 
      type: 'success' 
    };
  };

  const getPerfilColor = () => {
    if (!user?.perfilInvestidor) return '#666';
    switch(user.perfilInvestidor.id) {
      case 'conservador': return '#4CAF50';
      case 'moderado': return '#FFC107';
      case 'arrojado': return '#F44336';
      default: return '#666';
    }
  };

  const getPerfilIcon = () => {
    if (!user?.perfilInvestidor) return FaUserTie;
    switch(user.perfilInvestidor.id) {
      case 'conservador': return FaCheckCircle;
      case 'moderado': return FaChartLine;
      case 'arrojado': return FaLightbulb;
      default: return FaUserTie;
    }
  };

  if (!user) {
    return <div className="loading">Carregando...</div>;
  }

  const compatibilidade = verificarCompatibilidade();
  const PerfilIcon = getPerfilIcon();
  const CompatibilidadeIcon = compatibilidade.icon;

  return (
    <div className="carteira-container">
      <header className="carteira-header">
        <button className="back-btn" onClick={() => navigate(-2)}>
          <FaArrowLeft /> Voltar
        </button>
        <h1>
          <FaWallet className="header-icon" />
          Minha Carteira de Investimentos
        </h1>
      </header>

      {/* Seção do Perfil e Resumo */}
      <section className="dashboard-section">
        <div className="perfil-card" style={{ borderLeft: `4px solid ${getPerfilColor()}` }}>
          <div className="card-header">
            <div className="perfil-icon">
              <PerfilIcon size={24} color={getPerfilColor()} />
            </div>
            <h2>Seu Perfil de Investidor</h2>
          </div>
          {user.perfilInvestidor ? (
            <div className="perfil-content">
              <h3 className="perfil-nome" style={{ color: getPerfilColor() }}>
                {user.perfilInvestidor.nome}
              </h3>
              <p className="perfil-descricao">{user.perfilInvestidor.descricao}</p>
              <div className={`compatibilidade ${compatibilidade.type}`}>
                <CompatibilidadeIcon size={16} />
                <span>{compatibilidade.message}</span>
              </div>
            </div>
          ) : (
            <div className="no-perfil">
              <p>Você ainda não definiu seu perfil</p>
              <button 
                className="btn-definir-perfil"
                onClick={() => navigate('/perfil')}
              >
                <FaUserTie /> Definir Perfil
              </button>
            </div>
          )}
        </div>

        <div className="resumo-card">
          <div className="card-header">
            <FaChartLine size={24} className="resumo-icon" />
            <h2>Resumo da Carteira</h2>
          </div>
          <div className="resumo-content">
            <div className="resumo-item">
              <span className="resumo-label">Total Investido</span>
              <span className="resumo-valor">
                R$ {calcularTotalInvestido().toLocaleString('pt-BR', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2
                })}
              </span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Nº de Investimentos</span>
              <span className="resumo-count">{investimentos.length}</span>
            </div>
            <div className="resumo-item">
              <span className="resumo-label">Média por Investimento</span>
              <span className="resumo-media">
                R$ {investimentos.length > 0 ? 
                  (calcularTotalInvestido() / investimentos.length).toLocaleString('pt-BR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2
                  }) : '0,00'
                }
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Formulário para adicionar investimentos */}
      <section className="add-investimento-section">
        <div className="section-header">
          <h2>
            <FaPlus className="section-icon" />
            Adicionar Novo Investimento
          </h2>
        </div>
        <div className="add-investimento-form">
          <div className="form-group">
            <input
              type="text"
              placeholder="Tipo (Ex: Ações, FII, Tesouro Direto)"
              value={novoInvestimento.tipo}
              onChange={(e) => setNovoInvestimento({
                ...novoInvestimento,
                tipo: e.target.value
              })}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              placeholder="Valor (R$)"
              value={novoInvestimento.valor}
              onChange={(e) => setNovoInvestimento({
                ...novoInvestimento,
                valor: e.target.value
              })}
              className="form-input"
              step="0.01"
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Instituição (Ex: XP, NuInvest)"
              value={novoInvestimento.instituicao}
              onChange={(e) => setNovoInvestimento({
                ...novoInvestimento,
                instituicao: e.target.value
              })}
              className="form-input"
            />
          </div>
          <button 
            onClick={handleAddInvestimento}
            className="btn-add"
          >
            <FaPlus /> Adicionar
          </button>
        </div>
      </section>

      {/* Lista de Investimentos */}
      <section className="investimentos-section">
        <div className="section-header">
          <h2>
            <FaWallet className="section-icon" />
            Meus Investimentos
            <span className="badge">{investimentos.length}</span>
          </h2>
        </div>
        
        {investimentos.length === 0 ? (
          <div className="empty-state">
            <FaWallet size={48} className="empty-icon" />
            <h3>Nenhum investimento cadastrado</h3>
            <p>Adicione seu primeiro investimento para começar!</p>
          </div>
        ) : (
          <div className="investimentos-grid">
            {investimentos
              .sort((a, b) => b.timestamp - a.timestamp)
              .map((investimento) => (
                <div key={investimento.id} className="investimento-card">
                  <div className="investimento-header">
                    <h3>{investimento.tipo}</h3>
                    <button
                      onClick={() => handleRemoveInvestimento(investimento.id)}
                      className="btn-remove"
                    >
                      <FaTrash />
                    </button>
                  </div>
                  <div className="investimento-body">
                    <div className="investimento-info">
                      <span className="investimento-valor">
                        R$ {investimento.valor.toLocaleString('pt-BR', {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2
                        })}
                      </span>
                      <span className="investimento-instituicao">
                        {investimento.instituicao}
                      </span>
                    </div>
                    <div className="investimento-meta">
                      <span className="investimento-data">
                        Adicionado em: {investimento.data}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        )}
      </section>
    </div>
  );
};

export default Carteira;