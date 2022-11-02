// import styles from './employeesSelect.module.css';

const EmployeesSelect = (props) => {
  const projectEmployees = props.employees.map((employee) => ({
    name: `${employee.name} ${employee.lastName}`,
    id: employee._id
  }));

  const handleEmployeeChange = (event) => {
    const employee = projectEmployees.filter((project) => project.id == event.target.value);
    props.setNewEmployee(employee[0]);
  };

  if (props.employees.length) {
    return (
      <select required onChange={handleEmployeeChange}>
        {projectEmployees.map((employee) => (
          <option key={employee.id} value={employee.id}>
            {employee.name}
          </option>
        ))}
      </select>
    );
  }
  return (
    <select>
      <option selected disabled>
        Employee:
      </option>
    </select>
  );
};

export default EmployeesSelect;
