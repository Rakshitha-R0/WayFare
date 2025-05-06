import React, { useEffect, useState } from "react";
import useAuth from "../context/Auth.context";
import { Link } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    if (token) {
      return setIsAuthenticated(true);
    } else {
      return setIsAuthenticated(false);
    }
  }, [token]);

  console.log(isAuthenticated);

  // if (isLoading) return <div>Loading...</div>;

  return isAuthenticated
    ? (children)
    : null;
      // <>
      // <div className="error-message">You are not authorized to view this page. Please log in.</div>
      // <Link to="/login" style={{ textDecoration: 'none', color: 'white' }}>
      //   <button className="explore-button">
      //     Login
      //   </button>
      // </Link>
      // </>
};

export default ProtectedRoute;
