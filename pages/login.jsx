import React from "react";
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from "@/GlobalContext";
import { FormContext } from "@/contexts/FormCtx";

import FormField from "@/components/FormField";
import ForgotPasswordModal from "@/components/ForgotPasswordModal";
import FormBtn from "@/components/FormBtn";

const Login = () => {
  const global = React.useContext(GlobalContext);
  const formCtx = React.useContext(FormContext);

  // Set Loading state to false after mounting and umounting the component
  React.useEffect(() => {
    global.setLoading(false);
    return () => global.setLoading(false);
  }, []);

  return (
    <>
      <section className={styles.formBg}>
        <div className={styles.form}>
          <form
            className={styles.formCard}
            onSubmit={(e) => formCtx.handleLogin(e)}
          >
            <h1 className={styles.cardTitle}>Login</h1>
            <FormField
              label="Email"
              type="email"
              state={formCtx.formEmail}
              setState={formCtx.setFormEmail}
            />

            <FormField
              label="Password"
              type="password"
              state={formCtx.formPassword}
              setState={formCtx.setFormPassword}
            />

            <FormBtn type="login" />

            <strong className={styles.cardAlt}>
              Don’t have an account?{" "}
              <global.Link href="/signup">Sign Up</global.Link>
            </strong>
          </form>

          {formCtx.forgotPasswordModal && <ForgotPasswordModal />}

          <div className={styles.loginImage}>
            <global.Image
              src="/login-img.svg"
              alt="Woman in Purple signing up for NeoPass Password Management"
              width={327}
              height={448}
              priority="true"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
