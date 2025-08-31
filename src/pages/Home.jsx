import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBitcoin, FaEthereum, FaCoins, FaFire, FaSyncAlt } from 'react-icons/fa';
import '../styles/Home.css';

const Home = () => {
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState('bitcoin');
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [user, setUser] = useState(null);

  // Dados estáticos para ícones e símbolos
  const cryptoInfo = {
    bitcoin: { symbol: 'BTC', icon: <FaBitcoin size={24} color="#F7931A" />, name: 'Bitcoin' },
    ethereum: { symbol: 'ETH', icon: <FaEthereum size={24} color="#627EEA" />, name: 'Ethereum' },
    litecoin: { symbol: 'LTC', icon: <FaCoins size={24} color="#345D9D" />, name: 'Litecoin' },
    solana: { symbol: 'SOL', icon: <FaFire size={24} color="#00FFA3" />, name: 'Solana' }
  };

  // Verificar usuário logado
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
      setUser(currentUser);
    }
  }, []);

  // Fetch dados em tempo real
  const fetchCryptoData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,litecoin,solana&order=market_cap_desc&per_page=4&page=1&sparkline=false&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
      }
      
      const data = await response.json();
      
      const formattedData = data.map(crypto => ({
        id: crypto.id,
        name: cryptoInfo[crypto.id].name,
        symbol: cryptoInfo[crypto.id].symbol,
        price: crypto.current_price,
        change: crypto.price_change_percentage_24h,
        icon: cryptoInfo[crypto.id].icon
      }));
      
      setCryptoData(formattedData);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar dados. Tente novamente.');
      console.error('Erro API:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch dados históricos para o gráfico
  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${selectedCrypto}/market_chart?vs_currency=usd&days=30&interval=daily`
      );
      
      if (!response.ok) {
        throw new Error('Erro ao buscar dados históricos');
      }
      
      const data = await response.json();
      
      const formattedChartData = data.prices.map((price, index) => ({
        name: `Dia ${index + 1}`,
        price: price[1],
        date: new Date(price[0]).toLocaleDateString()
      }));
      
      setChartData(formattedChartData);
    } catch (err) {
      console.error('Erro histórico:', err);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    // Atualizar dados a cada 30 segundos
    const interval = setInterval(fetchCryptoData, 30000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (selectedCrypto) {
      fetchHistoricalData();
    }
  }, [selectedCrypto]);

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    navigate('/');
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading">
          <FaSyncAlt className="spinner" />
          <p>Carregando dados...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="home-container">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchCryptoData} className="retry-btn">
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
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
          {/* Cards de Criptomoedas com dados reais */}
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

          {/* Gráfico Interativo */}
          <div className="chart-container">
            <h2>Performance Histórica (30 dias)</h2>
            
            {/* Botões para selecionar a criptomoeda no gráfico */}
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

            {/* Gráfico Responsivo com dados reais */}
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