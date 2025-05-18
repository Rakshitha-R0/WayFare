import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.pages";
import Login from "./pages/Login.pages";
import Signup from "./pages/Signup.pages";
import ProtectedRoute from "./component/ProtectRoutes";
import Welcome from "./pages/Welcome.pages";
import { CssBaseline } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Itinerary from './pages/Itinerary.pages';

function App() {
  const theme = useTheme();
  return (
    <>
      <CssBaseline />
      <div style={{ backgroundColor: theme.palette.background.default }}>
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
          <Route path="/itinerary/:id" element={<ProtectedRoute><Itinerary /></ProtectedRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;