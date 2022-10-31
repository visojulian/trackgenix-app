import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import styles from './projects.module.css';
import Delete from './assets/trash.png';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [showModal, saveShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteProject = async (id) => {
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
  };

  const handleDelete = (project) => {
    setSelectedProject({ id: project._id, name: project.name });
    saveShowModal(true);
  };
  return (
    <section className={styles.container}>
      <DeleteConfirmationModal
        show={showModal}
        handleModal={saveShowModal}
        deleteProject={deleteProject}
        project={selectedProject}
      />
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>Created</th>
            <th></th>
            <th>
              <img src={Delete}></img>
            </th>
          </tr>
        </thead>
        <tbody>
          {projects.map((project) => (
            <tr key={project._id}>
              <td>{project.name}</td>
              <td>{project.startDate.slice(0, 10)}</td>
              <td className={styles.center}>&hellip;</td>
              <td className={styles.center}>
                <button onClick={() => handleDelete(project)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Projects;
