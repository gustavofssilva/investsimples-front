import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import '../styles/Simulador.css';
import Home from './Home';

const Simulador = () => {
  const navigate = useNavigate();
  const [dados, setDados] = useState({
    valorInicial: 10000,
    aporteMensal: 500,
    tempo: 5,
    taxaAnual: 10
  });

  const [resultados, setResultados] = useState([]);

  const calcularInvestimentos = () => {
    const { valorInicial, aporteMensal, tempo, taxaAnual } = dados;
    const taxaMensal = taxaAnual / 12 / 100;
    const meses = tempo * 12;

    const tiposInvestimento = [
      { nome: 'Tesouro Direto', cor: '#00FFA3' },
      { nome: 'CDB', cor: '#3A6FF8' },
      { nome: 'Ações', cor: '#F7931A' },
      { nome: 'FIIs', cor: '#FF4D4D' }
    ];

    const calculos = tiposInvestimento.map(investimento => {
      let montante = valorInicial;
      const dadosGrafico = [];

      for (let i = 1; i <= meses; i++) {
        montante = montante * (1 + taxaMensal) + aporteMensal;
        if (i % 12 === 0) {
          dadosGrafico.push({
            ano: i / 12,
            valor: Math.round(montante),
            nome: investimento.nome
          });
        }
      }

      return {
        nome: investimento.nome,
        cor: investimento.cor,
        montanteFinal: Math.round(montante),
        totalInvestido: valorInicial + (aporteMensal * meses),
        rendimento: Math.round(montante - (valorInicial + (aporteMensal * meses))),
        dadosGrafico
      };
    });

    setResultados(calculos);
  };

  const handleChange = (e) => {
    setDados({
      ...dados,
      [e.target.name]: parseFloat(e.target.value)
    });
  };

  return (
    <div className="simulador-container">
      <header className="simulador-header">
        <button 
          className="back-btn"
          onClick={() => navigate(-2)}
        >
          ← Voltar   
    </button>   
      </header>

      <main className="simulador-main">
        <h1>Simulador de Investimentos</h1>
        <p>Compare diferentes tipos de investimentos e veja qual é melhor para você</p>

        {/* Formulário de Entrada */}
        <div className="form-container">
          <div className="input-group">
            <label>Valor Inicial (R$)</label>
            <input
              type="number"
              name="valorInicial"
              value={dados.valorInicial}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Aporte Mensal (R$)</label>
            <input
              type="number"
              name="aporteMensal"
              value={dados.aporteMensal}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Tempo (anos)</label>
            <input
              type="number"
              name="tempo"
              value={dados.tempo}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>Taxa Anual (%)</label>
            <input
              type="number"
              name="taxaAnual"
              value={dados.taxaAnual}
              onChange={handleChange}
              step="0.1"
            />
          </div>

          <button className="calcular-btn" onClick={calcularInvestimentos}>
            Calcular Investimentos
          </button>
        </div>

        {/* Resultados e Comparação */}
        {resultados.length > 0 && (
          <>
            <div className="resultados-grid">
              {resultados.map((investimento) => (
                <div key={investimento.nome} className="resultado-card">
                  <h3 style={{ color: investimento.cor }}>{investimento.nome}</h3>
                  <div className="resultado-info">
                    <p>Montante Final: <span>R$ {investimento.montanteFinal.toLocaleString('pt-BR')}</span></p>
                    <p>Total Investido: <span>R$ {investimento.totalInvestido.toLocaleString('pt-BR')}</span></p>
                    <p>Rendimento: <span className={investimento.rendimento >= 0 ? 'positive' : 'negative'}>
                      R$ {investimento.rendimento.toLocaleString('pt-BR')}
                    </span></p>
                  </div>
                </div>
              ))}
            </div>

            {/* Gráfico Comparativo */}
            <div className="grafico-container">
              <h2>Projeção de Crescimento</h2>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={resultados.flatMap(inv => inv.dadosGrafico)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="ano" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Valor']}/>
                  <Legend />
                  {resultados.map((investimento) => (
                    <Line
                      key={investimento.nome}
                      type="monotone"
                      dataKey="valor"
                      data={investimento.dadosGrafico}
                      name={investimento.nome}
                      stroke={investimento.cor}
                      strokeWidth={3}
                    />
                  ))}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

export default Simulador;