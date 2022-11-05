import styles from './button.module.css';

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
