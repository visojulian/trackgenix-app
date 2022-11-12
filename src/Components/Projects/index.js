import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from '../../redux/projects/actions';
import styles from './projects.module.css';
import Table from '../Shared/Table';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';

const Projects = () => {
  const history = useHistory();
  // const [projectId, setProjectId] = useState();
  const [showModal, setShowModal] = useState(false);
  const values = ['name', 'clientName', 'description', 'startDate'];
  const headers = ['Name', 'Client Name', 'Description', 'Start Date'];

  const { list: projects } = useSelector((state) => state.projects);
  const dispatch = useDispatch();

  const project = useSelector((state) => state.projects.list);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const deleteProject = async () => {
    // saveProjects([...projects.filter((project) => project._id !== projectId)]);
    // await fetch(`${process.env.REACT_APP_API_URL}/projects/${projectId}`, {
    //   method: 'DELETE'
    // });
  };

  const onDelete = (id, showModal) => {
    // setProjectId(id);
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
      <ul>
        {project.map((item) => {
          <li>{item.description}</li>;
        })}
      </ul>
    </div>
  );
};

export default Projects;
