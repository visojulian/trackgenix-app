import styles from './spinner.module.css';

const Ruedita = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.box}>
          <div className={styles.ring} />
          <div className={styles.ring} />
          <div className={styles.ring} />
          <span className={styles.loading}>Loading..</span>
        </div>
      </div>
    );
  } else return null;
};

export default Ruedita;
