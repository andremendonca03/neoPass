import React, { useState } from "react";
import { db, auth } from "@/firebase-config";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import Image from 'next/image';
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
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

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
    function areSamePasswords() {
      const isSame = formPassword === element.value;
      return isSame;
    }

    setFormValidity(prev => ({...prev, [`${field}`]: false}));
    error.removeAttribute("hidden");

    if (element.value === "") {
      error.innerHTML = `Fill out the field`;
    } else if (field === "email" && !isValidEmail()) {
      error.innerHTML = `Enter a Valid Email Address`;
    } else if (field === "password" && !isValidPassword()) {
      error.innerHTML = `Password must have at least 6 characters`;
    } else if (field === "confirmpassword" && !areSamePasswords()) {
      error.innerHTML = `Passwords are different`;
    } else {
      error.innerHTML = "";
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
        sendPasswordResetEmail,
        Link,
        Image,
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
        forgotPasswordModal,
        setForgotPasswordModal,
        forgotPasswordEmail,
        setForgotPasswordEmail,
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
