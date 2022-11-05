import React from 'react';
import styles from './table.module.css';
import Delete from '../../../Assets/trash.png';

const Table = (props) => {
  // const onClickSuperAdmin = (id) => {
  //   window.location.assign(`/super-admins/form?id=${id}`);
  // };

  const onDelete = (id, modal) => {
    props.setDelete(id);
    props.setModal(modal);
  };

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {props.headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th>
              <img src={Delete} />
            </th>
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => {
            return (
              <tr key={row.id}>
                {props.headers.map((header, index) => {
                  return <td key={index}>{row[header]} </td>;
                })}
                <td>
                  <button
                    className={styles.button}
                    onClick={(event) => {
                      event.stopPropagation();
                      onDelete(row._id, true);
                    }}
                  >
                    x
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
