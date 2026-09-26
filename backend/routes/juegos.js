const express = require('express');
const router = express.Router();
const pool = require('../db');

// GET todos los juegos
router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM juegos ORDER BY id_juego');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener juegos' });
  }
});

// GET un juego
router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM juegos WHERE id_juego = ?', [req.params.id]);
    if (rows.length === 0) return res.status(404).json({ error: 'Juego no encontrado' });
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener juego' });
  }
});

// POST - Añadir juego
router.post('/', async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    const [result] = await pool.query(
      'INSERT INTO juegos (nombre, cantidad, precio) VALUES (?, ?, ?)',
      [nombre, cantidad, precio]
    );
    res.json({ id_juego: result.insertId, nombre, cantidad, precio });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear juego' });
  }
});

// PUT - Modificar juego
router.put('/:id', async (req, res) => {
  try {
    const { nombre, cantidad, precio } = req.body;
    await pool.query(
      'UPDATE juegos SET nombre=?, cantidad=?, precio=? WHERE id_juego=?',
      [nombre, cantidad, precio, req.params.id]
    );
    res.json({ mensaje: 'Juego actualizado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar juego' });
  }
});

// DELETE - Eliminar juego
router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM juegos WHERE id_juego = ?', [req.params.id]);
    res.json({ mensaje: 'Juego eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar juego' });
  }
});

module.exports = router;
