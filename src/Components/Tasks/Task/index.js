import styles from '../tasks.module.css';

function Task({ task, setShowModal, setTaskId, onClickTask }) {
  return (
    <tr>
      <td
        className={styles.tableData}
        onClick={() => {
          onClickTask(task._id);
        }}
      >
        {task.description}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px' }}>
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
