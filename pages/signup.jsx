import React from 'react';
import styles from "@/styles/SignUp.module.scss";
import { GlobalContext } from '@/GlobalContext';

import Link from 'next/link';
import FormField from '@/components/FormField';

const SignUp = () => {
  const global = React.useContext(GlobalContext);

  async function handleSignUp(e) {
    e.preventDefault();
    try {
      const {user} = await global.createUserWithEmailAndPassword(global.auth, global.formEmail, global.formPassword);
      console.log(user);
    } catch(err) {
      console.error(err);
    }
  }

  return (
    <>
      <section className={styles.signUpBg}>
        <div className={styles.signUp}>
          <form className={styles.signUpForm}>
            <h1 className={styles.formTitle}>
              Sign Up
            </h1>
            <FormField label="Email" type="email" state={global.formEmail} setState={global.setFormEmail} />

            <FormField label="Password" type="text" state={global.formPassword} setState={global.setFormPassword} />

            <FormField label="Confirm Password" type="text" state={global.formConfirm} setState={global.setFormConfirm} />

            <button onClick={handleSignUp} className={styles.formBtn}>Sign Up</button>

            <strong className={styles.formAlt}>Already have an account? <Link href="/login">Login</Link></strong>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp;