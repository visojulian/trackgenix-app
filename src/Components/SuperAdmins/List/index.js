import React from 'react';

const SuperAdminsList = ({ superAdmins, deleteSuperAdmin }) => {
  return (
    <div>
      <h2>Super Admins</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.name}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.email}</td>
                <td>
                  <button onClick={() => deleteSuperAdmin(superAdmin._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default SuperAdminsList;
