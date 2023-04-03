import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';
import { FormContext } from '@/contexts/FormCtx';

const FormBtn = () => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);

  if (!global.loading) {
    return (
      <button onClick={(e) => formCtx.handleSignUp(e)} className={styles.cardBtn}>
        Sign Up
      </button>
    )
  }

  if (global.loading) {
    return (
      <div className={styles.loaderWrapper}>
        <span className={styles.loader}></span>
      </div>
    )
  }
}

export default FormBtn;