import React from 'react';
import styles from "@/styles/Form.module.scss";
import { GlobalContext } from '@/GlobalContext';

import FormField from '@/components/FormField';
import ForgotPasswordModal from '@/components/ForgotPasswordModal';

const Login = () => {
  const global = React.useContext(GlobalContext);
  const router = global.useRouter();

  async function handleLogin(e) {
    e.preventDefault();

    global.setFormValidity(prev => ({...prev, name: true, confirmpassword: true}));
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
      const fields = ["email", "password"];
      const elements = fields.map(item => document.getElementsByName(item)[0]);
      
      elements.forEach(item => {
        item.setAttribute("data-shake", "");
        global.validateField(item);
      });
    }
  }

  return (
    <>
      <section className={styles.formBg}>
        <div className={styles.form}>
          <form className={styles.formCard} onSubmit={handleLogin}>
            <h1 className={styles.cardTitle}>
              Login
            </h1>
            <FormField label="Email" type="email" state={global.formEmail} setState={global.setFormEmail} />

            <FormField label="Password" type="text" state={global.formPassword} setState={global.setFormPassword} />

            <button onClick={handleLogin} className={styles.cardBtn}>Login</button>

            <strong className={styles.cardAlt}>Don’t have an account? <global.Link href="/signup">Sign Up</global.Link></strong>
          </form>
          <ForgotPasswordModal />
          <div className={styles.loginImage}>
            <global.Image src="/login-img.svg" alt='Woman in Purple signing up for NeoPass Password Management' width={316} height={330} priority="true" />
          </div>
        </div>
      </section>
    </>
  )
}

export default Login;