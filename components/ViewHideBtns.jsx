import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';
import { FormContext } from '@/contexts/FormCtx';

const ForgotPassword = () => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);


  function handleChange() {
    const fieldsPassword = Array.from(document.getElementsByName("password"));
    const fieldsConfirm = Array.from(document.getElementsByName("confirmpassword"));
    const allFields = fieldsPassword.concat(fieldsConfirm);

    if (formCtx.isPasswordVisible) {
      allFields.forEach(item => {
        item.setAttribute("type", "password");
      });
    } else {
      allFields.forEach(item => {
        item.setAttribute("type", "text");
      });
    }
    formCtx.setIsPasswordVisible(prev => !prev);
  }

  // Reset view/hide actions
  React.useEffect(() => {
    function resetBtns() {
      formCtx.setIsPasswordVisible(false);
    }
    return resetBtns;
  }, []);

  return (
    <button type='button' tabIndex="-1" className={styles.viewHidePasswordBtn} onClick={handleChange}>
      {formCtx.isPasswordVisible
        ?
        <global.Image src="/hide-password-icon.svg" alt="Hide Password" width={19} height={18} className={styles.hidePasswordBtn} />
        :
        <global.Image src="/view-password-icon.svg" alt="View Password" width={19} height={16} className={styles.viewPasswordBtn} />
      }
    </button>
  )
}

export default ForgotPassword;