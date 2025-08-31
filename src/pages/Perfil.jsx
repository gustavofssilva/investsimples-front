import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Perfil.css';

// Importe suas imagens (substitua pelos paths corretos)
import conservadorImg from '../assets/conservador.jpg';
import moderadoImg from '../assets/moderado.jpg';
import arrojadoImg from '../assets/arrojado.jpg';

const Perfil = () => {
  const navigate = useNavigate();
  const [perfilSelecionado, setPerfilSelecionado] = useState(null);

  const perfis = [
    {
      id: 'conservador',
      nome: 'Conservador',
      imagem: conservadorImg,
      descricao: 'Prefere segurança e baixo risco'
    },
    {
      id: 'moderado',
      nome: 'Moderado', 
      imagem: moderadoImg,
      descricao: 'Equilíbrio entre risco e retorno'
    },
    {
      id: 'arrojado',
      nome: 'Arrojado',
      imagem: arrojadoImg,
      descricao: 'Busca maiores retornos com maior risco'
    }
  ];

  const handleEscolherPerfil = () => {
    if (!perfilSelecionado) {
      alert('Por favor, selecione um perfil primeiro');
      return;
    }

    // Salvar no localStorage
    const perfilEscolhido = perfis.find(perfil => perfil.id === perfilSelecionado);
    
    // Recuperar usuário atual do localStorage
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if (currentUser) {
      // Atualizar o perfil do usuário
      const updatedUser = {
        ...currentUser,
        perfilInvestidor: perfilEscolhido
      };
      
      // Salvar usuário atualizado
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // Opcional: também salvar separadamente para fácil acesso
      localStorage.setItem('userPerfil', JSON.stringify(perfilEscolhido));
      
      alert(`Perfil ${perfilEscolhido.nome} selecionado com sucesso!`);
      navigate('/'); // ou para onde quiser redirecionar
    } else {
      alert('Usuário não logado. Faça login primeiro.');
      navigate('/login');
    }
  };

  return (
    <div className="perfil-container">
      <header className="perfil-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>
      </header>

      <main className="perfil-main">
        <h1>Escolha seu Perfil de Investidor</h1>
        <p>Selecione o perfil que melhor representa seus objetivos</p>

        <div className="perfis-grid">
          {perfis.map((perfil) => (
            <div
              key={perfil.id}
              className={`perfil-card ${perfilSelecionado === perfil.id ? 'selecionado' : ''}`}
              onClick={() => setPerfilSelecionado(perfil.id)}
            >
              <img 
                src={perfil.imagem} 
                alt={perfil.nome}
                className="perfil-imagem"
              />
              <div className="perfil-info">
                <h3>{perfil.nome}</h3>
                <p>{perfil.descricao}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="button-container">
          <button 
            className="escolher-btn"
            onClick={handleEscolherPerfil}
            disabled={!perfilSelecionado}
          >
            {perfilSelecionado ? `Escolher ${perfis.find(p => p.id === perfilSelecionado).nome}` : 'Escolher Perfil'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default Perfil;