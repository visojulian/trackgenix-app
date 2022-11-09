import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Projects = () => {
  const history = useHistory();
  const [projects, saveProjects] = useState([]);
  const [projectId, setProjectId] = useState();
  const [showModal, setShowModal] = useState(false);
  const values = ['name', 'clientName', 'description', 'startDate'];
  const headers = ['Name', 'Client Name', 'Description', 'Start Date'];

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        saveProjects(response.data);
      });
  }, []);

  const deleteProject = async () => {
    saveProjects([...projects.filter((project) => project._id !== projectId)]);
    await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
      method: 'DELETE'
    });
  };

  const onDelete = (id, showModal) => {
    setProjectId(id);
    setShowModal(showModal);
  };

  const onRowClick = (id) => {
    history.push(`/projects/form/${id}`);
  };

  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      <Table
        data={projects}
        headers={headers}
        values={values}
        onDelete={onDelete}
        onRowClick={onRowClick}
      />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={deleteProject}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Project</h4>
          <p>Are you sure you want to remove project?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <Button
        text="Add New Project"
        type="submit"
        variant="primary"
        onClick={() => {
          history.push(`/projects/form`);
        }}
      />
    </div>
  );
};

export default Projects;
