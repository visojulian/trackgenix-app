import { useState } from 'react';
import styles from '../tasks.module.css';

function Task({ task, setShowModal, setTaskId, onClickTask }) {
  const [isHovering, setHover] = useState(false);

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  return (
    <tr>
      <td
        className={isHovering ? styles.tdHover : styles.tableData}
        onClick={() => {
          onClickTask(task._id);
        }}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseOut}
      >
        {task.description}
      </td>
      <td className={styles.tableTd}>
        <div>
          <button
            onClick={() => {
              setShowModal(true);
              setTaskId(task._id);
            }}
          >
            X
          </button>
        </div>
      </td>
    </tr>
  );
}

export default Task;
