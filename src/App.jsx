import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./components/Header.jsx";
import Inicio from "./pages/Inicio.jsx";
import AcercaDeNosotros from "./pages/AcercaDeNosotros.jsx";
import Reservas from "./pages/Reservas.jsx";
import "./App.css";

function App() {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/acerca" element={<AcercaDeNosotros />} />
        <Route path="/reservas" element={<Reservas />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="footer">
        <p>Hotel Chaile · Cafayate, Salta · Argentina</p>
      </footer>
    </div>
  );
}

export default App;
