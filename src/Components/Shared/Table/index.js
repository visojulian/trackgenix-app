import React from 'react';
import styles from './table.module.css';
import Delete from '../../../Assets/trash.png';

const Table = ({ data, headers, onDelete, onRowClick }) => {
  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            {headers.map((header, index) => {
              return <th key={index}>{header}</th>;
            })}
            <th>
              <img src={Delete} />
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => {
            return (
              <tr key={row._id}>
                {headers.map((header, index) => {
                  return (
                    <td
                      key={index}
                      onClick={() => {
                        onRowClick(row._id);
                      }}
                    >
                      {row[header]}{' '}
                    </td>
                  );
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
