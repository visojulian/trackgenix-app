import styles from './projects.module.css';

function Projects() {
  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <a className={styles.button} href="/projects/form">
        Add New Project
      </a>
    </section>
  );
}

export default Projects;
