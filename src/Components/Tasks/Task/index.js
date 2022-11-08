import Button from '../../Shared/Button';

const Task = ({ task, setShowModal, setTaskId, onClickTask }) => {
  return (
    <tr
      onClick={() => {
        onClickTask(task._id);
      }}
    >
      <td>{task.description}</td>
      <td>
        <Button
          text="&times;"
          type="submit"
          variant="primary"
          onClick={(e) => {
            setTaskId(task._id);
            setShowModal();
            e.stopPropagation();
          }}
        />
      </td>
    </tr>
  );
};

export default Task;
