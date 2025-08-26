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
      imagem: conservadorImg
    },
    {
      id: 'moderado',
      nome: 'Moderado',
      imagem: moderadoImg
    },
    {
      id: 'arrojado',
      nome: 'Arrojado', 
      imagem: arrojadoImg
    }
  ];

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
            </div>
          ))}
        </div>

        <div className="button-container">
          <button className="escolher-btn">
            Escolher Perfil
          </button>
        </div>
      </main>
    </div>
  );
};

export default Perfil;