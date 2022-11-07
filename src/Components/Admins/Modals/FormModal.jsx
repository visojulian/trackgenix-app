function FormModal({ showModal, title, closeModal }) {
  if (!showModal) {
    return null;
  }

  return (
    <>
      <h3>{title}</h3>
      <div>
        <button onClick={closeModal}>Modified</button>
      </div>
    </>
  );
}

export default FormModal;
