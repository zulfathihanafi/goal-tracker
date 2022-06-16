import { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "./components/firebase";

const UserContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider
      value={{user}}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(UserContext);
}