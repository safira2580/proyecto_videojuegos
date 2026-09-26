const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos los jugadores
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jugadores ORDER BY id_jugador');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugadores' });
  }
});

// GET un jugador
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM jugadores WHERE id_jugador = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Jugador no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener jugador' });
  }
});

// POST - Añadir jugador
router.post('/', async (req, res) => {
  try {
    const { nombre, contacto, departamento, ciudad } = req.body;
    const [result] = await pool.query(
      'INSERT INTO jugadores (nombre, contacto, departamento, ciudad) VALUES (?, ?, ?, ?)',
      [nombre, contacto, departamento, ciudad]
    );
    res.json({ id_jugador: result.insertId, nombre, contacto, departamento, ciudad });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear jugador' });
  }
});

// PUT - Modificar jugador
router.put('/:id', async (req, res) => {
  try {
    const { nombre, contacto, departamento, ciudad } = req.body;
    await pool.query(
      'UPDATE jugadores SET nombre=?, contacto=?, departamento=?, ciudad=? WHERE id_jugador=?',
      [nombre, contacto, departamento, ciudad, req.params.id]
    );
    res.json({ mensaje: 'Jugador actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar jugador' });
  }
});

// DELETE - Eliminar jugador
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM jugadores WHERE id_jugador = ?', [req.params.id]);
    res.json({ mensaje: 'Jugador eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar jugador' });
  }
});

module.exports = router;
