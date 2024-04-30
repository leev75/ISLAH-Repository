"use client";
import { useCookies } from "react-cookie";
import { createContext, useState, useContext } from "react";

// Create the context
const AuthContext = createContext(null);

// Export the context so it can be used by other components
export default AuthContext;

// Create a custom hook for easier consumption of the context
export const useAuth = () => useContext(AuthContext);

// Provider component
export const AuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies(["token"]);

  const [authToken, setAuthToken] = useState(() => cookies.token);

  const login = (token) => {
    
      setCookie("token", token, { path: "/" });
      setAuthToken(token);
    
  };

  const logout = () => {
    
      setCookie("token", null, { path: "/" });
      setAuthToken(null);
    
  };

  const isLoggedIn = () => {
    return !!authToken;
  };

  return (
    <AuthContext.Provider value={{ authToken, login, logout, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
