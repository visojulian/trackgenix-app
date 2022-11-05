import React from 'react';
import styles from './list.module.css';
import DeleteImg from '../Assets/trash.png';
import Button from '../../Shared/Button';

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
              <tr
                onClick={() => {
                  onClickEmployee(employee._id);
                }}
                key={employee._id}
              >
                <td>{employee.name}</td>
                <td>{employee.lastName}</td>
                <td>{employee.phone}</td>
                <td>{employee.email}</td>
                <td>
                  {/* <button
                    className={styles.button}
                    onClick={(event) => {
                      event.stopPropagation();
                      props.deleteEmployeeId(employee._id);
                      props.setShowModal(true);
                    }}
                  >
                    X
                  </button> */}
                  <Button
                    text="&times;"
                    type="submit"
                    whenClicked={(event) => {
                      event.stopPropagation();
                      props.deleteEmployeeId(employee._id);
                      props.setShowModal(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.div}>
        {/* <button
          className={styles.submitButton}
          onClick={() => {
            window.location.assign('employees/form');
          }}
        >
          Add employee
        </button> */}
        <Button
          text="Add Employee"
          type="submit"
          whenClicked={() => {
            window.location.assign('employees/form');
          }}
        />
      </div>
    </div>
  );
};

export default EmployeesList;
