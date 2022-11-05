//import { useState, useEffect } from 'react';
import styles from './select.module.css';

// text, onclick

const Select = ({ children, name, value, whenSelect, placeholder }) => {
  return (
    <select name={name} value={value} onChange={whenSelect} className={styles.select}>
      <option disabled selected value="">
        {placeholder}
      </option>
      {children}
    </select>
  );
};

export default Select;
