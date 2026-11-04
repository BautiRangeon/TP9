import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App.jsx";

// HashRouter permite recargar las páginas internas en GitHub Pages.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </StrictMode>,
);
