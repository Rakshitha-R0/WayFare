import { useState, useContext, useEffect, createContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  let [token, setToken] = useState(null);
  let [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const user = localStorage.getItem("newUser");
    if (token) {
      setUser({ user });
      setToken(token);
    }
  }, []);
  console.log(token, user);

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("newUser");
    setToken(null);
    setUser(null);

  };

  return (
    <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
