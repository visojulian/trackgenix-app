import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { Button, Modal, Spinner, Table } from 'Components/Shared';
import styles from './projects.module.css';

const Projects = () => {
  const { id } = useParams();
  const history = useHistory();
  const { list: projects, isLoading, error } = useSelector((state) => state.projects);
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
  const token = sessionStorage.getItem('token');

  useEffect(() => {
    dispatch(getProjects(token));
  }, []);

  const newArr = () => {
    const newArr = [];
    projects.map((project) => {
      const employeeProjects = project.employees.find((employee) => employee.employee === id);
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

  if (error) {
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

  if (isLoading) {
    return <Spinner isLoading={isLoading} />;
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
