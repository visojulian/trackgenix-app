import React from 'react';
// import styles from './list.module.css';

const EmployeesList = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last name</th>
          <th>Phone</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {list.map((employee) => {
          return (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeesList;
