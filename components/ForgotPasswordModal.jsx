import React from "react";
import styles from "@/styles/ForgotPassword.module.scss";
import { GlobalContext } from "@/GlobalContext";
import { FormContext } from "@/contexts/FormCtx";
import FormBtn from "./FormBtn";

const ForgotPasswordModal = () => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);

  const [successfulRequest, setSuccessfulRequest] = React.useState(false);

  function closeModal(e) {
    if (e.target === e.currentTarget) {
      formCtx.setForgotPasswordModal(false);
      formCtx.setForgotPasswordEmail("");
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

        {!successfulRequest && (
          <>
            <label htmlFor="email" className={styles.modalField}>
              Enter your email address:
              <input
                type="email"
                value={formCtx.forgotPasswordEmail}
                required
                onChange={updateEmail}
              />
              <span data-error hidden></span>
            </label>
            <FormBtn type="reset" />
          </>
        )}

        {successfulRequest && (
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
