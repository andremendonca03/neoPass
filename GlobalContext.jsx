import React, { useState } from "react";
import { db, auth } from "@/firebase-config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/router";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirm, setFormConfirm] = useState("");

  return (
    <GlobalContext.Provider
      value={{
        db,
        auth,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        useRouter,
        formEmail,
        setFormEmail,
        formPassword,
        setFormPassword,
        formConfirm,
        setFormConfirm,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
