import React from 'react';
import styles from './list.module.css';

const EmployeesList = (props) => {
  return (
    <table className={styles.tableContent}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last name</th>
          <th>Phone</th>
          <th>Email</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.list.map((employee) => {
          return (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.lastName}</td>
              <td>{employee.phone}</td>
              <td>{employee.email}</td>
              <td>
                <button
                  onClick={() => {
                    props.deleteEmployeeId(employee._id);
                    props.setShowModal(true);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default EmployeesList;
