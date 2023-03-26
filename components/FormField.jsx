import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';

const FormField = ({label, type, state, setState}) => {
  const global = React.useContext(GlobalContext);

  const formattedLabel = label.toLowerCase().replace(" ", "");

  function handleChangeAndValidate(e) {
    setState(e.target.value);
    global.validateField(e.target);
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
    </label>
  )
}

export default FormField;