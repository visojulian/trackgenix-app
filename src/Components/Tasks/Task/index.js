import Logo from '../../../assets/close_cross.png';

function Task({ task, setShowModal, setTaskId, onClickTask }) {
  return (
    <tr>
      <td
        onClick={() => {
          onClickTask(task._id);
        }}
      >
        {task.description}
      </td>
      <td style={{ display: 'flex', justifyContent: 'center' }}>
        <img
          src={Logo}
          alt="logo"
          onClick={() => {
            setShowModal(true);
            setTaskId(task._id);
          }}
        />
      </td>
    </tr>
  );
}

export default Task;
