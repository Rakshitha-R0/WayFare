import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.context.jsx";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/Theme.context.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);