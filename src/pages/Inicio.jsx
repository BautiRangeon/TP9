import { Link } from "react-router-dom";
import paisaje from "../assets/paisaje.svg";

function Inicio() {
  return (
    <main className="contenedor">
      <section className="tarjeta inicio">
        <h1>Bienvenidos a Hotel Chaile</h1>
        <p>Tu lugar para descansar en Cafayate, Salta.</p>
        <img className="paisaje" src={paisaje} alt="Ilustración de un hotel entre montañas y viñedos de Cafayate" />
        <p>Disfrutá de una estadía tranquila, rodeado de cerros y viñedos.</p>
        <Link className="boton" to="/reservas">Ver habitaciones y reservar</Link>
      </section>
    </main>
  );
}

export default Inicio;
