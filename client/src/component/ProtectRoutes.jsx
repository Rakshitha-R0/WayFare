import React, { useEffect, useState } from "react";
import useAuth from "../context/Auth.context";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuth();
  
useEffect(() => {
  if(token) {
    return setIsAuthenticated(true); 
  }
  setIsAuthenticated(false);
  setIsLoading(false);
},[]) 

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);



  if (isLoading) return <div>Loading...</div>;

  return isAuthenticated ? (
    children
  ) : (
    null
  );
};

export default ProtectedRoute;