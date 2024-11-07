// UserContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "./firebase";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [redirectAfterLogin, setRedirectPath] = useState(localStorage.getItem('redirectAfterLogin') || null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, [auth]);

  const logout = async () => {
    await signOut(auth);
    setUser(null);
  };

  const setRedirect = (path) => {
    setRedirectPath(path);
    localStorage.setItem('redirectAfterLogin', path); 
  };


  return (
    <UserContext.Provider value={{ user, logout, redirectAfterLogin, setRedirectPath}}>
      {children}
    </UserContext.Provider>
  );
};
