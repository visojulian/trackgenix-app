// import styles from './form.module.css';

import { useEffect, useState } from 'react';
import EmployeesList from './EmployeesList';

const ProjectForm = () => {
  const search = window.location.search;
  const [project, setProject] = useState({});
  const [nameValue, setNameValue] = useState('');
  const [descriptionValue, setDescriptionValue] = useState('');
  const [clientValue, setClientValue] = useState('');
  const [startDateValue, setStartDateValue] = useState('');
  const [endDateValue, setEndDateValue] = useState('');
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [loadEmployees, setLoadEmployees] = useState(false);

  const onChangeNameInput = (event) => {
    setNameValue(event.target.value);
  };
  const onChangeDescriptionInput = (event) => {
    setDescriptionValue(event.target.value);
  };
  const onChangeClientInput = (event) => {
    setClientValue(event.target.value);
  };
  const onChangeStartDateInput = (event) => {
    setStartDateValue(event.target.value);
  };
  const onChangeEndDateInput = (event) => {
    setEndDateValue(event.target.value);
  };

  const sendProject = () => {
    const cleanProjectEmployees = projectEmployees.map((employee) => ({
      employee: employee.employee,
      role: employee.role,
      rate: employee.rate
    }));
    const body = JSON.stringify({
      employees: cleanProjectEmployees,
      name: nameValue,
      startDate: startDateValue,
      endDate: endDateValue,
      description: descriptionValue,
      clientName: clientValue
    });

    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id=') + 3);

      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response));
    }
  };

  useEffect(() => {
    if (project._id) {
      setNameValue(project.name);
      setClientValue(project.clientName);
      setDescriptionValue(project.description);
      setStartDateValue(project.startDate.slice(0, 10));
      setEndDateValue(project.endDate.slice(0, 10));
      setProjectEmployees(project.employees);
      setLoadEmployees(true);
    }
  }, [project]);

  useEffect(() => {
    if (search.match('id=')) {
      const id = search.substring(search.indexOf('id=') + 3);

      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setProject(response.data);
        });
    }
  }, []);

  return (
    <section>
      <form>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          placeholder="Project name"
          required
          value={nameValue}
          onChange={onChangeNameInput}
        />
        <label htmlFor="name">Client name:</label>
        <input
          id="client"
          name="client"
          placeholder="Client name"
          required
          value={clientValue}
          onChange={onChangeClientInput}
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
          value={descriptionValue}
          onChange={onChangeDescriptionInput}
        />
        <label htmlFor="startDate">Start date:</label>
        <input
          id="startDate"
          name="startDate"
          placeholder="Start date"
          required
          type="date"
          value={startDateValue}
          onChange={onChangeStartDateInput}
        />
        <label htmlFor="endDate">End date:</label>
        <input
          id="endDate"
          name="endDate"
          placeholder="End date"
          required
          type="date"
          value={endDateValue}
          onChange={onChangeEndDateInput}
        />
      </form>
      <EmployeesList
        projectEmployees={projectEmployees}
        updateEmployees={setProjectEmployees}
        loaded={loadEmployees}
      />
      <button onClick={sendProject}>Add Project</button>
      <button>Cancel</button>
    </section>
  );
};

export default ProjectForm;
