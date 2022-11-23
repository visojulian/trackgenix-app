import ButtonComponent from './Button';
import ModalComponent from './Modal';
import SelectComponent from './Select';
import SpinnerComponent from './Spinner/spinner';
import TableComponent from './Table';
import TextInputComponent from './TextInput';

const Button = ({ text, onClick, type, variant }) => {
  return <ButtonComponent text={text} type={type} variant={variant} onClick={onClick} />;
};

const Modal = ({ children, isOpen, handleClose, isActionModal, action, actionButton }) => {
  return (
    <ModalComponent
      isOpen={isOpen}
      handleClose={handleClose}
      isActionModal={isActionModal}
      action={action}
      actionButton={actionButton}
    >
      {children}
    </ModalComponent>
  );
};

const Select = ({ name, placeholder, data, register, error }) => {
  return (
    <SelectComponent
      name={name}
      placeholder={placeholder}
      register={register}
      error={error}
      data={data}
    />
  );
};

const Spinner = (props) => {
  return <SpinnerComponent props={props} />;
};

const Table = ({ data, headers, values, onDelete, onRowClick }) => {
  return (
    <TableComponent
      data={data}
      headers={headers}
      values={values}
      onDelete={onDelete}
      onRowClick={onRowClick}
    />
  );
};

const TextInput = ({ label, id, name, type, placeholder, register, error }) => {
  return (
    <TextInputComponent
      label={label}
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      register={register}
      error={error}
    />
  );
};

export { Button, Modal, Select, Spinner, Table, TextInput };
