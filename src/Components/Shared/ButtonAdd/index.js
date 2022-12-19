import styles from './buttons.module.css';

const ButtonAdd = ({ text, onClick, type, variant }) => {
  return (
    <button
      type={type}
      className={variant == 'main' ? styles.main : styles.second}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default ButtonAdd;
