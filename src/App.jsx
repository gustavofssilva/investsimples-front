import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import Perfil from './pages/Perfil';
import Simulador from './pages/Simulador';
import Aprenda from './pages/Aprenda';
import Carteira from './pages/Carteira';
import './styles/global.css';

function App() {
  return (
    <Router>
      <div style={{ 
        display: 'flex',
        minHeight: '100vh',
        backgroundColor: '#31353F'
      }}>
        <Sidebar />
        
        <div style={{ 
          flex: 1,
          marginLeft: '240px',
          backgroundColor: '#31353F',
          position: 'relative',
          padding: '2rem 6rem 2rem 0rem' // ADICIONEI ESTE PADDING
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/simulador" element={<Simulador />} />
            <Route path="/aprenda" element={<Aprenda />} />
            <Route path="/carteira" element={<Carteira />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;