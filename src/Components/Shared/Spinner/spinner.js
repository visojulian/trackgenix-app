import styles from './spinner.module.css';

const Spinner = (props) => {
  const { isLoading } = props;

  if (isLoading) {
    return (
      <div className={styles.center}>
        <div className={styles.loader} />;
      </div>
    );
  } else return null;
};

export default Spinner;
