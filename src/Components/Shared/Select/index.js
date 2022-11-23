import styles from './select.module.css';

const Select = ({ name, placeholder, data, register, error }) => {
  return (
    <div className={styles.box}>
      <select name={name} className={styles.select} {...register(name)}>
        <option hidden value="">
          {placeholder}
        </option>
        {data.map((item, index) => {
          return (
            <option key={index} value={item.id}>
              {item.value}
            </option>
          );
        })}
      </select>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Select;
