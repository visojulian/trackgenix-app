import styles from './button.module.css';

const Button = ({ text, onClick, type, variant }) => {
  return (
    <button
      type={type}
      className={variant == 'primary' ? styles.confirm : styles.cancel}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
