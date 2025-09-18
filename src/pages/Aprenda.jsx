import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaArrowLeft, 
  FaPlay, 
  FaClock, 
  FaSearch, 
  FaFilter,
  FaBook,
  FaCoins,
  FaGraduationCap,
  FaChartLine,
  FaStar,
  FaEye,
  FaTimes
} from 'react-icons/fa';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('todos');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showVideoModal, setShowVideoModal] = useState(false);

  const categorias = [
    {
      id: 'mercado',
      titulo: "Mercado Financeiro",
      icon: <FaChartLine size={20} />,
      videos: [
        { 
          id: 1, 
          titulo: "O que é Mercado Financeiro?", 
          thumbnail: thumbnail1, 
          duracao: "15:30",
          views: "12.5K",
          rating: 4.8,
          instructor: "Carlos Silva",
          nivel: "Iniciante",
          youtubeId: "d3Z2eBq7t7M" // ID do vídeo do YouTube
        },
        { 
          id: 2, 
          titulo: "Tipos de Investimentos", 
          thumbnail: thumbnail2, 
          duracao: "12:45",
          views: "8.7K",
          rating: 4.6,
          instructor: "Ana Costa",
          nivel: "Intermediário",
          youtubeId: "kHJC3ioC-4o"
        },
        { 
          id: 3, 
          titulo: "Investir vs. Day Trading", 
          thumbnail: thumbnail3, 
          duracao: "18:20",
          views: "15.2K",
          rating: 4.9,
          instructor: "Roberto Martins",
          nivel: "Avançado",
          youtubeId: "x8rlk6UDP7E"
        }
      ]
    },
    {
      id: 'cripto',
      titulo: "Criptomoedas",
      icon: <FaCoins size={20} />,
      videos: [
        { 
          id: 4, 
          titulo: "O QUE É BITCOIN?", 
          thumbnail: thumbnail4, 
          duracao: "22:10",
          views: "25.3K",
          rating: 4.7,
          instructor: "Maria Santos",
          nivel: "Iniciante",
          youtubeId: "Gc2en3nHxA4"
        },
        { 
          id: 5, 
          titulo: "Desafios e Riscos", 
          thumbnail: thumbnail5, 
          duracao: "14:35",
          views: "10.8K",
          rating: 4.5,
          instructor: "João Pereira",
          nivel: "Intermediário",
          youtubeId: "mC4LpRcU2oE"
        },
        { 
          id: 6, 
          titulo: "Blockchain Descentralizado", 
          thumbnail: thumbnail6, 
          duracao: "19:50",
          views: "18.9K",
          rating: 4.8,
          instructor: "Pedro Almeida",
          nivel: "Avançado",
          youtubeId: "aQWflNQuPqo"
        }
      ]
    },
    {
      id: 'fundamentos',
      titulo: "Fundamentos",
      icon: <FaBook size={20} />,
      videos: [
        { 
          id: 7, 
          titulo: "Educação Financeira Básica", 
          thumbnail: thumbnail1, 
          duracao: "20:15",
          views: "30.1K",
          rating: 4.9,
          instructor: "Carla Mendes",
          nivel: "Iniciante",
          youtubeId: "EpDfqgQWr2c"
        },
        { 
          id: 8, 
          titulo: "Como Montar uma Carteira", 
          thumbnail: thumbnail2, 
          duracao: "25:40",
          views: "22.4K",
          rating: 4.7,
          instructor: "Ricardo Oliveira",
          nivel: "Intermediário",
          youtubeId: "EpDfqgQWr2c"
        }
      ]
    }
  ];

  const allVideos = categorias.flatMap(categoria => categoria.videos);

  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.titulo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'todos' || 
      categorias.find(cat => cat.videos.includes(video))?.id === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setShowVideoModal(true);
  };

  const closeVideoModal = () => {
    setShowVideoModal(false);
    setSelectedVideo(null);
  };

  return (
    <div className="aprenda-container">
      <header className="aprenda-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Voltar
        </button>
        <div className="header-content">
          <h1>
            <FaGraduationCap className="header-icon" />
            Centro de Aprendizado
          </h1>
          <p>Desvendando os segredos para investir com sabedoria</p>
        </div>
      </header>

      {/* Banner Hero */}
      <div className="hero-banner">
        <div className="hero-content">
          <div className="hero-text">
            <h1>MISTÉRIOS DO MERCADO FINANCEIRO</h1>
            <p>Aprenda com especialistas e transforme sua maneira de investir</p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">50+</span>
                <span className="stat-label">Vídeos</span>
              </div>
              <div className="stat">
                <span className="stat-number">15</span>
                <span className="stat-label">Instrutores</span>
              </div>
              <div className="stat">
                <span className="stat-number">5.000+</span>
                <span className="stat-label">Alunos</span>
              </div>
            </div>
          </div>
          <div className="hero-image">
            <div className="floating-card">
              <FaStar className="card-icon" />
              <span>4.9/5 Avaliação</span>
            </div>
          </div>
        </div>
      </div>

      {/* Filtros e Busca */}
      <section className="filters-section">
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar vídeos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="category-filters">
          <button 
            className={`filter-btn ${selectedCategory === 'todos' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('todos')}
          >
            <FaFilter /> Todos
          </button>
          {categorias.map(categoria => (
            <button
              key={categoria.id}
              className={`filter-btn ${selectedCategory === categoria.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(categoria.id)}
            >
              {categoria.icon} {categoria.titulo}
            </button>
          ))}
        </div>
      </section>

      <main className="aprenda-main">
        {/* Seção de Vídeos em Destaque */}
        <section className="featured-section">
          <h2>Vídeos em Destaque</h2>
          <div className="featured-grid">
            {allVideos.slice(0, 3).map(video => (
              <div key={video.id} className="featured-video-card">
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.titulo} />
                  <div className="video-overlay">
                    <button 
                      className="play-btn"
                      onClick={() => handleVideoClick(video)}
                    >
                      <FaPlay />
                    </button>
                  </div>
                  <div className="video-badges">
                    <span className="badge duracao">
                      <FaClock /> {video.duracao}
                    </span>
                    <span className="badge nivel">{video.nivel}</span>
                  </div>
                </div>
                <div className="video-info">
                  <h3>{video.titulo}</h3>
                  <div className="video-meta">
                    <span className="instructor">{video.instructor}</span>
                    <div className="video-stats">
                      <span className="views">
                        <FaEye /> {video.views}
                      </span>
                      <span className="rating">
                        <FaStar /> {video.rating}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Seções de Vídeos por Categoria */}
        {categorias.map((categoria) => (
          <section key={categoria.id} className="categoria-section">
            <div className="section-header">
              <div className="category-title">
                {categoria.icon}
                <h2>{categoria.titulo}</h2>
              </div>
              <span className="video-count">{categoria.videos.length} vídeos</span>
            </div>
            <div className="videos-grid">
              {categoria.videos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-thumbnail">
                    <img src={video.thumbnail} alt={video.titulo} />
                    <div className="video-overlay">
                      <button 
                        className="play-btn"
                        onClick={() => handleVideoClick(video)}
                      >
                        <FaPlay />
                      </button>
                    </div>
                    <div className="video-badges">
                      <span className="badge duracao">
                        <FaClock /> {video.duracao}
                      </span>
                    </div>
                  </div>
                  <div className="video-info">
                    <h3>{video.titulo}</h3>
                    <div className="video-meta">
                      <span className="instructor">{video.instructor}</span>
                      <div className="video-stats">
                        <span className="views">
                          <FaEye /> {video.views}
                        </span>
                        <span className="rating">
                          <FaStar /> {video.rating}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Newsletter */}
      <section className="newsletter-section">
        <div className="newsletter-content">
          <h2>Fique por dentro das novidades</h2>
          <p>Receba conteúdos exclusivos e dicas de investimento</p>
          <div className="newsletter-form">
            <input 
              type="email" 
              placeholder="Seu melhor email" 
              className="newsletter-input"
            />
            <button className="newsletter-btn">Inscrever-se</button>
          </div>
        </div>
      </section>

      {/* Modal de Vídeo */}
      {showVideoModal && selectedVideo && (
        <div className="video-modal-overlay" onClick={closeVideoModal}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeVideoModal}>
              <FaTimes />
            </button>
            <div className="video-container">
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}`}
                title={selectedVideo.titulo}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-modal-info">
              <h3>{selectedVideo.titulo}</h3>
              <p>Instrutor: {selectedVideo.instructor} | Nível: {selectedVideo.nivel}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Aprenda;