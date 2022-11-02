import { useEffect, useState } from 'react';
import EmployeesSelect from '../EmployeesSelect';
import Delete from '../../assets/trash.png';

const EmployeeSelect = (props) => {
  const roles = ['PM', 'QA', 'DEV', 'TL'];
  const [roleValue, setRoleValue] = useState('');
  const [rateValue, setRateValue] = useState('');
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({});
  const [addedEmployee, setAddedEmployee] = useState({});
  const [employeeList, setEmployeeList] = useState([]);

  const onChangeRateInput = (event) => {
    setRateValue(event.target.value);
  };

  const handleRoleChange = (event) => {
    setRoleValue(event.target.value);
  };

  const handleDelete = (index) => {
    setEmployeeList([...employeeList].splice(index, 1));
    props.updateEmployees(employeeList);
  };

  const addEmployee = (e) => {
    e.preventDefault();
    setAddedEmployee({
      employee: newEmployee.id,
      name: newEmployee.name,
      rate: rateValue,
      role: roleValue
    });
    if (Object.keys(addedEmployee).length) {
      setEmployeeList([...employeeList, addedEmployee]);
      props.updateEmployees(employeeList);
    }
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        setEmployees(response.data);
      });

    if (props.projectEmployees.length) {
      props.projectEmployees.map((employee) => {
        const id = employee.employee;
        fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
          .then((response) => response.json())
          .then((response) => {
            setEmployeeList((prev) => [
              ...prev,
              {
                name: `${response.data.name} ${response.data.lastName}`,
                role: employee.role,
                rate: employee.rate
              }
            ]);
          });
      });
    }
  }, [props.loaded]);

  return (
    <div>
      <h4>Employees</h4>
      <form onSubmit={addEmployee}>
        <div>
          <EmployeesSelect setNewEmployee={setNewEmployee} employees={employees} />
          <select required value={roleValue} onChange={handleRoleChange}>
            {roles.map((role, index) => (
              <option key={index}>{role}</option>
            ))}
          </select>
          <input
            id="rate"
            name="rate"
            placeholder="Rate:"
            required
            value={rateValue}
            onChange={onChangeRateInput}
          />
        </div>
        <button type="submit">Assign new employee</button>
      </form>
      {console.log(addedEmployee)}
      <table>
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
          {employeeList.map((employee, index) => (
            <tr key={index}>
              <td>{employee.name}</td>
              <td>{employee.role}</td>
              <td>{employee.rate}</td>
              <td>
                <button onClick={() => handleDelete(index)}>&times;</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeSelect;
