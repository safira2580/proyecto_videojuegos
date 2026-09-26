-- Base de datos Tienda de Videojuegos
CREATE DATABASE IF NOT EXISTS tienda_videojuegos CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE tienda_videojuegos;

-- Tabla de Jugadores
CREATE TABLE IF NOT EXISTS jugadores (
  id_jugador INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  departamento VARCHAR(50),
  ciudad VARCHAR(50)
);

-- Tabla de Juegos (videojuegos y accesorios)
CREATE TABLE IF NOT EXISTS juegos (
  id_juego INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  cantidad INT DEFAULT 0,
  precio DECIMAL(10,2) NOT NULL
);

-- Tabla de Ventas
CREATE TABLE IF NOT EXISTS ventas (
  id_venta INT AUTO_INCREMENT PRIMARY KEY,
  id_jugador INT NOT NULL,
  fecha_venta DATE NOT NULL,
  total DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (id_jugador) REFERENCES jugadores(id_jugador)
);

-- Tabla Detalle de Venta
CREATE TABLE IF NOT EXISTS detalle_venta (
  id_detalle INT AUTO_INCREMENT PRIMARY KEY,
  id_venta INT NOT NULL,
  id_juego INT NOT NULL,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(12,2) NOT NULL,
  FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
  FOREIGN KEY (id_juego) REFERENCES juegos(id_juego)
);
