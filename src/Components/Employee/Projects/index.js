import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { Button, Modal, Spinner, Table } from 'Components/Shared';
import styles from './projects.module.css';
import { getUserProfile } from 'redux/user/thunks';

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
    dispatch(getUserProfile());
  }, []);

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
  const tableData = employeeProjects.map((project) => {
    return {
      name: project.name,
      clientName: project.clientName,
      description: project.description,
      role: project.employees.role,
      rate: project.employees.rate,
      endDate: project.endDate,
      startDate: project.startDate
    };
  });

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
      <Table
        data={tableData}
        headers={headers}
        values={values}
        onDelete={() => {}}
        onRowClick={() => {}}
      />
      <Button
        text="Go Back"
        type="button"
        variant="secondary"
        onClick={() => {
          history.goBack();
        }}
      />
    </div>
  );
};

export default Projects;
