import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import api from '../services/api';

function Home() {
  const [stats, setStats] = useState({ juegos: 0, jugadores: 0, ventas: 0 });

  useEffect(() => {
    Promise.all([
      api.get('/juegos').catch(() => ({ data: [] })),
      api.get('/jugadores').catch(() => ({ data: [] })),
      api.get('/ventas').catch(() => ({ data: [] })),
    ]).then(([juegosRes, jugadoresRes, ventasRes]) => {
      setStats({
        juegos: juegosRes.data?.length || 0,
        jugadores: jugadoresRes.data?.length || 0,
        ventas: ventasRes.data?.length || 0,
      });
    });
  }, []);

  return (
    <section className="hero-section">
      <div className="hero-badge">⚡ Sistema de Gestión Gamer</div>
      <h1 className="hero-title">
        Bienvenido a<br />GameZone
      </h1>
      <p className="hero-subtitle">
        Administra tu inventario de videojuegos, jugadores y ventas
        desde un panel con estilo arcade.
      </p>

      <div className="hero-stats">
        <div className="stat-box">
          <div className="stat-value">{stats.juegos}</div>
          <div className="stat-label">Juegos</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.jugadores}</div>
          <div className="stat-label">Jugadores</div>
        </div>
        <div className="stat-box">
          <div className="stat-value">{stats.ventas}</div>
          <div className="stat-label">Ventas</div>
        </div>
      </div>

      <div className="hero-actions">
        <Link to="/juegos" className="btn-game btn-primary-game">
          🕹️ Ver Juegos
        </Link>
        <Link to="/jugadores" className="btn-game btn-outline-game">
          👤 Jugadores
        </Link>
        <Link to="/ventas" className="btn-game btn-outline-game">
          💰 Ventas
        </Link>
      </div>
    </section>
  );
}

export default Home;
