import React from "react";
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from "@/GlobalContext";
import { FormContext } from "@/contexts/FormCtx";

import FormField from "@/components/FormField";
import FormBtn from "@/components/FormBtn";

const SignUp = () => {
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
            onSubmit={(e) => formCtx.handleSignUp(e)}
          >
            <h1 className={styles.cardTitle}>Sign Up</h1>

            <FormField
              label="Name"
              type="text"
              state={formCtx.formName}
              setState={formCtx.setFormName}
            />

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

            <FormField
              label="Confirm Password"
              type="password"
              state={formCtx.formConfirm}
              setState={formCtx.setFormConfirm}
            />

            <FormBtn type="signup" />

            <strong className={styles.cardAlt}>
              Already have an account?{" "}
              <global.Link href="/login">Login</global.Link>
            </strong>
          </form>
          <div className={styles.signUpImage}>
            <global.Image
              src="/signup-img.svg"
              alt="Woman in Purple signing up for NeoPass Password Management"
              width={410}
              height={286}
              priority="true"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
