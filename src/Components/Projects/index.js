import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import styles from './projects.module.css';
import Table from '../Shared/Table';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [showModal, saveShowModal] = useState(false);
  const headers = ['name', 'clientName', 'description', 'startDate'];

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

  return (
    <section className={styles.container}>
      <DeleteConfirmationModal
        show={showModal}
        handleModal={saveShowModal}
        deleteEntity={deleteProject}
        projectId={projectId}
      />
      <Table
        data={projects}
        headers={headers}
        setDelete={setProjectId}
        setModal={saveShowModal}
        url={'projects'}
      />
      <a className={styles.button} href="/projects/form">
        Add New Project
      </a>
    </section>
  );
};

export default Projects;
