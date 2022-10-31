const Modal = (props) => {
  if (!props.showModal) {
    return null;
  }

  const onCloseModal = () => {
    props.deleteSuperAdmin(props.superAdminId);
    props.closeModal();
  };

  return (
    <div>
      <div>
        <button onClick={props.closeModal}>Cancel</button>
        <button onClick={onCloseModal}>Delete</button>
      </div>
    </div>
  );
};

export default Modal;
