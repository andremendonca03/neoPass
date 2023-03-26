import React, { useState } from "react";
import { db, auth } from "@/firebase-config";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, fetchSignInMethodsForEmail } from "firebase/auth";
import { useRouter } from "next/router";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formConfirm, setFormConfirm] = useState("");
  const [formValidity, setFormValidity] = useState({
    name: false,
    email: false,
    password: false,
    confirmpassword: false,
  });

  const usersCollection = collection(db, "users");

  return (
    <GlobalContext.Provider
      value={{
        db,
        auth,
        collection,
        doc,
        getDocs,
        getDoc,
        addDoc,
        updateDoc,
        deleteDoc,
        createUserWithEmailAndPassword,
        signInWithEmailAndPassword,
        onAuthStateChanged,
        signOut,
        fetchSignInMethodsForEmail,
        useRouter,
        //--> Custom <--//
        formName,
        setFormName,
        formEmail,
        setFormEmail,
        formPassword,
        setFormPassword,
        formConfirm,
        setFormConfirm,
        formValidity,
        setFormValidity,
        usersCollection,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
