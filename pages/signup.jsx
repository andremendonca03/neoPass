import React from 'react';
import styles from "@/styles/SignUp.module.scss";
import { GlobalContext } from '@/GlobalContext';

import Link from 'next/link';
import FormField from '@/components/FormField';

const SignUp = () => {
  const global = React.useContext(GlobalContext);

  function checkName() {
    return !!global.formName;
  }

  async function checkEmail() {

  }

  function checkPassword() {
    const isSame = global.formPassword === global.formConfirm;

    return true

  }

  function checkFields(e) {
    e.preventDefault();
    if (checkName() && checkEmail() && checkPassword()) {
      handleSignUp();
    } else {
      window.alert("Please, fill out the form with valid information");
    }
  }

  async function handleSignUp() {
    try {
      const {user} = await global.createUserWithEmailAndPassword(global.auth, global.formEmail, global.formPassword);

      await global.addDoc(global.usersCollection, {
        email: global.formEmail,
        password: global.formPassword,
        name: global.formName,

      });
      
    } catch(err) {
      console.log(err.message);
      if (err.message.includes("auth/invalid-email")) {
        const error = document.querySelector(`[data-error="email"]`);
        error.innerHTML = "Enter a valid email address";
        error.style.display = "block";
      } else {
        window.alert(err.message);
      }
    }
  }

  return (
    <>
      <section className={styles.signUpBg}>
        <div className={styles.signUp}>
          <form className={styles.signUpForm} onSubmit={checkFields}>
            <h1 className={styles.formTitle}>
              Sign Up
            </h1>
            <FormField label="Name" type="text" state={global.formName} setState={global.setFormName} />

            <FormField label="Email" type="email" state={global.formEmail} setState={global.setFormEmail} />

            <FormField label="Password" type="text" state={global.formPassword} setState={global.setFormPassword} />

            <FormField label="Confirm Password" type="text" state={global.formConfirm} setState={global.setFormConfirm} />

            <button onClick={checkFields} className={styles.formBtn}>Sign Up</button>

            <strong className={styles.formAlt}>Already have an account? <Link href="/login">Login</Link></strong>
          </form>
        </div>
      </section>
    </>
  )
}

export default SignUp;