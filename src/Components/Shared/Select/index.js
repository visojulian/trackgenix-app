import styles from './select.module.css';

const Select = ({ children, name, value, whenSelect, placeholder }) => {
  return (
    <select name={name} value={value} onChange={whenSelect} className={styles.select}>
      <option hidden value="">
        {placeholder}
      </option>
      {children}
    </select>
  );
};

export default Select;
