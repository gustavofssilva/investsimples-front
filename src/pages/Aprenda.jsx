import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Aprenda.css';

// Importe suas thumbnails (substitua pelos paths reais)
import thumbnail1 from '../assets/video1.jpg';
import thumbnail2 from '../assets/video2.jpg';
import thumbnail3 from '../assets/video3.jpg';
import thumbnail4 from '../assets/video4.jpg';
import thumbnail5 from '../assets/video5.jpg';
import thumbnail6 from '../assets/video6.jpg';

const Aprenda = () => {
  const navigate = useNavigate();

  const categorias = [
    {
      titulo: "Mercado Financeiro",
      videos: [
        { id: 1, titulo: "O que é Mercado Financeiro?", thumbnail: thumbnail1, duracao: "15:30" },
        { id: 2, titulo: "Tipos de Investimentos", thumbnail: thumbnail2, duracao: "12:45" },
        { id: 3, titulo: "Investir vs. Day Trading", thumbnail: thumbnail3, duracao: "18:20" }
      ]
    },
    {
      titulo: "Criptomoedas",
      videos: [
        { id: 4, titulo: "O QUE É BITCOIN?", thumbnail: thumbnail4, duracao: "22:10" },
        { id: 5, titulo: "Desafios e Riscos", thumbnail: thumbnail5, duracao: "14:35" },
        { id: 6, titulo: "Blockchain Descentralizado", thumbnail: thumbnail6, duracao: "19:50" }
      ]
    }
  ];

  return (
    <div className="aprenda-container">
      <header className="aprenda-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          ← Voltar
        </button>
      </header>

      {/* Banner */}
      <div className="banner">
        <div className="banner-content">
          <h1>MISTÉRIOS DO MERCADO FINANCEIRO</h1>
          <p>Desvendando os segredos para investir com sabedoria</p>
        </div>
      </div>

      <main className="aprenda-main">
        {/* Seções de Vídeos */}
        {categorias.map((categoria, index) => (
          <section key={index} className="categoria-section">
            <h2>{categoria.titulo}</h2>
            <div className="videos-grid">
              {categoria.videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.titulo} />
                    <div className="video-duracao">{video.duracao}</div>
                    <div className="play-overlay">▶</div>
                  </div>
                  <div className="video-info">
                    <h3>{video.titulo}</h3>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
};

export default Aprenda;