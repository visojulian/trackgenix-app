const Task = ({ task, setShowModal, setTaskId, onClickTask }) => {
  return (
    <tr
      onClick={() => {
        onClickTask(task._id);
      }}
    >
      <td>{task.description}</td>
      <td>
        <button
          onClick={(e) => {
            setShowModal(true);
            setTaskId(task._id);
            e.stopPropagation();
          }}
        >
          &times;
        </button>
      </td>
    </tr>
  );
};

export default Task;
