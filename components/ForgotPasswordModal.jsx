import React from 'react';
import styles from "@/styles/ForgotPassword.module.scss";
import { GlobalContext } from '@/GlobalContext';

const ForgotPasswordModal = () => {
  const global = React.useContext(GlobalContext);

  function handleChange(e) {
    global.setEmailForgotPassword(e.target.value);
  }

  React.useEffect(() => {
    const modal = document.querySelector('[data-modal="forgotPassword"]');
    modal.classList.toggle("active");
  }, [global.forgotPasswordModal]);

  return (
    <>
      <form className={styles.modal} data-modal="forgotPassword">
        <h2 className={styles.modalTitle}>Reset Password</h2>
        <label htmlFor="email" className={styles.modalField}>
          Enter your email address:
          <input type="email" onChange={handleChange} />
        </label>
        <button>Send Password Reset</button>
      </form>
    </>
  )
}

export default ForgotPasswordModal;