import { useState, useContext, useEffect, createContext } from "react";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    let [token, setToken] = useState(() => localStorage.getItem("userToken") || null);
    let [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("newUser");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (token) {
            localStorage.setItem("userToken", token);
        } else {
            localStorage.removeItem("userToken");
        }
    }, [token]);

    useEffect(() => {
        if (user) {
            localStorage.setItem("newUser", JSON.stringify(user));
        } else {
            localStorage.removeItem("newUser");
        }
    }, [user]);

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("userToken");
        localStorage.removeItem("newUser");
    };

    return (
        <AuthContext.Provider value={{ token, setToken, user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
}

// export default useAuth;
