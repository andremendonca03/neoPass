import React, { useState } from "react";
import { db, auth } from "@/firebase-config";
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, sendPasswordResetEmail } from "firebase/auth";
import Link from "next/link";
import Image from 'next/image';
import { useRouter } from "next/router";

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [loading, setLoading] = useState(null);

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
        sendPasswordResetEmail,
        Link,
        Image,
        useRouter,
        //--> Custom <--//
        loading,
        setLoading,
        usersCollection,
        
        
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
