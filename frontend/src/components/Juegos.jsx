import { useEffect, useState } from 'react';
import api from '../services/api';

const GAME_ICONS = ['🎮', '🕹️', '👾', '🎯', '🏆', '⚡', '🔥', '💎', '🚀', '🌟'];

function Juegos() {
  const [juegos, setJuegos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', cantidad: '', precio: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargar = () => {
    setCargando(true);
    api.get('/juegos')
      .then(res => {
        setJuegos(res.data);
        setCargando(false);
        setError(null);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de juegos. ¿Está el backend corriendo?');
        setCargando(false);
      });
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      api.put(`/juegos/${editando}`, form).then(() => {
        setEditando(null);
        setForm({ nombre: '', cantidad: '', precio: '' });
        setMostrarForm(false);
        cargar();
      });
    } else {
      api.post('/juegos', form).then(() => {
        setForm({ nombre: '', cantidad: '', precio: '' });
        setMostrarForm(false);
        cargar();
      });
    }
  };

  const handleEditar = (j) => {
    setEditando(j.id_juego);
    setForm({ nombre: j.nombre, cantidad: j.cantidad, precio: j.precio });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este juego del catálogo?')) {
      api.delete(`/juegos/${id}`).then(() => cargar());
    }
  };

  const cancelar = () => {
    setEditando(null);
    setForm({ nombre: '', cantidad: '', precio: '' });
    setMostrarForm(false);
  };

  if (cargando) return <div className="state-msg loading">Cargando catálogo de juegos</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><span className="icon">🕹️</span> Catálogo de Juegos</h2>
        <button
          className="btn-game btn-primary-game btn-sm-game"
          onClick={() => { setMostrarForm(!mostrarForm); if (editando) cancelar(); }}
        >
          {mostrarForm && !editando ? '✕ Cerrar' : '+ Añadir Juego'}
        </button>
      </div>

      {mostrarForm && (
        <div className="form-panel">
          <h5>{editando ? '✏️ Modificar Juego' : '➕ Nuevo Juego'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre del juego</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control-game"
                  placeholder="Ej: God of War Ragnarök"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Cantidad en stock</label>
                <input
                  type="number"
                  name="cantidad"
                  className="form-control-game"
                  placeholder="0"
                  value={form.cantidad}
                  onChange={handleChange}
                  required
                  min="0"
                />
              </div>
              <div className="form-group">
                <label>Precio (COP)</label>
                <input
                  type="number"
                  name="precio"
                  className="form-control-game"
                  placeholder="0"
                  value={form.precio}
                  onChange={handleChange}
                  required
                  min="0"
                  step="1000"
                />
              </div>
              <div className="form-group" style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-end' }}>
                <button type="submit" className="btn-game btn-primary-game btn-sm-game" style={{ flex: 1 }}>
                  {editando ? 'Guardar' : 'Añadir'}
                </button>
                {editando && (
                  <button type="button" className="btn-game btn-outline-game btn-sm-game" onClick={cancelar}>
                    Cancelar
                  </button>
                )}
              </div>
            </div>
          </form>
        </div>
      )}

      {juegos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🎮</div>
          <p>No hay juegos en el catálogo. ¡Añade el primero!</p>
        </div>
      ) : (
        <div className="games-grid">
          {juegos.map((j, i) => (
            <div className="game-card" key={j.id_juego}>
              <div className="game-card-header">
                {GAME_ICONS[i % GAME_ICONS.length]}
              </div>
              <div className="game-card-body">
                <div className="game-card-title">{j.nombre}</div>
                <div className="game-card-meta">
                  <span className="game-price">
                    ${Number(j.precio).toLocaleString('es-CO')}
                  </span>
                  <span className={`game-stock ${j.cantidad < 10 ? 'low' : ''}`}>
                    Stock: {j.cantidad}
                  </span>
                </div>
                <div className="game-card-actions">
                  <button className="btn-game btn-edit-game" onClick={() => handleEditar(j)}>
                    Editar
                  </button>
                  <button className="btn-game btn-danger-game" onClick={() => handleEliminar(j.id_juego)}>
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Juegos;
