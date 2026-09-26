# GameZone — Tienda de Videojuegos

Proyecto completo con interfaz **temática de videojuegos** (tema oscuro, neón, estilo arcade).

- **Frontend**: React + Vite + React Router + Axios + React Bootstrap + CSS personalizado gamer
- **Backend**: Express + MySQL2 + CORS + dotenv
- **Base de datos**: MySQL (`tienda_videojuegos`)

## Estructura

```
proyecto_videojuegos/
├── backend/          # Servidor Express (puerto 3000)
│   └── routes/
│       ├── jugadores.js
│       ├── juegos.js
│       └── ventas.js
├── frontend/         # Aplicación React/Vite (puerto 5173)
├── database/         # Scripts SQL (schema + seed)
└── README.md
```

## Base de datos

**Nombre:** `tienda_videojuegos`

| Tabla           | Descripción                          |
|-----------------|--------------------------------------|
| `jugadores`     | Clientes / jugadores de la tienda    |
| `juegos`        | Catálogo de videojuegos y accesorios |
| `ventas`        | Cabecera de cada venta               |
| `detalle_venta` | Líneas de detalle por venta          |

### Campos principales

**jugadores:** `id_jugador`, `nombre`, `contacto`, `departamento`, `ciudad`  
**juegos:** `id_juego`, `nombre`, `cantidad`, `precio`  
**ventas:** `id_venta`, `id_jugador`, `fecha_venta`, `total`  
**detalle_venta:** `id_detalle`, `id_venta`, `id_juego`, `cantidad`, `precio_unitario`, `subtotal`

## Secciones de la interfaz

| Ruta         | Descripción                          |
|--------------|--------------------------------------|
| `/`          | Inicio con estadísticas y acceso rápido |
| `/juegos`    | Catálogo de videojuegos (tarjetas)   |
| `/jugadores` | Gestión de jugadores (tabla)         |
| `/ventas`    | Historial de ventas                  |

## Requisitos previos

- Node.js 18+
- MySQL 8+ (o MariaDB)
- npm

## 1. Configurar la base de datos MySQL

```bash
mysql -u root -p
```

```sql
SOURCE /ruta/completa/a/proyecto_videojuegos/database/schema.sql;
SOURCE /ruta/completa/a/proyecto_videojuegos/database/seed.sql;
```

Verifica:

```sql
USE tienda_videojuegos;
SHOW TABLES;
SELECT * FROM juegos;
SELECT * FROM jugadores;
```

## 2. Backend

```bash
cd backend
cp .env.example .env
# Edita .env con tu password de MySQL (DB_NAME ya es tienda_videojuegos)
npm install
npm start
```

Servidor en: **http://localhost:3000**

### API

- `GET/POST/PUT/DELETE /jugadores`
- `GET/POST/PUT/DELETE /juegos`
- `GET /ventas` y `GET /ventas/:id`

## 3. Frontend

```bash
cd frontend
# .env ya tiene VITE_API_URL=http://localhost:3000
npm install
npm run dev
```

Abre: **http://localhost:5173**

## Tema visual

- Fondo oscuro (`#0a0a12`)
- Acentos neón cyan (`#00f5ff`) y magenta (`#ff00aa`)
- Tipografías: **Orbitron** (títulos) + **Rajdhani** (cuerpo)
- Tarjetas de juegos con hover glow
- Tablas estilo panel arcade
- Botones con gradiente y sombras neón
