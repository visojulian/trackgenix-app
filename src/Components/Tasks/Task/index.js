// import { useState } from 'react';
// import Modal from '../Modal';
import Logo from '../Logo/close_cross.png';

function Task({ task, setShowModal, setTaskId }) {
  // const [showModal, setShowModal] = useState(false);
  // const [taskId, setTaskId] = useState(undefined);

  // const closeModal = () => {
  //   setShowModal(false);
  // };

  return (
    <tr>
      {/* <Modal
        show={showModal}
        closeModal={closeModal}
        deleteTask={deleteTask}
        taskId={taskId}
        title="Do you want to delete this task?"
      /> */}
      <td>{task.description}</td>
      <td>
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
