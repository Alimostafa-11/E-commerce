import React, { createContext, useEffect, useState } from "react";

export let UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [userLogin, setuserLogin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("userToken");

    if (token) {
      setuserLogin(token);
    }
    setIsLoading(false);
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setuserLogin, isLoading }}>
      {children}
    </UserContext.Provider>
  );
}
