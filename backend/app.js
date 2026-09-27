const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Rutas de videojuegos
const jugadoresRouter = require('./routes/jugadores');
const juegosRouter = require('./routes/juegos');
const ventasRouter = require('./routes/ventas');

app.use('/jugadores', jugadoresRouter);
app.use('/juegos', juegosRouter);
app.use('/ventas', ventasRouter);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ mensaje: 'API GameZone - Tienda de Videojuegos funcionando correctamente' });
});

// Manejo de errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

// Escuchar en 0.0.0.0 para Railway
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor backend GameZone corriendo en el puerto ${PORT}`);
});
