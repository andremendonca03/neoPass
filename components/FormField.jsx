import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';
import { FormContext } from '@/contexts/FormCtx';
import ForgotPassword from './ForgotPassword';
import ViewHideBtns from './ViewHideBtns';

const FormField = ({label, type, state, setState}) => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);
  const router = global.useRouter();

  const formattedLabel = label.toLowerCase().replace(" ", "");
  const isForgotPasswordField = router.pathname === "/login" && formattedLabel === "password";
  const isViewHideField = formattedLabel === "password" || formattedLabel === "confirmpassword";

  function handleChangeAndValidate(e) {
    setState(e.target.value);
    formCtx.validateField(e.target);
  }

  // Check if passwords are the same
  React.useEffect(() => {
    const confirmField = document.querySelector("[data-error='confirmpassword']");

    if (confirmField && (formCtx.formConfirm.length >= 6)) {
      if (formCtx.formPassword !== formCtx.formConfirm) {
        confirmField.innerHTML = `Passwords are different`;
        confirmField.removeAttribute("hidden");
        formCtx.setFormValidity(prev => ({...prev, [`confirmpassword`]: false}));

      } else {
        confirmField.setAttribute("hidden", "");
        formCtx.setFormValidity(prev => ({...prev, [`confirmpassword`]: true}));
      }
    }
  }, [formCtx.formPassword, formCtx.formConfirm]);

  // Reset fields validity states
  React.useEffect(() => {
    function resetStates() {
      setState("");
      formCtx.setFormValidity({
        name: false,
        email: false,
        password: false,
        confirmpassword: false,
      });
    }
    return resetStates;
  }, []);

  return (
    <label htmlFor={formattedLabel} className={styles.formField}>
      {label}
      {isViewHideField && <ViewHideBtns />}

      <input type={type} name={formattedLabel} value={state} onChange={handleChangeAndValidate} />
      <span data-error={formattedLabel} hidden></span>
      
      {isForgotPasswordField && <ForgotPassword />}
    </label>
  )
}

export default FormField;