import { useEffect, useState } from 'react';
import styles from './form.module.css';
import Delete from '../assets/trash.png';
import Button from '../../Shared/Button';
import Select from '../../Shared/Select';

const ProjectForm = () => {
  const [projectEmployees, setProjectEmployees] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState();
  const [nameValue, setNameValue] = useState();
  const [descriptionValue, setDescriptionValue] = useState();
  const [clientValue, setClientValue] = useState();
  const [startDateValue, setStartDateValue] = useState();
  const [endDateValue, setEndDateValue] = useState();
  const [roleValue, setRoleValue] = useState();
  const [rateValue, setRateValue] = useState();
  const [isEditing, setIsEditing] = useState();
  const roles = ['PM', 'QA', 'DEV', 'TL'];

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

  const onChangeRateInput = (event) => {
    setRateValue(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleValue(event.target.value);
  };

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    setProjectEmployees([
      ...projectEmployees,
      {
        employee: selectedEmployee,
        rate: rateValue,
        role: roleValue
      }
    ]);
  };

  const handleDelete = (index) => {
    const newProjectEmployees = [...projectEmployees];
    newProjectEmployees.splice(index, 1);
    setProjectEmployees(newProjectEmployees);
  };

  const onCancel = () => {
    window.location.assign('/projects');
  };

  const onSubmit = () => {
    const body = JSON.stringify({
      employees: projectEmployees,
      name: nameValue,
      startDate: startDateValue,
      endDate: endDateValue,
      description: descriptionValue,
      clientName: clientValue
    });

    if (isEditing) {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const id = urlSearchParams.get('id');
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}/update`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((error) => alert(error));
    } else {
      fetch(`${process.env.REACT_APP_API_URL}/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body
      })
        .then((response) => response.json())
        .then((response) => console.log(response))
        .catch((error) => alert(error));
    }
    window.location.assign('/projects');
  };

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const id = urlSearchParams.get('id');
    if (id) {
      fetch(`${process.env.REACT_APP_API_URL}/projects/${id}`)
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) {
            const employeeList = response.data.employees.map((item) => {
              return {
                employee: item.employee,
                role: item.role,
                rate: item.rate
              };
            });
            setNameValue(response.data.name);
            setClientValue(response.data.clientName);
            setStartDateValue(response.data.startDate);
            setEndDateValue(response.data.endDate);
            setDescriptionValue(response.data.description);
            setProjectEmployees(employeeList);
          }
          setIsEditing(true);
        })
        .catch((error) => alert(error));
    }
  }, []);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => alert(error));
  }, []);

  return (
    <form className={styles.container}>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          name="name"
          placeholder="Project name"
          required
          value={nameValue}
          onChange={onChangeNameInput}
        />
      </div>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="name">
          Client name:
        </label>
        <input
          id="client"
          name="client"
          placeholder="Client name"
          required
          value={clientValue}
          onChange={onChangeClientInput}
        />
      </div>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="description">
          Description:
        </label>
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          required
          value={descriptionValue}
          onChange={onChangeDescriptionInput}
        />
      </div>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="startDate">
          Start date:
        </label>
        <input
          id="startDate"
          name="startDate"
          placeholder="Start date"
          required
          type="date"
          value={startDateValue}
          onChange={onChangeStartDateInput}
        />
      </div>
      <div className={styles.labelContainer}>
        <label className={styles.label} htmlFor="endDate">
          End date:
        </label>
        <input
          id="endDate"
          name="endDate"
          placeholder="End date"
          required
          type="date"
          value={endDateValue}
          onChange={onChangeEndDateInput}
        />
      </div>
      <div className={styles.listContainer}>
        <div>
          <h4>Employees</h4>
          <div>
            <div className={styles.newEmployeeInputs}>
              {/* <select required onChange={handleEmployeeChange}>
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </select> */}
              <Select
                placeholder="Select an employee"
                name="employee"
                required
                whenSelect={handleEmployeeChange}
              >
                {employees.map((employee) => (
                  <option key={employee._id} value={employee._id}>
                    {employee.name}
                  </option>
                ))}
              </Select>
              {/* <select required value={roleValue} onChange={handleRoleChange}>
                {roles.map((role, index) => (
                  <option key={index}>{role}</option>
                ))}
              </select> */}
              <Select
                placeholder="Select role"
                name="role"
                value={roleValue}
                required
                whenSelect={handleRoleChange}
              >
                {roles.map((role, index) => (
                  <option key={index}>{role}</option>
                ))}
              </Select>
              <input
                id="rate"
                name="rate"
                placeholder="Rate:"
                required
                value={rateValue}
                onChange={onChangeRateInput}
              />
            </div>
            {/* <button className={styles.newEmployeeButton} onClick={addEmployee}>
              Assign new employee
            </button> */}
            <Button text="Assign new employee" whenClicked={addEmployee} />
          </div>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employee</th>
                <th>Role</th>
                <th>Rate</th>
                <th>
                  <img src={Delete}></img>
                </th>
              </tr>
            </thead>
            <tbody>
              {projectEmployees.map((employee, index) => {
                const selectedEmployee = employees.find((item) => item._id === employee.employee);
                if (selectedEmployee !== undefined) {
                  return (
                    <tr key={index}>
                      <td>{selectedEmployee.name}</td>
                      <td>{employee.role}</td>
                      <td>{employee.rate}</td>
                      <td>
                        {/* <button onClick={() => handleDelete(index)}>&times;</button> */}
                        <Button
                          text="&times;"
                          whenClicked={() => {
                            handleDelete(index);
                          }}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.formButtons}>
          {/* <button className={styles.cancel} onClick={onCancel}>
            Cancel
          </button> */}
          <Button text="Cancel" type="button" whenClicked={onCancel} />
          {/* <button className={styles.button} onClick={onSubmit}>
            Submit
          </button> */}
          <Button text="Submit" whenClicked={onSubmit} />
        </div>
      </div>
    </form>
  );
};

export default ProjectForm;
