import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.pages";
import Login from "./pages/Login.pages";
import Signup from "./pages/Signup.pages";
import Welcome from "./pages/Welcome.pages";
import ProtectedRoute from "./component/ProtectRoutes";
import Navbar from "./component/NavBar";
import Footer from "./component/Footer";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { useState } from "react";

function App() {
  const [mode, setMode] = useState("light"); 

  const theme = createTheme({
    palette: {
      mode: mode, 
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar mode={mode} setMode={setMode} />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
      </Routes>
      <Footer />
    </ThemeProvider>
  );
}

export default App;