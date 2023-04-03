import React, { useState } from "react";
import { GlobalContext } from "@/GlobalContext";

export const FormContext = React.createContext();

export const FormContextProvider = ({ children }) => {
  const global = React.useContext(GlobalContext);
  const router = global.useRouter();

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
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [forgotPasswordModal, setForgotPasswordModal] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

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

    setFormValidity((prev) => ({ ...prev, [`${field}`]: false }));
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
      setFormValidity((prev) => ({ ...prev, [`${field}`]: true }));
    }
  }

  async function handleSignUp(e) {
    e.preventDefault();

    const areFieldsValid = !Object.values(formValidity).includes(false);

    global.setLoading(true);

    if (areFieldsValid) {
      try {
        const { user } = await global.createUserWithEmailAndPassword(
          global.auth,
          formEmail,
          formPassword
        );

        await global.addDoc(global.usersCollection, {
          email: formEmail,
          password: formPassword,
          name: formName,
          id: "l",
          uid: user.uid,
          signedUp: new Date().toUTCString(),
          isEmailVerified: user.emailVerified,
        });

        router.push("/console");
      } catch (err) {
        if (err.message.includes("auth/invalid-email")) {
          window.alert("Invalid email. Please, enter a valid email address");
        } else if (err.message.includes("auth/email-already-in-use")) {
          window.alert("Email address already in use");
        } else {
          window.alert(err.message);
        }
        global.setLoading(false);
      }
    } else {
      const fields = Object.keys(formValidity);
      const elements = fields.map(
        (item) => document.getElementsByName(item)[0]
      );

      global.setLoading(false);
      elements.forEach((item) => {
        item.classList.remove("shake");
        setTimeout(() => item.classList.add("shake"), 10);
        validateField(item);
      });
    }
  }

  async function handleLogin(e) {
    e.preventDefault();

    const areFieldsValid = formValidity.email && formValidity.password;

    global.setLoading(true);

    if (areFieldsValid) {
      try {
        const { user } = await global.signInWithEmailAndPassword(
          global.auth,
          formEmail,
          formPassword
        );

        const usersDocs = await global.getDocs(global.usersCollection);
        const { ref } = usersDocs.docs.find(
          (item) => item.data().uid === user.uid
        );

        await global.updateDoc(ref, {
          lastLogedIn: new Date().toUTCString(),
        });

        router.push("/console");
      } catch (err) {
        if (err.message.includes("auth/user-not-found")) {
          window.alert("User not Found. Please review your email address.");
        } else if (err.message.includes("auth/wrong-password")) {
          window.alert("User could not login. Please review your password.");
        } else {
          window.alert(err.message);
        }
        global.setLoading(false);
      }
    } else {
      const fields = ["email", "password"];
      const elements = fields.map(
        (item) => document.getElementsByName(item)[0]
      );

      global.setLoading(false);
      elements.forEach((item) => {
        item.classList.remove("shake");
        setTimeout(() => item.classList.add("shake"), 10);
        validateField(item);
      });
    }
  }

  return (
    <FormContext.Provider
      value={{
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
        validateField,
        forgotPasswordModal,
        setForgotPasswordModal,
        isPasswordVisible,
        setIsPasswordVisible,
        forgotPasswordEmail,
        setForgotPasswordEmail,
        handleLogin,
        handleSignUp,
      }}
    >
      {children}
    </FormContext.Provider>
  );
};

export const FormContextPathnames = ["/signup", "/login"];
