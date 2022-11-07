import React from 'react';
import styles from './list.module.css';
import DeleteImg from '../Assets/trash.png';
import Button from '../../Shared/Button';
import { useHistory } from 'react-router-dom';

const EmployeesList = (props) => {
  const history = useHistory();

  const onClickEmployee = (id) => {
    history.push(`/employees/form/${id}`);
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
                  <Button
                    text="&times;"
                    type="submit"
                    variant="primary"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.setEmployeeId(employee._id);
                      props.setShowModal();
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.div}>
        <Button
          text="Add Employee"
          type="submit"
          variant="primary"
          onClick={() => {
            history.push(`/employees/form`);
          }}
        />
      </div>
    </div>
  );
};

export default EmployeesList;
