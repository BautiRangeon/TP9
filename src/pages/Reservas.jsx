import { useState } from "react";
import DatePicker from "react-datepicker";
import { differenceInCalendarDays, startOfDay } from "date-fns";
import { es } from "date-fns/locale/es";
import "react-datepicker/dist/react-datepicker.css";
import "./Reservas.css";
import esencial from "../assets/habitacion-esencial.svg";
import superior from "../assets/habitacion-superior.svg";
import familiar from "../assets/habitacion-familiar.svg";
import suite from "../assets/habitacion-suite.svg";

const habitaciones = [
  { id: 1, nombre: "Doble Esencial", personas: 2, precio: 68000, imagen: esencial },
  { id: 2, nombre: "Doble Superior", personas: 2, precio: 85000, imagen: superior },
  { id: 3, nombre: "Familiar", personas: 4, precio: 112000, imagen: familiar },
  { id: 4, nombre: "Suite Chaile", personas: 2, precio: 145000, imagen: suite },
];

function precio(valor) {
  return "$ " + valor.toLocaleString("es-AR");
}

function fecha(valor) {
  return valor ? valor.toLocaleDateString("es-AR") : "Sin elegir";
}

function Reservas() {
  const [habitacion, setHabitacion] = useState(null);
  const [fechas, setFechas] = useState([null, null]);
  const [nombre, setNombre] = useState("");
  const [error, setError] = useState("");
  const [entrada, salida] = fechas;
  const noches = entrada && salida ? differenceInCalendarDays(salida, entrada) : 0;
  const total = habitacion ? habitacion.precio * noches : 0;

  function confirmarReserva(evento) {
    evento.preventDefault();
    if (!habitacion || !entrada || !salida || !nombre.trim()) {
      setError("Seleccioná una habitación, elegí las dos fechas y escribí tu nombre.");
      return;
    }
    if (entrada < startOfDay(new Date()) || noches < 1) {
      setError("La entrada debe ser desde hoy y la salida debe ser posterior a la entrada.");
      return;
    }
    setError("");
    alert(
      "¡Reserva confirmada!\n\n" +
      "Huésped: " + nombre.trim() + "\n" +
      "Habitación: " + habitacion.nombre + "\n" +
      "Entrada: " + fecha(entrada) + "\n" +
      "Salida: " + fecha(salida) + "\n" +
      "Noches: " + noches + "\n" +
      "Total: " + precio(total) + " ARS\n\nHotel Chaile, Cafayate."
    );
  }

  return (
    <main className="contenedor">
      <h1>Reservas</h1>
      <p>Elegí una habitación y las fechas de tu estadía. Todos los precios están en pesos argentinos.</p>

      <div className="habitaciones">
        {habitaciones.map((item) => (
          <article className={"habitacion " + (habitacion?.id === item.id ? "seleccionada" : "")} key={item.id}>
            <img src={item.imagen} alt={"Ilustración de la habitación " + item.nombre} />
            <h2>{item.nombre}</h2>
            <p>Hasta {item.personas} personas</p>
            <p><strong>{precio(item.precio)}</strong> / noche</p>
            <button type="button" aria-label={"Seleccionar " + item.nombre} aria-pressed={habitacion?.id === item.id} onClick={() => { setHabitacion(item); setError(""); }}>
              {habitacion?.id === item.id ? "Seleccionada" : "Seleccionar"}
            </button>
          </article>
        ))}
      </div>

      <form className="tarjeta formulario" onSubmit={confirmarReserva} noValidate>
        <h2>Completá tu reserva</h2>
        <label htmlFor="nombre">Nombre y apellido</label>
        <input id="nombre" name="nombre" value={nombre} onChange={(evento) => setNombre(evento.target.value)} autoComplete="name" maxLength={100} required />
        <p id="ayuda-fechas">En el calendario, elegí primero la entrada y después la salida.</p>
        <div className="calendario" aria-describedby="ayuda-fechas">
          <DatePicker
            selected={entrada}
            startDate={entrada}
            endDate={salida}
            onChange={(rango) => { setFechas(rango); setError(""); }}
            selectsRange
            inline
            minDate={startOfDay(new Date())}
            locale={es}
            calendarStartDay={1}
            previousMonthAriaLabel="Mes anterior"
            nextMonthAriaLabel="Mes siguiente"
            chooseDayAriaLabelPrefix="Elegir"
            disabledDayAriaLabelPrefix="No disponible"
          />
        </div>
        <button type="button" className="limpiar" onClick={() => { setFechas([null, null]); setError(""); }}>Limpiar fechas</button>
        <div className="resumen" aria-live="polite">
          <p><strong>Habitación:</strong> {habitacion ? habitacion.nombre : "Sin elegir"}</p>
          <p><strong>Entrada:</strong> {fecha(entrada)} · <strong>Salida:</strong> {fecha(salida)}</p>
          {noches > 0 && <p><strong>Noches:</strong> {noches}</p>}
          {total > 0 && <p className="total"><strong>Total: {precio(total)}</strong></p>}
        </div>
        {error && <p className="error" role="alert">{error}</p>}
        <button type="submit">Confirmar reserva</button>
      </form>
    </main>
  );
}

export default Reservas;
