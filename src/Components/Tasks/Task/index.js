import Logo from '../../../assets/close_cross.png';

const Task = ({ task, setShowModal, setTaskId }) => {
  return (
    <tr>
      <td>{task.description}</td>
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
};

export default Task;
