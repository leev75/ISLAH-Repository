"use client";
import { useCookies } from "react-cookie";
import { createContext, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";

// Create the context
const ManagerAuthContext = createContext(null);

// Export the context so it can be used by other components
export default ManagerAuthContext;

// Create a custom hook for easier consumption of the context
export const useManagerAuth = () => useContext(ManagerAuthContext);

// Provider component
export const ManagerAuthProvider = ({ children }) => {
  const [cookies, setCookie] = useCookies([
    "managerAuthToken",
    "managerCategory",
  ]);

  const [managerAuthToken, setManagerAuthToken] = useState(
    () => cookies.managerAuthToken
  );

  const [managerCategory, setManagerCategory] = useState(
    () => cookies.managerCategory
  );

  const managerLogin = (managerToken, categorie) => {
    setCookie("managerAuthToken", managerToken, { path: "/" });
    setCookie("managerCategory", categorie, { path: "/" });
    setManagerAuthToken(managerToken);
    setManagerCategory(categorie);
  };

  const managerLogout = () => {
    setCookie("managerAuthToken", null, { path: "/" });
    setCookie("managerCategory", null, { path: "/" });
    setManagerAuthToken(null);
    setManagerCategory(null);
  };

  const isManagerLoggedIn = () => {
    return !!managerAuthToken;
  };

  return (
    <ManagerAuthContext.Provider
      value={{
        managerAuthToken,
        managerCategory,
        managerLogin,
        managerLogout,
        isManagerLoggedIn,
      }}
    >
      {children}
    </ManagerAuthContext.Provider>
  );
};
