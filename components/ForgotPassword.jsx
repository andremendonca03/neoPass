import React from 'react';
import styles from "@/styles/ForgotPassword.module.scss";
import { GlobalContext } from '@/GlobalContext';

const ForgotPassword = () => {
  const global = React.useContext(GlobalContext);

  function openModal() {
    if (global.forgotPasswordModal) {
      global.setForgotPasswordModal(false);
    } else {
      global.setForgotPasswordModal(true);
    }
  }

  return (
    <>
      <span className={styles.forgotPasswordBtn} onClick={openModal} >
        Forgot Password?
      </span>
    </>
  )
}

export default ForgotPassword;