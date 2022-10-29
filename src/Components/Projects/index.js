import { useEffect, useState } from 'react';
import styles from './projects.module.css';

function Projects() {
  const [projects, saveProjects] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);
  return (
    <section className={styles.container}>
      {projects.map((project) => (
        <div key={project._id}>
          <h2>{project.name}</h2>
          <p>{project.clientName}</p>
        </div>
      ))}
    </section>
  );
}

export default Projects;
