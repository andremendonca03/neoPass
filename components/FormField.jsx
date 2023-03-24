import React from 'react';
import styles from "@/styles/SignUp.module.scss";

const FormField = ({label, type, state, setState}) => {

  function handleChange(e) {
    setState(e.target.value);
    console.log(state)
  }

  return (
    <label htmlFor={label.toLowerCase().replace(" ", "")} className={styles.formField}>
      {label}
      <input type={type} name={label.toLowerCase().replace(" ", "")} value={state} onChange={handleChange} />
    </label>
  )
}

export default FormField;