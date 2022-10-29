const DeleteBtn = (props) => {
  const { handleModal } = props;
  const handleDelete = () => {
    handleModal(true);
  };

  return <button onClick={() => handleDelete()}>&times;</button>;
};

export default DeleteBtn;
