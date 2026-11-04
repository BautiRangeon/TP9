import { NavLink } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <h2>Hotel Chaile</h2>
      <p>Cafayate, Salta</p>
      <nav className="menu" aria-label="Navegación principal">
        <NavLink to="/" end>Inicio</NavLink>
        <NavLink to="/acerca">Acerca de nosotros</NavLink>
        <NavLink to="/reservas">Reservas</NavLink>
      </nav>
    </header>
  );
}

export default Header;
