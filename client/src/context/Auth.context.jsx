import { useState,useContext,useEffect,createContext } from "react";
const AuthContext = createContext();


export const AuthProvider = ({ children }) => {
    let [token,setToken]=useState((localStorage.getItem("userToken"))?localStorage.getItem("userToken"):null);
    let [user,setUser]=useState((localStorage.getItem("newUser"))?(JSON.parse(localStorage.getItem("newUser"))):null);
    useEffect(()=>{
        const token = localStorage.getItem("userToken");
        const user = JSON.parse(localStorage.getItem("user"));
        if(token){
            setToken(token);

        }
        if(user){
            setUser(user);
        }
    },[token,user]);

    const logout = () => {
      localStorage.removeItem("userToken");
      localStorage.removeItem("newUser");
      setToken(null);
      setUser(null);
  
    };
    return (
        <AuthContext.Provider value={{token,setToken,user,setUser, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export default function useAuth() {
    return useContext(AuthContext);
}
