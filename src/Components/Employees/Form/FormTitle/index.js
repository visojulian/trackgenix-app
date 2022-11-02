import styles from '../FormTitle/formTitle.module.css';

function FormTitle({ formTitle }) {
  return <h3 className={styles.title}>{formTitle}</h3>;
}

export default FormTitle;
