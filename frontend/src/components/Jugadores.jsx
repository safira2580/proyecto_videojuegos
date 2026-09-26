import { useEffect, useState } from 'react';
import api from '../services/api';

function Jugadores() {
  const [jugadores, setJugadores] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ nombre: '', contacto: '', departamento: '', ciudad: '' });
  const [editando, setEditando] = useState(null);
  const [mostrarForm, setMostrarForm] = useState(false);

  const cargar = () => {
    setCargando(true);
    api.get('/jugadores')
      .then(res => {
        setJugadores(res.data);
        setCargando(false);
        setError(null);
      })
      .catch(() => {
        setError('No se pudo cargar la lista de jugadores. ¿Está el backend corriendo?');
        setCargando(false);
      });
  };

  useEffect(() => { cargar(); }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editando) {
      api.put(`/jugadores/${editando}`, form).then(() => {
        setEditando(null);
        setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
        setMostrarForm(false);
        cargar();
      });
    } else {
      api.post('/jugadores', form).then(() => {
        setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
        setMostrarForm(false);
        cargar();
      });
    }
  };

  const handleEditar = (j) => {
    setEditando(j.id_jugador);
    setForm({
      nombre: j.nombre,
      contacto: j.contacto || '',
      departamento: j.departamento || '',
      ciudad: j.ciudad || '',
    });
    setMostrarForm(true);
  };

  const handleEliminar = (id) => {
    if (window.confirm('¿Eliminar este jugador?')) {
      api.delete(`/jugadores/${id}`).then(() => cargar());
    }
  };

  const cancelar = () => {
    setEditando(null);
    setForm({ nombre: '', contacto: '', departamento: '', ciudad: '' });
    setMostrarForm(false);
  };

  if (cargando) return <div className="state-msg loading">Cargando jugadores</div>;
  if (error) return <div className="state-msg error">{error}</div>;

  return (
    <div className="page-container">
      <div className="page-header">
        <h2><span className="icon">👤</span> Jugadores</h2>
        <button
          className="btn-game btn-primary-game btn-sm-game"
          onClick={() => { setMostrarForm(!mostrarForm); if (editando) cancelar(); }}
        >
          {mostrarForm && !editando ? '✕ Cerrar' : '+ Añadir Jugador'}
        </button>
      </div>

      {mostrarForm && (
        <div className="form-panel">
          <h5>{editando ? '✏️ Modificar Jugador' : '➕ Nuevo Jugador'}</h5>
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label>Nombre</label>
                <input
                  type="text"
                  name="nombre"
                  className="form-control-game"
                  placeholder="Nombre completo"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Contacto</label>
                <input
                  type="text"
                  name="contacto"
                  className="form-control-game"
                  placeholder="Teléfono / email"
                  value={form.contacto}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Departamento</label>
                <input
                  type="text"
                  name="departamento"
                  className="form-control-game"
                  placeholder="Ej: Antioquia"
                  value={form.departamento}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label>Ciudad</label>
                <input
                  type="text"
                  name="ciudad"
                  className="form-control-game"
                  placeholder="Ej: Medellín"
                  value={form.ciudad}
                  onChange={handleChange}
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

      {jugadores.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">👤</div>
          <p>No hay jugadores registrados. ¡Añade el primero!</p>
        </div>
      ) : (
        <div className="table-panel">
          <table className="game-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>Contacto</th>
                <th>Departamento</th>
                <th>Ciudad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {jugadores.map(j => (
                <tr key={j.id_jugador}>
                  <td><span className="badge-id">#{j.id_jugador}</span></td>
                  <td>{j.nombre}</td>
                  <td>{j.contacto || '—'}</td>
                  <td>{j.departamento || '—'}</td>
                  <td>{j.ciudad || '—'}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      <button className="btn-game btn-edit-game" onClick={() => handleEditar(j)}>
                        Editar
                      </button>
                      <button className="btn-game btn-danger-game" onClick={() => handleEliminar(j.id_jugador)}>
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Jugadores;
