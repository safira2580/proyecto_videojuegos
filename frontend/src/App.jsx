import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Menu from './components/Menu';
import Jugadores from './components/Jugadores';
import Juegos from './components/Juegos';
import Ventas from './components/Ventas';
import Home from './components/Home';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/juegos" element={<Juegos />} />
        <Route path="/ventas" element={<Ventas />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
