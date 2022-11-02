import React, { useEffect, useState } from 'react';
import AdminForm from './AdminForm';

const AddAdmin = () => {
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [adminId, setAdminId] = useState();
  const [modal, setModal] = useState(false);
  const [serverError, setServerError] = useState('');
  const [edit, setEdit] = useState(false);
  const [formTitle, setFormTitle] = useState('Add admin');

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeLastName = (e) => {
    setLastName(e.target.value);
  };
  const onChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const onChangePassword = (e) => {
    setPassword(e.target.value);
  };

  useEffect(async () => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    setAdminId(id);
    if (id) {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/admins/${id}`, {
        method: 'GET'
      });
      const data = await response.json();
      setEdit(true);
      setName(data.data.name);
      setLastName(data.data.lastName);
      setEmail(data.data.email);
      setPassword(data.data.password);
      setFormTitle('Edit admin');
    }
  }, []);

  const closeModal = () => {
    setModal(false);
  };
  const onSubmit = async (e) => {
    if (!edit) {
      e.preventDefault();
      const newAdmin = await fetch(`${process.env.REACT_APP_API_URL}/admins`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await newAdmin.json();
      if (!content.error) {
        window.location.assign('/admins');
      } else {
        setModal(true);
        setServerError(content.message);
      }
    } else {
      e.preventDefault();
      const rawResponse = await fetch(`${process.env.REACT_APP_API_URL}/admins/${adminId}`, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, lastName: lastName, email: email, password: password })
      });
      const content = await rawResponse.json();
      if (!content.error) {
        window.location.assign('/admins');
      } else {
        setModal(true);
        setServerError(content.message);
      }
    }
  };

  return (
    <AdminForm
      modal={modal}
      serverError={serverError}
      formTitle={formTitle}
      onChangeName={onChangeName}
      onChangeLastName={onChangeLastName}
      onChangeEmail={onChangeEmail}
      onChangePassword={onChangePassword}
      closeModal={closeModal}
      onSubmit={onSubmit}
      name={name}
      lastName={lastName}
      email={email}
      password={password}
    />
  );
};

export default AddAdmin;
