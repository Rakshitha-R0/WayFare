import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.pages";
import Login from "./pages/Login.pages";
import Signup from "./pages/Signup.pages";
import Welcome from "./pages/Welcome.pages";
import ProtectedRoute from './component/ProtectRoutes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Welcome />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/signup" element={<Signup />}></Route>
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
}

export default App;