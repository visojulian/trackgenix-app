import styles from './text-input.module.css';

const TextInput = ({ label, id, name, type, placeholder, register, error }) => {
  return (
    <div className={styles.box}>
      <label className={styles.label}>{label}</label>
      <input
        id={id}
        name={name}
        {...register(name)}
        className={styles.input}
        type={type}
        placeholder={placeholder}
      />
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default TextInput;
