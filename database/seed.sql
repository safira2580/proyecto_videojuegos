USE tienda_videojuegos;

-- Limpiar datos anteriores (por si acaso)
DELETE FROM detalle_venta;
DELETE FROM ventas;
DELETE FROM juegos;
DELETE FROM jugadores;

-- Jugadores
INSERT INTO jugadores (nombre, contacto, departamento, ciudad) VALUES
('Juan Pérez', '3001234567', 'Antioquia', 'Medellín'),
('María Gómez', '3109876543', 'Cundinamarca', 'Bogotá'),
('Carlos Rodríguez', '3205551234', 'Valle del Cauca', 'Cali'),
('Ana López', '3154447890', 'Atlántico', 'Barranquilla'),
('Pedro Martínez', '3012223333', 'Santander', 'Bucaramanga');

-- Juegos / consolas / accesorios
INSERT INTO juegos (nombre, cantidad, precio) VALUES
('PlayStation 5', 15, 2500000.00),
('Xbox Series X', 12, 2300000.00),
('Nintendo Switch OLED', 20, 1500000.00),
('FIFA 25', 50, 250000.00),
('God of War Ragnarök', 40, 280000.00),
('The Legend of Zelda', 35, 320000.00),
('Control DualSense', 60, 280000.00),
('Audífonos Gamer', 45, 180000.00);

-- Ventas
INSERT INTO ventas (id_jugador, fecha_venta, total) VALUES
(1, '2025-01-15', 2780000.00),
(2, '2025-02-10', 1780000.00),
(3, '2025-03-05', 530000.00),
(1, '2025-03-20', 280000.00),
(4, '2025-04-01', 2820000.00);

-- Detalle de Ventas
INSERT INTO detalle_venta (id_venta, id_juego, cantidad, precio_unitario, subtotal) VALUES
(1, 1, 1, 2500000.00, 2500000.00),
(1, 7, 1, 280000.00, 280000.00),
(2, 3, 1, 1500000.00, 1500000.00),
(2, 4, 1, 250000.00, 250000.00),
(3, 5, 1, 280000.00, 280000.00),
(3, 8, 1, 180000.00, 180000.00),
(4, 7, 1, 280000.00, 280000.00),
(5, 2, 1, 2300000.00, 2300000.00),
(5, 6, 1, 320000.00, 320000.00),
(5, 8, 1, 180000.00, 180000.00);
