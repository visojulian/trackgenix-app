import React from 'react';
import styles from './list.module.css';
import DeleteImg from '../Assets/trash.png';

const EmployeesList = (props) => {
  return (
    <div>
      <table className={styles.tableContent}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>
              <img src={DeleteImg}></img>
            </th>
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
                    className={styles.button}
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
      <div className={styles.div}>
        <button
          className={styles.submitButton}
          onClick={() => {
            window.location.assign('employees/form');
          }}
        >
          Add employee
        </button>
      </div>
    </div>
  );
};

export default EmployeesList;
