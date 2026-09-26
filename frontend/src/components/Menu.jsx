import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation } from 'react-router-dom';

function Menu() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <Navbar expand="lg" className="game-navbar" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          🎮 GAMEZONE
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="game-nav" />
        <Navbar.Collapse id="game-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/" className={isActive('/') ? 'active' : ''}>
              Inicio
            </Nav.Link>
            <Nav.Link as={Link} to="/juegos" className={isActive('/juegos') ? 'active' : ''}>
              🕹️ Juegos
            </Nav.Link>
            <Nav.Link as={Link} to="/jugadores" className={isActive('/jugadores') ? 'active' : ''}>
              👤 Jugadores
            </Nav.Link>
            <Nav.Link as={Link} to="/ventas" className={isActive('/ventas') ? 'active' : ''}>
              💰 Ventas
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Menu;
