import styles from './formTitle.module.css';

function FormTitle(props) {
  return <h3 className={styles.title}>{props.title}</h3>;
}

export default FormTitle;
