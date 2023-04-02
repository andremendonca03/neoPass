import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';

import ForgotPassword from './ForgotPassword';

const FormField = ({label, type, state, setState}) => {
  const global = React.useContext(GlobalContext);
  const router = global.useRouter();

  const formattedLabel = label.toLowerCase().replace(" ", "");
  const isForgotPasswordField = router.pathname === "/login" && formattedLabel === "password";

  function handleChangeAndValidate(e) {
    setState(e.target.value);
    global.validateField(e.target);
  }

  // Effect to check if passwords are the same
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

  // Effect to reset fields validity states
  React.useEffect(() => {
    function resetStates() {
      setState("");
      global.setFormValidity({
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
      <input type={type} name={formattedLabel} value={state} onChange={handleChangeAndValidate} />
      <span data-error={formattedLabel} hidden></span>
      {isForgotPasswordField && <ForgotPassword />}
    </label>
  )
}

export default FormField;