function FormModal({ modal, title, closeModal }) {
  if (!modal) {
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
