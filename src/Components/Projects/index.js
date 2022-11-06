import { useEffect, useState } from 'react';
import Delete from './assets/trash.png';
import styles from './projects.module.css';
import Modal from '../Shared/Modal';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteProject = async () => {
    const id = selectedProject.id;
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`, {
      method: 'DELETE'
    });
    saveProjects([...projects.filter((project) => project._id !== id)]);
  };

  const handleDelete = (project, event) => {
    setSelectedProject({ id: project._id, name: project.name });
    setShowModal(true);
    event.stopPropagation();
  };

  const editProject = (id) => {
    window.location.assign(`/projects/form?id=${id}`);
  };

  return (
    <section className={styles.container}>
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteProject}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Project</h4>
          <p>Are you sure you want to remove: {selectedProject.name}?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
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
            <tr key={project._id} onClick={() => editProject(project._id)}>
              <td>{project.name}</td>
              <td>{project.startDate.slice(0, 10)}</td>
              <td className={styles.center}>&hellip;</td>
              <td className={styles.center}>
                <button onClick={(e) => handleDelete(project, e)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <a className={styles.button} href="/projects/form">
        Add New Project
      </a>
    </section>
  );
};

export default Projects;
