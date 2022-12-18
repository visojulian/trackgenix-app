import styles from './button.module.css';

const ButtonAdd = ({ text, onClick, type, variant }) => {
  return (
    <button type={type} className={variant == 'main' ? styles.main : styles.form} onClick={onClick}>
      {text}
    </button>
  );
};

export default ButtonAdd;
