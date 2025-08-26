import React from 'react';
import { FaChartBar, FaBook, FaWallet, FaCalculator, FaUser } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../assets/logo.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation(); // Pega a rota atual

  const menuItems = [
    { label: 'Overview', icon: <FaChartBar />, path: '/' }, // Homepage
    { label: 'Aprenda conosco', icon: <FaBook />, path: '/aprenda' },
    { label: 'Carteira', icon: <FaWallet />, path: '/carteira' },
    { label: 'Simulador', icon: <FaCalculator />, path: '/simulador' },
    { label: 'Perfil de investidor', icon: <FaUser />, path: '/perfil' }
  ];

  return (
    <aside style={{
      width: '250px',
      backgroundColor: '#1B2028',
      height: '100vh',
      position: 'fixed',
      padding: '2rem 1rem',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'Poppins, sans-serif'
    }}>
      {/* Logo */}
      <div 
        style={{ 
          marginBottom: '2rem', 
          textAlign: 'center',
          padding: '0 1rem',
          cursor: 'pointer'
        }}
        onClick={() => navigate('/')}
      >
        <img 
          src={logo} 
          alt="Invest Simples" 
          style={{ 
            width: '100%', 
            maxWidth: '150px'
          }} 
        />
      </div>

      {/* Menu */}
      <nav>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path} style={{ marginBottom: '1rem' }}>
                <a
                  href="#"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    textDecoration: 'none',
                    color: isActive ? '#FFFFFF' : '#C0C0C0',
                    fontSize: '1rem',
                    gap: '12px',
                    padding: '0.75rem 1rem',
                    borderRadius: '8px',
                    background: isActive ? '#3A6FF8' : 'transparent',
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => !isActive && (e.currentTarget.style.background = '#2A2F3A')}
                  onMouseLeave={(e) => !isActive && (e.currentTarget.style.background = isActive ? '#3A6FF8' : 'transparent')}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.path);
                  }}
                >
                  {item.icon}
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;