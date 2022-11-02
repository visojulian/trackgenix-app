function FormModal(props) {
  if (!props.show) {
    return null;
  }

  return (
    <div>
      <div>
        <h3>{props.title}</h3>
        <div>
          <div>
            <button onClick={props.closeModal}>Modified</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FormModal;
