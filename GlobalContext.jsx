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

  function validateField(element) {
    const field = element.name;
    const error = element.nextElementSibling;

    function isValidEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(element.value);
    }
    function isValidPassword() {
      const long = element.value.length >= 6;
      return long;
    }
    function isSamePasswords() {
      const isSame = formPassword === element.value;
      return isSame;
    }

    setFormValidity(prev => ({...prev, [`${field}`]: false}));

    if (element.value === "") {
      error.innerHTML = `Fill out the field`;
      error.removeAttribute("hidden");
    } else if (field === "email" && !isValidEmail()) {
      error.innerHTML = `Enter a Valid Email Address`;
      error.removeAttribute("hidden");
    } else if (field === "password" && !isValidPassword()) {
      error.innerHTML = `Password must have at least 6 characters`;
      error.removeAttribute("hidden");
    } else if (field === "confirmpassword" && !isSamePasswords()) {
      error.innerHTML = `Passwords are different`;
      error.removeAttribute("hidden");
    } else {
      error.setAttribute("hidden", "");
      setFormValidity(prev => ({...prev, [`${field}`]: true}));
    }
  }

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
        validateField,

      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
