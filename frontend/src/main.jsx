import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="bg-slate-100 min-h-svh">
      <div className="container mx-auto">
        <App />
      </div>
    </div>
  </StrictMode>
);
