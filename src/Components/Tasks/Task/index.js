import { useState } from 'react';
import Modal from '../Modal';
import Logo from '../Logo/close_cross.png';

function Task({ task }) {
  const [showModal, setShowModal] = useState(false);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <tr>
      <Modal show={showModal} closeModal={closeModal} />
      <td>{task.description}</td>
      <img
        src={Logo}
        alt="logo"
        onClick={() => {
          setShowModal(true);
        }}
      />
    </tr>
  );
}

export default Task;
