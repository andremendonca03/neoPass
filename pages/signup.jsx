import React from 'react';
import styles from "@/styles/SignUp.module.scss";
import { GlobalContext } from '@/GlobalContext';

import Link from 'next/link';
import { useRouter } from 'next/router';
import FormField from '@/components/FormField';

const SignUp = () => {
  const global = React.useContext(GlobalContext);
  const router = useRouter();

  async function handleSignUp(e) {
    e.preventDefault();

    const areFieldsValid = !Object.values(global.formValidity).includes(false);

    if (areFieldsValid) {
      try {
        const {user} = await global.createUserWithEmailAndPassword(global.auth, global.formEmail, global.formPassword);
  
        await global.addDoc(global.usersCollection, {
          email: global.formEmail,
          password: global.formPassword,
          name: global.formName,
          uid: user.uid,
          signedUp: new Date().toUTCString(),
          isEmailVerified: user.emailVerified,
        });

        router.push("/console");
      } catch(err) {
        if (err.message.includes("auth/invalid-email")) {
          window.alert("Invalid email. Please, enter a valid email address");
        } else if (err.message.includes("auth/email-already-in-use")) {
          window.alert("Email address already in use");
        } else {
          window.alert(err.message);
        }
      }
    } else {
      const fields = Object.keys(global.formValidity);
      const elements = fields.map(item => document.getElementsByName(item)[0]);
      elements.forEach(item => global.validateField(item));
    }
  }

  return (
    <>
      <section className={styles.signUpBg}>
        <div className={styles.signUp}>
          <form className={styles.signUpForm} onSubmit={handleSignUp}>
            <h1 className={styles.formTitle}>
              Sign Up
            </h1>
            <FormField label="Name" type="text" state={global.formName} setState={global.setFormName} />

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