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
            setTaskId(task._id);
            setShowModal();
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
