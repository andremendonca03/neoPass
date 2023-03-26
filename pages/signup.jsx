import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';

import Link from 'next/link';
import Image from 'next/image';
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
      <section className={styles.formBg}>
        <div className={styles.form}>
          <form className={styles.formCard} onSubmit={handleSignUp}>
            <h1 className={styles.cardTitle}>
              Sign Up
            </h1>
            <FormField label="Name" type="text" state={global.formName} setState={global.setFormName} />

            <FormField label="Email" type="email" state={global.formEmail} setState={global.setFormEmail} />

            <FormField label="Password" type="text" state={global.formPassword} setState={global.setFormPassword} />

            <FormField label="Confirm Password" type="text" state={global.formConfirm} setState={global.setFormConfirm} />

            <button onClick={handleSignUp} className={styles.cardBtn}>Sign Up</button>

            <strong className={styles.cardAlt}>Already have an account? <Link href="/login">Login</Link></strong>
          </form>
          <div className={styles.signUpImage}>
            <Image src="/signup-img.svg" alt='Woman in Purple signing up for NeoPass Password Management' width={410} height={286} />
          </div>
        </div>
      </section>
    </>
  )
}

export default SignUp;