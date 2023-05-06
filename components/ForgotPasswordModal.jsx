import React from "react";
import styles from "@/styles/ForgotPassword.module.scss";
import { GlobalContext } from "@/GlobalContext";
import { FormContext } from "@/contexts/FormCtx";
import FormBtn from "./FormBtn";

const ForgotPasswordModal = () => {
  const formCtx = React.useContext(FormContext);

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      formCtx.setForgotPasswordModal(false);
      formCtx.setForgotPasswordEmail("");
      formCtx.setResetPasswordRequest(false);
    }
  }

  function updateEmail(e) {
    formCtx.setForgotPasswordEmail(e.target.value);
  }

  return (
    <div
      className={styles.modalWrapper}
      data-modal="forgotPassword"
      onClick={closeModal}
    >
      <form
        className={styles.modal}
        onSubmit={(e) => formCtx.handleResetPassword(e)}
      >
        <h2 className={styles.modalTitle}>Reset Password</h2>

        {!formCtx.resetPasswordRequest && (
          <>
            <label htmlFor="email" className={styles.modalField}>
              Enter your email address:
              <input
                type="email"
                value={formCtx.forgotPasswordEmail}
                required
                onChange={updateEmail}
              />
            </label>
            <FormBtn type="reset" />
          </>
        )}

        {formCtx.resetPasswordRequest && (
          <p className={styles.successMessage}>
            Password reset request sent to your email!
          </p>
        )}

        <button
          type="button"
          role="button"
          aria-roledescription="Close Modal"
          className={styles.modalClose}
          onClick={closeModal}
        ></button>
      </form>
    </div>
  );
};

export default ForgotPasswordModal;
