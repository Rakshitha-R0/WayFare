import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/Auth.context.jsx";
import { ItineraryProvider } from "./context/Itinerary.context.jsx";
import "./index.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ItineraryProvider>
        <App />
        </ItineraryProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);