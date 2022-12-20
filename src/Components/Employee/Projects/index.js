import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteProject, getProjects } from 'redux/projects/thunks';
import { Button, Modal, Spinner, Table } from 'Components/Shared';
import styles from './projects.module.css';

const Projects = () => {
  const history = useHistory();
  const {
    list: projects,
    isLoading: projectsIsLoading,
    error: projectsError
  } = useSelector((state) => state.projects);
  const { user, isLoading: userIsLoading, error: userError } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [projectId, setProjectId] = useState();
  const [onlyManager, setOnlyManager] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [isManager, setIsManager] = useState(false);
  const values = ['name', 'clientName', 'description', 'startDate', 'endDate', 'role', 'rate'];
  const headers = [
    'Project Name',
    'Client Name',
    'Description',
    'Start Date',
    'End Date',
    'Role',
    'Rate'
  ];

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  useEffect(() => {
    if (onlyManager) {
      setTableData(tableData.filter((project) => project.role === 'PM'));
    } else {
      setTableData(
        employeeProjects.map((project) => {
          project.employees.role === 'PM' && setIsManager(true);
          return {
            _id: project._id,
            name: project.name,
            clientName: project.clientName,
            description: project.description,
            role: project.employees.role,
            rate: project.employees.rate,
            endDate: project.endDate,
            startDate: project.startDate
          };
        })
      );
    }
  }, [projects, onlyManager]);

  const newArr = () => {
    const newArr = [];
    projects.map((project) => {
      const employeeProjects = project.employees.find((employee) => employee.employee === user._id);
      if (employeeProjects) {
        newArr.push({ ...project, employees: employeeProjects });
      }
    });
    return newArr;
  };

  const employeeProjects = newArr();

  const handleRowClick = (id) => {
    const role = employeeProjects.find((project) => project._id === id).employees.role;
    if (role === 'PM') {
      history.push(`projects/form/${id}`);
    }
  };

  const onDelete = (id, showModal) => {
    if (employeeProjects.find((project) => project._id === id).employees.role === 'PM') {
      setProjectId(id);
      setShowModal(showModal);
    }
  };

  if (projectsError || userError) {
    return (
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
        isActionModal={false}
        action={() => history.goBack()}
      >
        There was an error
      </Modal>
    );
  }

  if (projectsIsLoading || userIsLoading) {
    return <Spinner isLoading={true} />;
  }
  return (
    <div className={styles.container}>
      <h1>Projects</h1>
      {isManager && (
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id="onlyManager"
            value={onlyManager}
            onClick={() => setOnlyManager(!onlyManager)}
          />
          <label htmlFor="onlyManager" className={styles.label}>
            Show only my PM projects
          </label>
        </div>
      )}
      <Table
        data={tableData}
        headers={headers}
        values={values}
        onDelete={onDelete}
        onRowClick={handleRowClick}
        showDelete={true}
      />
      <Modal
        isOpen={showModal}
        handleClose={setShowModal}
        isActionModal={true}
        action={() => projectId && dispatch(deleteProject(projectId))}
        actionButton="Delete"
      >
        <div>
          <h4>Delete Project</h4>
          <p>Are you sure you want to remove project?</p>
          <p>Changes cannot be undone.</p>
        </div>
      </Modal>
      <div className={styles.buttonGoBack}>
        <Button
          text="Go Back"
          type="button"
          variant="secondary"
          onClick={() => {
            history.goBack();
          }}
        />
      </div>
      <div className={styles.buttonGoBack}></div>
    </div>
  );
};

export default Projects;
