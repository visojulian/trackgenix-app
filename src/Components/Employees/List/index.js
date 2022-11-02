import React from 'react';
import styles from './list.module.css';
import DeleteImg from '../Assets/trash.png';

const EmployeesList = (props) => {
  const onClickEmployee = (id) => {
    window.location.assign(`/employees/form?id=${id}`);
  };

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
                <td
                  onClick={() => {
                    onClickEmployee(employee._id);
                  }}
                >
                  {employee.name}
                </td>
                <td
                  onClick={() => {
                    onClickEmployee(employee._id);
                  }}
                >
                  {employee.lastName}
                </td>
                <td
                  onClick={() => {
                    onClickEmployee(employee._id);
                  }}
                >
                  {employee.phone}
                </td>
                <td
                  onClick={() => {
                    onClickEmployee(employee._id);
                  }}
                >
                  {employee.email}
                </td>
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
