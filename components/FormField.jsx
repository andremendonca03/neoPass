import React from 'react';
import styles from "@/styles/SignUp.module.scss";
import { GlobalContext } from '@/GlobalContext';

const FormField = ({label, type, state, setState}) => {
  const global = React.useContext(GlobalContext)

  const formattedLabel = label.toLowerCase().replace(" ", "");

  function handleChangeAndValidate(e) {
    const field = e.target.name;
    const error = e.target.nextElementSibling;

    function isValidEmail() {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(e.target.value);
    }
    function isValidPassword() {
      const long = e.target.value.length >= 6;
      return long;
    }
    function isSamePasswords() {
      const isSame = global.formPassword === e.target.value;
      return isSame;
    }

    setState(e.target.value);
    global.setFormValidity(prev => ({...prev, [`${field}`]: false}));

    if (e.target.value === "") {
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
      global.setFormValidity(prev => ({...prev, [`${field}`]: true}));
    }
  }

  React.useEffect(() => {
    const confirmField = document.querySelector("[data-error='confirmpassword']");

    if (confirmField && (global.formConfirm.length >= 6)) {
      if (global.formPassword !== global.formConfirm) {
        confirmField.innerHTML = `Passwords are different`;
        confirmField.removeAttribute("hidden");
        global.setFormValidity(prev => ({...prev, [`confirmpassword`]: false}));

      } else {
        confirmField.setAttribute("hidden", "");
        global.setFormValidity(prev => ({...prev, [`confirmpassword`]: true}));
      }
    }
  }, [global.formPassword, global.formConfirm]);

  return (
    <label htmlFor={formattedLabel} className={styles.formField}>
      {label}
      <input type={type} name={formattedLabel} value={state} onChange={handleChangeAndValidate} />
      <span data-error={formattedLabel} hidden></span>
    </label>
  )
}

export default FormField;