import styles from './text-input.module.css';

const Input = ({ children, id, name, value, onChange, type, placeholder }) => {
  return (
    <div className={styles.box}>
      <label className={styles.label}>{children}</label>
      <input
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        className={styles.input}
        type={type}
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
