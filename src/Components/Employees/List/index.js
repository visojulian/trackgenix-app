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
      <div>
        <a href={'employees/form'}>
          <button>Add employee</button>
        </a>
      </div>
    </div>
  );
};

export default EmployeesList;
