import { useEffect, useState } from 'react';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import styles from './projects.module.css';
import Table from '../Shared/Table';

const Projects = () => {
  const [projects, saveProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [showModal, setShowModal] = useState(false);
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

  const onDelete = (id, showModal) => {
    setProjectId(id);
    setShowModal(showModal);
  };

  const onClickEntity = (id) => {
    window.location.assign(`/projects/form?id=${id}`);
  };

  return (
    <section className={styles.container}>
      <DeleteConfirmationModal
        show={showModal}
        handleModal={setShowModal}
        deleteEntity={deleteProject}
        projectId={projectId}
      />
      <Table data={projects} headers={headers} onDelete={onDelete} onClickEntity={onClickEntity} />
      <a className={styles.button} href="/projects/form">
        Add New Project
      </a>
    </section>
  );
};

export default Projects;
