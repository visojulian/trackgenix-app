import React from 'react';
import styles from './list.module.css';
import Delete from '../assets/trash.png';
import Button from '../../Shared/Button';
import { useHistory } from 'react-router-dom';

const SuperAdminsList = (props) => {
  const history = useHistory();

  const onClickSuperAdmin = (id) => {
    history.push(`/super-admins/form/${id}`);
  };

  return (
    <div className={styles.container}>
      <h2>Super Admins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>
              <img src={Delete} />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.superAdmins.map((superAdmin) => {
            return (
              <tr
                key={superAdmin._id}
                onClick={() => {
                  onClickSuperAdmin(superAdmin._id);
                }}
              >
                <td>{superAdmin.name}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>
                  <Button
                    text="&times;"
                    type="submit"
                    variant="primary"
                    onClick={(event) => {
                      event.stopPropagation();
                      props.setSuperAdminId(superAdmin._id);
                      props.setModal();
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div>
        <Button
          text="Add Super Admin"
          type="submit"
          variant="primary"
          onClick={() => {
            history.push('super-admins/form');
          }}
        />
      </div>
    </div>
  );
};

export default SuperAdminsList;
