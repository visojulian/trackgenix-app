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

const Select = ({ name, onSelect, placeholder, data, value }) => {
  return (
    <SelectComponent
      name={name}
      placeholder={placeholder}
      required
      onSelect={onSelect}
      data={data}
      value={value}
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

const TextInput = ({ label, id, name, value, onChange, type, placeholder }) => {
  return (
    <TextInputComponent
      label={label}
      id={id}
      name={name}
      value={value}
      onChange={onChange}
      type={type}
      placeholder={placeholder}
    />
  );
};

export { Button, Modal, Select, Spinner, Table, TextInput };
