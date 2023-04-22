import React from "react";
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from "@/GlobalContext";
import { FormContext } from "@/contexts/FormCtx";

const FormBtn = ({ type }) => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);

  if (!global.loading) {
    if (type === "login") {
      return (
        <button
          onClick={(e) => formCtx.handleLogin(e)}
          className={styles.cardBtn}
        >
          Login
        </button>
      );
    }
    if (type === "signup") {
      return (
        <button
          onClick={(e) => formCtx.handleSignUp(e)}
          className={styles.cardBtn}
        >
          Sign Up
        </button>
      );
    }
  }

  if (global.loading) {
    return (
      <div className={styles.loaderWrapper}>
        <global.Image
          src="/logo-single-alt.svg"
          alt="Loading Spinner"
          width={26}
          height={26}
          className={styles.loader}
        />
      </div>
    );
  }
};

export default FormBtn;
