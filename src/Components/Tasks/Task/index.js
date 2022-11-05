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
        {/* <button
          onClick={(e) => {
            setShowModal(true);
            setTaskId(task._id);
            e.stopPropagation();
          }}
        >
          &times;
        </button> */}
        <Button
          text="&times;"
          type="submit"
          whenClicked={(e) => {
            setShowModal(true);
            setTaskId(task._id);
            e.stopPropagation();
          }}
        />
      </td>
    </tr>
  );
};

export default Task;
