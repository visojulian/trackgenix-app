// import styles from './employeesSelect.module.css';

const EmployeesSelect = (props) => {
  const handleEmployeeChange = (id) => {
    props.setAddedEmployee({ employee: id });
  };
  if (props.employees.length) {
    return (
      <select required>
        {props.employees.map((employee, index) => (
          <option
            key={index}
            onClick={handleEmployeeChange(employee._id)}
          >{`${employee.name} ${employee.lastName}`}</option>
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
