import React from 'react';
import styles from "@/styles/ForgotPassword.module.scss";
import { FormContext } from '@/contexts/FormCtx';

const ForgotPassword = () => {
  const formCtx = React.useContext(FormContext);

  function openModal() {
    formCtx.setForgotPasswordModal(true);
  }

  return (
    <span className={styles.forgotPasswordBtn} onClick={openModal} >
      Forgot Password?
    </span>
  )
}

export default ForgotPassword;