import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBitcoin, FaEthereum, FaCoins, FaFire } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();

  // Estado para saber qual cripto está selecionada para o gráfico
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');

  // Lista de dados das criptos (cards)
  const [cryptoData, setCryptoData] = useState([]);

  // Dados históricos para o gráfico
  const [chartData, setChartData] = useState([]);

  // Usuário logado (mockado pelo localStorage)
  const [user, setUser] = useState(null);

  // Informações fixas de cada cripto (ícone, nome e símbolo)
  const cryptoInfo = {
    bitcoin: { symbol: 'BTC', icon: <FaBitcoin size={24} color="#F7931A" />, name: 'Bitcoin' },
    ethereum: { symbol: 'ETH', icon: <FaEthereum size={24} color="#627EEA" />, name: 'Ethereum' },
    litecoin: { symbol: 'LTC', icon: <FaCoins size={24} color="#345D9D" />, name: 'Litecoin' },
    solana: { symbol: 'SOL', icon: <FaFire size={24} color="#00FFA3" />, name: 'Solana' }
  };

  // 🚨 MOCK: Dados de preços e variação
  // Aqui você pode depois trocar pelo retorno da API de mercados
  const mockCryptoData = [
    { id: 'bitcoin', name: 'Bitcoin', symbol: 'BTC', price: 45000, change: 2.35, icon: cryptoInfo.bitcoin.icon },
    { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', price: 2800, change: -1.12, icon: cryptoInfo.ethereum.icon },
    { id: 'litecoin', name: 'Litecoin', symbol: 'LTC', price: 92.45, change: 0.56, icon: cryptoInfo.litecoin.icon },
    { id: 'solana', name: 'Solana', symbol: 'SOL', price: 110.34, change: 4.78, icon: cryptoInfo.solana.icon },
  ];

  // 🚨 MOCK: Dados de gráfico (gera 30 pontos aleatórios)
  // Aqui você pode trocar depois pelo retorno da API de histórico 
  const generateMockChartData = () => {
    return Array.from({ length: 30 }, (_, i) => ({
      name: `Dia ${i + 1}`, // Nome que aparece no eixo X
      price: Math.round(100 + Math.random() * 1000), // Valor simulado
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString() // Data real formatada
    }));
  };

  // Simulação de "fetch inicial"
  useEffect(() => {
    setCryptoData(mockCryptoData); // 🚨 Troque aqui depois para setar os dados vindos da API
    setChartData(generateMockChartData()); // 🚨 Troque aqui depois para setar os dados históricos reais

    // Recupera usuário logado (mock com localStorage)
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Atualiza o gráfico quando trocar a cripto selecionada
  useEffect(() => {
    if (selectedCrypto) {
      setChartData(generateMockChartData()); // 🚨 Aqui você colocaria o fetch da API de histórico da cripto
    }
  }, [selectedCrypto]);

  // Função de logout
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  return (
    <div className="home-container">
      {/* Header com login/logout */}
      <header className="home-header">
        {user ? (
          <div className="user-info">
            <span className="welcome-text">Olá, {user.nome}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Sair
            </button>
          </div>
        ) : (
          <button 
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            Cadastre-se/Login
          </button>
        )}
      </header>

      <main className="home-main-content">
        <div className="home-content">
          
          {/* Cards das criptomoedas */}
          <div className="crypto-grid">
            {cryptoData.map((crypto) => (
              <div key={crypto.id} className="crypto-card">
                <div className="crypto-header">
                  {crypto.icon}
                  <span className="crypto-symbol">{crypto.symbol}</span>
                </div>
                <div className="crypto-price">
                  ${crypto.price.toLocaleString('en-US', { 
                    minimumFractionDigits: 2, 
                    maximumFractionDigits: crypto.price > 1 ? 2 : 6 
                  })}
                </div>
                <div className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                  {crypto.change >= 0 ? '↑' : '↓'} {Math.abs(crypto.change).toFixed(2)}%
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico histórico */}
          <div className="chart-container">
            <h2>Performance Histórica (30 dias)</h2>
            
            {/* Botões para trocar cripto no gráfico */}
            <div className="chart-selector">
              {cryptoData.map((crypto) => (
                <button
                  key={crypto.id}
                  className={`chart-btn ${selectedCrypto === crypto.id ? 'active' : ''}`}
                  onClick={() => setSelectedCrypto(crypto.id)}
                >
                  {crypto.icon} {crypto.name}
                </button>
              ))}
            </div>

            {/* Gráfico (mockado ou vindo da API futuramente) */}
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value) => [`$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 'Preço']}
                  labelFormatter={(label) => `Data: ${chartData.find(item => item.name === label)?.date}`}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="price" 
                  stroke={selectedCrypto === 'bitcoin' ? '#F7931A' : 
                          selectedCrypto === 'ethereum' ? '#627EEA' : 
                          selectedCrypto === 'litecoin' ? '#345D9D' : '#00FFA3'} 
                  strokeWidth={2}
                  name={cryptoInfo[selectedCrypto]?.name || 'Criptomoeda'}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
