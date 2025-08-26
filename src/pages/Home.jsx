import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { FaBitcoin, FaEthereum, FaCoins, FaFire } from 'react-icons/fa';
import '../styles/Home.css';

// Dados mockados (substitua por API real depois)
const cryptoData = [
  { name: 'Bitcoin', symbol: 'BTC', price: 52345.67, change: 2.5, icon: <FaBitcoin size={24} color="#F7931A" /> },
  { name: 'Ethereum', symbol: 'ETH', price: 2890.45, change: -1.2, icon: <FaEthereum size={24} color="#627EEA" /> },
  { name: 'Litecoin', symbol: 'LTC', price: 128.32, change: 0.8, icon: <FaCoins size={24} color="#345D9D" /> },
  { name: 'Solana', symbol: 'SOL', price: 132.56, change: 5.3, icon: <FaFire size={24} color="#00FFA3" /> }
];

// Dados mockados para o gráfico (exemplo)
const chartData = [
  { name: 'Jan', BTC: 40000, ETH: 2800, LTC: 120, SOL: 110 },
  { name: 'Fev', BTC: 42000, ETH: 2700, LTC: 125, SOL: 115 },
  { name: 'Mar', BTC: 45000, ETH: 2900, LTC: 130, SOL: 120 },
  { name: 'Abr', BTC: 48000, ETH: 3000, LTC: 128, SOL: 125 },
  { name: 'Mai', BTC: 52000, ETH: 2900, LTC: 129, SOL: 130 }
];

const Home = () => {
  const navigate = useNavigate();
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');

  return (
    <div className="home-container">
      <header className="home-header">
        <button 
          className="login-btn"
          onClick={() => navigate('/login')}
        >
          Cadastre-se/Login
        </button>
      </header>

      <main className="home-main-content">
        <div className="home-content">
         

          {/* Cards de Criptomoedas */}
          <div className="crypto-grid">
            {cryptoData.map((crypto) => (
              <div key={crypto.symbol} className="crypto-card">
                <div className="crypto-header">
                  {crypto.icon}
                  <span className="crypto-symbol">{crypto.symbol}</span>
                </div>
                <div className="crypto-price">
                  ${crypto.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
                <div className={`crypto-change ${crypto.change >= 0 ? 'positive' : 'negative'}`}>
                  {crypto.change >= 0 ? '↑' : '↓'} {Math.abs(crypto.change)}%
                </div>
              </div>
            ))}
          </div>

          {/* Gráfico Interativo */}
          <div className="chart-container">
            <h2>Performance Histórica</h2>
            
            {/* Botões para selecionar a criptomoeda no gráfico */}
            <div className="chart-selector">
              {cryptoData.map((crypto) => (
                <button
                  key={crypto.symbol}
                  className={`chart-btn ${selectedCrypto === crypto.symbol ? 'active' : ''}`}
                  onClick={() => setSelectedCrypto(crypto.symbol)}
                >
                  {crypto.icon} {crypto.name}
                </button>
              ))}
            </div>

            {/* Gráfico Responsivo */}
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey={selectedCrypto} 
                  stroke={selectedCrypto === 'BTC' ? '#F7931A' : 
                          selectedCrypto === 'ETH' ? '#627EEA' : 
                          selectedCrypto === 'LTC' ? '#345D9D' : '#00FFA3'} 
                  strokeWidth={2}
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