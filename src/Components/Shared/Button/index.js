//import { useState, useEffect } from 'react';
import styles from './button.module.css';

// text, onclick

const Button = ({ text, whenClicked, type }) => {
  return (
    <button
      type={type}
      className={type == 'submit' ? styles.confirm : styles.cancel}
      onClick={whenClicked}
    >
      {text}
    </button>
  );
};

export default Button;
